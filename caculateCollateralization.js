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
Object.defineProperty(exports, "__esModule", { value: true });
var cosmwasm_stargate_1 = require("@cosmjs/cosmwasm-stargate");
var decimal_js_1 = require("decimal.js");
// mock api to get asset price
var getAssetPrice = function (asset) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        //const response = await axios.get(`https://api.pricing.com/${asset}`);
        return [2 /*return*/, new decimal_js_1.default(1.69)];
    });
}); };
var calculateCollateralizationRatio = function () { return __awaiter(void 0, void 0, void 0, function () {
    var rpcEndpoint, contractAddress, client, userAddress, queryMsg, positions, collateralValue, debtValue, ratio, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                rpcEndpoint = "https://rpc-osmosis.blockapsis.com";
                contractAddress = "osmo1c3ljch9dfw5kf52nfwpxd2zmj2ese7agnx0p9tenkrryasrle5sqf3ftpg";
                return [4 /*yield*/, cosmwasm_stargate_1.CosmWasmClient.connect(rpcEndpoint)];
            case 1:
                client = _a.sent();
                userAddress = "osmo17fp60d0uuxne7z0lqf3x4a3s390m3qqm5w93xm";
                queryMsg = { user_position: { user: userAddress } };
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, client.queryContractSmart(contractAddress, queryMsg)];
            case 3:
                positions = _a.sent();
                console.log(positions);
                collateralValue = new decimal_js_1.default(positions.total_enabled_collateral / 1000000);
                debtValue = new decimal_js_1.default(positions.total_collateralized_debt / 1000000);
                if (debtValue.equals(new decimal_js_1.default(0)) ? 0 : collateralValue.div(debtValue)) {
                    console.log("Debt value is 0, cannot calculate collateralization ratio.");
                    return [2 /*return*/, 0];
                }
                ratio = collateralValue.div(debtValue);
                // console.log("collateralsPrice:", collateralsPrice);
                // console.log("debtsPrice:", debtsPrice);
                console.log("collateralValue:", collateralValue);
                console.log("debtValue:", debtValue);
                console.log("Collateralization Ratio:", ratio.toString());
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.error("Error calculating collateralization ratio:", error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
calculateCollateralizationRatio().then(function (r) { return console.log("Finiseh all steps."); });
