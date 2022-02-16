"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var factory_abi_json_1 = __importDefault(require("./factory_abi.json"));
var wbnb_abi_json_1 = __importDefault(require("./wbnb_abi.json"));
var pair_abi_json_1 = __importDefault(require("./pair_abi.json"));
var busd_abi_json_1 = __importDefault(require("./busd_abi.json"));
var router_abi_json_1 = __importDefault(require("./router_abi.json"));
exports.default = {
    factory_abi: factory_abi_json_1.default,
    wbnb_abi: wbnb_abi_json_1.default,
    pair_abi: pair_abi_json_1.default,
    busd_abi: busd_abi_json_1.default,
    router_abi: router_abi_json_1.default,
};
