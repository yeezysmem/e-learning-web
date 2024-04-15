"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var axios_1 = require("axios");
var https_1 = require("https");
var crypto_1 = require("crypto");
// Constants for the server and API configuration
var port = 3040;
var baseUrl = "https://chat.openai.com";
var apiUrl = "".concat(baseUrl, "/backend-api/conversation");
var refreshInterval = 60000; // Interval to refresh token in ms
var errorWait = 120000; // Wait time in ms after an error
// Initialize global variables to store the session token and device ID
var token;
var oaiDeviceId;
// Function to wait for a specified duration
var wait = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
function GenerateCompletionId(prefix) {
    if (prefix === void 0) { prefix = "cmpl-"; }
    var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var length = 28;
    for (var i = 0; i < length; i++) {
        prefix += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return prefix;
}
function chunksToLines(chunksAsync) {
    return __asyncGenerator(this, arguments, function chunksToLines_1() {
        var previous, _a, chunksAsync_1, chunksAsync_1_1, chunk, bufferChunk, eolIndex, line, e_1_1;
        var _b, e_1, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    previous = "";
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 10, 11, 16]);
                    _a = true, chunksAsync_1 = __asyncValues(chunksAsync);
                    _e.label = 2;
                case 2: return [4 /*yield*/, __await(chunksAsync_1.next())];
                case 3:
                    if (!(chunksAsync_1_1 = _e.sent(), _b = chunksAsync_1_1.done, !_b)) return [3 /*break*/, 9];
                    _d = chunksAsync_1_1.value;
                    _a = false;
                    chunk = _d;
                    bufferChunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
                    previous += bufferChunk;
                    eolIndex = void 0;
                    _e.label = 4;
                case 4:
                    if (!((eolIndex = previous.indexOf("\n")) >= 0)) return [3 /*break*/, 8];
                    line = previous.slice(0, eolIndex + 1).trimEnd();
                    if (line === "data: [DONE]")
                        return [3 /*break*/, 8];
                    if (!line.startsWith("data: ")) return [3 /*break*/, 7];
                    return [4 /*yield*/, __await(line)];
                case 5: return [4 /*yield*/, _e.sent()];
                case 6:
                    _e.sent();
                    _e.label = 7;
                case 7:
                    previous = previous.slice(eolIndex + 1);
                    return [3 /*break*/, 4];
                case 8:
                    _a = true;
                    return [3 /*break*/, 2];
                case 9: return [3 /*break*/, 16];
                case 10:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 16];
                case 11:
                    _e.trys.push([11, , 14, 15]);
                    if (!(!_a && !_b && (_c = chunksAsync_1.return))) return [3 /*break*/, 13];
                    return [4 /*yield*/, __await(_c.call(chunksAsync_1))];
                case 12:
                    _e.sent();
                    _e.label = 13;
                case 13: return [3 /*break*/, 15];
                case 14:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 15: return [7 /*endfinally*/];
                case 16: return [2 /*return*/];
            }
        });
    });
}
function linesToMessages(linesAsync) {
    return __asyncGenerator(this, arguments, function linesToMessages_1() {
        var _a, linesAsync_1, linesAsync_1_1, line, message, e_2_1;
        var _b, e_2, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 7, 8, 13]);
                    _a = true, linesAsync_1 = __asyncValues(linesAsync);
                    _e.label = 1;
                case 1: return [4 /*yield*/, __await(linesAsync_1.next())];
                case 2:
                    if (!(linesAsync_1_1 = _e.sent(), _b = linesAsync_1_1.done, !_b)) return [3 /*break*/, 6];
                    _d = linesAsync_1_1.value;
                    _a = false;
                    line = _d;
                    message = line.substring("data :".length);
                    return [4 /*yield*/, __await(message)];
                case 3: return [4 /*yield*/, _e.sent()];
                case 4:
                    _e.sent();
                    _e.label = 5;
                case 5:
                    _a = true;
                    return [3 /*break*/, 1];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_2_1 = _e.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _e.trys.push([8, , 11, 12]);
                    if (!(!_a && !_b && (_c = linesAsync_1.return))) return [3 /*break*/, 10];
                    return [4 /*yield*/, __await(_c.call(linesAsync_1))];
                case 9:
                    _e.sent();
                    _e.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    });
}
function StreamCompletion(data) {
    return __asyncGenerator(this, arguments, function StreamCompletion_1() {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(linesToMessages(chunksToLines(data)))))];
                case 1: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Setup axios instance for API requests with predefined configurations
var axiosInstance = axios_1.default.create({
    httpsAgent: new https_1.default.Agent({ rejectUnauthorized: false }),
    headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "oai-language": "en-US",
        origin: baseUrl,
        pragma: "no-cache",
        referer: baseUrl,
        "sec-ch-ua": '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    },
});
// Function to get a new session ID and token from the OpenAI API
function getNewSessionId() {
    return __awaiter(this, void 0, void 0, function () {
        var newDeviceId, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newDeviceId = (0, crypto_1.randomUUID)();
                    return [4 /*yield*/, axiosInstance.post("".concat(baseUrl, "/backend-anon/sentinel/chat-requirements"), {}, {
                            headers: { "oai-device-id": newDeviceId },
                        })];
                case 1:
                    response = _a.sent();
                    console.log("System: Successfully refreshed session ID and token. ".concat(!token ? "(Now it's ready to process requests)" : ""));
                    oaiDeviceId = newDeviceId;
                    token = response.data.token;
                    return [2 /*return*/];
            }
        });
    });
}
// Middleware to enable CORS and handle pre-flight requests
function enableCORS(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
}
// Middleware to handle chat completions
function handleChatCompletion(req, res) {
    var _a, e_3, _b, _c;
    var _d, _e, _f, _g, _h, _j;
    return __awaiter(this, void 0, void 0, function () {
        var body, response, fullContent, requestId, created, _k, _l, _m, message, parsed, content, _i, _o, message_1, response_1, e_3_1, error_1;
        return __generator(this, function (_p) {
            switch (_p.label) {
                case 0:
                    console.log("Request:", "".concat(req.method, " ").concat(req.originalUrl), "".concat((_f = (_e = (_d = req.body) === null || _d === void 0 ? void 0 : _d.messages) === null || _e === void 0 ? void 0 : _e.length) !== null && _f !== void 0 ? _f : 0, " messages"), req.body.stream ? "(stream-enabled)" : "(stream-disabled)");
                    _p.label = 1;
                case 1:
                    _p.trys.push([1, 15, , 16]);
                    body = {
                        action: "next",
                        messages: req.body.messages.map(function (message) { return ({
                            author: { role: message.role },
                            content: { content_type: "text", parts: [message.content] },
                        }); }),
                        parent_message_id: (0, crypto_1.randomUUID)(),
                        model: "text-davinci-002-render-sha",
                        timezone_offset_min: -180,
                        suggestions: [],
                        history_and_training_disabled: true,
                        conversation_mode: { kind: "primary_assistant" },
                        websocket_request_id: (0, crypto_1.randomUUID)(),
                    };
                    return [4 /*yield*/, axiosInstance.post(apiUrl, body, {
                            responseType: "stream",
                            headers: {
                                "oai-device-id": oaiDeviceId,
                                "openai-sentinel-chat-requirements-token": token,
                            },
                        })];
                case 2:
                    response = _p.sent();
                    // Set the response headers based on the request type
                    if (req.body.stream) {
                        res.setHeader("Content-Type", "text/event-stream");
                        res.setHeader("Cache-Control", "no-cache");
                        res.setHeader("Connection", "keep-alive");
                    }
                    else {
                        res.setHeader("Content-Type", "application/json");
                    }
                    fullContent = "";
                    requestId = GenerateCompletionId("chatcmpl-");
                    created = Date.now();
                    _p.label = 3;
                case 3:
                    _p.trys.push([3, 8, 9, 14]);
                    _k = true, _l = __asyncValues(StreamCompletion(response.data));
                    _p.label = 4;
                case 4: return [4 /*yield*/, _l.next()];
                case 5:
                    if (!(_m = _p.sent(), _a = _m.done, !_a)) return [3 /*break*/, 7];
                    _c = _m.value;
                    _k = false;
                    message = _c;
                    parsed = JSON.parse(message);
                    content = (_j = (_h = (_g = parsed === null || parsed === void 0 ? void 0 : parsed.message) === null || _g === void 0 ? void 0 : _g.content) === null || _h === void 0 ? void 0 : _h.parts[0]) !== null && _j !== void 0 ? _j : "";
                    for (_i = 0, _o = req.body.messages; _i < _o.length; _i++) {
                        message_1 = _o[_i];
                        if (message_1.content === content) {
                            content = "";
                            break;
                        }
                    }
                    if (content === "")
                        return [3 /*break*/, 6];
                    if (req.body.stream) {
                        response_1 = {
                            id: requestId,
                            created: created,
                            object: "chat.completion.chunk",
                            model: "gpt-3.5-turbo",
                            choices: [
                                {
                                    delta: {
                                        content: content.replace(fullContent, ""),
                                    },
                                    index: 0,
                                    finish_reason: null,
                                },
                            ],
                        };
                        res.write("data: ".concat(JSON.stringify(response_1), "\n\n"));
                    }
                    fullContent = content.length > fullContent.length ? content : fullContent;
                    _p.label = 6;
                case 6:
                    _k = true;
                    return [3 /*break*/, 4];
                case 7: return [3 /*break*/, 14];
                case 8:
                    e_3_1 = _p.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 14];
                case 9:
                    _p.trys.push([9, , 12, 13]);
                    if (!(!_k && !_a && (_b = _l.return))) return [3 /*break*/, 11];
                    return [4 /*yield*/, _b.call(_l)];
                case 10:
                    _p.sent();
                    _p.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 13: return [7 /*endfinally*/];
                case 14:
                    if (req.body.stream) {
                        res.write("data: ".concat(JSON.stringify({
                            id: requestId,
                            created: created,
                            object: "chat.completion.chunk",
                            model: "gpt-3.5-turbo",
                            choices: [
                                {
                                    delta: {
                                        content: "",
                                    },
                                    index: 0,
                                    finish_reason: "stop",
                                },
                            ],
                        }), "\n\n"));
                    }
                    else {
                        res.write(JSON.stringify({
                            id: requestId,
                            created: created,
                            model: "gpt-3.5-turbo",
                            object: "chat.completion",
                            choices: [
                                {
                                    finish_reason: "stop",
                                    index: 0,
                                    message: {
                                        content: fullContent,
                                        role: "assistant",
                                    },
                                },
                            ],
                            usage: {
                                prompt_tokens: 0,
                                completion_tokens: 0,
                                total_tokens: 0,
                            },
                        }));
                    }
                    res.end();
                    return [3 /*break*/, 16];
                case 15:
                    error_1 = _p.sent();
                    // console.log('Error:', error.response?.data ?? error.message);
                    if (!res.headersSent)
                        res.setHeader("Content-Type", "application/json");
                    // console.error('Error handling chat completion:', error);
                    res.write(JSON.stringify({
                        status: false,
                        error: {
                            message: "An error happened, please make sure your request is SFW, or use a jailbreak to bypass the filter.",
                            type: "invalid_request_error",
                        },
                        support: "https://discord.pawan.krd",
                    }));
                    res.end();
                    return [3 /*break*/, 16];
                case 16: return [2 /*return*/];
            }
        });
    });
}
// Initialize Express app and use middlewares
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(enableCORS);
// Route to handle POST requests for chat completions
app.post("/v1/chat/completions", handleChatCompletion);
// 404 handler for unmatched routes
app.use(function (req, res) {
    return res.status(404).send({
        status: false,
        error: {
            message: "The requested endpoint was not found. please make sure to use \"http://localhost:3040/v1\" as the base URL.",
            type: "invalid_request_error",
        },
        support: "https://discord.pawan.krd",
    });
});
// Start the server and the session ID refresh loop
app.listen(port, function () {
    console.log("\uD83D\uDCA1 Server is running at http://localhost:".concat(port));
    console.log();
    console.log("\uD83D\uDD17 Base URL: http://localhost:".concat(port, "/v1"));
    console.log("\uD83D\uDD17 ChatCompletion Endpoint: http://localhost:".concat(port, "/v1/chat/completions"));
    console.log();
    console.log("📝 Author: Pawan.Krd");
    console.log("\uD83C\uDF10 Discord server: https://discord.gg/pawan");
    console.log("🌍 GitHub Repository: https://github.com/PawanOsman/ChatGPT");
    console.log("Don't forget to \u2B50 star the repository if you like this project!");
    console.log();
    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!true) return [3 /*break*/, 7];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 6]);
                    return [4 /*yield*/, getNewSessionId()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, wait(refreshInterval)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4:
                    error_2 = _a.sent();
                    console.error("Error refreshing session ID, retrying in 1 minute...");
                    console.error("If this error persists, your country may not be supported yet.");
                    console.error("If your country was the issue, please consider using a U.S. VPN.");
                    return [4 /*yield*/, wait(errorWait)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 0];
                case 7: return [2 /*return*/];
            }
        });
    }); }, 0);
});
