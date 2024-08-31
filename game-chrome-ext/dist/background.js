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
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (undefined && undefined.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var socket;
var tabsList = [];
function connectWebSocket() {
    var _this = this;
    socket = new WebSocket('ws://5.104.81.194:5000');
    socket.onopen = function () {
        console.log('WebSocket connection opened');
    };
    socket.onmessage = function (event) { return __awaiter(_this, void 0, void 0, function () {
        var payload;
        var _this = this;
        return __generator(this, function (_a) {
            chrome.runtime.sendMessage(event.data);
            chrome.action.setIcon({ path: 'icons/socket-active.png' });
            payload = JSON.parse(event.data);
            if (payload.header == 'WAKEUP' || payload.header == 'START') {
                chrome.tabs.query({ url: 'https://1xbet.com/en/allgamesentrance/crash/*' }, function (tabs) { var _a, tabs_1, tabs_1_1; return __awaiter(_this, void 0, void 0, function () {
                    var _loop_1, e_1_1;
                    var _b, e_1, _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                console.log(tabs);
                                chrome.debugger.detach({ tabId: tabs[0].id }, function () {
                                    console.log(tabs[0].id);
                                    if (chrome.runtime.lastError) {
                                        console.log("No existing debugger to detach or other error: ", chrome.runtime.lastError.message);
                                    }
                                    else {
                                        console.log('Successfully detached', chrome.runtime.lastError);
                                        chrome.tabs.remove(tabs[0].id, function () {
                                            console.log("Closed tab with ID: ".concat(tabs[0].id));
                                        });
                                    }
                                });
                                _e.label = 1;
                            case 1:
                                _e.trys.push([1, 6, 7, 12]);
                                _loop_1 = function () {
                                    _d = tabs_1_1.value;
                                    _a = false;
                                    try {
                                        var tab = _d;
                                        chrome.debugger.detach({ tabId: tab.id }, function () {
                                            console.log(tab.id);
                                            if (chrome.runtime.lastError) {
                                                console.log("No existing debugger to detach or other error: ", chrome.runtime.lastError.message);
                                            }
                                            else {
                                                console.log('Successfully detached', chrome.runtime.lastError);
                                                chrome.tabs.remove(tab.id, function () {
                                                    console.log("Closed tab with ID: ".concat(tab.id));
                                                });
                                            }
                                        });
                                    }
                                    finally {
                                        _a = true;
                                    }
                                };
                                _a = true, tabs_1 = __asyncValues(tabs);
                                _e.label = 2;
                            case 2: return [4 /*yield*/, tabs_1.next()];
                            case 3:
                                if (!(tabs_1_1 = _e.sent(), _b = tabs_1_1.done, !_b)) return [3 /*break*/, 5];
                                _loop_1();
                                _e.label = 4;
                            case 4: return [3 /*break*/, 2];
                            case 5: return [3 /*break*/, 12];
                            case 6:
                                e_1_1 = _e.sent();
                                e_1 = { error: e_1_1 };
                                return [3 /*break*/, 12];
                            case 7:
                                _e.trys.push([7, , 10, 11]);
                                if (!(!_a && !_b && (_c = tabs_1.return))) return [3 /*break*/, 9];
                                return [4 /*yield*/, _c.call(tabs_1)];
                            case 8:
                                _e.sent();
                                _e.label = 9;
                            case 9: return [3 /*break*/, 11];
                            case 10:
                                if (e_1) throw e_1.error;
                                return [7 /*endfinally*/];
                            case 11: return [7 /*endfinally*/];
                            case 12: 
                            // tabsList.splice(0, tabsList.length)
                            return [4 /*yield*/, chrome.tabs.create({ url: 'https://1xbet.com/en/allgamesentrance/crash/' }, function (tab) {
                                    console.log("Opened a new tab with ID: ".concat(tab.id));
                                    tabsList.push(tab);
                                    var requestId;
                                    chrome.debugger.attach({ tabId: tab.id }, "1.3", function () {
                                        console.log('Debugger attached');
                                        chrome.debugger.sendCommand({ tabId: tab.id }, "Network.enable");
                                        var start;
                                        var end;
                                        var crash;
                                        var bet = false;
                                        chrome.debugger.onEvent.addListener(function (source, method, params) {
                                            var timestampLog = '[' + Date.now() + '] ';
                                            if (method === "Network.webSocketFrameReceived") {
                                                if (requestId != params.requestId) {
                                                    var payloadString = params.response.payloadData.toString('utf8');
                                                    try {
                                                        payloadString = payloadString.replace(/[^\x20-\x7E]/g, '');
                                                        var payload_1 = JSON.parse(payloadString);
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
                                                            var ts = payload_1.arguments[0].ts;
                                                            start = ts;
                                                        }
                                                        if (payloadString.includes('"type":1,"target":"OnCrash"')) {
                                                            bet = false;
                                                            var _a = payload_1.arguments[0], f = _a.f, ts = _a.ts;
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
                                })];
                            case 13:
                                // tabsList.splice(0, tabsList.length)
                                _e.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            if (payload.header == 'HOLD' || payload.header == 'STOP') {
                chrome.tabs.query({ url: 'https://1xbet.com/en/allgamesentrance/crash/*' }, function (tabs) { var _a, tabs_2, tabs_2_1; return __awaiter(_this, void 0, void 0, function () {
                    var _loop_2, e_2_1;
                    var _b, e_2, _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                console.log(tabs);
                                _e.label = 1;
                            case 1:
                                _e.trys.push([1, 6, 7, 12]);
                                _loop_2 = function () {
                                    _d = tabs_2_1.value;
                                    _a = false;
                                    try {
                                        var tab = _d;
                                        console.log(tab);
                                        chrome.debugger.detach({ tabId: tab.id }, function () {
                                            if (chrome.runtime.lastError) {
                                                console.log("No existing debugger to detach or other error: ", chrome.runtime.lastError.message);
                                            }
                                            else {
                                                console.log('Successfully detached');
                                                chrome.tabs.remove(tab.id, function () {
                                                    console.log("Closed tab with ID: ".concat(tab.id));
                                                });
                                            }
                                        });
                                    }
                                    finally {
                                        _a = true;
                                    }
                                };
                                _a = true, tabs_2 = __asyncValues(tabs);
                                _e.label = 2;
                            case 2: return [4 /*yield*/, tabs_2.next()];
                            case 3:
                                if (!(tabs_2_1 = _e.sent(), _b = tabs_2_1.done, !_b)) return [3 /*break*/, 5];
                                _loop_2();
                                _e.label = 4;
                            case 4: return [3 /*break*/, 2];
                            case 5: return [3 /*break*/, 12];
                            case 6:
                                e_2_1 = _e.sent();
                                e_2 = { error: e_2_1 };
                                return [3 /*break*/, 12];
                            case 7:
                                _e.trys.push([7, , 10, 11]);
                                if (!(!_a && !_b && (_c = tabs_2.return))) return [3 /*break*/, 9];
                                return [4 /*yield*/, _c.call(tabs_2)];
                            case 8:
                                _e.sent();
                                _e.label = 9;
                            case 9: return [3 /*break*/, 11];
                            case 10:
                                if (e_2) throw e_2.error;
                                return [7 /*endfinally*/];
                            case 11: return [7 /*endfinally*/];
                            case 12: return [2 /*return*/];
                        }
                    });
                }); });
                // tabsList.splice(0, tabsList.length)
            }
            return [2 /*return*/];
        });
    }); };
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
chrome.debugger.onDetach.addListener(function (source, reason) {
    console.log(source, reason);
});
// chrome.tabs.query({ url: 'https://1xbet.com/en/allgamesentrance/crash/*' }, (tabs: any[]) => {
//   if (tabs.length > 0) {
//     chrome.debugger.detach({ tabId: tabs[0].id }, () => {
//       if (chrome.runtime.lastError) {
//         console.log("No existing debugger to detach or other error: ", chrome.runtime.lastError.message);
//       }
//     })
//     let requestId: any
//     chrome.debugger.attach({ tabId: tabs[0].id }, "1.3", () => {
//       chrome.debugger.sendCommand({ tabId: tabs[0].id }, "Network.enable");
//       var start: any
//       var end: any
//       var crash: any
//       var bet = false
//       chrome.debugger.onEvent.addListener((source, method, params: any) => {
//         var timestampLog = '[' + Date.now() + '] ';
//         if (method === "Network.webSocketFrameReceived") {
//           if (requestId != params.requestId) {
//             let payloadString = params.response.payloadData.toString('utf8');
//             try {
//               payloadString = payloadString.replace(/[^\x20-\x7E]/g, '');
//               const payload = JSON.parse(payloadString);
//               // console.log(payload)
//               if (payloadString.includes('"target":"OnBets"')) {
//                 if (!bet) {
//                   socket.send(JSON.stringify({ header: 'BET' }))
//                   console.log(timestampLog, ' OnBets Event triggered.')
//                   bet = true
//                 }
//               }
//               if (payloadString.includes('"target":"OnStage"')) {
//                 console.log({ start: start, end: end, odd: crash })
//                 socket.send(JSON.stringify({ header: 'DATA', data: { start: start, end: end, odd: crash } }))
//               }
//               if (payloadString.includes('"target":"OnStart"')) {
//                 const { ts } = payload.arguments[0];
//                 start = ts
//               }
//               if (payloadString.includes('"type":1,"target":"OnCrash"')) {
//                 bet = false
//                 const { f, ts } = payload.arguments[0];
//                 crash = f
//                 end = ts
//                 console.log(`${timestampLog} ${f}, ${start}, ${ts}`);
//                 socket.send(JSON.stringify({ header: 'CRASH', data: { odd: f } }))
//               }
//             } catch (error) {
//               console.error(timestampLog, 'Error processing WebSocket frame:', error);
//             }
//           }
//         } else if (method === "Network.webSocketFrameSent") {
//           // console.log("WebSocket frame sent: ", params);
//         }
//       });
//     });
//   }
// });

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLG9DQUFvQztBQUNyRSxnREFBZ0Qsd0JBQXdCLHNDQUFzQztBQUM5RztBQUNBO0FBQ0EsMkJBQTJCLEtBQUs7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsUUFBUTtBQUNuQztBQUNBO0FBQ0Esa0NBQWtDLGNBQWMsRUFBRSxFQUFFLElBQUksTUFBTSxJQUFJLEdBQUc7QUFDckUsZ0RBQWdELHlCQUF5QixVQUFVO0FBQ25GO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsVUFBVTtBQUNWLFFBQVE7QUFDUjtBQUNBLElBQUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nYW1lLWNocm9tZS1leHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2FtZS1jaHJvbWUtZXh0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9nYW1lLWNocm9tZS1leHQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9nYW1lLWNocm9tZS1leHQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9nYW1lLWNocm9tZS1leHQvLi9iYWNrZ3JvdW5kLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxudmFyIF9fYXN5bmNWYWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fYXN5bmNWYWx1ZXMpIHx8IGZ1bmN0aW9uIChvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufTtcclxudmFyIHNvY2tldDtcclxudmFyIHRhYnNMaXN0ID0gW107XHJcbmV4cG9ydCBmdW5jdGlvbiBjb25uZWN0V2ViU29ja2V0KCkge1xyXG4gICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgIHNvY2tldCA9IG5ldyBXZWJTb2NrZXQoJ3dzOi8vNS4xMDQuODEuMTk0OjUwMDAnKTtcclxuICAgIHNvY2tldC5vbm9wZW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1dlYlNvY2tldCBjb25uZWN0aW9uIG9wZW5lZCcpO1xyXG4gICAgfTtcclxuICAgIHNvY2tldC5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcGF5bG9hZDtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoZXZlbnQuZGF0YSk7XHJcbiAgICAgICAgICAgIGNocm9tZS5hY3Rpb24uc2V0SWNvbih7IHBhdGg6ICdpY29ucy9zb2NrZXQtYWN0aXZlLnBuZycgfSk7XHJcbiAgICAgICAgICAgIHBheWxvYWQgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xyXG4gICAgICAgICAgICBpZiAocGF5bG9hZC5oZWFkZXIgPT0gJ1dBS0VVUCcgfHwgcGF5bG9hZC5oZWFkZXIgPT0gJ1NUQVJUJykge1xyXG4gICAgICAgICAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoeyB1cmw6ICdodHRwczovLzF4YmV0LmNvbS9lbi9hbGxnYW1lc2VudHJhbmNlL2NyYXNoLyonIH0sIGZ1bmN0aW9uICh0YWJzKSB7IHZhciBfYSwgdGFic18xLCB0YWJzXzFfMTsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgX2xvb3BfMSwgZV8xXzE7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9iLCBlXzEsIF9jLCBfZDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2UubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0YWJzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWUuZGVidWdnZXIuZGV0YWNoKHsgdGFiSWQ6IHRhYnNbMF0uaWQgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0YWJzWzBdLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyBleGlzdGluZyBkZWJ1Z2dlciB0byBkZXRhY2ggb3Igb3RoZXIgZXJyb3I6IFwiLCBjaHJvbWUucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU3VjY2Vzc2Z1bGx5IGRldGFjaGVkJywgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnJlbW92ZSh0YWJzWzBdLmlkLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDbG9zZWQgdGFiIHdpdGggSUQ6IFwiLmNvbmNhdCh0YWJzWzBdLmlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lLmxhYmVsID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZS50cnlzLnB1c2goWzEsIDYsIDcsIDEyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2xvb3BfMSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2QgPSB0YWJzXzFfMS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YWIgPSBfZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS5kZWJ1Z2dlci5kZXRhY2goeyB0YWJJZDogdGFiLmlkIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0YWIuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyBleGlzdGluZyBkZWJ1Z2dlciB0byBkZXRhY2ggb3Igb3RoZXIgZXJyb3I6IFwiLCBjaHJvbWUucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU3VjY2Vzc2Z1bGx5IGRldGFjaGVkJywgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMucmVtb3ZlKHRhYi5pZCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDbG9zZWQgdGFiIHdpdGggSUQ6IFwiLmNvbmNhdCh0YWIuaWQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gdHJ1ZSwgdGFic18xID0gX19hc3luY1ZhbHVlcyh0YWJzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZS5sYWJlbCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDI6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRhYnNfMS5uZXh0KCldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHRhYnNfMV8xID0gX2Uuc2VudCgpLCBfYiA9IHRhYnNfMV8xLmRvbmUsICFfYikpIHJldHVybiBbMyAvKmJyZWFrKi8sIDVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9sb29wXzEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZS5sYWJlbCA9IDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1OiByZXR1cm4gWzMgLypicmVhayovLCAxMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZV8xXzEgPSBfZS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZV8xID0geyBlcnJvcjogZV8xXzEgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCAxMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2UudHJ5cy5wdXNoKFs3LCAsIDEwLCAxMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKCFfYSAmJiAhX2IgJiYgKF9jID0gdGFic18xLnJldHVybikpKSByZXR1cm4gWzMgLypicmVhayovLCA5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBfYy5jYWxsKHRhYnNfMSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZS5sYWJlbCA9IDk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDk6IHJldHVybiBbMyAvKmJyZWFrKi8sIDExXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNyAvKmVuZGZpbmFsbHkqL107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDExOiByZXR1cm4gWzcgLyplbmRmaW5hbGx5Ki9dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMjogXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0YWJzTGlzdC5zcGxpY2UoMCwgdGFic0xpc3QubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsOiAnaHR0cHM6Ly8xeGJldC5jb20vZW4vYWxsZ2FtZXNlbnRyYW5jZS9jcmFzaC8nIH0sIGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcGVuZWQgYSBuZXcgdGFiIHdpdGggSUQ6IFwiLmNvbmNhdCh0YWIuaWQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFic0xpc3QucHVzaCh0YWIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVxdWVzdElkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWUuZGVidWdnZXIuYXR0YWNoKHsgdGFiSWQ6IHRhYi5pZCB9LCBcIjEuM1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRGVidWdnZXIgYXR0YWNoZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS5kZWJ1Z2dlci5zZW5kQ29tbWFuZCh7IHRhYklkOiB0YWIuaWQgfSwgXCJOZXR3b3JrLmVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGFydDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3Jhc2g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYmV0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWUuZGVidWdnZXIub25FdmVudC5hZGRMaXN0ZW5lcihmdW5jdGlvbiAoc291cmNlLCBtZXRob2QsIHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aW1lc3RhbXBMb2cgPSAnWycgKyBEYXRlLm5vdygpICsgJ10gJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWV0aG9kID09PSBcIk5ldHdvcmsud2ViU29ja2V0RnJhbWVSZWNlaXZlZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0SWQgIT0gcGFyYW1zLnJlcXVlc3RJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBheWxvYWRTdHJpbmcgPSBwYXJhbXMucmVzcG9uc2UucGF5bG9hZERhdGEudG9TdHJpbmcoJ3V0ZjgnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFN0cmluZyA9IHBheWxvYWRTdHJpbmcucmVwbGFjZSgvW15cXHgyMC1cXHg3RV0vZywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXlsb2FkXzEgPSBKU09OLnBhcnNlKHBheWxvYWRTdHJpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBheWxvYWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWRTdHJpbmcuaW5jbHVkZXMoJ1widGFyZ2V0XCI6XCJPbkJldHNcIicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeSh7IGhlYWRlcjogJ0JFVCcgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGltZXN0YW1wTG9nLCAnIE9uQmV0cyBFdmVudCB0cmlnZ2VyZWQuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkU3RyaW5nLmluY2x1ZGVzKCdcInRhcmdldFwiOlwiT25TdGFnZVwiJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coeyBzdGFydDogc3RhcnQsIGVuZDogZW5kLCBvZGQ6IGNyYXNoIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeSh7IGhlYWRlcjogJ0RBVEEnLCBkYXRhOiB7IHN0YXJ0OiBzdGFydCwgZW5kOiBlbmQsIG9kZDogY3Jhc2ggfSB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkU3RyaW5nLmluY2x1ZGVzKCdcInRhcmdldFwiOlwiT25TdGFydFwiJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRzID0gcGF5bG9hZF8xLmFyZ3VtZW50c1swXS50cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSB0cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWRTdHJpbmcuaW5jbHVkZXMoJ1widHlwZVwiOjEsXCJ0YXJnZXRcIjpcIk9uQ3Jhc2hcIicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJldCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2EgPSBwYXlsb2FkXzEuYXJndW1lbnRzWzBdLCBmID0gX2EuZiwgdHMgPSBfYS50cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Jhc2ggPSBmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQgPSB0cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJcIi5jb25jYXQodGltZXN0YW1wTG9nLCBcIiBcIikuY29uY2F0KGYsIFwiLCBcIikuY29uY2F0KHN0YXJ0LCBcIiwgXCIpLmNvbmNhdCh0cykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeSh7IGhlYWRlcjogJ0NSQVNIJywgZGF0YTogeyBvZGQ6IGYgfSB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcih0aW1lc3RhbXBMb2csICdFcnJvciBwcm9jZXNzaW5nIFdlYlNvY2tldCBmcmFtZTonLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobWV0aG9kID09PSBcIk5ldHdvcmsud2ViU29ja2V0RnJhbWVTZW50XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJXZWJTb2NrZXQgZnJhbWUgc2VudDogXCIsIHBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGFic0xpc3Quc3BsaWNlKDAsIHRhYnNMaXN0Lmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTsgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHBheWxvYWQuaGVhZGVyID09ICdIT0xEJyB8fCBwYXlsb2FkLmhlYWRlciA9PSAnU1RPUCcpIHtcclxuICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnF1ZXJ5KHsgdXJsOiAnaHR0cHM6Ly8xeGJldC5jb20vZW4vYWxsZ2FtZXNlbnRyYW5jZS9jcmFzaC8qJyB9LCBmdW5jdGlvbiAodGFicykgeyB2YXIgX2EsIHRhYnNfMiwgdGFic18yXzE7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9sb29wXzIsIGVfMl8xO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBfYiwgZV8yLCBfYywgX2Q7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9lLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGFicyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2UubGFiZWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lLnRyeXMucHVzaChbMSwgNiwgNywgMTJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbG9vcF8yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZCA9IHRhYnNfMl8xLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhYiA9IF9kO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGFiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS5kZWJ1Z2dlci5kZXRhY2goeyB0YWJJZDogdGFiLmlkIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gZXhpc3RpbmcgZGVidWdnZXIgdG8gZGV0YWNoIG9yIG90aGVyIGVycm9yOiBcIiwgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N1Y2Nlc3NmdWxseSBkZXRhY2hlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5yZW1vdmUodGFiLmlkLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNsb3NlZCB0YWIgd2l0aCBJRDogXCIuY29uY2F0KHRhYi5pZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSB0cnVlLCB0YWJzXzIgPSBfX2FzeW5jVmFsdWVzKHRhYnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lLmxhYmVsID0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIFs0IC8qeWllbGQqLywgdGFic18yLm5leHQoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEodGFic18yXzEgPSBfZS5zZW50KCksIF9iID0gdGFic18yXzEuZG9uZSwgIV9iKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2xvb3BfMigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lLmxhYmVsID0gNDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFszIC8qYnJlYWsqLywgMl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDU6IHJldHVybiBbMyAvKmJyZWFrKi8sIDEyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlXzJfMSA9IF9lLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlXzIgPSB7IGVycm9yOiBlXzJfMSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDEyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZS50cnlzLnB1c2goWzcsICwgMTAsIDExXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoIV9hICYmICFfYiAmJiAoX2MgPSB0YWJzXzIucmV0dXJuKSkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIF9jLmNhbGwodGFic18yKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Uuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lLmxhYmVsID0gOTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgOTogcmV0dXJuIFszIC8qYnJlYWsqLywgMTFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZV8yKSB0aHJvdyBlXzIuZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3IC8qZW5kZmluYWxseSovXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTE6IHJldHVybiBbNyAvKmVuZGZpbmFsbHkqL107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEyOiByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pOyB9KTtcclxuICAgICAgICAgICAgICAgIC8vIHRhYnNMaXN0LnNwbGljZSgwLCB0YWJzTGlzdC5sZW5ndGgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7IH07XHJcbiAgICBzb2NrZXQub25jbG9zZSA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdXZWJTb2NrZXQgY29ubmVjdGlvbiBjbG9zZWQ6JywgZXZlbnQpO1xyXG4gICAgICAgIGNocm9tZS5hY3Rpb24uc2V0SWNvbih7IHBhdGg6ICdpY29ucy9zb2NrZXQtaW5hY3RpdmUucG5nJyB9KTtcclxuICAgICAgICBzZXRUaW1lb3V0KGNvbm5lY3RXZWJTb2NrZXQsIDEwMDApO1xyXG4gICAgfTtcclxuICAgIHNvY2tldC5vbmVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignV2ViU29ja2V0IGVycm9yOicsIGVycm9yKTtcclxuICAgIH07XHJcbn1cclxuY29ubmVjdFdlYlNvY2tldCgpO1xyXG5jaHJvbWUuc2NyaXB0aW5nXHJcbiAgICAuZ2V0UmVnaXN0ZXJlZENvbnRlbnRTY3JpcHRzKClcclxuICAgIC50aGVuKGZ1bmN0aW9uIChzY3JpcHRzKSB7IHJldHVybiBjb25zb2xlLmxvZyhcInJlZ2lzdGVyZWQgY29udGVudCBzY3JpcHRzXCIsIHNjcmlwdHMpOyB9KTtcclxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkge1xyXG4gICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkocmVxdWVzdCkpO1xyXG59KTtcclxuY2hyb21lLmRlYnVnZ2VyLm9uRGV0YWNoLmFkZExpc3RlbmVyKGZ1bmN0aW9uIChzb3VyY2UsIHJlYXNvbikge1xyXG4gICAgY29uc29sZS5sb2coc291cmNlLCByZWFzb24pO1xyXG59KTtcclxuLy8gY2hyb21lLnRhYnMucXVlcnkoeyB1cmw6ICdodHRwczovLzF4YmV0LmNvbS9lbi9hbGxnYW1lc2VudHJhbmNlL2NyYXNoLyonIH0sICh0YWJzOiBhbnlbXSkgPT4ge1xyXG4vLyAgIGlmICh0YWJzLmxlbmd0aCA+IDApIHtcclxuLy8gICAgIGNocm9tZS5kZWJ1Z2dlci5kZXRhY2goeyB0YWJJZDogdGFic1swXS5pZCB9LCAoKSA9PiB7XHJcbi8vICAgICAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcclxuLy8gICAgICAgICBjb25zb2xlLmxvZyhcIk5vIGV4aXN0aW5nIGRlYnVnZ2VyIHRvIGRldGFjaCBvciBvdGhlciBlcnJvcjogXCIsIGNocm9tZS5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlKTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgfSlcclxuLy8gICAgIGxldCByZXF1ZXN0SWQ6IGFueVxyXG4vLyAgICAgY2hyb21lLmRlYnVnZ2VyLmF0dGFjaCh7IHRhYklkOiB0YWJzWzBdLmlkIH0sIFwiMS4zXCIsICgpID0+IHtcclxuLy8gICAgICAgY2hyb21lLmRlYnVnZ2VyLnNlbmRDb21tYW5kKHsgdGFiSWQ6IHRhYnNbMF0uaWQgfSwgXCJOZXR3b3JrLmVuYWJsZVwiKTtcclxuLy8gICAgICAgdmFyIHN0YXJ0OiBhbnlcclxuLy8gICAgICAgdmFyIGVuZDogYW55XHJcbi8vICAgICAgIHZhciBjcmFzaDogYW55XHJcbi8vICAgICAgIHZhciBiZXQgPSBmYWxzZVxyXG4vLyAgICAgICBjaHJvbWUuZGVidWdnZXIub25FdmVudC5hZGRMaXN0ZW5lcigoc291cmNlLCBtZXRob2QsIHBhcmFtczogYW55KSA9PiB7XHJcbi8vICAgICAgICAgdmFyIHRpbWVzdGFtcExvZyA9ICdbJyArIERhdGUubm93KCkgKyAnXSAnO1xyXG4vLyAgICAgICAgIGlmIChtZXRob2QgPT09IFwiTmV0d29yay53ZWJTb2NrZXRGcmFtZVJlY2VpdmVkXCIpIHtcclxuLy8gICAgICAgICAgIGlmIChyZXF1ZXN0SWQgIT0gcGFyYW1zLnJlcXVlc3RJZCkge1xyXG4vLyAgICAgICAgICAgICBsZXQgcGF5bG9hZFN0cmluZyA9IHBhcmFtcy5yZXNwb25zZS5wYXlsb2FkRGF0YS50b1N0cmluZygndXRmOCcpO1xyXG4vLyAgICAgICAgICAgICB0cnkge1xyXG4vLyAgICAgICAgICAgICAgIHBheWxvYWRTdHJpbmcgPSBwYXlsb2FkU3RyaW5nLnJlcGxhY2UoL1teXFx4MjAtXFx4N0VdL2csICcnKTtcclxuLy8gICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gSlNPTi5wYXJzZShwYXlsb2FkU3RyaW5nKTtcclxuLy8gICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwYXlsb2FkKVxyXG4vLyAgICAgICAgICAgICAgIGlmIChwYXlsb2FkU3RyaW5nLmluY2x1ZGVzKCdcInRhcmdldFwiOlwiT25CZXRzXCInKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgaWYgKCFiZXQpIHtcclxuLy8gICAgICAgICAgICAgICAgICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkoeyBoZWFkZXI6ICdCRVQnIH0pKVxyXG4vLyAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aW1lc3RhbXBMb2csICcgT25CZXRzIEV2ZW50IHRyaWdnZXJlZC4nKVxyXG4vLyAgICAgICAgICAgICAgICAgICBiZXQgPSB0cnVlXHJcbi8vICAgICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgIGlmIChwYXlsb2FkU3RyaW5nLmluY2x1ZGVzKCdcInRhcmdldFwiOlwiT25TdGFnZVwiJykpIHtcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHsgc3RhcnQ6IHN0YXJ0LCBlbmQ6IGVuZCwgb2RkOiBjcmFzaCB9KVxyXG4vLyAgICAgICAgICAgICAgICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkoeyBoZWFkZXI6ICdEQVRBJywgZGF0YTogeyBzdGFydDogc3RhcnQsIGVuZDogZW5kLCBvZGQ6IGNyYXNoIH0gfSkpXHJcbi8vICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgIGlmIChwYXlsb2FkU3RyaW5nLmluY2x1ZGVzKCdcInRhcmdldFwiOlwiT25TdGFydFwiJykpIHtcclxuLy8gICAgICAgICAgICAgICAgIGNvbnN0IHsgdHMgfSA9IHBheWxvYWQuYXJndW1lbnRzWzBdO1xyXG4vLyAgICAgICAgICAgICAgICAgc3RhcnQgPSB0c1xyXG4vLyAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICBpZiAocGF5bG9hZFN0cmluZy5pbmNsdWRlcygnXCJ0eXBlXCI6MSxcInRhcmdldFwiOlwiT25DcmFzaFwiJykpIHtcclxuLy8gICAgICAgICAgICAgICAgIGJldCA9IGZhbHNlXHJcbi8vICAgICAgICAgICAgICAgICBjb25zdCB7IGYsIHRzIH0gPSBwYXlsb2FkLmFyZ3VtZW50c1swXTtcclxuLy8gICAgICAgICAgICAgICAgIGNyYXNoID0gZlxyXG4vLyAgICAgICAgICAgICAgICAgZW5kID0gdHNcclxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke3RpbWVzdGFtcExvZ30gJHtmfSwgJHtzdGFydH0sICR7dHN9YCk7XHJcbi8vICAgICAgICAgICAgICAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeSh7IGhlYWRlcjogJ0NSQVNIJywgZGF0YTogeyBvZGQ6IGYgfSB9KSlcclxuLy8gICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbi8vICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcih0aW1lc3RhbXBMb2csICdFcnJvciBwcm9jZXNzaW5nIFdlYlNvY2tldCBmcmFtZTonLCBlcnJvcik7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgIH1cclxuLy8gICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gXCJOZXR3b3JrLndlYlNvY2tldEZyYW1lU2VudFwiKSB7XHJcbi8vICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIldlYlNvY2tldCBmcmFtZSBzZW50OiBcIiwgcGFyYW1zKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgIH0pO1xyXG4vLyAgICAgfSk7XHJcbi8vICAgfVxyXG4vLyB9KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9