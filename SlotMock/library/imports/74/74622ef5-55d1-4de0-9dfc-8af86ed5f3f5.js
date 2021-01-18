"use strict";
cc._RF.push(module, '7462271VdFN4J38ivhu1fP1', 'GameManager');
// scripts/GameManager.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
var SlotEnum_1 = require("../scripts/SlotEnum");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManager = /** @class */ (function (_super) {
    __extends(GameManager, _super);
    function GameManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.machine = null;
        _this.audioClick = null;
        _this.block = false;
        _this.result = null;
        _this.winningRows = [];
        return _this;
    }
    GameManager.prototype.start = function () {
        this.machine.getComponent('Machine').createMachine();
    };
    GameManager.prototype.update = function () {
        if (this.block && this.result != null) {
            this.informStop();
            this.result = null;
        }
    };
    //call function for when the button is pressed
    GameManager.prototype.click = function () {
        cc.audioEngine.playEffect(this.audioClick, false);
        if (this.machine.getComponent('Machine').spinning === false) {
            this.block = false;
            this.machine.getComponent('Machine').spin();
            this.requestResult();
        }
        else if (!this.block) {
            this.block = true;
            this.machine.getComponent('Machine').lock();
        }
    };
    //functin that calls the actual result
    GameManager.prototype.requestResult = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.result = null;
                        _a = this;
                        return [4 /*yield*/, this.getAnswer()];
                    case 1:
                        _a.result = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //randomNumber generator
    GameManager.prototype.randomNumber = function () {
        var random = Math.floor(Math.random() * 30);
        (random === 30) ? 29 : random;
        return random;
    };
    //randomNumber generator that avoids a particular number
    GameManager.prototype.avoidRandomNumber = function (number) {
        var random = this.randomNumber();
        while (number === random) {
            random = this.randomNumber();
        }
        return random;
    };
    //sets a matching row
    GameManager.prototype.getMatchingRow = function (number, reels) {
        var row = [reels];
        for (var i = 0; i < reels; i++) {
            row[i] = number;
        }
        return row;
    };
    //sets a row that is not match, the for loop is to make sure if isn't an actual random match
    GameManager.prototype.getUnmatchingRow = function (number) {
        var row = [number, this.randomNumber(), this.randomNumber(), this.randomNumber(), this.randomNumber()];
        var allEqual = true;
        for (var i = 0; i < row.length; i += 1) {
            if (number != row[i]) {
                allEqual = false;
            }
        }
        if (allEqual) {
            number = this.avoidRandomNumber(number);
        }
        return row;
    };
    //the result is a 5x5 Array so there is room for it to enter the screen
    GameManager.prototype.defineResult = function () {
        var finalResult = [];
        var leadNumbers = [];
        var numberOfReels = this.machine.getComponent('Machine')._numberOfReels;
        leadNumbers = [this.randomNumber(), this.randomNumber(), this.randomNumber(), this.randomNumber(), this.randomNumber()];
        var row0 = this.getUnmatchingRow(leadNumbers[0]);
        var row1;
        var row2;
        var row3;
        var row4 = this.getUnmatchingRow(leadNumbers[4]);
        var random = Math.random();
        if (random <= 0.07) {
            row1 = this.getMatchingRow(leadNumbers[1], numberOfReels);
            row2 = this.getMatchingRow(leadNumbers[2], numberOfReels);
            row3 = this.getMatchingRow(leadNumbers[3], numberOfReels);
            this.winningRows = [1, 2, 3];
        }
        else if (random <= 0.17) {
            var chance = Math.random();
            row1 = this.getMatchingRow(leadNumbers[1], numberOfReels);
            row2 = this.getMatchingRow(leadNumbers[2], numberOfReels);
            row3 = this.getMatchingRow(leadNumbers[3], numberOfReels);
            if (chance <= 0.33) {
                row1 = this.getUnmatchingRow(leadNumbers[1]);
                this.winningRows = [2, 3];
            }
            else if (chance <= 0.66) {
                row2 = this.getUnmatchingRow(leadNumbers[2]);
                this.winningRows = [1, 3];
            }
            else {
                row3 = this.getUnmatchingRow(leadNumbers[3]);
                this.winningRows = [1, 2];
            }
        }
        else if (random <= 0.50) {
            var chance = Math.random();
            row1 = this.getUnmatchingRow(leadNumbers[1]);
            row2 = this.getUnmatchingRow(leadNumbers[2]);
            row3 = this.getUnmatchingRow(leadNumbers[3]);
            if (chance <= 0.33) {
                row1 = this.getMatchingRow(leadNumbers[1], numberOfReels);
                this.winningRows = [1];
            }
            else if (chance <= 0.66) {
                row2 = this.getMatchingRow(leadNumbers[2], numberOfReels);
                this.winningRows = [2];
            }
            else {
                row3 = this.getMatchingRow(leadNumbers[3], numberOfReels);
                this.winningRows = [3];
            }
        }
        else {
            row1 = this.getUnmatchingRow(leadNumbers[1]);
            row2 = this.getUnmatchingRow(leadNumbers[2]);
            row3 = this.getUnmatchingRow(leadNumbers[3]);
            this.winningRows = [];
        }
        //rows become collumn for better tranfer to the reels (reel 0 will receive the element 0 of each row)
        finalResult = [
            [row0[0], row1[0], row2[0], row3[0], row4[0]],
            [row0[1], row1[1], row2[1], row3[1], row4[1]],
            [row0[2], row1[2], row2[2], row3[2], row4[2]],
            [row0[3], row1[3], row2[3], row3[3], row4[3]],
            [row0[4], row1[4], row2[4], row3[4], row4[4]],
            [row0[5], row1[5], row2[5], row3[5], row4[5]],
        ];
        this.machine.getComponent('Machine').winningRows = this.winningRows;
        return finalResult;
    };
    //returns the sequence
    GameManager.prototype.getAnswer = function () {
        var slotResult = this.defineResult();
        var promise = new Promise(function (resolve) { setTimeout(function () { resolve(slotResult); }, 1000 + 500 * Math.random()); });
        return promise;
    };
    //debuging tool
    GameManager.prototype.debugLog = function (string) {
        console.log(string);
    };
    //transfers result to the machine 
    GameManager.prototype.informStop = function () {
        var resultRelayed = this.result;
        this.machine.getComponent('Machine').stop(resultRelayed);
    };
    __decorate([
        property(cc.Node)
    ], GameManager.prototype, "machine", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], GameManager.prototype, "audioClick", void 0);
    __decorate([
        property({ type: cc.Enum(SlotEnum_1.default.Direction) })
    ], GameManager.prototype, "block", void 0);
    GameManager = __decorate([
        ccclass
    ], GameManager);
    return GameManager;
}(cc.Component));
exports.default = GameManager;

cc._RF.pop();