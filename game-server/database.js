var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, async(err) => {
    if (err) {
      // Cannot open database
      console.error(err.message);
      throw err;
    } else {
      console.log("Connected to the SQLite database.");
    }

    // Tables: 
    // 1. bets
    // 2. crash_data
    
    await db.run(
        `CREATE TABLE crash_data (
              id INTEGER PRIMARY KEY  AUTOINCREMENT,
              timestamp DATETIME,  -- Assuming this is a datetime for recording time
              crash_point FLOAT,
              predict_crash_point FLOAT DEFAULT 0.0,  -- Default value should not be quoted
              type TEXT,
              profit_loss INTEGER,
              value INTEGER,
              ma INTEGER,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Use CURRENT_TIMESTAMP for MySQL
          );`,
        (err) => {
          if (err) {
            // Table already created
            console.log(err.message);
          } else {
            db.run(
              `INSERT INTO crash_data(id, timestamp, crash_point, predict_crash_point, type, profit_loss, value, ma) VALUES(1,' ',0.0,0.0, ' ' ,0, 0, 0)`,
              (err) => {
                if (err) {
                  // Table already created
                  console.log(err.message);
                }else{
                    console.log('crash_data table created!')
                }
              }
            );
          }
        }
      );

     await db.run(
        `CREATE TABLE bets (
              id INTEGER PRIMARY KEY  AUTOINCREMENT,
              date TEXT,
              time TEXT,
              round_id TEXT,
              bet TEXT,
              win BOOLEAN,
              crash_point TEXT,
              acual_crash_point TEXT,
              value TEXT
      
          );`,
        (err) => {
          if (err) {
            // Table already created
            console.log(err.message);
          } else {
            db.run(
              `INSERT INTO bets(
              id,
              date,
              time,
              round_id,
              bet,
              win,
              crash_point,
              acual_crash_point,
              value
                  ) VALUES(1,'', '', '', '' ,0,'','',0)`,
              (err) => {
                if (err) {
                  // Table already created
                  console.log(err.message);
                }else{
                    console.log('bets table created!')
                }
              }
            );
          }
        }
      );
  


})


module.exports = db;

