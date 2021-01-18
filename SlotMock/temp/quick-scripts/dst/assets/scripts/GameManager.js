
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/GameManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZU1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsZ0RBQXNDO0FBRWhDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXlDLCtCQUFZO0lBQXJEO1FBQUEscUVBZ0xDO1FBOUtBLGFBQU8sR0FBRyxJQUFJLENBQUM7UUFHZixnQkFBVSxHQUFHLElBQUksQ0FBQztRQUlWLFdBQUssR0FBRyxLQUFLLENBQUM7UUFDZCxZQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2QsaUJBQVcsR0FBRyxFQUFFLENBQUM7O0lBcUsxQixDQUFDO0lBbktBLDJCQUFLLEdBQUw7UUFDQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0lBRUQsNEJBQU0sR0FBTjtRQUNDLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtZQUN0QyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDbkI7SUFDRixDQUFDO0lBRUQsOENBQThDO0lBQzlDLDJCQUFLLEdBQUw7UUFDQyxFQUFFLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWxELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRTtZQUM1RCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsT0FBTyxDQUFD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TUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFGLE9BQU8sT0FBTyxDQUFDO0lBQ2hCLENBQUM7SUFFRCxlQUFlO0lBQ2YsOEJBQVEsR0FBUixVQUFTLE1BQU07UUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxrQ0FBa0M7SUFDbEMsZ0NBQVUsR0FBVjtRQUNDLElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUE3S0Q7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztnREFDSDtJQUdmO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQzttREFDZjtJQUlsQjtRQUZDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQzs4Q0FFckI7SUFURixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBZ0wvQjtJQUFELGtCQUFDO0NBaExELEFBZ0xDLENBaEx3QyxFQUFFLENBQUMsU0FBUyxHQWdMcEQ7a0JBaExvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNsb3RFbnVtIGZyb20gJy4uL3NjcmlwdHMvU2xvdEVudW0nO1xyXG5pbXBvcnQgQXV4IGZyb20gJy4uL3NjcmlwdHMvU2xvdEVudW0nO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVNYW5hZ2VyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHRAcHJvcGVydHkoY2MuTm9kZSlcclxuXHRtYWNoaW5lID0gbnVsbDtcclxuXHJcblx0QHByb3BlcnR5KHsgdHlwZTogY2MuQXVkaW9DbGlwIH0pXHJcblx0YXVkaW9DbGljayA9IG51bGw7XHJcblxyXG5cdEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkVudW0oQXV4LkRpcmVjdGlvbikgfSlcclxuXHJcblx0cHJpdmF0ZSBibG9jayA9IGZhbHNlO1xyXG5cdHByaXZhdGUgcmVzdWx0ID0gbnVsbDtcclxuXHRwcml2YXRlIHdpbm5pbmdSb3dzID0gW107XHJcblxyXG5cdHN0YXJ0KCk6IHZvaWQge1xyXG5cdFx0dGhpcy5tYWNoaW5lLmdldENvbXBvbmVudCgnTWFjaGluZScpLmNyZWF0ZU1hY2hpbmUoKTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZSgpOiB2b2lkIHtcclxuXHRcdGlmICh0aGlzLmJsb2NrICYmIHRoaXMucmVzdWx0ICE9IG51bGwpIHtcclxuXHRcdFx0dGhpcy5pbmZvcm1TdG9wKCk7XHJcblx0XHRcdHRoaXMucmVzdWx0ID0gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vY2FsbCBmdW5jdGlvbiBmb3Igd2hlbiB0aGUgYnV0dG9uIGlzIHByZXNzZWRcclxuXHRjbGljaygpOiB2b2lkIHtcclxuXHRcdGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QodGhpcy5hdWRpb0NsaWNrLCBmYWxzZSk7XHJcblxyXG5cdFx0aWYgKHRoaXMubWFjaGluZS5nZXRDb21wb25lbnQoJ01hY2hpbmUnKS5zcGlubmluZyA9PT0gZmFsc2UpIHtcclxuXHRcdFx0dGhpcy5ibG9jayA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLm1hY2hpbmUuZ2V0Q29tcG9uZW50KCdNYWNoaW5lJykuc3BpbigpO1xyXG5cdFx0XHR0aGlzLnJlcXVlc3RSZXN1bHQoKTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKCF0aGlzLmJsb2NrKSB7XHJcblx0XHRcdHRoaXMuYmxvY2sgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLm1hY2hpbmUuZ2V0Q29tcG9uZW50KCdNYWNoaW5lJykubG9jaygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly9mdW5jdGluIHRoYXQgY2FsbHMgdGhlIGFjdHVhbCByZXN1bHRcclxuXHRhc3luYyByZXF1ZXN0UmVzdWx0KCk6IFByb21pc2U8dm9pZD4ge1xyXG5cdFx0dGhpcy5yZXN1bHQgPSBudWxsO1xyXG5cdFx0dGhpcy5yZXN1bHQgPSBhd2FpdCB0aGlzLmdldEFuc3dlcigpO1xyXG5cdH1cclxuXHJcblx0Ly9yYW5kb21OdW1iZXIgZ2VuZXJhdG9yXHJcblx0cmFuZG9tTnVtYmVyKCk6IG51bWJlciB7XHJcblx0XHRsZXQgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMzApO1xyXG5cdFx0KHJhbmRvbSA9PT0gMzApID8gMjkgOiByYW5kb207XHJcblx0XHRyZXR1cm4gcmFuZG9tO1xyXG5cdH1cclxuXHJcblx0Ly9yYW5kb21OdW1iZXIgZ2VuZXJhdG9yIHRoYXQgYXZvaWRzIGEgcGFydGljdWxhciBudW1iZXJcclxuXHRhdm9pZFJhbmRvbU51bWJlcihudW1iZXIpOiBudW1iZXIge1xyXG5cdFx0bGV0IHJhbmRvbSA9IHRoaXMucmFuZG9tTnVtYmVyKCk7XHJcblx0XHR3aGlsZSAobnVtYmVyID09PSByYW5kb20pIHtcclxuXHRcdFx0cmFuZG9tID0gdGhpcy5yYW5kb21OdW1iZXIoKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiByYW5kb207XHJcblx0fVxyXG5cclxuXHQvL3NldHMgYSBtYXRjaGluZyByb3dcclxuXHRnZXRNYXRjaGluZ1JvdyhudW1iZXIsIHJlZWxzKTogQXJyYXk8bnVtYmVyPiB7XHJcblx0XHR2YXIgcm93ID0gW3JlZWxzXTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcmVlbHM7IGkrKykge1xyXG5cdFx0XHRyb3dbaV0gPSBudW1iZXI7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcm93O1xyXG5cdH1cclxuXHJcblx0Ly9zZXRzIGEgcm93IHRoYXQgaXMgbm90IG1hdGNoLCB0aGUgZm9yIGxvb3AgaXMgdG8gbWFrZSBzdXJlIGlmIGlzbid0IGFuIGFjdHVhbCByYW5kb20gbWF0Y2hcclxuXHRnZXRVbm1hdGNoaW5nUm93KG51bWJlcik6IEFycmF5PG51bWJlcj4ge1xyXG5cdFx0dmFyIHJvdyA9IFtudW1iZXIsIHRoaXMucmFuZG9tTnVtYmVyKCksIHRoaXMucmFuZG9tTnVtYmVyKCksIHRoaXMucmFuZG9tTnVtYmVyKCksIHRoaXMucmFuZG9tTnVtYmVyKCldO1xyXG5cdFx0bGV0IGFsbEVxdWFsID0gdHJ1ZTtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcm93Lmxlbmd0aDsgaSArPSAxKSB7XHJcblx0XHRcdGlmIChudW1iZXIgIT0gcm93W2ldKSB7XHJcblx0XHRcdFx0YWxsRXF1YWwgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYgKGFsbEVxdWFsKSB7XHJcblx0XHRcdG51bWJlciA9IHRoaXMuYXZvaWRSYW5kb21OdW1iZXIobnVtYmVyKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiByb3c7XHJcblx0fVxyXG5cclxuXHQvL3RoZSByZXN1bHQgaXMgYSA1eDUgQXJyYXkgc28gdGhlcmUgaXMgcm9vbSBmb3IgaXQgdG8gZW50ZXIgdGhlIHNjcmVlblxyXG5cdGRlZmluZVJlc3VsdCgpOiBBcnJheTxBcnJheTxudW1iZXI+PiB7XHJcblx0XHR2YXIgZmluYWxSZXN1bHQgPSBbXTtcclxuXHRcdHZhciBsZWFkTnVtYmVycyA9IFtdO1xyXG5cdFx0dmFyIG51bWJlck9mUmVlbHMgPSB0aGlzLm1hY2hpbmUuZ2V0Q29tcG9uZW50KCdNYWNoaW5lJykuX251bWJlck9mUmVlbHM7XHJcblx0XHRsZWFkTnVtYmVycyA9IFt0aGlzLnJhbmRvbU51bWJlcigpLCB0aGlzLnJhbmRvbU51bWJlcigpLCB0aGlzLnJhbmRvbU51bWJlcigpLCB0aGlzLnJhbmRvbU51bWJlcigpLCB0aGlzLnJhbmRvbU51bWJlcigpXVxyXG5cdFx0dmFyIHJvdzAgPSB0aGlzLmdldFVubWF0Y2hpbmdSb3cobGVhZE51bWJlcnNbMF0pO1xyXG5cdFx0dmFyIHJvdzE7XHJcblx0XHR2YXIgcm93MjtcclxuXHRcdHZhciByb3czO1xyXG5cdFx0dmFyIHJvdzQgPSB0aGlzLmdldFVubWF0Y2hpbmdSb3cobGVhZE51bWJlcnNbNF0pO1xyXG5cdFx0bGV0IHJhbmRvbSA9IE1hdGgucmFuZG9tKCk7XHJcblx0XHRpZiAocmFuZG9tIDw9IDAuMDcpIHtcclxuXHRcdFx0cm93MSA9IHRoaXMuZ2V0TWF0Y2hpbmdSb3cobGVhZE51bWJlcnNbMV0sIG51bWJlck9mUmVlbHMpO1xyXG5cdFx0XHRyb3cyID0gdGhpcy5nZXRNYXRjaGluZ1JvdyhsZWFkTnVtYmVyc1syXSwgbnVtYmVyT2ZSZWVscyk7XHJcblx0XHRcdHJvdzMgPSB0aGlzLmdldE1hdGNoaW5nUm93KGxlYWROdW1iZXJzWzNdLCBudW1iZXJPZlJlZWxzKTtcclxuXHRcdFx0dGhpcy53aW5uaW5nUm93cyA9IFsxLCAyLCAzXTtcclxuXHRcdH1cclxuXHRcdGVsc2UgaWYgKHJhbmRvbSA8PSAwLjE3KSB7XHJcblx0XHRcdGxldCBjaGFuY2UgPSBNYXRoLnJhbmRvbSgpO1xyXG5cdFx0XHRyb3cxID0gdGhpcy5nZXRNYXRjaGluZ1JvdyhsZWFkTnVtYmVyc1sxXSwgbnVtYmVyT2ZSZWVscyk7XHJcblx0XHRcdHJvdzIgPSB0aGlzLmdldE1hdGNoaW5nUm93KGxlYWROdW1iZXJzWzJdLCBudW1iZXJPZlJlZWxzKTtcclxuXHRcdFx0cm93MyA9IHRoaXMuZ2V0TWF0Y2hpbmdSb3cobGVhZE51bWJlcnNbM10sIG51bWJlck9mUmVlbHMpO1xyXG5cdFx0XHRpZiAoY2hhbmNlIDw9IDAuMzMpIHtcclxuXHRcdFx0XHRyb3cxID0gdGhpcy5nZXRVbm1hdGNoaW5nUm93KGxlYWROdW1iZXJzWzFdKTtcclxuXHRcdFx0XHR0aGlzLndpbm5pbmdSb3dzID0gWzIsIDNdO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKGNoYW5jZSA8PSAwLjY2KSB7XHJcblx0XHRcdFx0cm93MiA9IHRoaXMuZ2V0VW5tYXRjaGluZ1JvdyhsZWFkTnVtYmVyc1syXSk7XHJcblx0XHRcdFx0dGhpcy53aW5uaW5nUm93cyA9IFsxLCAzXTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRyb3czID0gdGhpcy5nZXRVbm1hdGNoaW5nUm93KGxlYWROdW1iZXJzWzNdKTtcclxuXHRcdFx0XHR0aGlzLndpbm5pbmdSb3dzID0gWzEsIDJdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlIGlmIChyYW5kb20gPD0gMC41MCkge1xyXG5cdFx0XHRsZXQgY2hhbmNlID0gTWF0aC5yYW5kb20oKTtcclxuXHRcdFx0cm93MSA9IHRoaXMuZ2V0VW5tYXRjaGluZ1JvdyhsZWFkTnVtYmVyc1sxXSk7XHJcblx0XHRcdHJvdzIgPSB0aGlzLmdldFVubWF0Y2hpbmdSb3cobGVhZE51bWJlcnNbMl0pO1xyXG5cdFx0XHRyb3czID0gdGhpcy5nZXRVbm1hdGNoaW5nUm93KGxlYWROdW1iZXJzWzNdKTtcclxuXHRcdFx0aWYgKGNoYW5jZSA8PSAwLjMzKSB7XHJcblx0XHRcdFx0cm93MSA9IHRoaXMuZ2V0TWF0Y2hpbmdSb3cobGVhZE51bWJlcnNbMV0sIG51bWJlck9mUmVlbHMpO1xyXG5cdFx0XHRcdHRoaXMud2lubmluZ1Jvd3MgPSBbMV07XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoY2hhbmNlIDw9IDAuNjYpIHtcclxuXHRcdFx0XHRyb3cyID0gdGhpcy5nZXRNYXRjaGluZ1JvdyhsZWFkTnVtYmVyc1syXSwgbnVtYmVyT2ZSZWVscyk7XHJcblx0XHRcdFx0dGhpcy53aW5uaW5nUm93cyA9IFsyXTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRyb3czID0gdGhpcy5nZXRNYXRjaGluZ1JvdyhsZWFkTnVtYmVyc1szXSwgbnVtYmVyT2ZSZWVscyk7XHJcblx0XHRcdFx0dGhpcy53aW5uaW5nUm93cyA9IFszXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHJvdzEgPSB0aGlzLmdldFVubWF0Y2hpbmdSb3cobGVhZE51bWJlcnNbMV0pO1xyXG5cdFx0XHRyb3cyID0gdGhpcy5nZXRVbm1hdGNoaW5nUm93KGxlYWROdW1iZXJzWzJdKTtcclxuXHRcdFx0cm93MyA9IHRoaXMuZ2V0VW5tYXRjaGluZ1JvdyhsZWFkTnVtYmVyc1szXSk7XHJcblx0XHRcdHRoaXMud2lubmluZ1Jvd3MgPSBbXTtcclxuXHRcdH1cclxuXHRcdC8vcm93cyBiZWNvbWUgY29sbHVtbiBmb3IgYmV0dGVyIHRyYW5mZXIgdG8gdGhlIHJlZWxzIChyZWVsIDAgd2lsbCByZWNlaXZlIHRoZSBlbGVtZW50IDAgb2YgZWFjaCByb3cpXHJcblx0XHRmaW5hbFJlc3VsdCA9IFtcclxuXHRcdFx0W3JvdzBbMF0sIHJvdzFbMF0sIHJvdzJbMF0sIHJvdzNbMF0sIHJvdzRbMF1dLFxyXG5cdFx0XHRbcm93MFsxXSwgcm93MVsxXSwgcm93MlsxXSwgcm93M1sxXSwgcm93NFsxXV0sXHJcblx0XHRcdFtyb3cwWzJdLCByb3cxWzJdLCByb3cyWzJdLCByb3czWzJdLCByb3c0WzJdXSxcclxuXHRcdFx0W3JvdzBbM10sIHJvdzFbM10sIHJvdzJbM10sIHJvdzNbM10sIHJvdzRbM11dLFxyXG5cdFx0XHRbcm93MFs0XSwgcm93MVs0XSwgcm93Mls0XSwgcm93M1s0XSwgcm93NFs0XV0sXHJcblx0XHRcdFtyb3cwWzVdLCByb3cxWzVdLCByb3cyWzVdLCByb3czWzVdLCByb3c0WzVdXSxcclxuXHRcdF1cclxuXHRcdHRoaXMubWFjaGluZS5nZXRDb21wb25lbnQoJ01hY2hpbmUnKS53aW5uaW5nUm93cyA9IHRoaXMud2lubmluZ1Jvd3M7XHJcblx0XHRyZXR1cm4gZmluYWxSZXN1bHQ7XHJcblx0fVxyXG5cclxuXHQvL3JldHVybnMgdGhlIHNlcXVlbmNlXHJcblx0Z2V0QW5zd2VyKCk6IFByb21pc2U8QXJyYXk8QXJyYXk8bnVtYmVyPj4+IHtcclxuXHRcdHZhciBzbG90UmVzdWx0ID0gdGhpcy5kZWZpbmVSZXN1bHQoKTtcclxuXHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2U8QXJyYXk8QXJyYXk8bnVtYmVyPj4+XHJcblx0XHRcdChyZXNvbHZlID0+IHsgc2V0VGltZW91dCgoKSA9PiB7IHJlc29sdmUoc2xvdFJlc3VsdCk7IH0sIDEwMDAgKyA1MDAgKiBNYXRoLnJhbmRvbSgpKTsgfSk7XHJcblx0XHRyZXR1cm4gcHJvbWlzZTtcclxuXHR9XHJcblxyXG5cdC8vZGVidWdpbmcgdG9vbFxyXG5cdGRlYnVnTG9nKHN0cmluZyk6IGFueSB7XHJcblx0XHRjb25zb2xlLmxvZyhzdHJpbmcpO1xyXG5cdH1cclxuXHJcblx0Ly90cmFuc2ZlcnMgcmVzdWx0IHRvIHRoZSBtYWNoaW5lIFxyXG5cdGluZm9ybVN0b3AoKTogdm9pZCB7XHJcblx0XHRjb25zdCByZXN1bHRSZWxheWVkID0gdGhpcy5yZXN1bHQ7XHJcblx0XHR0aGlzLm1hY2hpbmUuZ2V0Q29tcG9uZW50KCdNYWNoaW5lJykuc3RvcChyZXN1bHRSZWxheWVkKTtcclxuXHR9XHJcbn1cclxuIl19