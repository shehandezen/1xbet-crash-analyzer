const WebSocket = require("ws");
const db = require("./database.js");
const predictor = require("./predictor.js");
const express = require('express')
require("dotenv").config()

const wss = new WebSocket.Server({ port: 5000 });
const app = express()
app.get('/timeData', (req, res) => {
    res.json({
        data: config.timeData
    })
})

app.listen(5555, () => {
    console.log('server running on port 5555')
})
const clients = []
const config = {
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
    lossLimit: -200,
    profitLimit: 0,
    predictedCrashPoint: 0,
    backupCrashPoint: 0,
    stake: 100,
    crash: 1,
    stoploss: -200,
    odds: [],
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
        detectTrend: (DT1, DT2) => { return (DT1 < DT2) },
        detectLoss: (DT2, CP) => { return (DT2 > CP) },
        detectProfit: (UT2, CP) => { return (UT2 < CP) },
        stopLoss: (UT, margin, CP) => { return (CP <= (UT)) },
        startProfit: (DT, margin, CP) => { return (CP >= (DT)) },
        secondDownProfit: (DT1, DT2, CP) => { return ((CP > (DT1)) && (CP >= DT2)) },

        /// new rules

        goingUpOrDown: (upPoint, downPoint, currentPoint) => { return (upPoint?.index > downPoint?.index) && (currentPoint > downPoint?.value) }

    },
    testValues: [0],
    testBet: false,
    bets: [0]
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

const detectTurningPointsTime = (data, DTA, UTA) => {
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

    config.timeup = uArr
    config.timedown = dArr


}

const detectTurningPointsTest = (data, DTA, UTA) => {
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

    config.simulate.upTurningPoints = uArr
    config.simulate.downTurningPoints = dArr


}

const detectTurningPointsHour = (data, DTA, UTA) => {
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

    config.hourup = uArr
    config.hourdown = dArr


}


const detectTurningPointsHighProfit = (data, DTA, UTA) => {
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

    config.highProfit.upTurningPoints = uArr
    config.highProfit.downTurningPoints = dArr


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
    if (profit.length <= 5) {
        profit.push(newProfit);
        return profit
    } else if (profit.length > 5) {
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


const timeDataCollector = async (value) => {
  if (config.hold){ 
    config.pingTimer = setInterval(() => {
        clients.forEach(function (client) {
            client.send(JSON.stringify({ header: 'ALIVE_PING', data: { status: 'ping' } }));
        });
    }, 20000)
}


    await detectTurningPointsHour(config.hourProfit, config.hourup, config.hourdown)
    await detectTurningPointsTime(config.hourData, config.timeup, config.timedown)

    if (config.lastTime == 0 && config.lastRecords.crashData?.timestamp != undefined) {
        config.lastTime = config.lastRecords.crashData?.timestamp
    }

    if (!(config.lastTime == 0) && ((parseInt(config.lastRecords.crashData?.timestamp) - parseInt(config.lastTime)) > (1000 * 60 * 60))) {
        let record = { x: (config.timeData.length + 1), y: [0, Math.max(...config.hourData), Math.min(...config.hourData), config.hourData[config.hourData.length - 1]] }
        await config.timeData.push(record)
        console.log('time analysis: ', config.lastTime, record, (parseInt(config.lastRecords.crashData?.timestamp) - parseInt(config.lastTime)), (parseInt(config.lastRecords.crashData?.timestamp)))

        config.hourData = [0]
        config.lastTime = config.lastRecords.crashData?.timestamp

        let profitRecord = { x: (config.timeData.length - 1), data: config.hourProfit }
        await config.timeProfit.push(profitRecord)
        await config.MainProfit.push(config.MainProfit[config.MainProfit.length - 1] + config.hourProfit[config.hourProfit.length - 1])

        //  console.log('Hourly profit: ', config.timeProfit[config.timeProfit.length - 1], config.MainProfit[config.MainProfit.length - 1])

        config.hourProfit = [0]
        config.hourup = []
        config.hourdown = []
        config.timeup = []
        config.timedown = []
        config.hold = false
        config.holdsend = false
        if (config.pingTimer) {
            clearInterval(config.pingTimer)

        }

        //  if(config.MainProfit[config.MainProfit.length - 1]  < 0 ){
        //     // config.loss = Math.abs(config.MainProfit[config.MainProfit.length - 1])
        //     config.loss = 0

        //  }else{
        //     config.loss = 0
        //  }
    }


    // if(config.hourProfit[config.hourProfit.length -1]  > 1000 || 
    //     ((config.hourup.length >= 1 || config.hourdown.length >= 1) && (config.hourProfit[config.hourProfit.length -1] <= 0))
    // ){
    //     config.hold = true
    // }else{
    //     config.hold = false
    // }

    // // console.log('settle point', config.hourProfit[config.hourProfit.length -1],  ((config.hourup.length >= 1 || config.hourdown.length >= 1) && (config.hourProfit[config.hourProfit.length -1] <= 0)))
    // // console.log('hour profit : ', config.hourProfit)

    // if ((config.lastOdd >= 5) && !(config.odds[config.odds?.length - 2] >= 5)) {
    //     if((config.hourData[config.hourData.length - 1] > 0)  && 
    //     !((config.hourData[config.hourData.length -1] - config.hourData[config.hourData.length -2]) == 400)
    // ){
    //         config.timeBet = true 
    //     console.log('Profit bet setted True!')

    //     }else{
    //         config.timeBet = false
    //     console.log('Profit bet setted False!')

    //     }
    // }

    console.log(' Latest profit : ', config.hourProfit[config.hourProfit.length - 1])
    console.log(' Turning point set @ up: ', config.hourup.length, ' down: ', config.hourdown.length)
    console.log(' Turning point set @ up: ', config.timeup.length, ' down: ', config.timedown.length)
    console.log(' Latest bet : ', config.hourData[config.hourData.length - 1])
    console.log(' conditions : ', !(config.hold), (config.hourProfit[config.hourProfit.length - 1] >= 400), ((config.hourup.length >= 1 || config.hourdown.length >= 1) && (config.hourProfit[config.hourProfit.length - 1] <= 0)), ((config.hourProfit[config.hourProfit.length - 1] >= 400) || ((config.hourup.length >= 1 || config.hourdown.length >= 1) && (config.hourProfit[config.hourProfit.length - 1] <= 0))))
    console.log(' high profit loss : ', (parseInt(Math.max(...config.hourProfit)) - parseInt(config.hourProfit[config.hourProfit.length - 1])), parseInt(Math.max(...config.hourProfit)), parseInt(config.hourProfit[config.hourProfit.length - 1]))
    // (config.hourProfit[config.hourProfit.length - 1] > config.profitLimit)
    if (!config.hold) {
        if (((config.MainProfit[config.MainProfit.length - 1] >= (config.profitTarget * config.stake)) ||
            ((config.hourProfit[config.hourProfit.length - 1] >= 300) && ((parseInt(Math.max(...config.hourProfit)) - parseInt(config.hourProfit[config.hourProfit.length - 1])) > 200)) ||
            ((config.hourProfit[config.hourProfit.length - 1] > config.profitLimit) && (config.hourProfit[config.hourProfit.length - 1] < 300)) ||
            (config.hourProfit[config.hourProfit.length - 1] <= config.lossLimit) ||
            ((config.hourup.length >= 1 || config.hourdown.length >= 1) && (config.hourProfit[config.hourProfit.length - 1] == 0)))
        ) {
            config.hold = true
            console.log('Bet holding...')
            if (!config.holdsend) {
                clients.forEach(function (client) {
                    client.send(JSON.stringify({ header: 'HOLD', data: { status: 'Bet stopped', period: ((parseInt(config.lastTime) + 1000 * 60 * 55) - parseInt(config.lastRecords.crashData?.timestamp)) } }));
                });

                // set timer to wake

                setTimeout(() => {
                    clients.forEach(function (client) {
                        client.send(JSON.stringify({ header: 'WAKEUP', data: { status: 'wakeup' } }));
                    });

                }, ((parseInt(config.lastTime) + 1000 * 60 * 55) - parseInt(config.lastRecords.crashData?.timestamp)))

                console.log('set timer to wake  up', (parseInt(config.lastTime) + 1000 * 60 * 55) - parseInt(config.lastRecords.crashData?.timestamp))


                config.holdsend = true
            }

        }
    }



    if ((config.lastOdd >= 5) && !(config.odds[config.odds?.length - 2] >= 5)) {
        if ((config.hourData[config.hourData.length - 1] > 0) || ((config.timedown.length >= 1) && config.hourData[config.hourData.length - 1] >= 0)) {
            if ((config.timedown.length >= 1)) {
                if (config.timedown[config.timedown.length - 1] > 0) {
                    config.timeBet = true
                    console.log('moving up with positive downing point')
                } else {
                    config.timeBet = false
                    console.log('moving up with negative downing point')
                }
            } else {
                config.timeBet = true
                console.log('moving up without downing point')
            }

        } else {
            config.timeBet = false
            console.log('moving down')
        }
    }




}


const highProfit = async (value) => {
    await detectTurningPointsHighProfit(config.simulate.values, config.highProfit.downTurningPoints, config.highProfit.upTurningPoints)
    // console.log('down turn point', config.highProfit.downTurningPoints[config.highProfit.downTurningPoints?.length - 1]?.value,value, config.rules.goingUpOrDown(config.highProfit.downTurningPoints[config.highProfit.downTurningPoints?.length - 1], config.highProfit.upTurningPoints[config.highProfit.upTurningPoints?.length - 1], value))
    if (config.rules.goingUpOrDown(config.highProfit.downTurningPoints[config.highProfit.downTurningPoints?.length - 1], config.highProfit.upTurningPoints[config.highProfit.upTurningPoints?.length - 1], value)) {
        // await highProfit?.push(highProfit[highProfit?.length -1] + )
        config.highProfit.bet = true
    } else {
        config.highProfit.bet = false

    }
}

const oddshifter = async (value) => {
    // if ((config.lastOdd >5)) {
    //     config.crash = 5
    //     console.log('odd is shifted to 5x')

    // }else 
    // if ((((config.profit[config.profit?.length - 1] + config.profit[config.profit?.length - 2]) == -200) && config.crash == 5) || (config.lastOdd >2)) {
    //     config.crash = 2
    //     console.log('odd is shifted to 1.5x')
    // } else  
    await detectTurningPoints(config.dataArray, config.downTurningPoints, config.upTurningPoints)
    await detectTurningPointsTest(config.simulate.values, config.simulate.downTurningPoints, config.simulate.upTurningPoints)

    // console.log(config.upTurningPoints, config.downTurningPoints)
    // console.log(config.dataArray, 'data array')
    // console.log(config.simulate.values)

    if ((config.lastOdd >= 5) && !(config.odds[config.odds?.length - 2] >= 5)) {
        config.crash = 5
        // console.log('odd is shifted to 5x')
        // console.log(config.upTurningPoints[config.upTurningPoints?.length - 1]?.value - config.dataArray[config.dataArray.length - 1], value)
        // if (config.simulate.bet) {
        //     config.simulate.values.push((config.simulate.values[config.simulate.values.length - 1] + value))

        // }
        if (((config.downTurningPoints[config.downTurningPoints.length - 1]?.index < config.upTurningPoints[config.upTurningPoints.length - 1]?.index) && (config.dataArray.length > 4) && ((config.upTurningPoints[config.upTurningPoints?.length - 1]?.value - config.dataArray[config.dataArray.length - 1]) >= 400))) {
            // console.log('detect loss')
            config.simulate.bet = false

        } else {
            // config.simulate.values.push((config.simulate.values[config.simulate.values.length-1] + value))
            config.simulate.bet = true
            // console.log('up trend bet')
            // console.log('value', value)
            // config.simulate.values.push((config.simulate.values[config.simulate.values.length - 1] + value))



        }

        if ((config.downTurningPoints.length > 2) && (config.downTurningPoints[config.downTurningPoints.length - 2]?.value < config.downTurningPoints[config.downTurningPoints.length - 1]?.value) && config.rules.secondDownProfit(config.downTurningPoints[config.downTurningPoints.length - 2]?.value, config.downTurningPoints[config.downTurningPoints.length - 1]?.value, config.simulate.values[config.simulate.values.length - 1])) {
            config.testBet0 = true
            // console.log('Stratergy active0 : ', config.downTurningPoints[config.downTurningPoints.length - 2]?.value , config.downTurningPoints[config.downTurningPoints.length - 1]?.value,config.simulate.values[config.simulate.values.length - 1] )

        } else {
            config.testBet0 = false
            // console.log('Stratergy Deactive0')

        }


        if ((config.downTurningPoints.length > 2) && (config.downTurningPoints[config.downTurningPoints.length - 2]?.value < config.downTurningPoints[config.downTurningPoints.length - 1]?.value) && config.rules.secondDownProfit(config.downTurningPoints[config.downTurningPoints.length - 2]?.value, config.downTurningPoints[config.downTurningPoints.length - 1]?.value, config.dataArray[config.dataArray.length - 1])) {
            config.testBet = true
            // console.log('Stratergy active : ', config.downTurningPoints[config.downTurningPoints.length - 2]?.value , config.downTurningPoints[config.downTurningPoints.length - 1]?.value,config.simulate.values[config.simulate.values.length - 1] )

        } else {
            config.testBet = false
            // console.log('Stratergy Deactive')

        }



        if (((Math.max(config.testValues) - config.testValues[config.testValues.length - 1]) >= 1000)) {
            // config.hold = true
            // console.log('Exceeded the loss limit')
        } else {
            // config.hold = false
        }

    } else {
        config.crash = 1
        // console.log('odd is shifted to 1x')
    }

    // if ((config.lastOdd >= 5) && !(config.odds[config.odds?.length - 2] >= 5)) {
    //     config.crash = 5
    //     console.log('odd is shifted to 5x')
    //     console.log (config.upTurningPoints[config.upTurningPoints?.length - 1]?.value - config.dataArray[config.dataArray.length - 1], value) 
    //     // if (config.simulate.bet) {
    //     //     config.simulate.values.push((config.simulate.values[config.simulate.values.length - 1] + value))

    //     // }
    //     if ((config.downTurningPoints[config.downTurningPoints.length-1]?.index < config.upTurningPoints[config.upTurningPoints.length-1]?.index ) && (config.dataArray.length > 4) && ((config.upTurningPoints[config.upTurningPoints?.length - 1]?.value - config.dataArray[config.dataArray.length - 1]) >= 400)) {
    //         console.log('detect loss')
    //         config.simulate.bet = false

    //     } else {
    //         // config.simulate.values.push((config.simulate.values[config.simulate.values.length-1] + value))
    //         config.simulate.bet = true
    //         console.log('up trend bet')
    //         console.log('value', value)
    //         // config.simulate.values.push((config.simulate.values[config.simulate.values.length - 1] + value))

    //     }
    // } else {
    //     config.crash = 1
    //     console.log('odd is shifted to 1x')
    // }

}

const decisionMaker = async (ma, profits) => {
    await detectTurningPoints(ma, config.downTurningPoints, config.upTurningPoints)
    console.log(config.upTurningPoints, config.downTurningPoints)
    // maCopy = await MA(config.values[], config.MAWindowSize)
    // console.log(maCopy[maCopy.length - 1])

    if (config.downTurningPoints.length > 0) {
        console.log(config.downTurningPoints[config.downTurningPoints.length - 1])

    }

    if (config.rules.detectLoss(config.downTurningPoints[config.downTurningPoints.length - 1]?.value, ma[ma.length - 1]) || (config.rules.stopLoss(config.upTurningPoints[config.upTurningPoints.length - 1]?.value, config.lossMargin, ma[ma.length - 1]) && config.upTurningPoints[config.upTurningPoints.length - 1]?.index > config.downTurningPoints[config.downTurningPoints.length - 1]?.index)) {
        config.bet = false
        console.log('detect loss')
    } else

        // if (config.rules.detectTrend(config.downTurningPoints[config.downTurningPoints.length - 2]?.value, config.downTurningPoints[config.downTurningPoints.length - 1]?.value) ||config.rules.detectProfit(config.upTurningPoints[config.upTurningPoints.length - 1]?.value, ma[ma.length - 1]) || (config.rules.secondDownProfit(config.downTurningPoints[config.downTurningPoints.length - 2 ]?.value,  ma[ma.length - 1]) && config.upTurningPoints[config.upTurningPoints.length - 1]?.index > config.downTurningPoints[config.downTurningPoints.length - 1]?.index)) {
        //     config.bet = true
        //     console.log('detect trend up')

        // } 

        if (config.rules.detectTrend(config.downTurningPoints[config.downTurningPoints.length - 2]?.value, config.downTurningPoints[config.downTurningPoints.length - 1]?.value)) {
            config.bet = true
            console.log('detect trend up')

        } else if (!(config.rules.detectTrend(config.downTurningPoints[config.downTurningPoints.length - 2]?.value, config.downTurningPoints[config.downTurningPoints.length - 1]?.value))) {
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
        // console.log(ma);

        clients.forEach(function (client) {
            client.send(JSON.stringify({ header: 'ALL', data: { all: rows, ids: ids, crashPoints: crashPoints, predictions: predictions, values: values, last: last, appStats: config.run, ma: ma, windowSize: config.MAWindowSize, timeData: config.timeData } }));
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
                client.send(JSON.stringify({ header: 'BETS', data: { all: rows, mixed: config.mixed, profit: config.MainProfit, ids: ids, betted: config.simulate.values, highProfit: config.testValues, bets: config.bets } }));
            });

            clients.forEach(function (client) {
                client.send(JSON.stringify({ header: 'CANDLE', data: { values: config.timeData, profit: config.timeProfit, mainprofit: config.MainProfit } }));
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
        try {
            var timestampLog = "[" + Date.now() + "] ";
            let decodedData = JSON.parse(data?.toString())
            if (decodedData.header != 'WEBSTATS') {
                console.log(timestampLog, 'Incoming data : ', decodedData)

            }

            // if (((parseInt(config.lastRecords.crashData?.timestamp) - parseInt(config.lastTime)) > (1000 * 60 * 5))) {
            //     clients.forEach(function (client) {
            //         client.send(JSON.stringify({ header: 'WAKEUP', data: { status: 'wakeup' } }));
            //     });
            // }

            if (decodedData?.header == 'START') {
                config.run = true
                console.log(timestampLog, ' START signal received!')
                clients.forEach(function (client) {
                    client.send(JSON.stringify({ header: 'BOT', data: { status: 'LIVE' } }));
                });

                clients.forEach(function (client) {
                    client.send(JSON.stringify({ header: 'START', data: { status: 'LIVE' } }));
                });

            } else if (decodedData?.header == 'STOP') {
                config.run = false
                console.log(timestampLog, ' STOP signal received!')
                clients.forEach(function (client) {
                    client.send(JSON.stringify({ header: 'BOT', data: { status: 'DISCONNECTED' } }));
                });

                clients.forEach(function (client) {
                    client.send(JSON.stringify({ header: 'STOP', data: { status: 'DISCONNECTED' } }));
                });

            } else if (decodedData?.header == 'BET') {
                console.log(timestampLog, ' BET signal received!')
                if (config.timeBet && !config.hold) {

                    clients.forEach(function (client) {
                        client.send(JSON.stringify({ header: 'BET', data: { odd: config.crash, stake: config.stake } }));
                    });
                }


                // console.log(timestampLog, `decision : bet = ${config.bet} , hold = ${config.hold}`)
                // if (config.bet && !config.hold && config.run) {
                //     if (config.simulate.enabled) {
                //         config.simulate.bet = true
                //     }
                //     clients.forEach(function (client) {
                //         client.send(JSON.stringify({ header: 'BET', data: { odd: config.predictedCrashPoint, stake: config.stake } }));
                //     });
                // }

                // if((config.values[config.values.length - 1] - config.values[config.values.length - 2] ) > 0 ){
                //     config.testBet = true
                // }


            } else if (decodedData?.header == 'test') {

            } else if (decodedData?.header == 'DATA') {
                console.log(timestampLog, ' DATA signal received!');
                if (config.predictedCrashPoint != undefined && config.backupCrashPoint != undefined) {
                    (async () => {
                        let type = (parseFloat(decodedData?.data?.odd) > parseFloat(config.crash) ? 'Profit' : 'Loss')
                        let ProfitLoss = (type == 'Profit' ? ((parseFloat(config.crash) - 1) * config.stake) : config.stake * (-1))
                        let value = ProfitLoss + config.lastRecords.crashData?.value
                        let { values, status } = valueManager(config.values, value)
                        let ma = null;
                        if (!(config.dataArray[config.dataArray?.length - 1] == value)) {
                            await config.dataArray.push(value)

                        }

                        config.hourData.push(config.hourData[config.hourData.length - 1] + ProfitLoss)

                        if (status == 'Ready') {
                            ma = await MA(values, config.MAWindowSize)

                        }
                        // console.log(decodedData?.data?.odd, config.odds[config.odds?.length - 2])

                        if (config.simulate.bet) {
                            await config.simulate.values.push((config.simulate.values[config.simulate.values.length - 1] + ProfitLoss))
                        }
                        //     config.simulate.bet = false
                        //     if(!config.hold){
                        //         await config.bets.push(config.bets[config.bets.length - 1] + ProfitLoss)
                        //     }
                        //     // if (config.highProfit.bet) {
                        //     //     console.log('High profit Active')
                        //     //     await config.highProfit.values.push((config.highProfit.values[config.highProfit.values.length - 1] + ProfitLoss))
                        //     // }

                        // }

                        // if(config.testBet0){
                        //     await config.mixed.push((config.mixed[config.mixed.length - 1] + ProfitLoss))
                        //     config.testBet0 = false
                        // }

                        // if(config.testBet){
                        //     await config.testValues.push(config.testValues[config.testValues.length-1]+ ProfitLoss)
                        //     config.testBet = false
                        // }

                        //     console.log('time bet 5x')
                        if (config.timeBet && !config.hold) {
                            config.hourProfit.push(config.hourProfit[config.hourProfit.length - 1] + ProfitLoss)
                            config.timeBet = false
                        }

                        // if(config.hold){
                        //     clients.forEach(function (client) {
                        //         client.send(JSON.stringify({ header: 'HOLD', data: { status: 'Bet stopped' } }));
                        //     });

                        // }



                        // console.log('Current Profits: ', config.simulate.values[config.simulate.values?.length - 1],config.testValues[config.testValues.length - 1], config.mixed[config.mixed.length-1])
                        // console.log('High profit : ', config.highProfit.values)
                        // console.log('New profit : ', config.testValues)




                        let query = `INSERT INTO crash_data( timestamp, crash_point, predict_crash_point, type, profit_loss, value, ma) VALUES(?,?,?,?,?,?,?)`
                        let params = [decodedData?.data?.end, decodedData?.data?.odd, config.crash, type, ProfitLoss, value, ma ? ma[ma.length - 1] : null]

                        db.run(query, params, async (err) => {
                            if (err) throw console.log(err?.message)
                            let query = 'SELECT * FROM crash_data ORDER BY ID DESC LIMIT 1'
                            db.all(query, async (err, rows) => {
                                if (err) throw console.log(err?.message)
                                await timeDataCollector(rows[0]?.profit_loss)
                                config.lastRecords.crashData = rows[0]
                                await maManager(config.ma, rows[0]?.ma)
                                console.log(rows[0]?.profit_loss, 'profit loss value', config.simulate.bet, (config.lastOdd >= 5), !(config.odds[config.odds?.length - 2] >= 5))
                                await profitManager(config.profit, rows[0]?.profit_loss)
                                await oddshifter(parseInt(rows[0]?.profit_loss))
                                // await highProfit(parseInt(config.simulate.values[config.simulate.values?.length - 1]))
                                clients.forEach(function (client) {
                                    client.send(JSON.stringify({ header: 'STREAM', data: rows[0] }));
                                });
                                // await decisionMaker(config.ma, config.profit)
                                // if (config.simulate.bet) {
                                //     await config.simulate.values.push(ProfitLoss + parseInt(config.simulate.values[config.simulate.values.length - 1]))
                                //    config.simulate.ma = await MA(config.simulate.values, 25)
                                //     console.log(config.simulate.values)
                                //     config.simulate.bet = false
                                //     clients.forEach(function (client) {
                                //         client.send(JSON.stringify({ header: 'SIMULATE', data: { values: config.simulate.values, ma: config.simulate.ma } }));
                                //     });
                                // }

                                // if(config.testBet){
                                //     await config.testValues.push(ProfitLoss + parseInt(config.testValues[config.testValues.length - 1]))
                                //     config.testBet = false
                                //     console.log(config.testValues, '<== test bets data')
                                // }
                                // clients.forEach(function (client) {
                                //     client.send(JSON.stringify({ header: 'DECISION', data: { bet: config.bet, hold: config.hold } }));
                                // });
                            })
                        })


                    })()
                }
            } else if (decodedData?.header == 'CRASH') {
                console.log(timestampLog, ' CRASH signal received!')
                config.lastOdd = parseFloat(decodedData?.data?.odd)
                const { odds, status } = await oddsManager(
                    config.odds,
                    parseFloat(decodedData?.data?.odd)
                );
                clients.forEach(function (client) {
                    client.send(JSON.stringify(decodedData));
                });
                // (async () => {
                //     const { odds, status } = await oddsManager(
                //         config.odds,
                //         parseFloat(decodedData?.data?.odd)
                //     );
                //     console.log(timestampLog, "odds data", odds, status);
                //     const predictPoint = predictionSetter(config.odds).then((point) => {
                //         console.log(
                //             timestampLog,
                //             "predict point : ",
                //             point
                //         );
                //         config.backupCrashPoint = config.predictedCrashPoint
                //         config.predictedCrashPoint = point
                //     });

                //     await predictPoint
                // })()

            } else if (decodedData?.header == 'RESULT') {
                console.log(timestampLog, ' RESULT signal received!')
                if (decodedData.data?.odd && decodedData.data?.crash) {
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
                }
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

        } catch (err) {
            console.log(err)
        }


    })
})

