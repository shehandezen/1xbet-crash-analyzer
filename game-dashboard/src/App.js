import { useEffect, useRef, useState } from 'react';
import Chart from 'react-apexcharts';
import './App.css';

function App() {
  const [bot, setBot] = useState(false)
  const [app, setApp] = useState(false)
  const [up, setUp] = useState(false)
  const [hold, setHold] = useState(false)
  const [toggle, setToggle] = useState(true)
  const [chartNo, setChartNo] = useState(0)
  const [windowSize, setWindowSize] = useState(5)
  const [disabled, setDisabled] = useState(false)
  const [balance, setBalance] = useState(0)
  const [last, setLast] = useState([])
  const [point, setPoint] = useState(0)
  const [viewConfig, setViewConfig] = useState(false)
  const [config, setConfig] = useState({
    profitTarget: 1,
    lossLimit: -1,
    stake: 0,
    crash: 1,
    stoploss: -1,
  })
  const [series, setSeries] = useState([
    {
      name: 'Profit',
      type: 'area',
      data: []
    },
    {
      name: 'Profit MA',
      type: 'line',
      data: []
    }
  ]);

  const [betSeries, setBetSeries] = useState([
    {
      name: 'Profit - Betted',
      type: 'area',
      data: []
    },
    {
      name: 'Profit - Betted - MA',
      type: 'line',
      data: []
    }
  ]);

  const [candleSeries, setCandleSeries] = useState([
    {
      name: 'Hourly behaviour',
      type: 'candlestick',
      data: [{ x: 0, y: [0, 0, 0, 0] }],
    },
    {
      name: 'Actual Profit',
      type: 'line',
      data: [],
    },
  ]);

  const candleOptions = {
    chart: {
      type: 'candlestick',
      height: 350,
    },

    xaxis: {
      categories: [],
      labels: {
        show: true // Hide horizontal data labels
      },
      tooltip: {
        enabled: false
      },
      labels: {
        show: false
      }
    },
    yaxis: {
      title: {
        text: 'Profit'
      }
    },


    dataLabels: {
      enabled: false
    },
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    stroke: {
      width: 3,

    },
    fill: {
      type: ['gradient', 'solid', 'solid'],
      opacity: [0.8, 0.9, 0.8, 0.9, 0.5],
    },
    tooltip: {
      enabled: true, // Keep general tooltip enabled
      shared: true, // Disable shared tooltips if needed
      x: {
        show: false // Disable the x value from showing
      },
    },
    chart: {
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    }
    ,
  };

  const [options, setOptions] = useState({
    chart: {
      type: 'area',

    },
    xaxis: {
      categories: [],
      labels: {
        show: false // Hide horizontal data labels
      },
      tooltip: {
        enabled: false
      },
      labels: {
        show: false
      }
    },
    yaxis: {
      title: {
        text: 'Profit'
      }
    },


    dataLabels: {
      enabled: false
    },
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    stroke: {
      width: 3,

    },
    fill: {
      type: ['gradient', 'solid', 'solid'],
      opacity: [0.8, 0.9, 0.8, 0.9, 0.5],
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
      },

      x: {
        show: false // Disable the x value from showing
      },
    },
    chart: {
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      }
    }
    ,
    annotations: {
      yaxis: [
        {
          y: 0,
          borderColor: '#00E396',
          label: {
            borderColor: '#00E396',
            style: {
              color: '#fff',
              background: '#00E396'
            },
            text: 'Movement',

          }
        }
      ]
    }
  });

  const [betOptions, setBetOptions] = useState({
    chart: {
      type: 'area',

    },
    xaxis: {
      categories: [],
      labels: {
        show: false // Hide horizontal data labels
      },
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      title: {
        text: 'Profit - Betted'
      }
    },

    dataLabels: {
      enabled: false
    },
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    stroke: {
      width: 3,

    },
    fill: {
      type: ['gradient', 'solid', 'solid'],
      opacity: [0.8, 0.9, 0.8, 0.9, 0.5],
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontFamily: 'Arial, sans-serif',
      }
    }
  });


  const [isPaused, setPause] = useState(false);

  const ws = useRef(null);
  useEffect(() => {
    ws.current = new WebSocket("ws://5.104.81.194:5000");
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed");

    const wsCurrent = ws.current;
    return () => {
      wsCurrent.close();
    };
  }, [])




  useEffect(() => {

    if (!ws.current) return;
    if (ws.current) {
      ws.current.onmessage = async (e) => {
        const dataArray = await JSON.parse(e.data)
        console.log(dataArray)
        if (dataArray.header == 'ALL') {
          setOptions((pre) => ({
            ...pre, xaxis: {
              categories: dataArray?.data?.ids
            },
            // annotations:{
            //   yaxis: [
            //     {
            //       y: parseInt(dataArray?.data?.values[dataArray?.data?.values.lenght - 1]),
            //       borderColor: '#00E396',
            //       label: {
            //         borderColor: '#00E396',
            //         style: {
            //           color: '#fff',
            //           background: '#00E396'
            //         },
            //         text: 'Movement',
            //       }        
            //     }
            //   ]

            // }
          }))
          setSeries((pre) => ([{ ...pre[0], data: dataArray?.data?.values }, { ...pre[1], data: dataArray?.data?.ma }]))
          setLast(dataArray?.data?.last.reverse())
          setBot(dataArray?.data?.appStats)
          setDisabled(dataArray?.data?.appStats)
          setWindowSize(dataArray?.data?.windowSize)
        }
        if (dataArray?.header == 'STREAM') {
          let optionscopy = [...options.xaxis.categories]
          optionscopy.push(dataArray?.data?.id)
          optionscopy.shift()
          setOptions((pre) => ({
            ...pre, xaxis: {
              categories: optionscopy
            }
          }))
          setPoint(dataArray?.data?.value)


          let seriescopy = [...series[0].data]
          let seriescopyMA = [...series[1].data]
          seriescopyMA.push(parseInt(dataArray?.data?.ma))

          seriescopy.push(parseInt(dataArray?.data?.value))

          setSeries((pre) => ([{ ...pre[0], data: seriescopy }, { ...pre[1], data: seriescopyMA }]))
          let lastcopy = [...last]

          if (lastcopy.lenght > 20) {
            lastcopy.shift()
            lastcopy.reverse()
            lastcopy.push(dataArray?.data)
          } else {
            lastcopy.reverse()
            lastcopy.push(dataArray?.data)

          }

          setLast(lastcopy.reverse())
          console.log(optionscopy, seriescopy, lastcopy)

        }

        if (dataArray?.header == 'DECISION') {
          setUp(dataArray?.data?.bet)
          setHold(dataArray?.data?.hold)
        }

        if (dataArray?.header == 'BETS') {
          setBetSeries((pre) => ([{ ...pre[0], data: dataArray?.data?.profit }, { ...pre[1] }]))
          setBetOptions((pre) => ({
            ...pre, xaxis: {
              categories: dataArray?.data?.ids
            }
          }))
        }

        if (dataArray?.header == 'SIMULATE') {
          setBetSeries((pre) => ([{ ...pre[0], data: dataArray?.data?.values }, { ...pre[1], data: dataArray?.data?.ma }]))


        }

        if (dataArray?.header == 'CANDLE') {
          setCandleSeries((pre) => ([{ ...pre[0], data: dataArray?.data?.values }, { ...pre[1], data: dataArray?.data?.profit }]))


        }

        if (dataArray?.header == 'WEBSTATS') {
          if (dataArray?.data?.status == 'LIVE') {
            setApp(true)
            setBalance(dataArray?.data?.balance)
          } else if (dataArray?.data?.status == 'DISCONNECTED') {
            setApp(false)
          }
        }

        if (dataArray?.header == 'BOT') {
          if (dataArray?.data?.status == 'LIVE') {
            setBot(true)
          } else if (dataArray?.data?.status == 'DISCONNECTED') {
            setBot(false)
          }
        }
      }
    }



  }, [isPaused])

  useEffect(() => {
    fetchConfig()
  }, [viewConfig])


  setTimeout(() => {
    setPause(!isPaused)
  }, 1000)


  const start = () => {
    if (ws.current) {
      ws.current.send(JSON.stringify({ header: 'START' }))
      setDisabled(true)
    }
  }


  const stop = () => {
    if (ws.current) {
      ws.current.send(JSON.stringify({ header: 'STOP' }))
      setDisabled(false)

    }
  }

  const fetchData = (e) => {
    if (ws.current) {
      ws.current.send(JSON.stringify({ header: 'DATAREQ', data: { type: 'LINE_PROFIT', limit: e.target.value } }))
    }
  }

  const fetchConfig = async () => {
    await fetch("http://5.104.81.194:5555/config").then(async (res) => {
      let data = await res.json()
      setConfig(data.config)
      console.log("data :", data.config)
    }).catch(err => {
      console.log(err)
    })
  }

  const setConfigValues = (value, type) => {
    console.log("set config: ", value, type)
    if (type == "stake") {
      setConfig((state) => {
        return { ...state, stake: parseInt(value) }
      })
    } else if (type == "crash") {
      setConfig((state) => {
        return { ...state, crash: parseInt(value) }
      })
    } else if (type == "profitTarget") {
      setConfig((state) => {
        return { ...state, profitTarget: parseInt(value) }
      })
    } else if (type == "lossLimit") {
      setConfig((state) => {
        return { ...state, lossLimit: parseInt(value) }
      })
    } else if (type == "stopLoss") {
      setConfig((state) => {
        return { ...state, stoploss: parseInt(value) }
      })
    }
  }

  const saveConfig = async () => {
    console.log("save :", config)
    await fetch("http://5.104.81.194:5555/config", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config)
    }).then(async(res)=>{
      let data = await res.json()
      if(data.success){
        setViewConfig(false)
        console.log('Congigurations saved!')
      }else{
        console.log('Something went wrong!')
      }
    })
  }



  return (
    <div className="App">
      <div className="topBar">
        <div className="logo">
          <img src={require('./assets/logo.png')} />
        </div>
        <div className="brandName"> Crash BOT <span className='version'>v1.0.0</span></div>
        <div className="topTags">
          <div className="credit">{balance} LKR</div>
          <div className="status" style={!bot ? { background: '#dc3545' } : null} >Bot : {bot ? 'Live' : 'Offline'}</div>
          <div className="status" style={!app ? { background: '#dc3545' } : null}>App : {app ? 'Live' : 'Offline'}</div>
        </div>

      </div>
      <div className="chart">
        <div>
          {chartNo == 0 ? (<Chart options={options} series={series} type="area" height={680} width={'100%'} />) : null}
          {chartNo == 1 ? (<Chart options={options} series={betSeries} type="area" height={680} width={'100%'} />) : null}
          {chartNo == 2 ? (<Chart options={candleOptions} series={candleSeries} type="candlestick" height={680} width={'100%'} />) : null}

          <div className="config">
            <div>
              <button className='start' onClick={() => start()} disabled={disabled}>Start <span></span></button>
              <button className='stop' onClick={() => stop()} disabled={!disabled}>Stop <span></span></button>
              <select onChange={(e) => fetchData(e)}>
                <option value="*">All</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="500">500</option>

              </select>
              <button onClick={() => {
                if (chartNo + 1 > 2) {
                  setChartNo(0)
                } else {
                  setChartNo(chartNo + 1)
                }
              }
              }>📊</button>
              <button onClick={() => { setViewConfig(true) }} style={{ fontSize: "25px" }}>⚙</button>
            </div>

            <div className="trend">
              {up ? (<div className="arrow-up">🡭</div>) : <div className="arrow-down">🡮</div>}

              <div className="circle">
                {hold ? (<>⛔</>) : (<>⚪</>)}
              </div>
            </div>


          </div>
        </div>
      </div>
      {viewConfig ? (<div className='config-wrapper'>
        <div className='config-window'>
          <h3>Configurations</h3>
          <div className='form'>
            <div className='input-container'>
              <div className='label'>
                Base stake
              </div>
              <input type='number' placeholder='Base Stake' value={config.stake} onChange={(e) => setConfigValues(e.target.value, "stake")} />
            </div>
            <div className='input-container'>
              <div className='label'>
                Profit multiplyer
              </div>
              <input type='number' placeholder='Profit multiplyer' value={config.profitTarget} onChange={(e) => setConfigValues(e.target.value, "profitTarget")} />
            </div>
            <div className='input-container'>
              <div className='label'>
                Stop loss (high profits)
              </div>
              <input type='number' placeholder='Stop loss (high profits)' value={config.stoploss} onChange={(e) => setConfigValues(e.target.value, "stopLoss")} />
            </div>
            <div className='input-container'>
              <div className='label'>
                Crash odd
              </div>
              <input type='number' placeholder='Crash odd' value={config.crash} onChange={(e) => setConfigValues(e.target.value, "crash")} />
            </div>
            <div className='input-container'>
              <div className='label'>
                Loss limit
              </div>
              <input type='number' placeholder='Loss limit' value={config.lossLimit} onChange={(e) => setConfigValues(e.target.value, "lossLimit")} />
            </div>
          </div>
          <div className='input-container'>
            <button className='start' onClick={() => saveConfig()}> save </button>
            <button className='stop' onClick={() => { setViewConfig(false) }}> close </button>

          </div>
        </div>
      </div>) : null}
      <div className="profitTable">
        <table>
          <tr>
            <th>Type</th>
            <th>Stats</th>
            <th>Value</th>
          </tr>
          {/* <tr>
            <td className='profit'>Profit</td>
            <td className='profit' >200</td>
            <td className='profit' >500</td>
          </tr> */}
          {
            last?.map((element) => {
              return (<tr>
                <td className={element?.type == 'Profit' ? 'profit' : 'loss'}>{element?.type}</td>
                <td className={element?.profit_loss > 0 ? 'profit' : 'loss'} >{parseInt(element?.profit_loss)}</td>
                <td className={parseInt(element?.value) > 0 ? 'profit' : 'loss'} >{parseInt(element?.value)}</td>
              </tr>)
            })
          }


        </table>
      </div>
    </div>
  );
}

export default App;
