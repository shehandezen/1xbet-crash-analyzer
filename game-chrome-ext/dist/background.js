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
                            var _b, e_2, _c, _d;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        _e.trys.push([0, 5, 6, 11]);
                                        _loop_2 = function () {
                                            _d = tabs_1_1.value;
                                            _a = false;
                                            try {
                                                var tab = _d;
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
                                        _a = true, tabs_1 = __asyncValues(tabs);
                                        _e.label = 1;
                                    case 1: return [4 /*yield*/, tabs_1.next()];
                                    case 2:
                                        if (!(tabs_1_1 = _e.sent(), _b = tabs_1_1.done, !_b)) return [3 /*break*/, 4];
                                        _loop_2();
                                        _e.label = 3;
                                    case 3: return [3 /*break*/, 1];
                                    case 4: return [3 /*break*/, 11];
                                    case 5:
                                        e_2_1 = _e.sent();
                                        e_2 = { error: e_2_1 };
                                        return [3 /*break*/, 11];
                                    case 6:
                                        _e.trys.push([6, , 9, 10]);
                                        if (!(!_a && !_b && (_c = tabs_1.return))) return [3 /*break*/, 8];
                                        return [4 /*yield*/, _c.call(tabs_1)];
                                    case 7:
                                        _e.sent();
                                        _e.label = 8;
                                    case 8: return [3 /*break*/, 10];
                                    case 9:
                                        if (e_2) throw e_2.error;
                                        return [7 /*endfinally*/];
                                    case 10: return [7 /*endfinally*/];
                                    case 11:
                                        tabsList.splice(0, tabsList.length);
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
                                    case 12:
                                        _e.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    if (!(payload.header == 'HOLD' || payload.header == 'STOP')) return [3 /*break*/, 13];
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 6, 7, 12]);
                    _loop_1 = function () {
                        _d = tabsList_1_1.value;
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
                case 12:
                    tabsList.splice(0, tabsList.length);
                    _e.label = 13;
                case 13: return [2 /*return*/];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNyRSxnREFBZ0QseUJBQXlCLFVBQVU7QUFDbkY7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsUUFBUTtBQUNSO0FBQ0EsSUFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL2dhbWUtY2hyb21lLWV4dC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nYW1lLWNocm9tZS1leHQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2dhbWUtY2hyb21lLWV4dC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2dhbWUtY2hyb21lLWV4dC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2dhbWUtY2hyb21lLWV4dC8uL2JhY2tncm91bmQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKGcgJiYgKGcgPSAwLCBvcFswXSAmJiAoXyA9IDApKSwgXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG52YXIgX19hc3luY1ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX19hc3luY1ZhbHVlcykgfHwgZnVuY3Rpb24gKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59O1xyXG52YXIgc29ja2V0O1xyXG52YXIgdGFic0xpc3QgPSBbXTtcclxuZXhwb3J0IGZ1bmN0aW9uIGNvbm5lY3RXZWJTb2NrZXQoKSB7XHJcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgc29ja2V0ID0gbmV3IFdlYlNvY2tldCgnd3M6Ly81LjEwNC44MS4xOTQ6NTAwMCcpO1xyXG4gICAgc29ja2V0Lm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnV2ViU29ja2V0IGNvbm5lY3Rpb24gb3BlbmVkJyk7XHJcbiAgICB9O1xyXG4gICAgc29ja2V0Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldmVudCkgeyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBwYXlsb2FkLCBfbG9vcF8xLCBfYSwgdGFic0xpc3RfMSwgdGFic0xpc3RfMV8xLCBlXzFfMTtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBfYiwgZV8xLCBfYywgX2Q7XHJcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfZSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKF9lLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoZXZlbnQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hyb21lLmFjdGlvbi5zZXRJY29uKHsgcGF0aDogJ2ljb25zL3NvY2tldC1hY3RpdmUucG5nJyB9KTtcclxuICAgICAgICAgICAgICAgICAgICBwYXlsb2FkID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZC5oZWFkZXIgPT0gJ1dBS0VVUCcgfHwgcGF5bG9hZC5oZWFkZXIgPT0gJ1NUQVJUJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWUudGFicy5xdWVyeSh7IHVybDogJ2h0dHBzOi8vMXhiZXQuY29tL2VuL2FsbGdhbWVzZW50cmFuY2UvY3Jhc2gvKicgfSwgZnVuY3Rpb24gKHRhYnMpIHsgdmFyIF9hLCB0YWJzXzEsIHRhYnNfMV8xOyByZXR1cm4gX19hd2FpdGVyKF90aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9sb29wXzIsIGVfMl8xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9iLCBlXzIsIF9jLCBfZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKF9lLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lLnRyeXMucHVzaChbMCwgNSwgNiwgMTFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9sb29wXzIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2QgPSB0YWJzXzFfMS52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YWIgPSBfZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hyb21lLmRlYnVnZ2VyLmRldGFjaCh7IHRhYklkOiB0YWIuaWQgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNocm9tZS5ydW50aW1lLmxhc3RFcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gZXhpc3RpbmcgZGVidWdnZXIgdG8gZGV0YWNoIG9yIG90aGVyIGVycm9yOiBcIiwgY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N1Y2Nlc3NmdWxseSBkZXRhY2hlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnJlbW92ZSh0YWIuaWQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDbG9zZWQgdGFiIHdpdGggSUQ6IFwiLmNvbmNhdCh0YWIuaWQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gdHJ1ZSwgdGFic18xID0gX19hc3luY1ZhbHVlcyh0YWJzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lLmxhYmVsID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gWzQgLyp5aWVsZCovLCB0YWJzXzEubmV4dCgpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEodGFic18xXzEgPSBfZS5zZW50KCksIF9iID0gdGFic18xXzEuZG9uZSwgIV9iKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfbG9vcF8yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfZS5sYWJlbCA9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzogcmV0dXJuIFszIC8qYnJlYWsqLywgMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDogcmV0dXJuIFszIC8qYnJlYWsqLywgMTFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlXzJfMSA9IF9lLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCAxMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lLnRyeXMucHVzaChbNiwgLCA5LCAxMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoIV9hICYmICFfYiAmJiAoX2MgPSB0YWJzXzEucmV0dXJuKSkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgX2MuY2FsbCh0YWJzXzEpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2Uuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2UubGFiZWwgPSA4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDg6IHJldHVybiBbMyAvKmJyZWFrKi8sIDEwXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA5OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3IC8qZW5kZmluYWxseSovXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDogcmV0dXJuIFs3IC8qZW5kZmluYWxseSovXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYnNMaXN0LnNwbGljZSgwLCB0YWJzTGlzdC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgY2hyb21lLnRhYnMuY3JlYXRlKHsgdXJsOiAnaHR0cHM6Ly8xeGJldC5jb20vZW4vYWxsZ2FtZXNlbnRyYW5jZS9jcmFzaC8nIH0sIGZ1bmN0aW9uICh0YWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcGVuZWQgYSBuZXcgdGFiIHdpdGggSUQ6IFwiLmNvbmNhdCh0YWIuaWQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFic0xpc3QucHVzaCh0YWIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVxdWVzdElkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWUuZGVidWdnZXIuYXR0YWNoKHsgdGFiSWQ6IHRhYi5pZCB9LCBcIjEuM1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRGVidWdnZXIgYXR0YWNoZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS5kZWJ1Z2dlci5zZW5kQ29tbWFuZCh7IHRhYklkOiB0YWIuaWQgfSwgXCJOZXR3b3JrLmVuYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdGFydDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3Jhc2g7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYmV0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaHJvbWUuZGVidWdnZXIub25FdmVudC5hZGRMaXN0ZW5lcihmdW5jdGlvbiAoc291cmNlLCBtZXRob2QsIHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aW1lc3RhbXBMb2cgPSAnWycgKyBEYXRlLm5vdygpICsgJ10gJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWV0aG9kID09PSBcIk5ldHdvcmsud2ViU29ja2V0RnJhbWVSZWNlaXZlZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0SWQgIT0gcGFyYW1zLnJlcXVlc3RJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBheWxvYWRTdHJpbmcgPSBwYXJhbXMucmVzcG9uc2UucGF5bG9hZERhdGEudG9TdHJpbmcoJ3V0ZjgnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFN0cmluZyA9IHBheWxvYWRTdHJpbmcucmVwbGFjZSgvW15cXHgyMC1cXHg3RV0vZywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXlsb2FkXzEgPSBKU09OLnBhcnNlKHBheWxvYWRTdHJpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBheWxvYWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWRTdHJpbmcuaW5jbHVkZXMoJ1widGFyZ2V0XCI6XCJPbkJldHNcIicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeSh7IGhlYWRlcjogJ0JFVCcgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGltZXN0YW1wTG9nLCAnIE9uQmV0cyBFdmVudCB0cmlnZ2VyZWQuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkU3RyaW5nLmluY2x1ZGVzKCdcInRhcmdldFwiOlwiT25TdGFnZVwiJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coeyBzdGFydDogc3RhcnQsIGVuZDogZW5kLCBvZGQ6IGNyYXNoIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeSh7IGhlYWRlcjogJ0RBVEEnLCBkYXRhOiB7IHN0YXJ0OiBzdGFydCwgZW5kOiBlbmQsIG9kZDogY3Jhc2ggfSB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkU3RyaW5nLmluY2x1ZGVzKCdcInRhcmdldFwiOlwiT25TdGFydFwiJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRzID0gcGF5bG9hZF8xLmFyZ3VtZW50c1swXS50cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSB0cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWRTdHJpbmcuaW5jbHVkZXMoJ1widHlwZVwiOjEsXCJ0YXJnZXRcIjpcIk9uQ3Jhc2hcIicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJldCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2EgPSBwYXlsb2FkXzEuYXJndW1lbnRzWzBdLCBmID0gX2EuZiwgdHMgPSBfYS50cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3Jhc2ggPSBmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQgPSB0cztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJcIi5jb25jYXQodGltZXN0YW1wTG9nLCBcIiBcIikuY29uY2F0KGYsIFwiLCBcIikuY29uY2F0KHN0YXJ0LCBcIiwgXCIpLmNvbmNhdCh0cykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeSh7IGhlYWRlcjogJ0NSQVNIJywgZGF0YTogeyBvZGQ6IGYgfSB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcih0aW1lc3RhbXBMb2csICdFcnJvciBwcm9jZXNzaW5nIFdlYlNvY2tldCBmcmFtZTonLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobWV0aG9kID09PSBcIk5ldHdvcmsud2ViU29ja2V0RnJhbWVTZW50XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJXZWJTb2NrZXQgZnJhbWUgc2VudDogXCIsIHBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lLnNlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIShwYXlsb2FkLmhlYWRlciA9PSAnSE9MRCcgfHwgcGF5bG9hZC5oZWFkZXIgPT0gJ1NUT1AnKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgMTNdO1xyXG4gICAgICAgICAgICAgICAgICAgIF9lLmxhYmVsID0gMTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICBfZS50cnlzLnB1c2goWzEsIDYsIDcsIDEyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2xvb3BfMSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2QgPSB0YWJzTGlzdF8xXzEudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFiID0gX2Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0YWIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hyb21lLmRlYnVnZ2VyLmRldGFjaCh7IHRhYklkOiB0YWIuaWQgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaHJvbWUucnVudGltZS5sYXN0RXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyBleGlzdGluZyBkZWJ1Z2dlciB0byBkZXRhY2ggb3Igb3RoZXIgZXJyb3I6IFwiLCBjaHJvbWUucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU3VjY2Vzc2Z1bGx5IGRldGFjaGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNocm9tZS50YWJzLnJlbW92ZSh0YWIuaWQsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2xvc2VkIHRhYiB3aXRoIElEOiBcIi5jb25jYXQodGFiLmlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBfYSA9IHRydWUsIHRhYnNMaXN0XzEgPSBfX2FzeW5jVmFsdWVzKHRhYnNMaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICBfZS5sYWJlbCA9IDI7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6IHJldHVybiBbNCAvKnlpZWxkKi8sIHRhYnNMaXN0XzEubmV4dCgpXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0YWJzTGlzdF8xXzEgPSBfZS5zZW50KCksIF9iID0gdGFic0xpc3RfMV8xLmRvbmUsICFfYikpIHJldHVybiBbMyAvKmJyZWFrKi8sIDVdO1xyXG4gICAgICAgICAgICAgICAgICAgIF9sb29wXzEoKTtcclxuICAgICAgICAgICAgICAgICAgICBfZS5sYWJlbCA9IDQ7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMyAvKmJyZWFrKi8sIDJdO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiByZXR1cm4gWzMgLypicmVhayovLCAxMl07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICAgICAgZV8xXzEgPSBfZS5zZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZV8xID0geyBlcnJvcjogZV8xXzEgfTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCAxMl07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICAgICAgX2UudHJ5cy5wdXNoKFs3LCAsIDEwLCAxMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKCFfYSAmJiAhX2IgJiYgKF9jID0gdGFic0xpc3RfMS5yZXR1cm4pKSkgcmV0dXJuIFszIC8qYnJlYWsqLywgOV07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgX2MuY2FsbCh0YWJzTGlzdF8xKV07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICAgICAgX2Uuc2VudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9lLmxhYmVsID0gOTtcclxuICAgICAgICAgICAgICAgIGNhc2UgOTogcmV0dXJuIFszIC8qYnJlYWsqLywgMTFdO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxMDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs3IC8qZW5kZmluYWxseSovXTtcclxuICAgICAgICAgICAgICAgIGNhc2UgMTE6IHJldHVybiBbNyAvKmVuZGZpbmFsbHkqL107XHJcbiAgICAgICAgICAgICAgICBjYXNlIDEyOlxyXG4gICAgICAgICAgICAgICAgICAgIHRhYnNMaXN0LnNwbGljZSgwLCB0YWJzTGlzdC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9lLmxhYmVsID0gMTM7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDEzOiByZXR1cm4gWzIgLypyZXR1cm4qL107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pOyB9O1xyXG4gICAgc29ja2V0Lm9uY2xvc2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnV2ViU29ja2V0IGNvbm5lY3Rpb24gY2xvc2VkOicsIGV2ZW50KTtcclxuICAgICAgICBjaHJvbWUuYWN0aW9uLnNldEljb24oeyBwYXRoOiAnaWNvbnMvc29ja2V0LWluYWN0aXZlLnBuZycgfSk7XHJcbiAgICAgICAgc2V0VGltZW91dChjb25uZWN0V2ViU29ja2V0LCAxMDAwKTtcclxuICAgIH07XHJcbiAgICBzb2NrZXQub25lcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1dlYlNvY2tldCBlcnJvcjonLCBlcnJvcik7XHJcbiAgICB9O1xyXG59XHJcbmNvbm5lY3RXZWJTb2NrZXQoKTtcclxuY2hyb21lLnNjcmlwdGluZ1xyXG4gICAgLmdldFJlZ2lzdGVyZWRDb250ZW50U2NyaXB0cygpXHJcbiAgICAudGhlbihmdW5jdGlvbiAoc2NyaXB0cykgeyByZXR1cm4gY29uc29sZS5sb2coXCJyZWdpc3RlcmVkIGNvbnRlbnQgc2NyaXB0c1wiLCBzY3JpcHRzKTsgfSk7XHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihmdW5jdGlvbiAocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpIHtcclxuICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHJlcXVlc3QpKTtcclxufSk7XHJcbmNocm9tZS5kZWJ1Z2dlci5vbkRldGFjaC5hZGRMaXN0ZW5lcihmdW5jdGlvbiAoc291cmNlLCByZWFzb24pIHtcclxuICAgIGNvbnNvbGUubG9nKHNvdXJjZSwgcmVhc29uKTtcclxufSk7XHJcbi8vIGNocm9tZS50YWJzLnF1ZXJ5KHsgdXJsOiAnaHR0cHM6Ly8xeGJldC5jb20vZW4vYWxsZ2FtZXNlbnRyYW5jZS9jcmFzaC8qJyB9LCAodGFiczogYW55W10pID0+IHtcclxuLy8gICBpZiAodGFicy5sZW5ndGggPiAwKSB7XHJcbi8vICAgICBjaHJvbWUuZGVidWdnZXIuZGV0YWNoKHsgdGFiSWQ6IHRhYnNbMF0uaWQgfSwgKCkgPT4ge1xyXG4vLyAgICAgICBpZiAoY2hyb21lLnJ1bnRpbWUubGFzdEVycm9yKSB7XHJcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJObyBleGlzdGluZyBkZWJ1Z2dlciB0byBkZXRhY2ggb3Igb3RoZXIgZXJyb3I6IFwiLCBjaHJvbWUucnVudGltZS5sYXN0RXJyb3IubWVzc2FnZSk7XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH0pXHJcbi8vICAgICBsZXQgcmVxdWVzdElkOiBhbnlcclxuLy8gICAgIGNocm9tZS5kZWJ1Z2dlci5hdHRhY2goeyB0YWJJZDogdGFic1swXS5pZCB9LCBcIjEuM1wiLCAoKSA9PiB7XHJcbi8vICAgICAgIGNocm9tZS5kZWJ1Z2dlci5zZW5kQ29tbWFuZCh7IHRhYklkOiB0YWJzWzBdLmlkIH0sIFwiTmV0d29yay5lbmFibGVcIik7XHJcbi8vICAgICAgIHZhciBzdGFydDogYW55XHJcbi8vICAgICAgIHZhciBlbmQ6IGFueVxyXG4vLyAgICAgICB2YXIgY3Jhc2g6IGFueVxyXG4vLyAgICAgICB2YXIgYmV0ID0gZmFsc2VcclxuLy8gICAgICAgY2hyb21lLmRlYnVnZ2VyLm9uRXZlbnQuYWRkTGlzdGVuZXIoKHNvdXJjZSwgbWV0aG9kLCBwYXJhbXM6IGFueSkgPT4ge1xyXG4vLyAgICAgICAgIHZhciB0aW1lc3RhbXBMb2cgPSAnWycgKyBEYXRlLm5vdygpICsgJ10gJztcclxuLy8gICAgICAgICBpZiAobWV0aG9kID09PSBcIk5ldHdvcmsud2ViU29ja2V0RnJhbWVSZWNlaXZlZFwiKSB7XHJcbi8vICAgICAgICAgICBpZiAocmVxdWVzdElkICE9IHBhcmFtcy5yZXF1ZXN0SWQpIHtcclxuLy8gICAgICAgICAgICAgbGV0IHBheWxvYWRTdHJpbmcgPSBwYXJhbXMucmVzcG9uc2UucGF5bG9hZERhdGEudG9TdHJpbmcoJ3V0ZjgnKTtcclxuLy8gICAgICAgICAgICAgdHJ5IHtcclxuLy8gICAgICAgICAgICAgICBwYXlsb2FkU3RyaW5nID0gcGF5bG9hZFN0cmluZy5yZXBsYWNlKC9bXlxceDIwLVxceDdFXS9nLCAnJyk7XHJcbi8vICAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IEpTT04ucGFyc2UocGF5bG9hZFN0cmluZyk7XHJcbi8vICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocGF5bG9hZClcclxuLy8gICAgICAgICAgICAgICBpZiAocGF5bG9hZFN0cmluZy5pbmNsdWRlcygnXCJ0YXJnZXRcIjpcIk9uQmV0c1wiJykpIHtcclxuLy8gICAgICAgICAgICAgICAgIGlmICghYmV0KSB7XHJcbi8vICAgICAgICAgICAgICAgICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHsgaGVhZGVyOiAnQkVUJyB9KSlcclxuLy8gICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGltZXN0YW1wTG9nLCAnIE9uQmV0cyBFdmVudCB0cmlnZ2VyZWQuJylcclxuLy8gICAgICAgICAgICAgICAgICAgYmV0ID0gdHJ1ZVxyXG4vLyAgICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICBpZiAocGF5bG9hZFN0cmluZy5pbmNsdWRlcygnXCJ0YXJnZXRcIjpcIk9uU3RhZ2VcIicpKSB7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh7IHN0YXJ0OiBzdGFydCwgZW5kOiBlbmQsIG9kZDogY3Jhc2ggfSlcclxuLy8gICAgICAgICAgICAgICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHsgaGVhZGVyOiAnREFUQScsIGRhdGE6IHsgc3RhcnQ6IHN0YXJ0LCBlbmQ6IGVuZCwgb2RkOiBjcmFzaCB9IH0pKVxyXG4vLyAgICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgICBpZiAocGF5bG9hZFN0cmluZy5pbmNsdWRlcygnXCJ0YXJnZXRcIjpcIk9uU3RhcnRcIicpKSB7XHJcbi8vICAgICAgICAgICAgICAgICBjb25zdCB7IHRzIH0gPSBwYXlsb2FkLmFyZ3VtZW50c1swXTtcclxuLy8gICAgICAgICAgICAgICAgIHN0YXJ0ID0gdHNcclxuLy8gICAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgICAgaWYgKHBheWxvYWRTdHJpbmcuaW5jbHVkZXMoJ1widHlwZVwiOjEsXCJ0YXJnZXRcIjpcIk9uQ3Jhc2hcIicpKSB7XHJcbi8vICAgICAgICAgICAgICAgICBiZXQgPSBmYWxzZVxyXG4vLyAgICAgICAgICAgICAgICAgY29uc3QgeyBmLCB0cyB9ID0gcGF5bG9hZC5hcmd1bWVudHNbMF07XHJcbi8vICAgICAgICAgICAgICAgICBjcmFzaCA9IGZcclxuLy8gICAgICAgICAgICAgICAgIGVuZCA9IHRzXHJcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHt0aW1lc3RhbXBMb2d9ICR7Zn0sICR7c3RhcnR9LCAke3RzfWApO1xyXG4vLyAgICAgICAgICAgICAgICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkoeyBoZWFkZXI6ICdDUkFTSCcsIGRhdGE6IHsgb2RkOiBmIH0gfSkpXHJcbi8vICAgICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4vLyAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IodGltZXN0YW1wTG9nLCAnRXJyb3IgcHJvY2Vzc2luZyBXZWJTb2NrZXQgZnJhbWU6JywgZXJyb3IpO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09IFwiTmV0d29yay53ZWJTb2NrZXRGcmFtZVNlbnRcIikge1xyXG4vLyAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJXZWJTb2NrZXQgZnJhbWUgc2VudDogXCIsIHBhcmFtcyk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICB9KTtcclxuLy8gICAgIH0pO1xyXG4vLyAgIH1cclxuLy8gfSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==