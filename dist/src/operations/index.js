"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
var provider = function (url) {
    new ethers_1.ethers.providers.JsonRpcProvider(url);
};
