const WebSocket = require("ws");
const db = require("./database.js");
const predictor = require("./predictor.js");
require("dotenv").config()

const wss = new WebSocket.Server({ port: 5000 });
const clients = []
const config = {
    run: false,
    bet: false,
    hold: false,
    clientConnection: false,
    predictedCrashPoint: 0,
    backupCrashPoint: 0,
    stake: 100,
    stoploss: -200,
    odds: [],
    values: [],
    ma: [],
    profit: [],
    lastRecords: {
        crashData: {},
        bets: {},
    },
    MAWindowSize: 2,
    simulate: {
        enabled: true,
        bet: false,
        values: [0]
    },
    profitMargin: 50,
    lossMargin: 100,
    upTurningPoints: [],
    downTurningPoints: [0],
    rules: {
        detectTrend: (DT1, DT2) => { return (DT1 < DT2) },
        detectLoss: (DT2, CP) => { return (DT2 > CP) },
        detectProfit: (UT2, CP) => { return (UT2 < CP) },
        stopLoss: (UT, margin, CP) => { return (CP <= (UT - margin)) },
        startProfit: (DT, margin, CP) => { return (CP >= (DT)) },
        secondDownProfit: (DT1, CP) => { return (CP >= (DT1)) },

    },
    testValues: [],
    testBet: false
}

const detectTurningPoints = (data, DTA, UTA) => {
    if (data.length < 3) {
        return []; // Not enough points to detect turning points
    }

    let uArr = []
    let dArr = [];

    (async () => {
        for (let i = 1; i < data.length - 1; i++) {
            const prev = data[i - 1];
            const curr = data[i];
            const next = data[i + 1];

            if ((curr > prev && curr > next)) {
                uArr.push({ index: i, value: data[i] });
            }

            if ((curr < prev && curr < next)) {
                dArr.push({ index: i, value: data[i] });
            }
        }
       
    }
    )()

    config.upTurningPoints = uArr
    config.downTurningPoints = dArr


}

const oddsManager = (odds, newOdd) => {
    if (odds.length <= 5) {
        odds.push(newOdd);
        return { odds: odds, status: 'Pending' };
    } else if (odds.length > 5) {
        odds.push(newOdd);
        odds.shift();
        return { odds: odds, status: 'Ready' };
    }
};

const valueManager = (values, newValue) => {
    if (values.length <= (config.MAWindowSize - 1)) {
        values.push(newValue);
        return { values: values, status: 'Pending' };
    } else if (values.length > (config.MAWindowSize - 1)) {
        values.push(newValue);
        values.shift();
        return { values: values, status: 'Ready' };
    }
}

const maManager = (ma, newMA) => {
    if (ma.length <= 50) {
        ma.push(newMA);
        return ma
    } else if (ma.length > 50) {
        ma.push(newMA);
        ma.shift();
        return ma
    }
}

const profitManager = (profit, newProfit) => {
    if (profit.length <= 3) {
        profit.push(newProfit);
        return profit
    } else if (profit.length > 3) {
        profit.push(newProfit);
        profit.shift();
        return profit
    }
}


const predictionSetter = async (odds) => {
    if (odds.length > 5) {
        let predict_point = await predictor(odds);
        return predict_point;
    }
}

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
}

const decisionMaker = async (ma, profits) => {
    await detectTurningPoints(ma, config.downTurningPoints, config.upTurningPoints)
    console.log(config.upTurningPoints, config.downTurningPoints)
    // maCopy = await MA(config.values[], config.MAWindowSize)
    // console.log(maCopy[maCopy.length - 1])

    if(config.downTurningPoints.length > 0){
        console.log(config.downTurningPoints[config.downTurningPoints.length - 1])

    }

    if (config.rules.detectLoss(config.downTurningPoints[config.downTurningPoints.length - 1]?.value, ma[ma.length - 1]) || ( config.rules.stopLoss(config.upTurningPoints[config.upTurningPoints.length - 1]?.value, config.lossMargin, ma[ma.length - 1]) && config.upTurningPoints[config.upTurningPoints.length - 1]?.index > config.downTurningPoints[config.downTurningPoints.length - 1]?.index)) {
        config.bet = false
        console.log('detect loss')
    }else
    
    // if (config.rules.detectTrend(config.downTurningPoints[config.downTurningPoints.length - 2]?.value, config.downTurningPoints[config.downTurningPoints.length - 1]?.value) ||config.rules.detectProfit(config.upTurningPoints[config.upTurningPoints.length - 1]?.value, ma[ma.length - 1]) || (config.rules.secondDownProfit(config.downTurningPoints[config.downTurningPoints.length - 2 ]?.value,  ma[ma.length - 1]) && config.upTurningPoints[config.upTurningPoints.length - 1]?.index > config.downTurningPoints[config.downTurningPoints.length - 1]?.index)) {
    //     config.bet = true
    //     console.log('detect trend up')
      
    // } 

    if (config.rules.detectTrend(config.downTurningPoints[config.downTurningPoints.length - 2]?.value, config.downTurningPoints[config.downTurningPoints.length - 1]?.value) ) {
        config.bet = true
        console.log('detect trend up')
      
    } else  if (!(config.rules.detectTrend(config.downTurningPoints[config.downTurningPoints.length - 2]?.value, config.downTurningPoints[config.downTurningPoints.length - 1]?.value))) {
        config.bet = false
        console.log('detect trend down')
      
    }

    // if(config.upTurningPoints[config.upTurningPoints.length - 1]?.index  )

    // if (config.rules.detectLoss(config.downTurningPoints[config.downTurningPoints.length - 1]?.value, ma[ma.length - 1])) {
    //     config.bet = false
    //     console.log('detect loss')
    // }
        
  

 



    // if (config.rules.detectProfit(config.upTurningPoints[config.upTurningPoints.length - 1]?.value, ma[ma.length - 1])) {
    //     config.bet = true
    //     console.log('detect profit', config.rules.detectProfit(config.upTurningPoints[config.upTurningPoints.length - 1]?.value, ma[ma.length - 1]))

    // }else


    // if (!config.rules.detectTrend(config.downTurningPoints[config.downTurningPoints.length - 2]?.value, config.downTurningPoints[config.downTurningPoints.length - 1]?.value))  {
    //     config.bet = false
    //     console.log('detect trend down')
    // }else

  

    // if (config.rules.stopLoss(config.upTurningPoints[config.upTurningPoints.length - 1]?.value, config.lossMargin, ma[ma.length - 1])) {
    //     config.bet = false
    //     console.log('stop loss')
    // }



    // if (ma[ma.length - 1] > ma[ma.length - 2]) {
    //     // uptrend
    //     config.bet = true
    // } else if (ma[ma.length - 1] < ma[ma.length - 2]) {
    //     //downtrend
    //     config.bet = false
    // }

    // if ((parseInt(profits[profits.length - 1]) + parseInt(profits[profits.length - 2])) <= config.stoploss) {
    //     // hold
    //     config.bet = false
    //     config.hold = true
    // } else {
    //     config.hold = false

    // }

}



setTimeout(() => {
    let query = 'SELECT * FROM crash_data ORDER BY ID DESC LIMIT 1'
    db.all(query, (err, rows) => {
        if (err) throw console.log(err?.message)
        config.lastRecords.crashData = rows[0]
    })
}, 2000)
// Headers List
// 1. START
// 2. STOP
// 3. BET
// 4. DATA
// 5. CRASH
// 6. RESULT
// 7. WEBSTATS
// 8. DATAREQ

wss.on('connection', async (ws) => {
    console.log(
        "[" + Date.now() + "] ",
        " Client connected. Ip Address ==> ",
        ws._socket.remoteAddress
    );
    clients.push(ws);

    let query = 'SELECT * FROM crash_data LIMIT 200 OFFSET (SELECT count(*) FROM crash_data)-200' // 'SELECT * FROM crash_data ORDER BY ID DESC LIMIT 200'
    db.all(query, async (err, rows) => {
        if (err) throw console.log(err?.message)
        // console.log(rows)
        let ids = []
        let crashPoints = []
        let predictions = []
        let values = []
        let last = rows.slice(Math.max(rows.length - 20, 0))
        // console.log(last)
        for await (let i of rows) {
            ids.push(i.id)
            crashPoints.push(i.crash_point)
            predictions.push(i.predict_crash_point)
            values.push(parseInt(i.value))
        }

        let ma = MA(values, config.MAWindowSize)
        console.log(ma);

        clients.forEach(function (client) {
            client.send(JSON.stringify({ header: 'ALL', data: { all: rows, ids: ids, crashPoints: crashPoints, predictions: predictions, values: values, last: last, appStats: config.run, ma: ma, windowSize: config.MAWindowSize } }));
        });
        let query = 'SELECT * FROM bets LIMIT 200 OFFSET (SELECT count(*) FROM bets)-200'
        db.all(query, async (err, rows) => {
            if (err) throw console.log(err?.message)
            let profit = []
            let ids = []
            for await (let i of rows) {
                profit.push(parseInt(i.value))
                ids.push(i.id)
            }
            clients.forEach(function (client) {
                client.send(JSON.stringify({ header: 'BETS', data: { all: rows, profit: profit, ids: ids } }));
            });
        })
    })

    // websocket connection close
    ws.on("close", () => {
        console.log(
            "[" + Date.now() + "] ",
            " Client disconnected. Ip address ==> ",
            ws._socket.remoteAddress
        );
    });

    // websocket incomming messages
    ws.on('message', async (data) => {
        //message format : {header: 'HEADER', data: []/{} }
        var timestampLog = "[" + Date.now() + "] ";
        let decodedData = JSON.parse(data?.toString())
        if (decodedData.header != 'WEBSTATS') {
            console.log(timestampLog, 'Incoming data : ', decodedData)

        }

        if (decodedData?.header == 'START') {
            config.run = true
            console.log(timestampLog, ' START signal received!')
            clients.forEach(function (client) {
                client.send(JSON.stringify({ header: 'BOT', data: { status: 'LIVE' } }));
            });

        } else if (decodedData?.header == 'STOP') {
            config.run = false
            console.log(timestampLog, ' STOP signal received!')
            clients.forEach(function (client) {
                client.send(JSON.stringify({ header: 'BOT', data: { status: 'DISCONNECTED' } }));
            });

        } else if (decodedData?.header == 'BET') {
            console.log(timestampLog, ' BET signal received!')
            console.log(timestampLog, `decision : bet = ${config.bet} , hold = ${config.hold}`)
            if (config.bet && !config.hold && config.run) {
                if (config.simulate.enabled) {
                    config.simulate.bet = true
                }
                clients.forEach(function (client) {
                    client.send(JSON.stringify({ header: 'BET', data: { odd: config.predictedCrashPoint, stake: config.stake } }));
                });
            }

            if((config.values[config.values.length - 1] - config.values[config.values.length - 2] ) > 0 ){
                config.testBet = true
            }


        } else if (decodedData?.header == 'DATA') {
            console.log(timestampLog, ' DATA signal received!')
            if (config.predictedCrashPoint != undefined && config.backupCrashPoint != undefined) {
                (async () => {
                    let type = (parseFloat(decodedData?.data?.odd) > parseFloat(config.backupCrashPoint) ? 'Profit' : 'Loss')
                    let ProfitLoss = (type == 'Profit' ? ((parseFloat(config.backupCrashPoint) - 1) * config.stake) : config.stake * (-1))
                    let value = ProfitLoss + config.lastRecords.crashData?.value
                    let { values, status } = valueManager(config.values, value)
                    let ma = null;

                    if (status == 'Ready') {
                        ma = await MA(values, config.MAWindowSize)
                        console.log(ma[ma.length - 1])
                    }

                    let query = `INSERT INTO crash_data( timestamp, crash_point, predict_crash_point, type, profit_loss, value, ma) VALUES(?,?,?,?,?,?,?)`
                    let params = [decodedData?.data?.end, decodedData?.data?.odd, config.backupCrashPoint, type, ProfitLoss, value, ma ? ma[ma.length - 1] : null]

                    db.run(query, params, async (err) => {
                        if (err) throw console.log(err?.message)
                        let query = 'SELECT * FROM crash_data ORDER BY ID DESC LIMIT 1'
                        db.all(query, async (err, rows) => {
                            if (err) throw console.log(err?.message)
                            config.lastRecords.crashData = rows[0]
                            await maManager(config.ma, rows[0]?.ma)
                            await profitManager(config.profit, rows[0]?.profit_loss)
                            clients.forEach(function (client) {
                                client.send(JSON.stringify({ header: 'STREAM', data: rows[0] }));
                            });
                            await decisionMaker(config.ma, config.profit)
                            if (config.simulate.bet) {
                                await config.simulate.values.push(ProfitLoss + parseInt(config.simulate.values[config.simulate.values.length - 1]))
                                console.log(config.simulate.values)
                                config.simulate.bet = false
                                clients.forEach(function (client) {
                                    client.send(JSON.stringify({ header: 'SIMULATE', data: { values: config.simulate.values } }));
                                });
                            }

                            if(config.testBet){
                                await config.testValues.push(ProfitLoss + parseInt(config.testValues[config.testValues.length - 1]))
                                config.testBet = false
                                console.log(config.testValues, '<== test bets data')
                            }
                            clients.forEach(function (client) {
                                client.send(JSON.stringify({ header: 'DECISION', data: { bet: config.bet, hold: config.hold } }));
                            });
                        })
                    })
                })()
            }
        } else if (decodedData?.header == 'CRASH') {
            console.log(timestampLog, ' CRASH signal received!')
            clients.forEach(function (client) {
                client.send(JSON.stringify(decodedData));
            });
            (async () => {
                const { odds, status } = await oddsManager(
                    config.odds,
                    parseFloat(decodedData?.data?.odd)
                );
                console.log(timestampLog, "odds data", odds, status);
                const predictPoint = predictionSetter(config.odds).then((point) => {
                    console.log(
                        timestampLog,
                        "predict point : ",
                        point
                    );
                    config.backupCrashPoint = config.predictedCrashPoint
                    config.predictedCrashPoint = point
                });

                await predictPoint
            })()

        } else if (decodedData?.header == 'RESULT') {
            console.log(timestampLog, ' RESULT signal received!')
            let query = `INSERT INTO bets( date, time, round_id, bet, win, crash_point, acual_crash_point, value) VALUES()`
            let params = [decodedData.data?.date, decodedData.data?.time, decodedData.data?.roundID, decodedData.data?.bet, decodedData.data?.win, decodedData.data?.odd, decodedData.data?.crash, parseInt(decodedData.data?.odd) == 0 ? (parseInt(config.lastRecords.bets.value) - 100) : (parseInt(config.lastRecords.bets.value) + (parseInt(decodedData.data?.win) - config.stake))]
            db.run(query, params, async (err) => {
                if (err) throw console.log(err?.message)
                let query = 'SELECT * FROM bets ORDER BY ID DESC LIMIT 1'
                db.all(query, async (err, rows) => {
                    if (err) throw console.log(err?.message)
                    config.lastRecords.bets = rows[0]
                    let query = 'SELECT * FROM bets LIMIT 200 OFFSET (SELECT count(*) FROM bets)-200'
                    db.all(query, async (err, rows) => {
                        if (err) throw console.log(err?.message)
                        let profit = []
                        let ids = []
                        for await (let i of rows) {
                            profit.push(parseInt(i.value))
                            ids.push(i.id)
                        }
                        clients.forEach(function (client) {
                            client.send(JSON.stringify({ header: 'BETS', data: { all: rows, profit: profit, ids: ids } }));
                        });
                    })
                })
            })

        } else if (decodedData?.header == 'WEBSTATS') {

            clients.forEach(function (client) {
                client.send(JSON.stringify(decodedData));
            });

            if (decodedData?.data?.status == 'DISCONNECTED') {
                config.clientConnection = false
            } else if (decodedData?.data?.status == 'LIVE') {
                config.clientConnection = true
            }

        } else if (decodedData?.header == 'DATAREQ') {
            console.log(timestampLog, ' DATAREQ signal received!')
            let query = `SELECT * FROM crash_data  ${decodedData.data.limit == '*' ? ' ' : `LIMIT ${decodedData.data.limit} OFFSET (SELECT count(*) FROM crash_data)- ${decodedData.data.limit == '*' ? '(SELECT count(*) FROM crash_data)' : decodedData.data.limit}`}  `
            db.all(query, async (err, rows) => {
                if (err) throw console.log(err?.message)
                // console.log(rows)
                let ids = []
                let crashPoints = []
                let predictions = []
                let values = []
                let ma = []
                let last = rows.slice(Math.max(rows.length - 20, 0))
                // console.log(last)
                for await (let i of rows) {
                    ids.push(i.id)
                    crashPoints.push(i.crash_point)
                    predictions.push(i.predict_crash_point)
                    values.push(parseInt(i.value))
                    ma.push(parseInt(i.ma))
                }
                clients.forEach(function (client) {
                    client.send(JSON.stringify({ header: 'ALL', data: { all: rows, ids: ids, crashPoints: crashPoints, predictions: predictions, values: values, last: last, appStats: config.run, ma: ma } }));
                });
            })
        }

    })
})