
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/slots/Machine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e75a3lPjzhNLb8z3HrM6PP0', 'Machine');
// scripts/slots/Machine.ts

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
Object.defineProperty(exports, "__esModule", { value: true });
var SlotEnum_1 = require("../SlotEnum");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Machine = /** @class */ (function (_super) {
    __extends(Machine, _super);
    function Machine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.button = null;
        _this._reelPrefab = null;
        _this._numberOfReels = 3;
        _this.reels = [];
        _this.spinning = false;
        _this.winningRows = [];
        return _this;
    }
    Object.defineProperty(Machine.prototype, "reelPrefab", {
        get: function () {
            return this._reelPrefab;
        },
        set: function (newPrefab) {
            this._reelPrefab = newPrefab;
            this.node.removeAllChildren();
            if (newPrefab !== null) {
                this.createMachine();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Machine.prototype, "numberOfReels", {
        get: function () {
            return this._numberOfReels;
        },
        set: function (newNumber) {
            this._numberOfReels = newNumber;
            if (this.reelPrefab !== null) {
                this.createMachine();
            }
        },
        enumerable: false,
        configurable: true
    });
    //Start
    Machine.prototype.createMachine = function () {
        this.node.destroyAllChildren();
        this.reels = [];
        var newReel;
        for (var i = 0; i < this.numberOfReels; i += 1) {
            newReel = cc.instantiate(this.reelPrefab);
            this.node.addChild(newReel);
            this.reels[i] = newReel;
            var reelScript = newReel.getComponent('Reel');
            reelScript.shuffle();
            reelScript.reelAnchor.getComponent(cc.Layout).enabled = false;
        }
        this.node.getComponent(cc.Widget).updateAlignment();
    };
    //Resets at each click (if not already spinning)
    Machine.prototype.spin = function () {
        this.createMachine();
        this.spinning = true;
        this.button.getChildByName('Label').getComponent(cc.Label).string = 'STOP';
        for (var i = 0; i < this.numberOfReels; i += 1) {
            var theReel = this.reels[i].getComponent('Reel');
            if (i % 2) {
                theReel.spinDirection = SlotEnum_1.default.Direction.Down;
            }
            else {
                theReel.spinDirection = SlotEnum_1.default.Direction.Up;
            }
            theReel.doSpin(0.03 * i);
        }
    };
    Machine.prototype.lock = function () {
        this.button.getComponent(cc.Button).interactable = false;
    };
    //Stop function, called by Manager and pass values to Reels
    Machine.prototype.stop = function (result) {
        var _this = this;
        if (result === void 0) { result = null; }
        setTimeout(function () { _this.celebrateWin(); }, 1500 + this.numberOfReels * 300);
        setTimeout(function () {
            _this.spinning = false;
            _this.button.getComponent(cc.Button).interactable = true;
            _this.button.getChildByName('Label').getComponent(cc.Label).string = 'SPIN';
        }, 2000 + this.numberOfReels * 300);
        var rngMod = Math.random() / 2;
        var _loop_1 = function (i) {
            var spinDelay = i < 2 + rngMod ? i / 4 : rngMod * (i - 2) + i / 4;
            var theReel = this_1.reels[i].getComponent('Reel');
            setTimeout(function () { theReel.readyStop(result[i]); }, spinDelay * 1000);
        };
        var this_1 = this;
        for (var i = 0; i < this.numberOfReels; i += 1) {
            _loop_1(i);
        }
    };
    //Triggers glow if there is a winning row
    Machine.prototype.celebrateWin = function () {
        if (this.winningRows.length > 0) {
            for (var i = 0; i < this.winningRows.length; i += 1) {
                for (var j = 0; j < this.numberOfReels; j += 1) {
                    var theReel = this.reels[j].getComponent('Reel');
                    theReel.getTileByPosition(this.winningRows[i]).SetGlow(true);
                }
            }
        }
    };
    //Debugging tool
    Machine.prototype.debugLog = function (string) {
        console.log(string);
    };
    __decorate([
        property(cc.Node)
    ], Machine.prototype, "button", void 0);
    __decorate([
        property(cc.Prefab)
    ], Machine.prototype, "_reelPrefab", void 0);
    __decorate([
        property({ type: cc.Prefab })
    ], Machine.prototype, "reelPrefab", null);
    __decorate([
        property({ type: cc.Integer })
    ], Machine.prototype, "_numberOfReels", void 0);
    __decorate([
        property({ type: cc.Integer, range: [3, 6], slide: true })
    ], Machine.prototype, "numberOfReels", null);
    Machine = __decorate([
        ccclass
    ], Machine);
    return Machine;
}(cc.Component));
exports.default = Machine;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2xvdHNcXE1hY2hpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0NBQThCO0FBRXhCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXFDLDJCQUFZO0lBQWpEO1FBQUEscUVBcUhDO1FBbkhRLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFHdkIsaUJBQVcsR0FBRyxJQUFJLENBQUM7UUFpQm5CLG9CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBZWxCLFdBQUssR0FBRyxFQUFFLENBQUM7UUFDWixjQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGlCQUFXLEdBQUcsRUFBRSxDQUFDOztJQThFMUIsQ0FBQztJQTdHQyxzQkFBSSwrQkFBVTthQUFkO1lBQ0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzFCLENBQUM7YUFFRCxVQUFlLFNBQW9CO1lBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO1lBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUU5QixJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN0QjtRQUNILENBQUM7OztPQVRBO0lBZUQsc0JBQUksa0NBQWE7YUFBakI7WUFDRSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDN0IsQ0FBQzthQUVELFVBQWtCLFNBQWlCO1lBQ2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO1lBRWhDLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN0QjtRQUNILENBQUM7OztPQVJBO0lBY0MsT0FBTztJQUNULCtCQUFhLEdBQWI7UUFDRSxJ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QUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2hFO2FBQ0Y7U0FDRjtJQUNILENBQUM7SUFFQyxnQkFBZ0I7SUFDbEIsMEJBQVEsR0FBUixVQUFTLE1BQU07UUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFqSEQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzsyQ0FDWTtJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2dEQUNNO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQzs2Q0FHN0I7SUFZRDtRQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7bURBQ0w7SUFHMUI7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO2dEQUcxRDtJQTNCa0IsT0FBTztRQUQzQixPQUFPO09BQ2EsT0FBTyxDQXFIM0I7SUFBRCxjQUFDO0NBckhELEFBcUhDLENBckhvQyxFQUFFLENBQUMsU0FBUyxHQXFIaEQ7a0JBckhvQixPQUFPIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEF1eCBmcm9tICcuLi9TbG90RW51bSc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFjaGluZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgcHVibGljIGJ1dHRvbjogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gIEBwcm9wZXJ0eShjYy5QcmVmYWIpXHJcbiAgcHVibGljIF9yZWVsUHJlZmFiID0gbnVsbDtcclxuXHJcbiAgQHByb3BlcnR5KHsgdHlwZTogY2MuUHJlZmFiIH0pXHJcbiAgZ2V0IHJlZWxQcmVmYWIoKTogY2MuUHJlZmFiIHtcclxuICAgIHJldHVybiB0aGlzLl9yZWVsUHJlZmFiO1xyXG4gIH1cclxuXHJcbiAgc2V0IHJlZWxQcmVmYWIobmV3UHJlZmFiOiBjYy5QcmVmYWIpIHtcclxuICAgIHRoaXMuX3JlZWxQcmVmYWIgPSBuZXdQcmVmYWI7XHJcbiAgICB0aGlzLm5vZGUucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuXHJcbiAgICBpZiAobmV3UHJlZmFiICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuY3JlYXRlTWFjaGluZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQHByb3BlcnR5KHsgdHlwZTogY2MuSW50ZWdlciB9KVxyXG4gIHB1YmxpYyBfbnVtYmVyT2ZSZWVscyA9IDM7XHJcblxyXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkludGVnZXIsIHJhbmdlOiBbMywgNl0sIHNsaWRlOiB0cnVlIH0pXHJcbiAgZ2V0IG51bWJlck9mUmVlbHMoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9udW1iZXJPZlJlZWxzO1xyXG4gIH1cclxuXHJcbiAgc2V0IG51bWJlck9mUmVlbHMobmV3TnVtYmVyOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX251bWJlck9mUmVlbHMgPSBuZXdOdW1iZXI7XHJcblxyXG4gICAgaWYgKHRoaXMucmVlbFByZWZhYiAhPT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmNyZWF0ZU1hY2hpbmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVlbHMgPSBbXTtcclxuICBwdWJsaWMgc3Bpbm5pbmcgPSBmYWxzZTtcclxuICBwdWJsaWMgd2lubmluZ1Jvd3MgPSBbXTtcclxuXHJcbiAgICAvL1N0YXJ0XHJcbiAgY3JlYXRlTWFjaGluZSgpOiB2b2lkIHtcclxuICAgIHRoaXMubm9kZS5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgIHRoaXMucmVlbHMgPSBbXTtcclxuICAgIGxldCBuZXdSZWVsOiBjYy5Ob2RlO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bWJlck9mUmVlbHM7IGkgKz0gMSkge1xyXG4gICAgICBuZXdSZWVsID0gY2MuaW5zdGFudGlhdGUodGhpcy5yZWVsUHJlZmFiKTtcclxuICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5ld1JlZWwpO1xyXG4gICAgICB0aGlzLnJlZWxzW2ldID0gbmV3UmVlbDtcclxuXHJcbiAgICAgIGNvbnN0IHJlZWxTY3JpcHQgPSBuZXdSZWVsLmdldENvbXBvbmVudCgnUmVlbCcpO1xyXG4gICAgICByZWVsU2NyaXB0LnNodWZmbGUoKTtcclxuICAgICAgcmVlbFNjcmlwdC5yZWVsQW5jaG9yLmdldENvbXBvbmVudChjYy5MYXlvdXQpLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLldpZGdldCkudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgfVxyXG5cclxuICAgIC8vUmVzZXRzIGF0IGVhY2ggY2xpY2sgKGlmIG5vdCBhbHJlYWR5IHNwaW5uaW5nKVxyXG4gIHNwaW4oKTogdm9pZCB7XHJcbiAgICB0aGlzLmNyZWF0ZU1hY2hpbmUoKTtcclxuICAgIHRoaXMuc3Bpbm5pbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5idXR0b24uZ2V0Q2hpbGRCeU5hbWUoJ0xhYmVsJykuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSAnU1RPUCc7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bWJlck9mUmVlbHM7IGkgKz0gMSkge1xyXG4gICAgICBjb25zdCB0aGVSZWVsID0gdGhpcy5yZWVsc1tpXS5nZXRDb21wb25lbnQoJ1JlZWwnKTtcclxuXHJcbiAgICAgIGlmIChpICUgMikge1xyXG4gICAgICAgIHRoZVJlZWwuc3BpbkRpcmVjdGlvbiA9IEF1eC5EaXJlY3Rpb24uRG93bjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGVSZWVsLnNwaW5EaXJlY3Rpb24gPSBBdXguRGlyZWN0aW9uLlVwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGVSZWVsLmRvU3BpbigwLjAzICogaSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsb2NrKCk6IHZvaWQge1xyXG4gICAgdGhpcy5idXR0b24uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbikuaW50ZXJhY3RhYmxlID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAgIC8vU3RvcCBmdW5jdGlvbiwgY2FsbGVkIGJ5IE1hbmFnZXIgYW5kIHBhc3MgdmFsdWVzIHRvIFJlZWxzXHJcbiAgICBzdG9wKHJlc3VsdDogQXJyYXk8QXJyYXk8bnVtYmVyPj4gPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IHRoaXMuY2VsZWJyYXRlV2luKCk7IH0sIDE1MDAgKyB0aGlzLm51bWJlck9mUmVlbHMgKiAzMDApO1xyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLnNwaW5uaW5nID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuYnV0dG9uLmdldENvbXBvbmVudChjYy5CdXR0b24pLmludGVyYWN0YWJsZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuYnV0dG9uLmdldENoaWxkQnlOYW1lKCdMYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gJ1NQSU4nO1xyXG4gICAgfSwgMjAwMCArIHRoaXMubnVtYmVyT2ZSZWVscyAqIDMwMCk7XHJcblxyXG4gICAgY29uc3Qgcm5nTW9kID0gTWF0aC5yYW5kb20oKSAvIDI7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtYmVyT2ZSZWVsczsgaSArPSAxKSB7XHJcbiAgICAgIGNvbnN0IHNwaW5EZWxheSA9IGkgPCAyICsgcm5nTW9kID8gaSAvIDQgOiBybmdNb2QgKiAoaSAtIDIpICsgaSAvIDQ7XHJcbiAgICAgIGNvbnN0IHRoZVJlZWwgPSB0aGlzLnJlZWxzW2ldLmdldENvbXBvbmVudCgnUmVlbCcpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhlUmVlbC5yZWFkeVN0b3AocmVzdWx0W2ldKTsgfSwgc3BpbkRlbGF5ICogMTAwMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAgIC8vVHJpZ2dlcnMgZ2xvdyBpZiB0aGVyZSBpcyBhIHdpbm5pbmcgcm93XHJcbiAgY2VsZWJyYXRlV2luKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMud2lubmluZ1Jvd3MubGVuZ3RoID4gMCkge1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMud2lubmluZ1Jvd3MubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMubnVtYmVyT2ZSZWVsczsgaiArPSAxKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRoZVJlZWwgPSB0aGlzLnJlZWxzW2pdLmdldENvbXBvbmVudCgnUmVlbCcpO1xyXG4gICAgICAgICAgICB0aGVSZWVsLmdldFRpbGVCeVBvc2l0aW9uKHRoaXMud2lubmluZ1Jvd3NbaV0pLlNldEdsb3codHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAgIC8vRGVidWdnaW5nIHRvb2xcclxuICBkZWJ1Z0xvZyhzdHJpbmcpOiBhbnkge1xyXG4gICAgY29uc29sZS5sb2coc3RyaW5nKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==