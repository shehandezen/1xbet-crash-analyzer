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
function connectWebSocket() {
    socket = new WebSocket('ws://5.104.81.194:5000');
    socket.onopen = function () {
        console.log('WebSocket connection opened');
    };
    socket.onmessage = function (event) {
        chrome.runtime.sendMessage(event.data);
        chrome.action.setIcon({ path: 'icons/socket-active.png' });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05BO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsaUNBQWlDO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxtQ0FBbUM7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLDREQUE0RDtBQUMzRjtBQUNBO0FBQ0EsQ0FBQztBQUNELG9CQUFvQixzREFBc0Q7QUFDMUU7QUFDQSxpQ0FBaUMsbUJBQW1CO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLGlDQUFpQyxtQkFBbUI7QUFDcEQsMENBQTBDLG1CQUFtQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUUsZUFBZTtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLG9DQUFvQztBQUNsRiw2REFBNkQsd0JBQXdCLHNDQUFzQztBQUMzSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELHlCQUF5QixVQUFVO0FBQ2hHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nYW1lLWNocm9tZS1leHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2FtZS1jaHJvbWUtZXh0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9nYW1lLWNocm9tZS1leHQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9nYW1lLWNocm9tZS1leHQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9nYW1lLWNocm9tZS1leHQvLi9iYWNrZ3JvdW5kLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNvY2tldDtcclxuZXhwb3J0IGZ1bmN0aW9uIGNvbm5lY3RXZWJTb2NrZXQoKSB7XHJcbiAgICBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KCd3czovLzUuMTA0LjgxLjE5NDo1MDAwJyk7XHJcbiAgICBzb2NrZXQub25vcGVuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdXZWJTb2NrZXQgY29ubmVjdGlvbiBvcGVuZWQnKTtcclxuICAgIH07XHJcbiAgICBzb2NrZXQub25tZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoZXZlbnQuZGF0YSk7XHJcbiAgICAgICAgY2hyb21lLmFjdGlvbi5zZXRJY29uKHsgcGF0aDogJ2ljb25zL3NvY2tldC1hY3RpdmUucG5nJyB9KTtcclxuICAgIH07XHJcbiAgICBzb2NrZXQub25jbG9zZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdXZWJTb2NrZXQgY29ubmVjdGlvbiBjbG9zZWQ6JywgZXZlbnQpO1xyXG4gICAgICAgIGNocm9tZS5hY3Rpb24uc2V0SWNvbih7IHBhdGg6ICdpY29ucy9zb2NrZXQtaW5hY3RpdmUucG5nJyB9KTtcclxuICAgICAgICBzZXRUaW1lb3V0KGNvbm5lY3RXZWJTb2NrZXQsIDEwMDApO1xyXG4gICAgfTtcclxuICAgIHNvY2tldC5vbmVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignV2ViU29ja2V0IGVycm9yOicsIGVycm9yKTtcclxuICAgIH07XHJcbn1cclxuY29ubmVjdFdlYlNvY2tldCgpO1xyXG5jaHJvbWUuc2NyaXB0aW5nXHJcbiAgICAuZ2V0UmVnaXN0ZXJlZENvbnRlbnRTY3JpcHRzKClcclxuICAgIC50aGVuKGZ1bmN0aW9uIChzY3JpcHRzKSB7IHJldHVybiBjb25zb2xlLmxvZyhcInJlZ2lzdGVyZWQgY29udGVudCBzY3JpcHRzXCIsIHNjcmlwdHMpOyB9KTtcclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xyXG4gICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkocmVxdWVzdCkpO1xyXG59KTtcclxuY2hyb21lLnRhYnMucXVlcnkoeyB1cmw6ICdodHRwczovLzF4YmV0LmNvbS9lbi9hbGxnYW1lc2VudHJhbmNlL2NyYXNoLyonIH0sIGZ1bmN0aW9uICh0YWJzKSB7XHJcbiAgICBpZiAodGFicy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY2hyb21lLmRlYnVnZ2VyLmRldGFjaCh7IHRhYklkOiB0YWJzWzBdLmlkIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyBleGlzdGluZyBkZWJ1Z2dlciB0byBkZXRhY2ggb3Igb3RoZXIgZXJyb3I6IFwiLCBjaHJvbWUucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB2YXIgcmVxdWVzdElkXzE7XHJcbiAgICAgICAgY2hyb21lLmRlYnVnZ2VyLmF0dGFjaCh7IHRhYklkOiB0YWJzWzBdLmlkIH0sIFwiMS4zXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY2hyb21lLmRlYnVnZ2VyLnNlbmRDb21tYW5kKHsgdGFiSWQ6IHRhYnNbMF0uaWQgfSwgXCJOZXR3b3JrLmVuYWJsZVwiKTtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0O1xyXG4gICAgICAgICAgICB2YXIgZW5kO1xyXG4gICAgICAgICAgICB2YXIgY3Jhc2g7XHJcbiAgICAgICAgICAgIHZhciBiZXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2hyb21lLmRlYnVnZ2VyLm9uRXZlbnQuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKHNvdXJjZSwgbWV0aG9kLCBwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aW1lc3RhbXBMb2cgPSAnWycgKyBEYXRlLm5vdygpICsgJ10gJztcclxuICAgICAgICAgICAgICAgIGlmIChtZXRob2QgPT09IFwiTmV0d29yay53ZWJTb2NrZXRGcmFtZVJlY2VpdmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdElkXzEgIT0gcGFyYW1zLnJlcXVlc3RJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGF5bG9hZFN0cmluZyA9IHBhcmFtcy5yZXNwb25zZS5wYXlsb2FkRGF0YS50b1N0cmluZygndXRmOCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFN0cmluZyA9IHBheWxvYWRTdHJpbmcucmVwbGFjZSgvW15cXHgyMC1cXHg3RV0vZywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBheWxvYWQgPSBKU09OLnBhcnNlKHBheWxvYWRTdHJpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocGF5bG9hZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkU3RyaW5nLmluY2x1ZGVzKCdcInRhcmdldFwiOlwiT25CZXRzXCInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHsgaGVhZGVyOiAnQkVUJyB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRpbWVzdGFtcExvZywgJyBPbkJldHMgRXZlbnQgdHJpZ2dlcmVkLicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkU3RyaW5nLmluY2x1ZGVzKCdcInRhcmdldFwiOlwiT25TdGFnZVwiJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh7IHN0YXJ0OiBzdGFydCwgZW5kOiBlbmQsIG9kZDogY3Jhc2ggfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkoeyBoZWFkZXI6ICdEQVRBJywgZGF0YTogeyBzdGFydDogc3RhcnQsIGVuZDogZW5kLCBvZGQ6IGNyYXNoIH0gfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWRTdHJpbmcuaW5jbHVkZXMoJ1widGFyZ2V0XCI6XCJPblN0YXJ0XCInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0cyA9IHBheWxvYWQuYXJndW1lbnRzWzBdLnRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gdHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZFN0cmluZy5pbmNsdWRlcygnXCJ0eXBlXCI6MSxcInRhcmdldFwiOlwiT25DcmFzaFwiJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2EgPSBwYXlsb2FkLmFyZ3VtZW50c1swXSwgZiA9IF9hLmYsIHRzID0gX2EudHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Jhc2ggPSBmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IHRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiXCIuY29uY2F0KHRpbWVzdGFtcExvZywgXCIgXCIpLmNvbmNhdChmLCBcIiwgXCIpLmNvbmNhdChzdGFydCwgXCIsIFwiKS5jb25jYXQodHMpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeSh7IGhlYWRlcjogJ0NSQVNIJywgZGF0YTogeyBvZGQ6IGYgfSB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHRpbWVzdGFtcExvZywgJ0Vycm9yIHByb2Nlc3NpbmcgV2ViU29ja2V0IGZyYW1lOicsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1ldGhvZCA9PT0gXCJOZXR3b3JrLndlYlNvY2tldEZyYW1lU2VudFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJXZWJTb2NrZXQgZnJhbWUgc2VudDogXCIsIHBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9