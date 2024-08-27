let socket: WebSocket;

export function connectWebSocket() {
  socket = new WebSocket('ws://5.104.81.194:5000');

  socket.onopen = () => {
    console.log('WebSocket connection opened');
  };

  socket.onmessage = (event) => {
    chrome.runtime.sendMessage(event.data)
    chrome.action.setIcon({ path: 'icons/socket-active.png' });


  };

  socket.onclose = (event) => {
    console.log('WebSocket connection closed:', event);
    chrome.action.setIcon({ path: 'icons/socket-inactive.png' });
    setTimeout(connectWebSocket, 1000);
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
}

connectWebSocket();

chrome.scripting
  .getRegisteredContentScripts()
  .then(scripts => console.log("registered content scripts", scripts));

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  socket.send(JSON.stringify(request))
})

chrome.tabs.query({ url: 'https://1xbet.com/en/allgamesentrance/crash/*' }, (tabs: any[]) => {
  if (tabs.length > 0) {
    chrome.debugger.detach({ tabId: tabs[0].id }, () => {
      if (chrome.runtime.lastError) {
        console.log("No existing debugger to detach or other error: ", chrome.runtime.lastError.message);
      }
    })

    let requestId: any
    chrome.debugger.attach({ tabId: tabs[0].id }, "1.3", () => {
      chrome.debugger.sendCommand({ tabId: tabs[0].id }, "Network.enable");
      var start: any
      var end: any
      var crash: any
      var bet = false
      chrome.debugger.onEvent.addListener((source, method, params: any) => {


        var timestampLog = '[' + Date.now() + '] ';
        if (method === "Network.webSocketFrameReceived") {
          
          if (requestId != params.requestId) {
           
            let payloadString = params.response.payloadData.toString('utf8');


            try {
              payloadString = payloadString.replace(/[^\x20-\x7E]/g, '');
              const payload = JSON.parse(payloadString);
              // console.log(payload)

              if (payloadString.includes('"target":"OnBets"')) {
                if(!bet){
                  socket.send(JSON.stringify({header:'BET'}))
                  console.log(timestampLog, ' OnBets Event triggered.')
                  bet = true
                }
              }

              if (payloadString.includes('"target":"OnStage"')) {
                console.log({ start: start, end: end, odd: crash } )
                socket.send(JSON.stringify({ header: 'DATA', data: { start: start, end: end, odd: crash } }))

              }

              if (payloadString.includes('"target":"OnStart"')) {
                const { ts } = payload.arguments[0];
                start = ts
              }
              if (payloadString.includes('"type":1,"target":"OnCrash"')) {
                bet = false
                const { f, ts } = payload.arguments[0];
                crash = f
                end = ts
                console.log(`${timestampLog} ${f}, ${start}, ${ts}`);
                socket.send(JSON.stringify({ header: 'CRASH', data: { odd: f } }))
              }

            } catch (error) {
              console.error(timestampLog, 'Error processing WebSocket frame:', error);
            }
          }

        } else if (method === "Network.webSocketFrameSent") {
          // console.log("WebSocket frame sent: ", params);
        }
      });
    });
  }
});



