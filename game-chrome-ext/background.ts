let socket: WebSocket;

export function connectWebSocket() {
  socket = new WebSocket('ws://localhost:5000');

  socket.onopen = () => {
    console.log('WebSocket connection opened');
  };

  socket.onmessage = (event) => {
    chrome.runtime.sendMessage(event.data)
    chrome.action.setIcon({ path: 'icons/socket-active.png' });
    chrome.tabs.query({ url: 'https://1xbet.com/en/allgamesentrance/crash/*' }, (tabs: any[]) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { message: event.data });
      }
    });
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
      


    
