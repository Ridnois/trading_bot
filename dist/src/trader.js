"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pairRate = exports.contract = exports.wallet = exports.provider = void 0;
var dotenv = __importStar(require("dotenv"));
var ethers_1 = require("ethers");
var ABI_1 = __importDefault(require("./ABI"));
dotenv.config();
var _a = process.env, MAINNET_NODE_URL = _a.MAINNET_NODE_URL, PRIVATE_KEY = _a.PRIVATE_KEY, PANCAKE_FACTORY = _a.PANCAKE_FACTORY, WBNB_ADDRESS = _a.WBNB_ADDRESS, BUSD_ADDRESS = _a.BUSD_ADDRESS;
/**
 * @description handle connection with Web3 at given node rcp.
 * you can have a handler for each EVM compatible blockchain
 * @param rcp: node rcp direction, default binance mainnet
 */
var provider = function (rcp) {
    if (rcp === void 0) { rcp = MAINNET_NODE_URL; }
    return new ethers_1.ethers.providers.JsonRpcProvider(rcp);
};
exports.provider = provider;
/**
 * @description wallet handler, handle each network by separate
 * @param provider: network provider
 */
var wallet = function (provider) { return function (pk) { return new ethers_1.ethers.Wallet(Buffer.from(pk, 'hex'), provider); }; };
exports.wallet = wallet;
var contract = function (provider) { return function (abi, address) { return new ethers_1.ethers.Contract(address, abi, provider); }; };
exports.contract = contract;
/*
 * @description utility function for
 **/
var pairRate = function (contract, ordered) {
    if (ordered === void 0) { ordered = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var price, token0, token1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, contract.getReserves()];
                case 1:
                    price = _a.sent();
                    token0 = price[0], token1 = price[1];
                    token0 = token0.toString();
                    token1 = token1.toString();
                    return [2 /*return*/, [token0, token1]];
            }
        });
    });
};
exports.pairRate = pairRate;
var binance = (0, exports.provider)(MAINNET_NODE_URL);
// Handle this through cli or rest if you like
var binanceWallet = (0, exports.wallet)(binance);
var myBinanceWallet = binanceWallet(PRIVATE_KEY);
var binanceContract = (0, exports.contract)(binance);
var pancakeFactoryContract = binanceContract(ABI_1.default.factory_abi, PANCAKE_FACTORY);
var init = function () { return __awaiter(void 0, void 0, void 0, function () {
    var pairAddress, myPair, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, pancakeFactoryContract.getPair(WBNB_ADDRESS, BUSD_ADDRESS)];
            case 1:
                pairAddress = _c.sent();
                myPair = binanceContract(ABI_1.default.pair_abi, pairAddress);
                _b = (_a = console).log;
                return [4 /*yield*/, (0, exports.pairRate)(myPair)];
            case 2:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); };
init();
