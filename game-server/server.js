const WebSocket = require("ws");
const db = require("./database.js");
const fs = require('node:fs')
const predictor = require("./predictor.js");
const express = require("express");
const cors = require('cors')
const schedule = require('node-schedule');
require("dotenv").config();

const wss = new WebSocket.Server({ port: 5000 });
const app = express();

app.use(express.json());

var corsOptions = {
  origin: 'http://5.104.81.194:4000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))


app.get("/crash", (req, res) => {

  let query = "SELECT * FROM crash_data ORDER BY ID DESC ";
  db.all(query, async (err, rows) => {
    if (err) throw console.log(err?.message);
    res.json({
      data: rows,
    });
  });


});

app.get("/bet", (req, res) => {

  let query = "SELECT * FROM bets ORDER BY ID DESC ";
  db.all(query, async (err, rows) => {
    if (err) throw console.log(err?.message);
    res.json({
      data: rows,
    });
  });


});


const clients = [];
let config = {
  run: false,
  bet: false,
  hold: false,
  clientConnection: false,
  lastTime: 0,
  pingTimer: null,
  hourdown: [],
  hourup: [],
  timeup: [],
  timedown: [],
  hourProfit: [0],
  timeBet: false,
  timeProfit: [{ x: 0, data: [0] }],
  timeData: [{ x: 0, y: [0, 0, 0, 0] }],
  hourData: [0],
  MainProfit: [0],
  profitTarget: 10,
  lossLimit: -600,
  profitLimit: 0,
  predictedCrashPoint: 0,
  backupCrashPoint: 0,
  stake: 200,
  crash: 5,
  stoploss: -200,
  odds: [],
  timer: null,
  exeHr: 0,
  sleep: false,
  hourStart: false,
  timeObj: {
    hr: 8,
    min: 20,
    T: 'Asia/Colombo',
    period: 60 * 60 * 1000,
    secondHr: 9,
    thirdHour: 10,
    nextHour: 8
  },
  lastOdd: 1,
  values: [],
  ma: [],
  mixed: [0],
  profit: [],
  testBet0: false,
  lastRecords: {
    crashData: {},
    bets: {},
  },
  MAWindowSize: 2,
  dataArray: [0],
  simulate: {
    enabled: true,
    bet: false,
    values: [0],
    ma: [],
    upTurningPoints: [],
    downTurningPoints: [0],
  },
  highProfit: {
    enabled: true,
    bet: false,
    values: [0],
    ma: [],
    upTurningPoints: [],
    downTurningPoints: [0],
  },
  profitMargin: 50,
  lossMargin: 100,
  holdsend: false,
  upTurningPoints: [],
  downTurningPoints: [],
  rules: {
    detectTrend: (DT1, DT2) => {
      return DT1 < DT2;
    },
    detectLoss: (DT2, CP) => {
      return DT2 > CP;
    },
    detectProfit: (UT2, CP) => {
      return UT2 < CP;
    },
    stopLoss: (UT, margin, CP) => {
      return CP <= UT;
    },
    startProfit: (DT, margin, CP) => {
      return CP >= DT;
    },
    secondDownProfit: (DT1, DT2, CP) => {
      return CP > DT1 && CP >= DT2;
    },

    /// new rules

    goingUpOrDown: (upPoint, downPoint, currentPoint) => {
      return (
        upPoint?.index > downPoint?.index && currentPoint > downPoint?.value
      );
    },
  },
  testValues: [0],
  testBet: false,
  bets: [0],
};


app.get("/config", (req, res) => {
  res.json({
    config: config,
  });
});



app.post("/config", (req, res) => {
  if (req.body) {
    config = {
      ...req.body
    }
    res.json({
      success: true,
      config: config,
    });
  } else {
    res.json({
      success: false,
    });
  }

});


app.listen(5555, () => {
  console.log("server running on port 5555");
});


const detectTurningPoints = (data, DTA, UTA) => {
  if (data.length < 3) {
    return []; // Not enough points to detect turning points
  }

  let uArr = [];
  let dArr = [];

  (async () => {
    for (let i = 1; i < data.length - 1; i++) {
      const prev = data[i - 1];
      const curr = data[i];
      const next = data[i + 1];

      if (curr > prev && curr > next) {
        uArr.push({ index: i, value: data[i] });
      }

      if (curr < prev && curr < next) {
        dArr.push({ index: i, value: data[i] });
      }
    }
  })();

  config.upTurningPoints = uArr;
  config.downTurningPoints = dArr;
};

const detectTurningPointsTime = (data, DTA, UTA) => {
  if (data.length < 6) {
    return []; // Not enough points to detect turning points
  }

  let uArr = [];
  let dArr = [];

  (async () => {
    for (let i = 1; i < data.length - 1; i++) {
      const prev = data[i - 1];
      const curr = data[i];
      const next = data[i + 1];

      if (curr > prev && curr > next) {
        uArr.push({ index: i, value: data[i] });
      }

      if (curr < prev && curr < next) {
        dArr.push({ index: i, value: data[i] });
      }
    }
  })();

  config.timeup = uArr;
  config.timedown = dArr;
};

const detectTurningPointsTest = (data, DTA, UTA) => {
  if (data.length < 3) {
    return []; // Not enough points to detect turning points
  }

  let uArr = [];
  let dArr = [];

  (async () => {
    for (let i = 1; i < data.length - 1; i++) {
      const prev = data[i - 1];
      const curr = data[i];
      const next = data[i + 1];

      if (curr > prev && curr > next) {
        uArr.push({ index: i, value: data[i] });
      }

      if (curr < prev && curr < next) {
        dArr.push({ index: i, value: data[i] });
      }
    }
  })();

  config.simulate.upTurningPoints = uArr;
  config.simulate.downTurningPoints = dArr;
};

const detectTurningPointsHour = (data, DTA, UTA) => {
  if (data.length < 6) {
    return []; // Not enough points to detect turning points
  }

  let uArr = [];
  let dArr = [];

  (async () => {
    for (let i = 1; i < data.length - 1; i++) {
      const prev = data[i - 1];
      const curr = data[i];
      const next = data[i + 1];

      if (curr > prev && curr > next) {
        uArr.push({ index: i, value: data[i] });
      }

      if (curr < prev && curr < next) {
        dArr.push({ index: i, value: data[i] });
      }
    }
  })();

  config.hourup = uArr;
  config.hourdown = dArr;
};

const detectTurningPointsHighProfit = (data, DTA, UTA) => {
  if (data.length < 3) {
    return []; // Not enough points to detect turning points
  }

  let uArr = [];
  let dArr = [];

  (async () => {
    for (let i = 1; i < data.length - 1; i++) {
      const prev = data[i - 1];
      const curr = data[i];
      const next = data[i + 1];

      if (curr > prev && curr > next) {
        uArr.push({ index: i, value: data[i] });
      }

      if (curr < prev && curr < next) {
        dArr.push({ index: i, value: data[i] });
      }
    }
  })();

  config.highProfit.upTurningPoints = uArr;
  config.highProfit.downTurningPoints = dArr;
};

const oddsManager = (odds, newOdd) => {
  if (odds.length <= 5) {
    odds.push(newOdd);
    return { odds: odds, status: "Pending" };
  } else if (odds.length > 5) {
    odds.push(newOdd);
    odds.shift();
    return { odds: odds, status: "Ready" };
  }
};

const valueManager = (values, newValue) => {
  if (values.length <= config.MAWindowSize - 1) {
    values.push(newValue);
    return { values: values, status: "Pending" };
  } else if (values.length > config.MAWindowSize - 1) {
    values.push(newValue);
    values.shift();
    return { values: values, status: "Ready" };
  }
};

const maManager = (ma, newMA) => {
  if (ma.length <= 50) {
    ma.push(newMA);
    return ma;
  } else if (ma.length > 50) {
    ma.push(newMA);
    ma.shift();
    return ma;
  }
};

const profitManager = (profit, newProfit) => {
  if (profit.length <= 5) {
    profit.push(newProfit);
    return profit;
  } else if (profit.length > 5) {
    profit.push(newProfit);
    profit.shift();
    return profit;
  }
};

const predictionSetter = async (odds) => {
  if (odds.length > 5) {
    let predict_point = await predictor(odds);
    return predict_point;
  }
};

const MA = (data, windowSize) => {
  let sma = [];
  for (let i = 0; i < data.length; i++) {
    if (i >= windowSize - 1) {
      let sum = 0;
      for (let j = i - windowSize + 1; j <= i; j++) {
        sum += data[j];
      }
      sma.push(sum / windowSize);
    } else {
      sma.push(null); // or handle edge cases based on your needs
    }
  }
  return sma;
};

const timeDataCollector = async (value) => {
  // if (config.hold) {
  //   config.pingTimer = setInterval(() => {
  //     clients.forEach(function (client) {
  //       client.send(
  //         JSON.stringify({ header: "ALIVE_PING", data: { status: "ping" } })
  //       );
  //     });
  //   }, 20000);
  // }

  await detectTurningPointsHour(
    config.hourProfit,
    config.hourup,
    config.hourdown
  );
  await detectTurningPointsTime(
    config.hourData,
    config.timeup,
    config.timedown
  );

  if (
    config.lastTime == 0 &&
    config.lastRecords.crashData?.timestamp != undefined
  ) {
    config.lastTime = config.lastRecords.crashData?.timestamp;
    const ruleForStart = new schedule.RecurrenceRule();
    ruleForStart.minute = 20;
    ruleForStart.tz = config.timeObj.T
    schedule.scheduleJob(ruleForStart, function () {
      console.log('start hour...')
      startJob()
    });
  }

  if (
    !(config.lastTime == 0) &&
    config.hourStart
  ) {
    let record = {
      x: config.timeData.length + 1,
      y: [
        0,
        Math.max(...config.hourData),
        Math.min(...config.hourData),
        config.hourData[config.hourData.length - 1],
      ],
    };
    await config.timeData.push(record);
    console.log(
      "time analysis: ",
      config.lastTime,
      record,
      parseInt(config.lastRecords.crashData?.timestamp) -
      parseInt(config.lastTime),
      parseInt(config.lastRecords.crashData?.timestamp)
    );

    config.hourData = [0];
    config.lastTime = config.lastRecords.crashData?.timestamp;

    let profitRecord = {
      x: config.timeData.length - 1,
      data: config.hourProfit,
    };
    await config.timeProfit.push(profitRecord);
    await config.MainProfit.push(
      config.MainProfit[config.MainProfit.length - 1] +
      config.hourProfit[config.hourProfit.length - 1]
    );



    config.hourProfit = [0];
    config.hourup = [];
    config.hourdown = [];
    config.timeup = [];
    config.timedown = [];
    config.hold = false;
    config.holdsend = false;
    config.sleep = false
    config.hourStart = false
    // if (config.pingTimer) {
    //   clearInterval(config.pingTimer);
    // }


  }


  console.log(
    " Latest profit : ",
    config.hourProfit[config.hourProfit.length - 1]
  );
  console.log(
    " Turning point set @ up: ",
    config.hourup.length,
    " down: ",
    config.hourdown.length
  );
  console.log(
    " Turning point set @ up: ",
    config.timeup.length,
    " down: ",
    config.timedown.length
  );
  console.log(" Latest bet : ", config.hourData[config.hourData.length - 1]);
  console.log(
    " conditions : ",
    !config.hold,
    config.hourProfit[config.hourProfit.length - 1] >= 400,
    (config.hourup.length >= 1 || config.hourdown.length >= 1) &&
    config.hourProfit[config.hourProfit.length - 1] <= 0,
    config.hourProfit[config.hourProfit.length - 1] >= 400 ||
    ((config.hourup.length >= 1 || config.hourdown.length >= 1) &&
      config.hourProfit[config.hourProfit.length - 1] <= 0)
  );
  console.log(
    " high profit loss : ",
    parseInt(Math.max(...config.hourProfit)) -
    parseInt(config.hourProfit[config.hourProfit.length - 1]),
    parseInt(Math.max(...config.hourProfit)),
    parseInt(config.hourProfit[config.hourProfit.length - 1])
  );

  if (!config.hold) {
    if (
      config.MainProfit[config.MainProfit.length - 1] >=
      config.profitTarget * config.stake ||
      (config.hourProfit[config.hourProfit.length - 1] >= 300 &&
        parseInt(Math.max(...config.hourProfit)) -
        parseInt(config.hourProfit[config.hourProfit.length - 1]) >
        200) ||
      (config.hourProfit[config.hourProfit.length - 1] < 300 &&
        config.hourProfit[config.hourProfit.length - 1] > config.profitLimit) ||
      //  &&
      // config.hourProfit[config.hourProfit.length - 1] < 300
      config.hourProfit[config.hourProfit.length - 1] <= config.lossLimit ||
      ((config.hourup.length >= 1 || config.hourdown.length >= 1) &&
        config.hourProfit[config.hourProfit.length - 1] == 0)
    ) {
      config.hold = true;
      console.log("Bet holding...");
      if (!config.holdsend) {
        clients.forEach(function (client) {
          client.send(
            JSON.stringify({
              header: "HOLD",
              data: {
                status: "Bet stopped",
                period:
                  parseInt(config.lastTime) +
                  config.timeObj.period -

                  parseInt(config.lastRecords.crashData?.timestamp),
              },
            })
          );
        });

        // set timer to wake
        // config.timeObj.nextHour = config.timeObj.nextHour + 1
        config.sleep = true
        // let rule = new schedule.RecurrenceRule();
        // rule.hour = config.timeObj.nextHour
        // rule.minute = config.timeObj.min
        // rule.tz = config.timeObj.T
        // schedule.scheduleJob(rule, function () {
        //   startJob()
        // });
        // config.timer = setTimeout(() => {
        //   clients.forEach(function (client) {
        //     client.send(
        //       JSON.stringify({ header: "WAKEUP", data: { status: "wakeup" } })
        //     );
        //   });
        // }, parseInt(config.lastTime) +
        // config.timeObj.period -

        // parseInt(config.lastRecords.crashData?.timestamp));


        config.holdsend = true;
      }
    }
  }



  if (
    config.timedown.length >= 1 &&
    config.hourData[config.hourData.length - 1] >= config.timedown[0].value &&
    config.hourData.length > 5

  ) {
    config.timeBet = true;
    console.log("time bet profit");
  } else {
    config.timeBet = false;
    console.log("time bet profit false");
  }


};

const highProfit = async (value) => {
  await detectTurningPointsHighProfit(
    config.simulate.values,
    config.highProfit.downTurningPoints,
    config.highProfit.upTurningPoints
  );
  // console.log('down turn point', config.highProfit.downTurningPoints[config.highProfit.downTurningPoints?.length - 1]?.value,value, config.rules.goingUpOrDown(config.highProfit.downTurningPoints[config.highProfit.downTurningPoints?.length - 1], config.highProfit.upTurningPoints[config.highProfit.upTurningPoints?.length - 1], value))
  if (
    config.rules.goingUpOrDown(
      config.highProfit.downTurningPoints[
      config.highProfit.downTurningPoints?.length - 1
      ],
      config.highProfit.upTurningPoints[
      config.highProfit.upTurningPoints?.length - 1
      ],
      value
    )
  ) {
    // await highProfit?.push(highProfit[highProfit?.length -1] + )
    config.highProfit.bet = true;
  } else {
    config.highProfit.bet = false;
  }
};

const oddshifter = async (value) => {

};

const decisionMaker = async (ma, profits) => {
  await detectTurningPoints(
    ma,
    config.downTurningPoints,
    config.upTurningPoints
  );

  if (config.downTurningPoints.length > 0) {
    console.log(config.downTurningPoints[config.downTurningPoints.length - 1]);
  }

  if (
    config.rules.detectLoss(
      config.downTurningPoints[config.downTurningPoints.length - 1]?.value,
      ma[ma.length - 1]
    ) ||
    (config.rules.stopLoss(
      config.upTurningPoints[config.upTurningPoints.length - 1]?.value,
      config.lossMargin,
      ma[ma.length - 1]
    ) &&
      config.upTurningPoints[config.upTurningPoints.length - 1]?.index >
      config.downTurningPoints[config.downTurningPoints.length - 1]?.index)
  ) {
    config.bet = false;
    console.log("detect loss");
  }

  else if (
    config.rules.detectTrend(
      config.downTurningPoints[config.downTurningPoints.length - 2]?.value,
      config.downTurningPoints[config.downTurningPoints.length - 1]?.value
    )
  ) {
    config.bet = true;
    console.log("detect trend up");
  } else if (
    !config.rules.detectTrend(
      config.downTurningPoints[config.downTurningPoints.length - 2]?.value,
      config.downTurningPoints[config.downTurningPoints.length - 1]?.value
    )
  ) {
    config.bet = false;
    console.log("detect trend down");
  }


};

setTimeout(() => {
  let query = "SELECT * FROM crash_data ORDER BY ID DESC LIMIT 1";
  db.all(query, (err, rows) => {
    if (err) throw console.log(err?.message);
    config.lastRecords.crashData = rows[0];
  });
}, 2000);

if (config.holdsend) {
}
// Headers List
// 1. START
// 2. STOP
// 3. BET
// 4. DATA
// 5. CRASH
// 6. RESULT
// 7. WEBSTATS
// 8. DATAREQ

const startJob = () => {
  if (!config.sleep) {
    console.log('App is starting...');
    config.run = true;
    config.exeHr = rule.hour
    config.hourStart = true
    console.log(" START signal received!");
    clients.forEach(function (client) {
      client.send(
        JSON.stringify({ header: "BOT", data: { status: "LIVE" } })
      );
    });

    clients.forEach(function (client) {
      client.send(
        JSON.stringify({ header: "START", data: { status: "LIVE" } })
      );
    });
  } else {
    console.log("browser still open.")
    config.run = false;

    console.log(" STOP signal received!");
    clients.forEach(function (client) {
      client.send(
        JSON.stringify({ header: "BOT", data: { status: "DISCONNECTED" } })
      );
    });

    clients.forEach(function (client) {
      client.send(
        JSON.stringify({ header: "STOP", data: { status: "DISCONNECTED" } })
      );
    });

    setTimeout(() => {
      console.log('App is starting...');
      config.run = true;
      config.exeHr = rule.hour
      config.hourStart = true
      console.log(" START signal received!");
      clients.forEach(function (client) {
        client.send(
          JSON.stringify({ header: "BOT", data: { status: "LIVE" } })
        );
      });

      clients.forEach(function (client) {
        client.send(
          JSON.stringify({ header: "START", data: { status: "LIVE" } })
        );
      });
    }, 15000)
  }
}

const rule = new schedule.RecurrenceRule();

rule.hour = config.timeObj.hr
rule.minute = config.timeObj.min
rule.tz = config.timeObj.T

const job = schedule.scheduleJob(rule, function () {
  startJob()
});


const ruleSecond = new schedule.RecurrenceRule();

ruleSecond.hour = config.timeObj.secondHr
ruleSecond.minute = config.timeObj.min
ruleSecond.tz = config.timeObj.T

if (config.exeHr == 0) {
  const jobSecond = schedule.scheduleJob(ruleSecond, function () {
    startJob()
  });

}


const ruleThird = new schedule.RecurrenceRule();

ruleThird.hour = config.timeObj.thirdHour
ruleThird.minute = config.timeObj.min
ruleThird.tz = config.timeObj.T

if (config.exeHr == 0) {
  const jobThird = schedule.scheduleJob(ruleThird, function () {
    startJob()
  });
}



const cleanRule = new schedule.RecurrenceRule();
cleanRule.hour = 23
cleanRule.minute = 55
cleanRule.tz = config.timeObj.T

const clean = () => {
  config.hourProfit = [0];
  config.hourup = [];
  config.hourdown = [];
  config.timeup = [];
  config.timedown = [];
  config.hold = false;
  config.holdsend = false;
  fs.unlink('./db.sqlite', (err) => {
    if (err) throw err;
    console.log('db was deleted');
  });
}


// const cleanJob = schedule.scheduleJob(cleanRule, () => clean())


wss.on("connection", async (ws) => {

  console.log(
    "[" + Date.now() + "] ",
    " Client connected. Ip Address ==> ",
    ws._socket.remoteAddress
  );
  await clients.push(ws);

  setInterval(() => {
    clients.forEach(function (client) {
      client.send(
        JSON.stringify({ header: "PING", data: { status: "Ping" } })
      );
    });
  }, 20000);

  let query =
    "SELECT * FROM crash_data LIMIT 200 OFFSET (SELECT count(*) FROM crash_data)-200"; // 'SELECT * FROM crash_data ORDER BY ID DESC LIMIT 200'
  db.all(query, async (err, rows) => {
    if (err) throw console.log(err?.message);
    // console.log(rows)
    let ids = [];
    let crashPoints = [];
    let predictions = [];
    let values = [];
    let last = rows.slice(Math.max(rows.length - 20, 0));
    // console.log(last)
    for await (let i of rows) {
      ids.push(i.id);
      crashPoints.push(i.crash_point);
      predictions.push(i.predict_crash_point);
      values.push(parseInt(i.value));
    }

    let ma = MA(values, config.MAWindowSize);
    // console.log(ma);

    clients.forEach(function (client) {
      client.send(
        JSON.stringify({
          header: "ALL",
          data: {
            all: rows,
            ids: ids,
            crashPoints: crashPoints,
            predictions: predictions,
            values: values,
            last: last,
            appStats: config.run,
            ma: ma,
            windowSize: config.MAWindowSize,
            timeData: config.timeData,
          },
        })
      );
    });
    let query =
      "SELECT * FROM bets LIMIT 200 OFFSET (SELECT count(*) FROM bets)-200";
    db.all(query, async (err, rows) => {
      if (err) throw console.log(err?.message);
      let profit = [];
      let ids = [];
      for await (let i of rows) {
        profit.push(parseInt(i.value));
        ids.push(i.id);
      }
      clients.forEach(function (client) {
        client.send(
          JSON.stringify({
            header: "BETS",
            data: {
              all: rows,
              mixed: config.mixed,
              profit: config.MainProfit,
              ids: ids,
              betted: config.simulate,
              highProfit: config.testValues,
              bets: config.bets,
            },
          })
        );
      });

      clients.forEach(function (client) {
        client.send(
          JSON.stringify({
            header: "CANDLE",
            data: {
              values: config.timeData,
              profit: config.timeProfit,
              mainprofit: config.MainProfit,
            },
          })
        );
      });
    });
  });

  // websocket connection close
  ws.on("close", () => {
    console.log(
      "[" + Date.now() + "] ",
      " Client disconnected. Ip address ==> ",
      ws._socket.remoteAddress
    );
  });

  // websocket incomming messages
  ws.on("message", async (data) => {
    //message format : {header: 'HEADER', data: []/{} }
    try {
      var timestampLog = "[" + Date.now() + "] ";
      let decodedData = JSON.parse(data?.toString());
      if (decodedData.header != "WEBSTATS") {
        console.log(timestampLog, "Incoming data : ", decodedData);
      }


      if (decodedData?.header == "START") {
        startJob()
      } else if (decodedData?.header == "STOP") {
        config.run = false;
        clean()
        console.log(timestampLog, " STOP signal received!");
        clients.forEach(function (client) {
          client.send(
            JSON.stringify({ header: "BOT", data: { status: "DISCONNECTED" } })
          );
        });

        clients.forEach(function (client) {
          client.send(
            JSON.stringify({ header: "STOP", data: { status: "DISCONNECTED" } })
          );
        });
      } else if (decodedData?.header == "BET") {
        console.log(timestampLog, " BET signal received!");
        if (config.timeBet && !config.hold) {
          clients.forEach(function (client) {
            client.send(
              JSON.stringify({
                header: "BET",
                data: { odd: config.crash, stake: config.stake },
              })
            );
          });
        }


      } else if (decodedData?.header == "test") {
      } else if (decodedData?.header == "DATA") {
        console.log(timestampLog, " DATA signal received!");
        if (
          config.predictedCrashPoint != undefined &&
          config.backupCrashPoint != undefined
        ) {
          (async () => {
            let type =
              parseFloat(decodedData?.data?.odd) > parseFloat(config.crash)
                ? "Profit"
                : "Loss";
            let ProfitLoss =
              type == "Profit"
                ? (parseFloat(config.crash) - 1) * config.stake
                : config.stake * -1;
            let value = ProfitLoss + config.lastRecords.crashData?.value;
            let { values, status } = valueManager(config.values, value);
            let ma = null;
            if (!(config.dataArray[config.dataArray?.length - 1] == value)) {
              await config.dataArray.push(value);
            }

            config.hourData.push(
              config.hourData[config.hourData.length - 1] + ProfitLoss
            );

            if (status == "Ready") {
              ma = await MA(values, config.MAWindowSize);
            }

            if (config.simulate.bet) {
              await config.simulate.values.push(
                config.simulate.values[config.simulate.values.length - 1] +
                ProfitLoss
              );
            }

            if (config.timeBet && !config.hold) {
              config.hourProfit.push(
                config.hourProfit[config.hourProfit.length - 1] + ProfitLoss
              );
              config.timeBet = false;
            }
            let query = `INSERT INTO crash_data( timestamp, crash_point, predict_crash_point, type, profit_loss, value, ma) VALUES(?,?,?,?,?,?,?)`;
            let params = [
              decodedData?.data?.end,
              decodedData?.data?.odd,
              config.crash,
              type,
              ProfitLoss,
              value,
              ma ? ma[ma.length - 1] : null,
            ];

            db.run(query, params, async (err) => {
              if (err) throw console.log(err?.message);
              let query = "SELECT * FROM crash_data ORDER BY ID DESC LIMIT 1";
              db.all(query, async (err, rows) => {
                if (err) throw console.log(err?.message);
                await timeDataCollector(rows[0]?.profit_loss);
                config.lastRecords.crashData = rows[0];
                await maManager(config.ma, rows[0]?.ma);
                console.log(
                  rows[0]?.profit_loss,
                  "profit loss value",
                  config.simulate.bet,
                  config.lastOdd >= 5,
                  !(config.odds[config.odds?.length - 2] >= 5)
                );
                await profitManager(config.profit, rows[0]?.profit_loss);
                await oddshifter(parseInt(rows[0]?.profit_loss));
                // await highProfit(parseInt(config.simulate.values[config.simulate.values?.length - 1]))
                clients.forEach(function (client) {
                  client.send(
                    JSON.stringify({ header: "STREAM", data: rows[0] })
                  );
                });

              });
            });
          })();
        }
      } else if (decodedData?.header == "CRASH") {
        console.log(timestampLog, " CRASH signal received!");
        config.lastOdd = parseFloat(decodedData?.data?.odd);
        const { odds, status } = await oddsManager(
          config.odds,
          parseFloat(decodedData?.data?.odd)
        );
        clients.forEach(function (client) {
          client.send(JSON.stringify(decodedData));
        });

      } else if (decodedData?.header == "RESULT") {
        console.log(timestampLog, " RESULT signal received!");
        if (decodedData.data?.odd && decodedData.data?.crash) {
          let query = `INSERT INTO bets( date, time, round_id, bet, win, crash_point, acual_crash_point, value) VALUES()`;
          let params = [
            decodedData.data?.date,
            decodedData.data?.time,
            decodedData.data?.roundID,
            decodedData.data?.bet,
            decodedData.data?.win,
            decodedData.data?.odd,
            decodedData.data?.crash,
            parseInt(decodedData.data?.odd) == 0
              ? parseInt(config.lastRecords.bets.value) - 100
              : parseInt(config.lastRecords.bets.value) +
              (parseInt(decodedData.data?.win) - config.stake),
          ];
          db.run(query, params, async (err) => {
            if (err) throw console.log(err?.message);
            let query = "SELECT * FROM bets ORDER BY ID DESC LIMIT 1";
            db.all(query, async (err, rows) => {
              if (err) throw console.log(err?.message);
              config.lastRecords.bets = rows[0];
              let query =
                "SELECT * FROM bets LIMIT 200 OFFSET (SELECT count(*) FROM bets)-200";
              db.all(query, async (err, rows) => {
                if (err) throw console.log(err?.message);
                let profit = [];
                let ids = [];
                for await (let i of rows) {
                  profit.push(parseInt(i.value));
                  ids.push(i.id);
                }
                clients.forEach(function (client) {
                  client.send(
                    JSON.stringify({
                      header: "BETS",
                      data: { all: rows, profit: profit, ids: ids },
                    })
                  );
                });
              });
            });
          });
        }
      } else if (decodedData?.header == "WEBSTATS") {
        clients.forEach(function (client) {
          client.send(JSON.stringify(decodedData));
        });

        if (decodedData?.data?.status == "DISCONNECTED") {
          config.clientConnection = false;
        } else if (decodedData?.data?.status == "LIVE") {
          config.clientConnection = true;
        }
      } else if (decodedData?.header == "DATAREQ") {
        console.log(timestampLog, " DATAREQ signal received!");
        let query = `SELECT * FROM crash_data  ${decodedData.data.limit == "*"
          ? " "
          : `LIMIT ${decodedData.data.limit
          } OFFSET (SELECT count(*) FROM crash_data)- ${decodedData.data.limit == "*"
            ? "(SELECT count(*) FROM crash_data)"
            : decodedData.data.limit
          }`
          }  `;
        db.all(query, async (err, rows) => {
          if (err) throw console.log(err?.message);
          // console.log(rows)
          let ids = [];
          let crashPoints = [];
          let predictions = [];
          let values = [];
          let ma = [];
          let last = rows.slice(Math.max(rows.length - 20, 0));
          // console.log(last)
          for await (let i of rows) {
            ids.push(i.id);
            crashPoints.push(i.crash_point);
            predictions.push(i.predict_crash_point);
            values.push(parseInt(i.value));
            ma.push(parseInt(i.ma));
          }
          clients.forEach(function (client) {
            client.send(
              JSON.stringify({
                header: "ALL",
                data: {
                  all: rows,
                  ids: ids,
                  crashPoints: crashPoints,
                  predictions: predictions,
                  values: values,
                  last: last,
                  appStats: config.run,
                  ma: ma,
                },
              })
            );
          });
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
});