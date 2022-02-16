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
var ethers_1 = require("ethers");
var ABI_1 = __importDefault(require("../src/ABI"));
var dotenv = __importStar(require("dotenv"));
var utility_1 = require("./utility");
describe('Liquidity pair', function () {
    var wallet;
    var BUSD_ADDRESS = '';
    var WBNB_ADDRESS = '';
    var PANCAKE_FACTORY = '';
    // We do this because if not, ganache keeps printing every query to the network
    var log = console.log;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, MAINNET_NODE_URL, _c, PRIVATE_KEY;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    dotenv.config();
                    console.log = jest.fn();
                    _a = process.env, _b = _a.MAINNET_NODE_URL, MAINNET_NODE_URL = _b === void 0 ? '' : _b, _c = _a.PRIVATE_KEY, PRIVATE_KEY = _c === void 0 ? '' : _c;
                    BUSD_ADDRESS = process.env.BUSD_ADDRESS;
                    PANCAKE_FACTORY = process.env.PANCAKE_FACTORY;
                    WBNB_ADDRESS = process.env.WBNB_ADDRESS;
                    return [4 /*yield*/, (0, utility_1.startChain)(MAINNET_NODE_URL, PRIVATE_KEY)];
                case 1:
                    wallet = _d.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Fetch pair address on existing LP pair', function () { return __awaiter(void 0, void 0, void 0, function () {
        var pairAddress, factoryContract, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.setTimeout(20000);
                    log('This test can be slow, please be patient.');
                    pairAddress = '0x1B96B92314C44b159149f7E0303511fB2Fc4774f';
                    factoryContract = new ethers_1.ethers.Contract(PANCAKE_FACTORY, ABI_1.default.factory_abi, wallet);
                    return [4 /*yield*/, factoryContract.getPair(BUSD_ADDRESS, WBNB_ADDRESS)];
                case 1:
                    result = _a.sent();
                    expect(result).toBe(pairAddress);
                    return [2 /*return*/];
            }
        });
    }); });
    test('fetch pair address on non existing LP pair', function () { return __awaiter(void 0, void 0, void 0, function () {
        var factoryContract, mneb_address, nftb_address, expected, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    factoryContract = new ethers_1.ethers.Contract(PANCAKE_FACTORY, ABI_1.default.factory_abi, wallet);
                    mneb_address = '0xd22202d23fe7de9e3dbe11a2a88f42f4cb9507cf';
                    nftb_address = '0xde3dbbe30cfa9f437b293294d1fd64b26045c71a';
                    expected = ethers_1.ethers.constants.AddressZero;
                    return [4 /*yield*/, factoryContract.getPair(mneb_address, nftb_address)];
                case 1:
                    result = _a.sent();
                    expect(result).toBe(expected);
                    return [2 /*return*/];
            }
        });
    }); });
});
