/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./background.ts ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   connectWebSocket: () => (/* binding */ connectWebSocket)
/* harmony export */ });
var socket;
var tabs = [];
function connectWebSocket() {
    socket = new WebSocket('ws://5.104.81.194:5000');
    socket.onopen = function () {
        console.log('WebSocket connection opened');
    };
    socket.onmessage = function (event) {
        chrome.runtime.sendMessage(event.data);
        chrome.action.setIcon({ path: 'icons/socket-active.png' });
        // console.log(event.data)
        var payload = JSON.parse(event.data);
        if (payload.header == 'WAKEUP' || payload.header == 'START') {
            chrome.tabs.create({ url: 'https://1xbet.com/en/allgamesentrance/crash/' }, function (tab) {
                console.log("Opened a new tab with ID: ".concat(tab.id));
                tabs.push(tab.id);
            });
        }
        if (payload.header == 'HOLD' || payload.header == 'STOP') {
            console.log(tabs);
            chrome.tabs.remove(tabs[0], function () {
                console.log("Closed tab with ID: ".concat(tabs.id));
                tabs.splice(0, tabs.length);
            });
        }
    };
    socket.onclose = function (event) {
        console.log('WebSocket connection closed:', event);
        chrome.action.setIcon({ path: 'icons/socket-inactive.png' });
        setTimeout(connectWebSocket, 1000);
    };
    socket.onerror = function (error) {
        console.error('WebSocket error:', error);
    };
}
connectWebSocket();
chrome.scripting
    .getRegisteredContentScripts()
    .then(function (scripts) { return console.log("registered content scripts", scripts); });
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    socket.send(JSON.stringify(request));
});
chrome.tabs.query({ url: 'https://1xbet.com/en/allgamesentrance/crash/*' }, function (tabs) {
    if (tabs.length > 0) {
        chrome.debugger.detach({ tabId: tabs[0].id }, function () {
            if (chrome.runtime.lastError) {
                console.log("No existing debugger to detach or other error: ", chrome.runtime.lastError.message);
            }
        });
        var requestId_1;
        chrome.debugger.attach({ tabId: tabs[0].id }, "1.3", function () {
            chrome.debugger.sendCommand({ tabId: tabs[0].id }, "Network.enable");
            var start;
            var end;
            var crash;
            var bet = false;
            chrome.debugger.onEvent.addListener(function (source, method, params) {
                var timestampLog = '[' + Date.now() + '] ';
                if (method === "Network.webSocketFrameReceived") {
                    if (requestId_1 != params.requestId) {
                        var payloadString = params.response.payloadData.toString('utf8');
                        try {
                            payloadString = payloadString.replace(/[^\x20-\x7E]/g, '');
                            var payload = JSON.parse(payloadString);
                            // console.log(payload)
                            if (payloadString.includes('"target":"OnBets"')) {
                                if (!bet) {
                                    socket.send(JSON.stringify({ header: 'BET' }));
                                    console.log(timestampLog, ' OnBets Event triggered.');
                                    bet = true;
                                }
                            }
                            if (payloadString.includes('"target":"OnStage"')) {
                                console.log({ start: start, end: end, odd: crash });
                                socket.send(JSON.stringify({ header: 'DATA', data: { start: start, end: end, odd: crash } }));
                            }
                            if (payloadString.includes('"target":"OnStart"')) {
                                var ts = payload.arguments[0].ts;
                                start = ts;
                            }
                            if (payloadString.includes('"type":1,"target":"OnCrash"')) {
                                bet = false;
                                var _a = payload.arguments[0], f = _a.f, ts = _a.ts;
                                crash = f;
                                end = ts;
                                console.log("".concat(timestampLog, " ").concat(f, ", ").concat(start, ", ").concat(ts));
                                socket.send(JSON.stringify({ header: 'CRASH', data: { odd: f } }));
                            }
                        }
                        catch (error) {
                            console.error(timestampLog, 'Error processing WebSocket frame:', error);
                        }
                    }
                }
                else if (method === "Network.webSocketFrameSent") {
                    // console.log("WebSocket frame sent: ", params);
                }
            });
        });
    }
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxpQ0FBaUM7QUFDakU7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHFEQUFxRDtBQUN0RjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxtQ0FBbUM7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDREQUE0RDtBQUMzRjtBQUNBO0FBQ0EsQ0FBQztBQUNELG9CQUFvQixzREFBc0Q7QUFDMUU7QUFDQSxpQ0FBaUMsbUJBQW1CO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLGlDQUFpQyxtQkFBbUI7QUFDcEQsMENBQTBDLG1CQUFtQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUUsZUFBZTtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLG9DQUFvQztBQUNsRiw2REFBNkQsd0JBQXdCLHNDQUFzQztBQUMzSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELHlCQUF5QixVQUFVO0FBQ2hHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nYW1lLWNocm9tZS1leHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2FtZS1jaHJvbWUtZXh0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9nYW1lLWNocm9tZS1leHQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9nYW1lLWNocm9tZS1leHQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9nYW1lLWNocm9tZS1leHQvLi9iYWNrZ3JvdW5kLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNvY2tldDtcclxudmFyIHRhYnMgPSBbXTtcclxuZXhwb3J0IGZ1bmN0aW9uIGNvbm5lY3RXZWJTb2NrZXQoKSB7XHJcbiAgICBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KCd3czovLzUuMTA0LjgxLjE5NDo1MDAwJyk7XHJcbiAgICBzb2NrZXQub25vcGVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdXZWJTb2NrZXQgY29ubmVjdGlvbiBvcGVuZWQnKTtcclxuICAgIH07XHJcbiAgICBzb2NrZXQub25tZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoZXZlbnQuZGF0YSk7XHJcbiAgICAgICAgY2hyb21lLmFjdGlvbi5zZXRJY29uKHsgcGF0aDogJ2ljb25zL3NvY2tldC1hY3RpdmUucG5nJyB9KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhldmVudC5kYXRhKVxyXG4gICAgICAgIHZhciBwYXlsb2FkID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcclxuICAgICAgICBpZiAocGF5bG9hZC5oZWFkZXIgPT0gJ1dBS0VVUCcgfHwgcGF5bG9hZC5oZWFkZXIgPT0gJ1NUQVJUJykge1xyXG4gICAgICAgICAgICBjaHJvbWUudGFicy5jcmVhdGUoeyB1cmw6ICdodHRwczovLzF4YmV0LmNvbS9lbi9hbGxnYW1lc2VudHJhbmNlL2NyYXNoLycgfSwgZnVuY3Rpb24gKHRhYikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcGVuZWQgYSBuZXcgdGFiIHdpdGggSUQ6IFwiLmNvbmNhdCh0YWIuaWQpKTtcclxuICAgICAgICAgICAgICAgIHRhYnMucHVzaCh0YWIuaWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBheWxvYWQuaGVhZGVyID09ICdIT0xEJyB8fCBwYXlsb2FkLmhlYWRlciA9PSAnU1RPUCcpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGFicyk7XHJcbiAgICAgICAgICAgIGNocm9tZS50YWJzLnJlbW92ZSh0YWJzWzBdLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNsb3NlZCB0YWIgd2l0aCBJRDogXCIuY29uY2F0KHRhYnMuaWQpKTtcclxuICAgICAgICAgICAgICAgIHRhYnMuc3BsaWNlKDAsIHRhYnMubGVuZ3RoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHNvY2tldC5vbmNsb3NlID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1dlYlNvY2tldCBjb25uZWN0aW9uIGNsb3NlZDonLCBldmVudCk7XHJcbiAgICAgICAgY2hyb21lLmFjdGlvbi5zZXRJY29uKHsgcGF0aDogJ2ljb25zL3NvY2tldC1pbmFjdGl2ZS5wbmcnIH0pO1xyXG4gICAgICAgIHNldFRpbWVvdXQoY29ubmVjdFdlYlNvY2tldCwgMTAwMCk7XHJcbiAgICB9O1xyXG4gICAgc29ja2V0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdXZWJTb2NrZXQgZXJyb3I6JywgZXJyb3IpO1xyXG4gICAgfTtcclxufVxyXG5jb25uZWN0V2ViU29ja2V0KCk7XHJcbmNocm9tZS5zY3JpcHRpbmdcclxuICAgIC5nZXRSZWdpc3RlcmVkQ29udGVudFNjcmlwdHMoKVxyXG4gICAgLnRoZW4oZnVuY3Rpb24gKHNjcmlwdHMpIHsgcmV0dXJuIGNvbnNvbGUubG9nKFwicmVnaXN0ZXJlZCBjb250ZW50IHNjcmlwdHNcIiwgc2NyaXB0cyk7IH0pO1xyXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XHJcbiAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShyZXF1ZXN0KSk7XHJcbn0pO1xyXG5jaHJvbWUudGFicy5xdWVyeSh7IHVybDogJ2h0dHBzOi8vMXhiZXQuY29tL2VuL2FsbGdhbWVzZW50cmFuY2UvY3Jhc2gvKicgfSwgZnVuY3Rpb24gKHRhYnMpIHtcclxuICAgIGlmICh0YWJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBjaHJvbWUuZGVidWdnZXIuZGV0YWNoKHsgdGFiSWQ6IHRhYnNbMF0uaWQgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIGV4aXN0aW5nIGRlYnVnZ2VyIHRvIGRldGFjaCBvciBvdGhlciBlcnJvcjogXCIsIGNocm9tZS5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciByZXF1ZXN0SWRfMTtcclxuICAgICAgICBjaHJvbWUuZGVidWdnZXIuYXR0YWNoKHsgdGFiSWQ6IHRhYnNbMF0uaWQgfSwgXCIxLjNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjaHJvbWUuZGVidWdnZXIuc2VuZENvbW1hbmQoeyB0YWJJZDogdGFic1swXS5pZCB9LCBcIk5ldHdvcmsuZW5hYmxlXCIpO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnQ7XHJcbiAgICAgICAgICAgIHZhciBlbmQ7XHJcbiAgICAgICAgICAgIHZhciBjcmFzaDtcclxuICAgICAgICAgICAgdmFyIGJldCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjaHJvbWUuZGVidWdnZXIub25FdmVudC5hZGRMaXN0ZW5lcihmdW5jdGlvbiAoc291cmNlLCBtZXRob2QsIHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpbWVzdGFtcExvZyA9ICdbJyArIERhdGUubm93KCkgKyAnXSAnO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJOZXR3b3JrLndlYlNvY2tldEZyYW1lUmVjZWl2ZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0SWRfMSAhPSBwYXJhbXMucmVxdWVzdElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXlsb2FkU3RyaW5nID0gcGFyYW1zLnJlc3BvbnNlLnBheWxvYWREYXRhLnRvU3RyaW5nKCd1dGY4Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkU3RyaW5nID0gcGF5bG9hZFN0cmluZy5yZXBsYWNlKC9bXlxceDIwLVxceDdFXS9nLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGF5bG9hZCA9IEpTT04ucGFyc2UocGF5bG9hZFN0cmluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwYXlsb2FkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWRTdHJpbmcuaW5jbHVkZXMoJ1widGFyZ2V0XCI6XCJPbkJldHNcIicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFiZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkoeyBoZWFkZXI6ICdCRVQnIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGltZXN0YW1wTG9nLCAnIE9uQmV0cyBFdmVudCB0cmlnZ2VyZWQuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWRTdHJpbmcuaW5jbHVkZXMoJ1widGFyZ2V0XCI6XCJPblN0YWdlXCInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHsgc3RhcnQ6IHN0YXJ0LCBlbmQ6IGVuZCwgb2RkOiBjcmFzaCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeSh7IGhlYWRlcjogJ0RBVEEnLCBkYXRhOiB7IHN0YXJ0OiBzdGFydCwgZW5kOiBlbmQsIG9kZDogY3Jhc2ggfSB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZFN0cmluZy5pbmNsdWRlcygnXCJ0YXJnZXRcIjpcIk9uU3RhcnRcIicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRzID0gcGF5bG9hZC5hcmd1bWVudHNbMF0udHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSB0cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkU3RyaW5nLmluY2x1ZGVzKCdcInR5cGVcIjoxLFwidGFyZ2V0XCI6XCJPbkNyYXNoXCInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJldCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSA9IHBheWxvYWQuYXJndW1lbnRzWzBdLCBmID0gX2EuZiwgdHMgPSBfYS50cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmFzaCA9IGY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kID0gdHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJcIi5jb25jYXQodGltZXN0YW1wTG9nLCBcIiBcIikuY29uY2F0KGYsIFwiLCBcIikuY29uY2F0KHN0YXJ0LCBcIiwgXCIpLmNvbmNhdCh0cykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHsgaGVhZGVyOiAnQ1JBU0gnLCBkYXRhOiB7IG9kZDogZiB9IH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IodGltZXN0YW1wTG9nLCAnRXJyb3IgcHJvY2Vzc2luZyBXZWJTb2NrZXQgZnJhbWU6JywgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobWV0aG9kID09PSBcIk5ldHdvcmsud2ViU29ja2V0RnJhbWVTZW50XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIldlYlNvY2tldCBmcmFtZSBzZW50OiBcIiwgcGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=