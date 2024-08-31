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
        var payload, _loop_1, _a, tabsList_1, tabsList_1_1, e_1_1;
        var _this = this;
        var _b, e_1, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    chrome.runtime.sendMessage(event.data);
                    chrome.action.setIcon({ path: 'icons/socket-active.png' });
                    payload = JSON.parse(event.data);
                    if (payload.header == 'WAKEUP' || payload.header == 'START') {
                        chrome.tabs.query({ url: 'https://1xbet.com/en/allgamesentrance/crash/*' }, function (tabs) { var _a, tabs_1, tabs_1_1; return __awaiter(_this, void 0, void 0, function () {
                            var _loop_2, e_2_1;
                            var _this = this;
                            var _b, e_2, _c, _d;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        if (!(tabs.length > 0)) return [3 /*break*/, 13];
                                        _e.label = 1;
                                    case 1:
                                        _e.trys.push([1, 6, 7, 12]);
                                        _loop_2 = function () {
                                            _d = tabs_1_1.value;
                                            _a = false;
                                            try {
                                                var tab = _d;
                                                chrome.tabs.remove(tab.id, function () {
                                                    console.log("Closed tab with ID: ".concat(tab.id));
                                                });
                                                chrome.debugger.detach({ tabId: tab.id }, function () {
                                                    if (chrome.runtime.lastError) {
                                                        console.log("No existing debugger to detach or other error: ", chrome.runtime.lastError.message);
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
                                        if (!(!_a && !_b && (_c = tabs_1.return))) return [3 /*break*/, 9];
                                        return [4 /*yield*/, _c.call(tabs_1)];
                                    case 8:
                                        _e.sent();
                                        _e.label = 9;
                                    case 9: return [3 /*break*/, 11];
                                    case 10:
                                        if (e_2) throw e_2.error;
                                        return [7 /*endfinally*/];
                                    case 11: return [7 /*endfinally*/];
                                    case 12:
                                        chrome.tabs.create({ url: 'https://1xbet.com/en/allgamesentrance/crash/' }, function (tab) {
                                            console.log("Opened a new tab with ID: ".concat(tab.id));
                                            tabsList.push(tab);
                                            var requestId;
                                            chrome.debugger.attach({ tabId: tab.id }, "1.3", function () {
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
                                        });
                                        return [3 /*break*/, 14];
                                    case 13:
                                        chrome.tabs.query({ url: 'https://1xbet.com/en/allgamesentrance/crash/*' }, function (tabs) { var _a, tabs_2, tabs_2_1; return __awaiter(_this, void 0, void 0, function () {
                                            var _loop_3, e_3_1;
                                            var _b, e_3, _c, _d;
                                            return __generator(this, function (_e) {
                                                switch (_e.label) {
                                                    case 0:
                                                        if (!(tabs.length > 0)) return [3 /*break*/, 13];
                                                        _e.label = 1;
                                                    case 1:
                                                        _e.trys.push([1, 6, 7, 12]);
                                                        _loop_3 = function () {
                                                            _d = tabs_2_1.value;
                                                            _a = false;
                                                            try {
                                                                var tab = _d;
                                                                chrome.tabs.remove(tab.id, function () {
                                                                    console.log("Closed tab with ID: ".concat(tab.id));
                                                                });
                                                                chrome.debugger.detach({ tabId: tab.id }, function () {
                                                                    if (chrome.runtime.lastError) {
                                                                        console.log("No existing debugger to detach or other error: ", chrome.runtime.lastError.message);
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
                                                        _loop_3();
                                                        _e.label = 4;
                                                    case 4: return [3 /*break*/, 2];
                                                    case 5: return [3 /*break*/, 12];
                                                    case 6:
                                                        e_3_1 = _e.sent();
                                                        e_3 = { error: e_3_1 };
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
                                                        if (e_3) throw e_3.error;
                                                        return [7 /*endfinally*/];
                                                    case 11: return [7 /*endfinally*/];
                                                    case 12:
                                                        chrome.tabs.create({ url: 'https://1xbet.com/en/allgamesentrance/crash/' }, function (tab) {
                                                            console.log("Opened a new tab with ID: ".concat(tab.id));
                                                            tabsList.push(tab);
                                                            // chrome.debugger.detach({ tabId: tabs[0].id }, () => {
                                                            //   if (chrome.runtime.lastError) {
                                                            //     console.log("No existing debugger to detach or other error: ", chrome.runtime.lastError.message);
                                                            //   }
                                                            // })
                                                            var requestId;
                                                            chrome.debugger.attach({ tabId: tab.id }, "1.3", function () {
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
                                                                                var payload_2 = JSON.parse(payloadString);
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
                                                                                    var ts = payload_2.arguments[0].ts;
                                                                                    start = ts;
                                                                                }
                                                                                if (payloadString.includes('"type":1,"target":"OnCrash"')) {
                                                                                    bet = false;
                                                                                    var _a = payload_2.arguments[0], f = _a.f, ts = _a.ts;
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
                                                        });
                                                        _e.label = 13;
                                                    case 13: return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                        _e.label = 14;
                                    case 14: return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    if (!(payload.header == 'HOLD' || payload.header == 'STOP')) return [3 /*break*/, 12];
                    console.log(tabsList);
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 6, 7, 12]);
                    _loop_1 = function () {
                        _d = tabsList_1_1.value;
                        _a = false;
                        try {
                            var tab = _d;
                            chrome.debugger.detach({ tabId: tab.id }, function () {
                                if (chrome.runtime.lastError) {
                                    console.log("No existing debugger to detach or other error: ", chrome.runtime.lastError.message);
                                }
                            });
                            chrome.tabs.remove(tab.id, function () {
                                console.log("Closed tab with ID: ".concat(tab.id));
                            });
                            tabsList.splice(0, tabsList.length);
                        }
                        finally {
                            _a = true;
                        }
                    };
                    _a = true, tabsList_1 = __asyncValues(tabsList);
                    _e.label = 2;
                case 2: return [4 /*yield*/, tabsList_1.next()];
                case 3:
                    if (!(tabsList_1_1 = _e.sent(), _b = tabsList_1_1.done, !_b)) return [3 /*break*/, 5];
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
                    if (!(!_a && !_b && (_c = tabsList_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _c.call(tabsList_1)];
                case 8:
                    _e.sent();
                    _e.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nYW1lLWNocm9tZS1leHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2FtZS1jaHJvbWUtZXh0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9nYW1lLWNocm9tZS1leHQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9nYW1lLWNocm9tZS1leHQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9nYW1lLWNocm9tZS1leHQvLi9iYWNrZ3JvdW5kLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChnICYmIChnID0gMCwgb3BbMF0gJiYgKF8gPSAwKSksIF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxudmFyIF9fYXN5bmNWYWx1ZXMgPSAodGhpcyAmJiB0aGlzLl9fYXN5bmNWYWx1ZXMpIHx8IGZ1bmN0aW9uIChvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufTtcclxudmFyIHNvY2tldDtcclxudmFyIHRhYnNMaXN0ID0gW107XHJcbmV4cG9ydCBmdW5jdGlvbiBjb25uZWN0V2ViU29ja2V0KCkge1xyXG4gICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgIHNvY2tldCA9IG5ldyBXZWJTb2NrZXQoJ3dzOi8vNS4xMDQuODEuMTk0OjUwMDAnKTtcclxuICAgIHNvY2tldC5vbm9wZW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1dlYlNvY2tldCBjb25uZWN0aW9uIG9wZW5lZCcpO1xyXG4gICAgfTtcclxuICAgIHNvY2tldC5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcGF5bG9hZCwgX2xvb3BfMSwgX2EsIHRhYnNMaXN0XzEsIHRhYnNMaXN0XzFfMSwgZV8xXzE7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB2YXIgX2IsIGVfMSwgX2MsIF9kO1xyXG4gICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2UpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChfZS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKGV2ZW50LmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNocm9tZS5hY3Rpb24uc2V0SWNvbih7IHBhdGg6ICdpY29ucy9zb2NrZXQtYWN0aXZlLnBuZycgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGF5bG9hZCA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWQuaGVhZGVyID09ICdXQUtFVVAnIHx8IHBheWxvYWQuaGVhZGVyID09ICdTVEFSVCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoeyB1cmw6ICdodHRwczovLzF4YmV0LmNvbS9lbi9hbGxnYW1lc2VudHJhbmNlL2NyYXNoLyonIH0sIGZ1bmN0aW9uICh0YWJzKSB7IHZhciBfYSwgdGFic18xLCB0YWJzXzFfMTsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfbG9vcF8yLCBlXzJfMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2IsIGVfMiwgX2MsIF9kO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2UubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEodGFicy5sZW5ndGggPiAwKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMTNdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2UubGFiZWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZS50cnlzLnB1c2goWzEsIDYsIDcsIDEyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbG9vcF8yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9kID0gdGFic18xXzEudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFiID0gX2Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnJlbW92ZSh0YWIuaWQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2xvc2VkIHRhYiB3aXRoIElEOiBcIi5jb25jYXQodGFiLmlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWUuZGVidWdnZXIuZGV0YWNoKHsgdGFiSWQ6IHRhYi5pZCB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyBleGlzdGluZyBkZWJ1Z2dlciB0byBkZXRhY2ggb3Igb3RoZXIgZXJyb3I6IFwiLCBjaHJvbWUucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYSA9IHRydWUsIHRhYnNfMSA9IF9fYXN5bmNWYWx1ZXModGFicyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZS5sYWJlbCA9IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIFs0IC8qeWllbGQqLywgdGFic18xLm5leHQoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHRhYnNfMV8xID0gX2Uuc2VudCgpLCBfYiA9IHRhYnNfMV8xLmRvbmUsICFfYikpIHJldHVybiBbMyAvKmJyZWFrKi8sIDVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2xvb3BfMigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2UubGFiZWwgPSA0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDU6IHJldHVybiBbMyAvKmJyZWFrKi8sIDEyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZV8yXzEgPSBfZS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlXzIgPSB7IGVycm9yOiBlXzJfMSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgMTJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZS50cnlzLnB1c2goWzcsICwgMTAsIDExXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISghX2EgJiYgIV9iICYmIChfYyA9IHRhYnNfMS5yZXR1cm4pKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgOV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBfYy5jYWxsKHRhYnNfMSldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZS5sYWJlbCA9IDk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgOTogcmV0dXJuIFszIC8qYnJlYWsqLywgMTFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3IC8qZW5kZmluYWxseSovXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTogcmV0dXJuIFs3IC8qZW5kZmluYWxseSovXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7IHVybDogJ2h0dHBzOi8vMXhiZXQuY29tL2VuL2FsbGdhbWVzZW50cmFuY2UvY3Jhc2gvJyB9LCBmdW5jdGlvbiAodGFiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcGVuZWQgYSBuZXcgdGFiIHdpdGggSUQ6IFwiLmNvbmNhdCh0YWIuaWQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJzTGlzdC5wdXNoKHRhYik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlcXVlc3RJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWUuZGVidWdnZXIuYXR0YWNoKHsgdGFiSWQ6IHRhYi5pZCB9LCBcIjEuM1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS5kZWJ1Z2dlci5zZW5kQ29tbWFuZCh7IHRhYklkOiB0YWIuaWQgfSwgXCJOZXR3b3JrLmVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW5kO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3Jhc2g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiZXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hyb21lLmRlYnVnZ2VyLm9uRXZlbnQuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKHNvdXJjZSwgbWV0aG9kLCBwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aW1lc3RhbXBMb2cgPSAnWycgKyBEYXRlLm5vdygpICsgJ10gJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXRob2QgPT09IFwiTmV0d29yay53ZWJTb2NrZXRGcmFtZVJlY2VpdmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVxdWVzdElkICE9IHBhcmFtcy5yZXF1ZXN0SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBheWxvYWRTdHJpbmcgPSBwYXJhbXMucmVzcG9uc2UucGF5bG9hZERhdGEudG9TdHJpbmcoJ3V0ZjgnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWRTdHJpbmcgPSBwYXlsb2FkU3RyaW5nLnJlcGxhY2UoL1teXFx4MjAtXFx4N0VdL2csICcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXlsb2FkXzEgPSBKU09OLnBhcnNlKHBheWxvYWRTdHJpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocGF5bG9hZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkU3RyaW5nLmluY2x1ZGVzKCdcInRhcmdldFwiOlwiT25CZXRzXCInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHsgaGVhZGVyOiAnQkVUJyB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRpbWVzdGFtcExvZywgJyBPbkJldHMgRXZlbnQgdHJpZ2dlcmVkLicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkU3RyaW5nLmluY2x1ZGVzKCdcInRhcmdldFwiOlwiT25TdGFnZVwiJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh7IHN0YXJ0OiBzdGFydCwgZW5kOiBlbmQsIG9kZDogY3Jhc2ggfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkoeyBoZWFkZXI6ICdEQVRBJywgZGF0YTogeyBzdGFydDogc3RhcnQsIGVuZDogZW5kLCBvZGQ6IGNyYXNoIH0gfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWRTdHJpbmcuaW5jbHVkZXMoJ1widGFyZ2V0XCI6XCJPblN0YXJ0XCInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0cyA9IHBheWxvYWRfMS5hcmd1bWVudHNbMF0udHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSB0cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkU3RyaW5nLmluY2x1ZGVzKCdcInR5cGVcIjoxLFwidGFyZ2V0XCI6XCJPbkNyYXNoXCInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJldCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSA9IHBheWxvYWRfMS5hcmd1bWVudHNbMF0sIGYgPSBfYS5mLCB0cyA9IF9hLnRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyYXNoID0gZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQgPSB0cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlwiLmNvbmNhdCh0aW1lc3RhbXBMb2csIFwiIFwiKS5jb25jYXQoZiwgXCIsIFwiKS5jb25jYXQoc3RhcnQsIFwiLCBcIikuY29uY2F0KHRzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkoeyBoZWFkZXI6ICdDUkFTSCcsIGRhdGE6IHsgb2RkOiBmIH0gfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcih0aW1lc3RhbXBMb2csICdFcnJvciBwcm9jZXNzaW5nIFdlYlNvY2tldCBmcmFtZTonLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChtZXRob2QgPT09IFwiTmV0d29yay53ZWJTb2NrZXRGcmFtZVNlbnRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiV2ViU29ja2V0IGZyYW1lIHNlbnQ6IFwiLCBwYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgMTRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMucXVlcnkoeyB1cmw6ICdodHRwczovLzF4YmV0LmNvbS9lbi9hbGxnYW1lc2VudHJhbmNlL2NyYXNoLyonIH0sIGZ1bmN0aW9uICh0YWJzKSB7IHZhciBfYSwgdGFic18yLCB0YWJzXzJfMTsgcmV0dXJuIF9fYXdhaXRlcihfdGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2xvb3BfMywgZV8zXzE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9iLCBlXzMsIF9jLCBfZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoX2UubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh0YWJzLmxlbmd0aCA+IDApKSByZXR1cm4gWzMgLypicmVhayovLCAxM107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2UubGFiZWwgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lLnRyeXMucHVzaChbMSwgNiwgNywgMTJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbG9vcF8zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZCA9IHRhYnNfMl8xLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhYiA9IF9kO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMucmVtb3ZlKHRhYi5pZCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2xvc2VkIHRhYiB3aXRoIElEOiBcIi5jb25jYXQodGFiLmlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS5kZWJ1Z2dlci5kZXRhY2goeyB0YWJJZDogdGFiLmlkIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gZXhpc3RpbmcgZGVidWdnZXIgdG8gZGV0YWNoIG9yIG90aGVyIGVycm9yOiBcIiwgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYSA9IHRydWUsIHRhYnNfMiA9IF9fYXN5bmNWYWx1ZXModGFicyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2UubGFiZWwgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0YWJzXzIubmV4dCgpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh0YWJzXzJfMSA9IF9lLnNlbnQoKSwgX2IgPSB0YWJzXzJfMS5kb25lLCAhX2IpKSByZXR1cm4gWzMgLypicmVhayovLCA1XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbG9vcF8zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2UubGFiZWwgPSA0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzMgLypicmVhayovLCAyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFszIC8qYnJlYWsqLywgMTJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVfM18xID0gX2Uuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVfMyA9IHsgZXJyb3I6IGVfM18xIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgMTJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lLnRyeXMucHVzaChbNywgLCAxMCwgMTFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISghX2EgJiYgIV9iICYmIChfYyA9IHRhYnNfMi5yZXR1cm4pKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgOV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgX2MuY2FsbCh0YWJzXzIpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgODpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2UubGFiZWwgPSA5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA5OiByZXR1cm4gWzMgLypicmVhayovLCAxMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlXzMpIHRocm93IGVfMy5lcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzcgLyplbmRmaW5hbGx5Ki9dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTogcmV0dXJuIFs3IC8qZW5kZmluYWxseSovXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsOiAnaHR0cHM6Ly8xeGJldC5jb20vZW4vYWxsZ2FtZXNlbnRyYW5jZS9jcmFzaC8nIH0sIGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcGVuZWQgYSBuZXcgdGFiIHdpdGggSUQ6IFwiLmNvbmNhdCh0YWIuaWQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFic0xpc3QucHVzaCh0YWIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaHJvbWUuZGVidWdnZXIuZGV0YWNoKHsgdGFiSWQ6IHRhYnNbMF0uaWQgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKFwiTm8gZXhpc3RpbmcgZGVidWdnZXIgdG8gZGV0YWNoIG9yIG90aGVyIGVycm9yOiBcIiwgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlcXVlc3RJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hyb21lLmRlYnVnZ2VyLmF0dGFjaCh7IHRhYklkOiB0YWIuaWQgfSwgXCIxLjNcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hyb21lLmRlYnVnZ2VyLnNlbmRDb21tYW5kKHsgdGFiSWQ6IHRhYi5pZCB9LCBcIk5ldHdvcmsuZW5hYmxlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVuZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjcmFzaDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBiZXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS5kZWJ1Z2dlci5vbkV2ZW50LmFkZExpc3RlbmVyKGZ1bmN0aW9uIChzb3VyY2UsIG1ldGhvZCwgcGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRpbWVzdGFtcExvZyA9ICdbJyArIERhdGUubm93KCkgKyAnXSAnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtZXRob2QgPT09IFwiTmV0d29yay53ZWJTb2NrZXRGcmFtZVJlY2VpdmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3RJZCAhPSBwYXJhbXMucmVxdWVzdElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGF5bG9hZFN0cmluZyA9IHBhcmFtcy5yZXNwb25zZS5wYXlsb2FkRGF0YS50b1N0cmluZygndXRmOCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkU3RyaW5nID0gcGF5bG9hZFN0cmluZy5yZXBsYWNlKC9bXlxceDIwLVxceDdFXS9nLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBheWxvYWRfMiA9IEpTT04ucGFyc2UocGF5bG9hZFN0cmluZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocGF5bG9hZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZFN0cmluZy5pbmNsdWRlcygnXCJ0YXJnZXRcIjpcIk9uQmV0c1wiJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFiZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHsgaGVhZGVyOiAnQkVUJyB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aW1lc3RhbXBMb2csICcgT25CZXRzIEV2ZW50IHRyaWdnZXJlZC4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWRTdHJpbmcuaW5jbHVkZXMoJ1widGFyZ2V0XCI6XCJPblN0YWdlXCInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh7IHN0YXJ0OiBzdGFydCwgZW5kOiBlbmQsIG9kZDogY3Jhc2ggfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHsgaGVhZGVyOiAnREFUQScsIGRhdGE6IHsgc3RhcnQ6IHN0YXJ0LCBlbmQ6IGVuZCwgb2RkOiBjcmFzaCB9IH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWRTdHJpbmcuaW5jbHVkZXMoJ1widGFyZ2V0XCI6XCJPblN0YXJ0XCInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHMgPSBwYXlsb2FkXzIuYXJndW1lbnRzWzBdLnRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydCA9IHRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZFN0cmluZy5pbmNsdWRlcygnXCJ0eXBlXCI6MSxcInRhcmdldFwiOlwiT25DcmFzaFwiJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmV0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSA9IHBheWxvYWRfMi5hcmd1bWVudHNbMF0sIGYgPSBfYS5mLCB0cyA9IF9hLnRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmFzaCA9IGY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IHRzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlwiLmNvbmNhdCh0aW1lc3RhbXBMb2csIFwiIFwiKS5jb25jYXQoZiwgXCIsIFwiKS5jb25jYXQoc3RhcnQsIFwiLCBcIikuY29uY2F0KHRzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHsgaGVhZGVyOiAnQ1JBU0gnLCBkYXRhOiB7IG9kZDogZiB9IH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHRpbWVzdGFtcExvZywgJ0Vycm9yIHByb2Nlc3NpbmcgV2ViU29ja2V0IGZyYW1lOicsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChtZXRob2QgPT09IFwiTmV0d29yay53ZWJTb2NrZXRGcmFtZVNlbnRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIldlYlNvY2tldCBmcmFtZSBzZW50OiBcIiwgcGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2UubGFiZWwgPSAxMztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTM6IHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2UubGFiZWwgPSAxNDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxNDogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTsgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHBheWxvYWQuaGVhZGVyID09ICdIT0xEJyB8fCBwYXlsb2FkLmhlYWRlciA9PSAnU1RPUCcpKSByZXR1cm4gWzMgLypicmVhayovLCAxMl07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGFic0xpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9lLmxhYmVsID0gMTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBfZS50cnlzLnB1c2goWzEsIDYsIDcsIDEyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2xvb3BfMSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2QgPSB0YWJzTGlzdF8xXzEudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFiID0gX2Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWUuZGVidWdnZXIuZGV0YWNoKHsgdGFiSWQ6IHRhYi5pZCB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIGV4aXN0aW5nIGRlYnVnZ2VyIHRvIGRldGFjaCBvciBvdGhlciBlcnJvcjogXCIsIGNocm9tZS5ydW50aW1lLmxhc3RFcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnJlbW92ZSh0YWIuaWQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNsb3NlZCB0YWIgd2l0aCBJRDogXCIuY29uY2F0KHRhYi5pZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJzTGlzdC5zcGxpY2UoMCwgdGFic0xpc3QubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgX2EgPSB0cnVlLCB0YWJzTGlzdF8xID0gX19hc3luY1ZhbHVlcyh0YWJzTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2UubGFiZWwgPSAyO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0YWJzTGlzdF8xLm5leHQoKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodGFic0xpc3RfMV8xID0gX2Uuc2VudCgpLCBfYiA9IHRhYnNMaXN0XzFfMS5kb25lLCAhX2IpKSByZXR1cm4gWzMgLypicmVhayovLCA1XTtcclxuICAgICAgICAgICAgICAgICAgICBfbG9vcF8xKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2UubGFiZWwgPSA0O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gWzMgLypicmVhayovLCAyXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIFszIC8qYnJlYWsqLywgMTJdO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgICAgIGVfMV8xID0gX2Uuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgMTJdO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgICAgIF9lLnRyeXMucHVzaChbNywgLCAxMCwgMTFdKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISghX2EgJiYgIV9iICYmIChfYyA9IHRhYnNMaXN0XzEucmV0dXJuKSkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDldO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIF9jLmNhbGwodGFic0xpc3RfMSldO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgICAgICAgIF9lLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBfZS5sYWJlbCA9IDk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDk6IHJldHVybiBbMyAvKmJyZWFrKi8sIDExXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTA6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNyAvKmVuZGZpbmFsbHkqL107XHJcbiAgICAgICAgICAgICAgICBjYXNlIDExOiByZXR1cm4gWzcgLyplbmRmaW5hbGx5Ki9dO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxMjogcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTsgfTtcclxuICAgIHNvY2tldC5vbmNsb3NlID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1dlYlNvY2tldCBjb25uZWN0aW9uIGNsb3NlZDonLCBldmVudCk7XHJcbiAgICAgICAgY2hyb21lLmFjdGlvbi5zZXRJY29uKHsgcGF0aDogJ2ljb25zL3NvY2tldC1pbmFjdGl2ZS5wbmcnIH0pO1xyXG4gICAgICAgIHNldFRpbWVvdXQoY29ubmVjdFdlYlNvY2tldCwgMTAwMCk7XHJcbiAgICB9O1xyXG4gICAgc29ja2V0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdXZWJTb2NrZXQgZXJyb3I6JywgZXJyb3IpO1xyXG4gICAgfTtcclxufVxyXG5jb25uZWN0V2ViU29ja2V0KCk7XHJcbmNocm9tZS5zY3JpcHRpbmdcclxuICAgIC5nZXRSZWdpc3RlcmVkQ29udGVudFNjcmlwdHMoKVxyXG4gICAgLnRoZW4oZnVuY3Rpb24gKHNjcmlwdHMpIHsgcmV0dXJuIGNvbnNvbGUubG9nKFwicmVnaXN0ZXJlZCBjb250ZW50IHNjcmlwdHNcIiwgc2NyaXB0cyk7IH0pO1xyXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoZnVuY3Rpb24gKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XHJcbiAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShyZXF1ZXN0KSk7XHJcbn0pO1xyXG4vLyBjaHJvbWUudGFicy5xdWVyeSh7IHVybDogJ2h0dHBzOi8vMXhiZXQuY29tL2VuL2FsbGdhbWVzZW50cmFuY2UvY3Jhc2gvKicgfSwgKHRhYnM6IGFueVtdKSA9PiB7XHJcbi8vICAgaWYgKHRhYnMubGVuZ3RoID4gMCkge1xyXG4vLyAgICAgY2hyb21lLmRlYnVnZ2VyLmRldGFjaCh7IHRhYklkOiB0YWJzWzBdLmlkIH0sICgpID0+IHtcclxuLy8gICAgICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xyXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gZXhpc3RpbmcgZGVidWdnZXIgdG8gZGV0YWNoIG9yIG90aGVyIGVycm9yOiBcIiwgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICB9KVxyXG4vLyAgICAgbGV0IHJlcXVlc3RJZDogYW55XHJcbi8vICAgICBjaHJvbWUuZGVidWdnZXIuYXR0YWNoKHsgdGFiSWQ6IHRhYnNbMF0uaWQgfSwgXCIxLjNcIiwgKCkgPT4ge1xyXG4vLyAgICAgICBjaHJvbWUuZGVidWdnZXIuc2VuZENvbW1hbmQoeyB0YWJJZDogdGFic1swXS5pZCB9LCBcIk5ldHdvcmsuZW5hYmxlXCIpO1xyXG4vLyAgICAgICB2YXIgc3RhcnQ6IGFueVxyXG4vLyAgICAgICB2YXIgZW5kOiBhbnlcclxuLy8gICAgICAgdmFyIGNyYXNoOiBhbnlcclxuLy8gICAgICAgdmFyIGJldCA9IGZhbHNlXHJcbi8vICAgICAgIGNocm9tZS5kZWJ1Z2dlci5vbkV2ZW50LmFkZExpc3RlbmVyKChzb3VyY2UsIG1ldGhvZCwgcGFyYW1zOiBhbnkpID0+IHtcclxuLy8gICAgICAgICB2YXIgdGltZXN0YW1wTG9nID0gJ1snICsgRGF0ZS5ub3coKSArICddICc7XHJcbi8vICAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJOZXR3b3JrLndlYlNvY2tldEZyYW1lUmVjZWl2ZWRcIikge1xyXG4vLyAgICAgICAgICAgaWYgKHJlcXVlc3RJZCAhPSBwYXJhbXMucmVxdWVzdElkKSB7XHJcbi8vICAgICAgICAgICAgIGxldCBwYXlsb2FkU3RyaW5nID0gcGFyYW1zLnJlc3BvbnNlLnBheWxvYWREYXRhLnRvU3RyaW5nKCd1dGY4Jyk7XHJcbi8vICAgICAgICAgICAgIHRyeSB7XHJcbi8vICAgICAgICAgICAgICAgcGF5bG9hZFN0cmluZyA9IHBheWxvYWRTdHJpbmcucmVwbGFjZSgvW15cXHgyMC1cXHg3RV0vZywgJycpO1xyXG4vLyAgICAgICAgICAgICAgIGNvbnN0IHBheWxvYWQgPSBKU09OLnBhcnNlKHBheWxvYWRTdHJpbmcpO1xyXG4vLyAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBheWxvYWQpXHJcbi8vICAgICAgICAgICAgICAgaWYgKHBheWxvYWRTdHJpbmcuaW5jbHVkZXMoJ1widGFyZ2V0XCI6XCJPbkJldHNcIicpKSB7XHJcbi8vICAgICAgICAgICAgICAgICBpZiAoIWJldCkge1xyXG4vLyAgICAgICAgICAgICAgICAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeSh7IGhlYWRlcjogJ0JFVCcgfSkpXHJcbi8vICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRpbWVzdGFtcExvZywgJyBPbkJldHMgRXZlbnQgdHJpZ2dlcmVkLicpXHJcbi8vICAgICAgICAgICAgICAgICAgIGJldCA9IHRydWVcclxuLy8gICAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgaWYgKHBheWxvYWRTdHJpbmcuaW5jbHVkZXMoJ1widGFyZ2V0XCI6XCJPblN0YWdlXCInKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coeyBzdGFydDogc3RhcnQsIGVuZDogZW5kLCBvZGQ6IGNyYXNoIH0pXHJcbi8vICAgICAgICAgICAgICAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeSh7IGhlYWRlcjogJ0RBVEEnLCBkYXRhOiB7IHN0YXJ0OiBzdGFydCwgZW5kOiBlbmQsIG9kZDogY3Jhc2ggfSB9KSlcclxuLy8gICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgaWYgKHBheWxvYWRTdHJpbmcuaW5jbHVkZXMoJ1widGFyZ2V0XCI6XCJPblN0YXJ0XCInKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc3QgeyB0cyB9ID0gcGF5bG9hZC5hcmd1bWVudHNbMF07XHJcbi8vICAgICAgICAgICAgICAgICBzdGFydCA9IHRzXHJcbi8vICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgIGlmIChwYXlsb2FkU3RyaW5nLmluY2x1ZGVzKCdcInR5cGVcIjoxLFwidGFyZ2V0XCI6XCJPbkNyYXNoXCInKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgYmV0ID0gZmFsc2VcclxuLy8gICAgICAgICAgICAgICAgIGNvbnN0IHsgZiwgdHMgfSA9IHBheWxvYWQuYXJndW1lbnRzWzBdO1xyXG4vLyAgICAgICAgICAgICAgICAgY3Jhc2ggPSBmXHJcbi8vICAgICAgICAgICAgICAgICBlbmQgPSB0c1xyXG4vLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7dGltZXN0YW1wTG9nfSAke2Z9LCAke3N0YXJ0fSwgJHt0c31gKTtcclxuLy8gICAgICAgICAgICAgICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHsgaGVhZGVyOiAnQ1JBU0gnLCBkYXRhOiB7IG9kZDogZiB9IH0pKVxyXG4vLyAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuLy8gICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKHRpbWVzdGFtcExvZywgJ0Vycm9yIHByb2Nlc3NpbmcgV2ViU29ja2V0IGZyYW1lOicsIGVycm9yKTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSBcIk5ldHdvcmsud2ViU29ja2V0RnJhbWVTZW50XCIpIHtcclxuLy8gICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiV2ViU29ja2V0IGZyYW1lIHNlbnQ6IFwiLCBwYXJhbXMpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgfSk7XHJcbi8vICAgICB9KTtcclxuLy8gICB9XHJcbi8vIH0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=