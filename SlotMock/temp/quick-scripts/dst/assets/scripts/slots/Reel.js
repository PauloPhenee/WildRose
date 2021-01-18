
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/slots/Reel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '91e54zzGJ5Os6qxY73m4+B5', 'Reel');
// scripts/slots/Reel.ts

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
var Reel = /** @class */ (function (_super) {
    __extends(Reel, _super);
    function Reel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.reelAnchor = null;
        _this.spinDirection = SlotEnum_1.default.Direction.Down;
        _this.tiles = [];
        _this._tilePrefab = null;
        _this.result = [];
        _this.stopSpinning = false;
        return _this;
    }
    Object.defineProperty(Reel.prototype, "tilePrefab", {
        get: function () {
            return this._tilePrefab;
        },
        set: function (newPrefab) {
            this._tilePrefab = newPrefab;
            this.reelAnchor.removeAllChildren();
            this.tiles = [];
            if (newPrefab !== null) {
                this.createReel();
                this.shuffle();
            }
        },
        enumerable: false,
        configurable: true
    });
    //Start 1 - creates the reel and populate them
    Reel.prototype.createReel = function () {
        var newTile;
        for (var i = 0; i < 5; i += 1) {
            newTile = cc.instantiate(this.tilePrefab);
            this.reelAnchor.addChild(newTile);
            this.tiles[i] = newTile;
        }
    };
    //Start 2 - sets tiles as random and not glowing
    Reel.prototype.shuffle = function () {
        for (var i = 0; i < this.tiles.length; i += 1) {
            this.tiles[i].getComponent('Tile').setRandom();
            this.tiles[i].getComponent('Tile').SetGlow(false);
        }
    };
    //Gets the predefined result and populate them on the right direction
    Reel.prototype.readyStop = function (newResult) {
        var check = this.spinDirection === SlotEnum_1.default.Direction.Down || newResult == null;
        this.result = check ? newResult : newResult.reverse();
        this.stopSpinning = true;
    };
    //Changes tile if it reached the border, setting new position and new animal
    Reel.prototype.changeCallback = function (element) {
        if (element === void 0) { element = null; }
        var el = element;
        var dirModifier = this.spinDirection === SlotEnum_1.default.Direction.Down ? -1 : 1;
        if (el.position.y * dirModifier > 288) {
            el.position = cc.v3(0, -288 * dirModifier, 0);
            var pop = null;
            if (this.result != null && this.result.length > 0) {
                pop = this.result.pop();
            }
            if (pop != null && pop >= 0) {
                el.getComponent('Tile').setTile(pop);
            }
            else {
                el.getComponent('Tile').setRandom();
            }
        }
    };
    //Gets checked if it is time to stop, otherwise spins again
    Reel.prototype.checkEndCallback = function (element) {
        if (element === void 0) { element = null; }
        var el = element;
        if (this.stopSpinning) {
            this.getComponent(cc.AudioSource).play();
            this.doStop(el);
        }
        else {
            this.doSpinning(el);
        }
    };
    //Starts the spin
    Reel.prototype.doSpin = function (windUp) {
        var _this = this;
        this.stopSpinning = false;
        this.reelAnchor.children.forEach(function (element) {
            var dirModifier = _this.spinDirection === SlotEnum_1.default.Direction.Down ? -1 : 1;
            var delay = cc.tween(element).delay(windUp);
            var start = cc.tween(element).by(0.25, { position: cc.v2(0, 144 * dirModifier) }, { easing: 'backIn' });
            var doChange = cc.tween().call(function () { return _this.changeCallback(element); });
            var callSpinning = cc.tween(element).call(function () { return _this.doSpinning(element, 5); });
            delay
                .then(start)
                .then(doChange)
                .then(callSpinning)
                .start();
        });
    };
    //Spin Loop, goes on until receives the Stop
    Reel.prototype.doSpinning = function (element, times) {
        var _this = this;
        if (element === void 0) { element = null; }
        if (times === void 0) { times = 1; }
        var dirModifier = this.spinDirection === SlotEnum_1.default.Direction.Down ? -1 : 1;
        var move = cc.tween().by(0.04, { position: cc.v2(0, 144 * dirModifier) });
        var doChange = cc.tween().call(function () { return _this.changeCallback(element); });
        var repeat = cc.tween(element).repeat(times, move.then(doChange));
        var checkEnd = cc.tween().call(function () { return _this.checkEndCallback(element); });
        repeat.then(checkEnd).start();
    };
    //Final loop with a bouce effect when it stops
    Reel.prototype.doStop = function (element) {
        var _this = this;
        if (element === void 0) { element = null; }
        var dirModifier = this.spinDirection === SlotEnum_1.default.Direction.Down ? -1 : 1;
        var move = cc.tween(element).by(0.04, { position: cc.v3(0, 144 * dirModifier, 0) });
        var doChange = cc.tween().call(function () { return _this.changeCallback(element); });
        var up = cc.tween(element).by(0.2, { position: cc.v3(0, 50 * dirModifier, 0) }, { easing: 'bounceOut' });
        var down = cc.tween(element).by(0.2, { position: cc.v3(0, 50 * dirModifier * -1, 0) }, { easing: 'bounceOut' });
        move
            .then(doChange)
            .then(move)
            .then(doChange)
            .then(move)
            .then(doChange)
            .then(up)
            .then(down)
            .start();
    };
    //Used by the Celebrate Win to locate the tiles that should glow
    Reel.prototype.getTileByPosition = function (position) {
        var tile;
        var newPosition = (position - 2) * -144;
        for (var i = 0; i < this.tiles.length; i += 1) {
            var thisNode = this.tiles[i];
            if (thisNode.position.y === newPosition) {
                tile = this.tiles[i].getComponent('Tile');
            }
        }
        return tile;
    };
    //Debugging tool
    Reel.prototype.debugLog = function (string) {
        console.log(string);
    };
    __decorate([
        property({ type: cc.Node })
    ], Reel.prototype, "reelAnchor", void 0);
    __decorate([
        property({ type: cc.Enum(SlotEnum_1.default.Direction) })
    ], Reel.prototype, "spinDirection", void 0);
    __decorate([
        property({ type: [cc.Node], visible: false })
    ], Reel.prototype, "tiles", void 0);
    __decorate([
        property({ type: cc.Prefab })
    ], Reel.prototype, "_tilePrefab", void 0);
    __decorate([
        property({ type: cc.Prefab })
    ], Reel.prototype, "tilePrefab", null);
    Reel = __decorate([
        ccclass
    ], Reel);
    return Reel;
}(cc.Component));
exports.default = Reel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2xvdHNcXFJlZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0NBQThCO0FBR3hCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWtDLHdCQUFZO0lBQTlDO1FBQUEscUVBZ0tDO1FBOUpPLGdCQUFVLEdBQUcsSUFBSSxDQUFDO1FBR2xCLG1CQUFhLEdBQUcsa0JBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBR2xDLFdBQUssR0FBRyxFQUFFLENBQUM7UUFHWixpQkFBVyxHQUFHLElBQUksQ0FBQztRQWtCbEIsWUFBTSxHQUFrQixFQUFFLENBQUM7UUFFNUIsa0JBQVksR0FBRyxLQUFLLENBQUM7O0lBaUk3QixDQUFDO0lBbEpBLHNCQUFJLDRCQUFVO2FBQWQ7WUFDQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDekIsQ0FBQzthQUVELFVBQWUsU0FBb0I7WUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7WUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBRWhCLElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNsQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDZjtRQUNGLENBQUM7OztPQVhBO0lBaUJELDhDQUE4QztJQUM5Qyx5QkFBVSxHQUFWO1FBQ0MsSUFBSSxPQUFnQixDQUFDO1FBQ3JCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUU5QixPQUFPLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7U0FFeEI7SUFDRixDQUFDO0lBRUQsZ0RBQWdEO0lBQ2hELHNCQUFPLEdBQVA7UUFDQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM5QyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUMvQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbEQ7SUFDRixDQUFDO0lBRUQscUVBQXFFO0lBQ3JFLHdCQUFTLEdBQVQsVUFBVSxTQUF3QjtRQUNqQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxLQUFLLGtCQUFHLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDO1FBQzdFLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN0RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQsNEVBQTRFO0lBQzVFLDZCQUFjLEdBQWQsVUFBZSxPQUF1QjtRQUF2Qix3QkFBQSxFQUFBLGNBQXVCO1FBQ3JDLElBQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUNuQixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxLQUFLLGtCQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLFdBQVcsR0FBRyxHQUFHLEVBQUU7WUFDdEMsRUFBRSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFOUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQ2YsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ2xELEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ3hCO1lBQ0QsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUU7Z0JBQzVCLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3JDO2lCQUNJO2dCQUNKLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDcEM7U0FDRDtJQUNGLENBQUM7SUFFRCwyREFBMkQ7SUFDM0QsK0JBQWdCLEdBQWhCLFVBQWlCLE9BQXVCO1FBQXZCLHdCQUFBLEVBQUEsY0FBdUI7UUFDdkMsSUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ25CLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2hCO2FBQ0k7WUFDSixJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3BCO0lBQ0YsQ0FBQztJQUVELGlCQUFpQjtJQUNqQixxQkFBTSxHQUFOLFVBQU8sTUFBYztRQUFyQixpQkFnQkM7UUFmQSxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO1lBQ3ZDLElBQU0sV0FBVyxHQUFHLEtBQUksQ0FBQyxhQUFhLEtBQUssa0JBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXZFLElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlDLElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQzFHLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQTVCLENBQTRCLENBQUMsQ0FBQztZQUNyRSxJQUFNLFlBQVksR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FBQztZQUUvRSxLQUFLO2lCQUNILElBQUksQ0FBQyxLQUFLLENBQUM7aUJBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQztpQkFDZCxJQUFJLENBQUMsWUFBWSxDQUFDO2lCQUNsQixLQUFLLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELDRDQUE0QztJQUM1Qyx5QkFBVSxHQUFWLFVBQVcsT0FBdUIsRUFBRSxLQUFTO1FBQTdDLGlCQVNDO1FBVFUsd0JBQUEsRUFBQSxjQUF1QjtRQUFFLHNCQUFBLEVBQUEsU0FBUztRQUM1QyxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxLQUFLLGtCQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV2RSxJQUFNLElBQUksR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVFLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQTVCLENBQTRCLENBQUMsQ0FBQztRQUNyRSxJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsRUFBOUIsQ0FBOEIsQ0FBQyxDQUFDO1FBRXZFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELDhDQUE4QztJQUM5QyxxQkFBTSxHQUFOLFVBQU8sT0FBdUI7UUFBOUIsaUJBaUJDO1FBakJNLHdCQUFBLEVBQUEsY0FBdUI7UUFDN0IsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsS0FBSyxrQkFBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdkUsSUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3RGLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQTVCLENBQTRCLENBQUMsQ0FBQztRQUNyRSxJQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDM0csSUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBRWxILElBQUk7YUFDRixJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNWLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUNkLElBQUksQ0FBQyxFQUFFLENBQUM7YUFDUixJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ1YsS0FBSyxFQUFFLENBQUM7SUFDWCxDQUFDO0lBRUQsZ0VBQWdFO0lBQ2hFLGdDQUFpQixHQUFqQixVQUFrQixRQUFRO1FBQ3pCLElBQUksSUFBSSxDQUFDO1FBQ1QsSUFBSSxXQUFXLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDeEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDOUMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLFdBQVcsRUFBRTtnQkFDeEMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzFDO1NBQ0Q7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFFRCxnQkFBZ0I7SUFDaEIsdUJBQVEsR0FBUixVQUFTLE1BQU07UUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUE3SkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDOzRDQUNIO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDOytDQUNEO0lBRzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQzt1Q0FDM0I7SUFHbkI7UUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDOzZDQUNKO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQzswQ0FHN0I7SUFoQm1CLElBQUk7UUFEeEIsT0FBTztPQUNhLElBQUksQ0FnS3hCO0lBQUQsV0FBQztDQWhLRCxBQWdLQyxDQWhLaUMsRUFBRSxDQUFDLFNBQVMsR0FnSzdDO2tCQWhLb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBdXggZnJvbSAnLi4vU2xvdEVudW0nO1xyXG5pbXBvcnQgVGlsZSBmcm9tICcuL1RpbGUnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlZWwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cdEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUgfSlcclxuXHRwdWJsaWMgcmVlbEFuY2hvciA9IG51bGw7XHJcblxyXG5cdEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkVudW0oQXV4LkRpcmVjdGlvbikgfSlcclxuXHRwdWJsaWMgc3BpbkRpcmVjdGlvbiA9IEF1eC5EaXJlY3Rpb24uRG93bjtcclxuXHJcblx0QHByb3BlcnR5KHsgdHlwZTogW2NjLk5vZGVdLCB2aXNpYmxlOiBmYWxzZSB9KVxyXG5cdHByaXZhdGUgdGlsZXMgPSBbXTtcclxuXHJcblx0QHByb3BlcnR5KHsgdHlwZTogY2MuUHJlZmFiIH0pXHJcblx0cHVibGljIF90aWxlUHJlZmFiID0gbnVsbDtcclxuXHJcblx0QHByb3BlcnR5KHsgdHlwZTogY2MuUHJlZmFiIH0pXHJcblx0Z2V0IHRpbGVQcmVmYWIoKTogY2MuUHJlZmFiIHtcclxuXHRcdHJldHVybiB0aGlzLl90aWxlUHJlZmFiO1xyXG5cdH1cclxuXHJcblx0c2V0IHRpbGVQcmVmYWIobmV3UHJlZmFiOiBjYy5QcmVmYWIpIHtcclxuXHRcdHRoaXMuX3RpbGVQcmVmYWIgPSBuZXdQcmVmYWI7XHJcblx0XHR0aGlzLnJlZWxBbmNob3IucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuXHRcdHRoaXMudGlsZXMgPSBbXTtcclxuXHJcblx0XHRpZiAobmV3UHJlZmFiICE9PSBudWxsKSB7XHJcblx0XHRcdHRoaXMuY3JlYXRlUmVlbCgpO1xyXG5cdFx0XHR0aGlzLnNodWZmbGUoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgcmVzdWx0OiBBcnJheTxudW1iZXI+ID0gW107XHJcblxyXG5cdHB1YmxpYyBzdG9wU3Bpbm5pbmcgPSBmYWxzZTtcclxuXHJcblx0Ly9TdGFydCAxIC0gY3JlYXRlcyB0aGUgcmVlbCBhbmQgcG9wdWxhdGUgdGhlbVxyXG5cdGNyZWF0ZVJlZWwoKTogdm9pZCB7XHJcblx0XHRsZXQgbmV3VGlsZTogY2MuTm9kZTtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSArPSAxKSB7XHJcblxyXG5cdFx0XHRuZXdUaWxlID0gY2MuaW5zdGFudGlhdGUodGhpcy50aWxlUHJlZmFiKTtcclxuXHRcdFx0dGhpcy5yZWVsQW5jaG9yLmFkZENoaWxkKG5ld1RpbGUpO1xyXG5cdFx0XHR0aGlzLnRpbGVzW2ldID0gbmV3VGlsZTtcclxuXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvL1N0YXJ0IDIgLSBzZXRzIHRpbGVzIGFzIHJhbmRvbSBhbmQgbm90IGdsb3dpbmdcclxuXHRzaHVmZmxlKCk6IHZvaWQge1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRpbGVzLmxlbmd0aDsgaSArPSAxKSB7XHJcblx0XHRcdHRoaXMudGlsZXNbaV0uZ2V0Q29tcG9uZW50KCdUaWxlJykuc2V0UmFuZG9tKCk7XHJcblx0XHRcdHRoaXMudGlsZXNbaV0uZ2V0Q29tcG9uZW50KCdUaWxlJykuU2V0R2xvdyhmYWxzZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvL0dldHMgdGhlIHByZWRlZmluZWQgcmVzdWx0IGFuZCBwb3B1bGF0ZSB0aGVtIG9uIHRoZSByaWdodCBkaXJlY3Rpb25cclxuXHRyZWFkeVN0b3AobmV3UmVzdWx0OiBBcnJheTxudW1iZXI+KTogdm9pZCB7XHJcblx0XHRjb25zdCBjaGVjayA9IHRoaXMuc3BpbkRpcmVjdGlvbiA9PT0gQXV4LkRpcmVjdGlvbi5Eb3duIHx8IG5ld1Jlc3VsdCA9PSBudWxsO1xyXG5cdFx0dGhpcy5yZXN1bHQgPSBjaGVjayA/IG5ld1Jlc3VsdCA6IG5ld1Jlc3VsdC5yZXZlcnNlKCk7XHJcblx0XHR0aGlzLnN0b3BTcGlubmluZyA9IHRydWU7XHJcblx0fVxyXG5cclxuXHQvL0NoYW5nZXMgdGlsZSBpZiBpdCByZWFjaGVkIHRoZSBib3JkZXIsIHNldHRpbmcgbmV3IHBvc2l0aW9uIGFuZCBuZXcgYW5pbWFsXHJcblx0Y2hhbmdlQ2FsbGJhY2soZWxlbWVudDogY2MuTm9kZSA9IG51bGwpOiB2b2lkIHtcclxuXHRcdGNvbnN0IGVsID0gZWxlbWVudDtcclxuXHRcdGNvbnN0IGRpck1vZGlmaWVyID0gdGhpcy5zcGluRGlyZWN0aW9uID09PSBBdXguRGlyZWN0aW9uLkRvd24gPyAtMSA6IDE7XHJcblx0XHRpZiAoZWwucG9zaXRpb24ueSAqIGRpck1vZGlmaWVyID4gMjg4KSB7XHJcblx0XHRcdGVsLnBvc2l0aW9uID0gY2MudjMoMCwgLTI4OCAqIGRpck1vZGlmaWVyLCAwKTtcclxuXHJcblx0XHRcdGxldCBwb3AgPSBudWxsO1xyXG5cdFx0XHRpZiAodGhpcy5yZXN1bHQgIT0gbnVsbCAmJiB0aGlzLnJlc3VsdC5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0cG9wID0gdGhpcy5yZXN1bHQucG9wKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHBvcCAhPSBudWxsICYmIHBvcCA+PSAwKSB7XHJcblx0XHRcdFx0ZWwuZ2V0Q29tcG9uZW50KCdUaWxlJykuc2V0VGlsZShwb3ApO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGVsLmdldENvbXBvbmVudCgnVGlsZScpLnNldFJhbmRvbSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvL0dldHMgY2hlY2tlZCBpZiBpdCBpcyB0aW1lIHRvIHN0b3AsIG90aGVyd2lzZSBzcGlucyBhZ2FpblxyXG5cdGNoZWNrRW5kQ2FsbGJhY2soZWxlbWVudDogY2MuTm9kZSA9IG51bGwpOiB2b2lkIHtcclxuXHRcdGNvbnN0IGVsID0gZWxlbWVudDtcclxuXHRcdGlmICh0aGlzLnN0b3BTcGlubmluZykge1xyXG5cdFx0XHR0aGlzLmdldENvbXBvbmVudChjYy5BdWRpb1NvdXJjZSkucGxheSgpO1xyXG5cdFx0XHR0aGlzLmRvU3RvcChlbCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5kb1NwaW5uaW5nKGVsKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vU3RhcnRzIHRoZSBzcGluXHJcblx0ZG9TcGluKHdpbmRVcDogbnVtYmVyKTogdm9pZCB7XHJcblx0XHR0aGlzLnN0b3BTcGlubmluZyA9IGZhbHNlO1xyXG5cdFx0dGhpcy5yZWVsQW5jaG9yLmNoaWxkcmVuLmZvckVhY2goZWxlbWVudCA9PiB7XHJcblx0XHRcdGNvbnN0IGRpck1vZGlmaWVyID0gdGhpcy5zcGluRGlyZWN0aW9uID09PSBBdXguRGlyZWN0aW9uLkRvd24gPyAtMSA6IDE7XHJcblxyXG5cdFx0XHRjb25zdCBkZWxheSA9IGNjLnR3ZWVuKGVsZW1lbnQpLmRlbGF5KHdpbmRVcCk7XHJcblx0XHRcdGNvbnN0IHN0YXJ0ID0gY2MudHdlZW4oZWxlbWVudCkuYnkoMC4yNSwgeyBwb3NpdGlvbjogY2MudjIoMCwgMTQ0ICogZGlyTW9kaWZpZXIpIH0sIHsgZWFzaW5nOiAnYmFja0luJyB9KTtcclxuXHRcdFx0Y29uc3QgZG9DaGFuZ2UgPSBjYy50d2VlbigpLmNhbGwoKCkgPT4gdGhpcy5jaGFuZ2VDYWxsYmFjayhlbGVtZW50KSk7XHJcblx0XHRcdGNvbnN0IGNhbGxTcGlubmluZyA9IGNjLnR3ZWVuKGVsZW1lbnQpLmNhbGwoKCkgPT4gdGhpcy5kb1NwaW5uaW5nKGVsZW1lbnQsIDUpKTtcclxuXHJcblx0XHRcdGRlbGF5XHJcblx0XHRcdFx0LnRoZW4oc3RhcnQpXHJcblx0XHRcdFx0LnRoZW4oZG9DaGFuZ2UpXHJcblx0XHRcdFx0LnRoZW4oY2FsbFNwaW5uaW5nKVxyXG5cdFx0XHRcdC5zdGFydCgpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvL1NwaW4gTG9vcCwgZ29lcyBvbiB1bnRpbCByZWNlaXZlcyB0aGUgU3RvcFxyXG5cdGRvU3Bpbm5pbmcoZWxlbWVudDogY2MuTm9kZSA9IG51bGwsIHRpbWVzID0gMSk6IHZvaWQge1xyXG5cdFx0Y29uc3QgZGlyTW9kaWZpZXIgPSB0aGlzLnNwaW5EaXJlY3Rpb24gPT09IEF1eC5EaXJlY3Rpb24uRG93biA/IC0xIDogMTtcclxuXHJcblx0XHRjb25zdCBtb3ZlID0gY2MudHdlZW4oKS5ieSgwLjA0LCB7IHBvc2l0aW9uOiBjYy52MigwLCAxNDQgKiBkaXJNb2RpZmllcikgfSk7XHJcblx0XHRjb25zdCBkb0NoYW5nZSA9IGNjLnR3ZWVuKCkuY2FsbCgoKSA9PiB0aGlzLmNoYW5nZUNhbGxiYWNrKGVsZW1lbnQpKTtcclxuXHRcdGNvbnN0IHJlcGVhdCA9IGNjLnR3ZWVuKGVsZW1lbnQpLnJlcGVhdCh0aW1lcywgbW92ZS50aGVuKGRvQ2hhbmdlKSk7XHJcblx0XHRjb25zdCBjaGVja0VuZCA9IGNjLnR3ZWVuKCkuY2FsbCgoKSA9PiB0aGlzLmNoZWNrRW5kQ2FsbGJhY2soZWxlbWVudCkpO1xyXG5cclxuXHRcdHJlcGVhdC50aGVuKGNoZWNrRW5kKS5zdGFydCgpO1xyXG5cdH1cclxuXHJcblx0Ly9GaW5hbCBsb29wIHdpdGggYSBib3VjZSBlZmZlY3Qgd2hlbiBpdCBzdG9wc1xyXG5cdGRvU3RvcChlbGVtZW50OiBjYy5Ob2RlID0gbnVsbCk6IHZvaWQge1xyXG5cdFx0Y29uc3QgZGlyTW9kaWZpZXIgPSB0aGlzLnNwaW5EaXJlY3Rpb24gPT09IEF1eC5EaXJlY3Rpb24uRG93biA/IC0xIDogMTtcclxuXHJcblx0XHRjb25zdCBtb3ZlID0gY2MudHdlZW4oZWxlbWVudCkuYnkoMC4wNCwgeyBwb3NpdGlvbjogY2MudjMoMCwgMTQ0ICogZGlyTW9kaWZpZXIsIDApIH0pO1xyXG5cdFx0Y29uc3QgZG9DaGFuZ2UgPSBjYy50d2VlbigpLmNhbGwoKCkgPT4gdGhpcy5jaGFuZ2VDYWxsYmFjayhlbGVtZW50KSk7XHJcblx0XHRjb25zdCB1cCA9IGNjLnR3ZWVuKGVsZW1lbnQpLmJ5KDAuMiwgeyBwb3NpdGlvbjogY2MudjMoMCwgNTAgKiBkaXJNb2RpZmllciwgMCkgfSwgeyBlYXNpbmc6ICdib3VuY2VPdXQnIH0pO1xyXG5cdFx0Y29uc3QgZG93biA9IGNjLnR3ZWVuKGVsZW1lbnQpLmJ5KDAuMiwgeyBwb3NpdGlvbjogY2MudjMoMCwgNTAgKiBkaXJNb2RpZmllciAqIC0xLCAwKSB9LCB7IGVhc2luZzogJ2JvdW5jZU91dCcgfSk7XHJcblxyXG5cdFx0bW92ZVxyXG5cdFx0XHQudGhlbihkb0NoYW5nZSlcclxuXHRcdFx0LnRoZW4obW92ZSlcclxuXHRcdFx0LnRoZW4oZG9DaGFuZ2UpXHJcblx0XHRcdC50aGVuKG1vdmUpXHJcblx0XHRcdC50aGVuKGRvQ2hhbmdlKVxyXG5cdFx0XHQudGhlbih1cClcclxuXHRcdFx0LnRoZW4oZG93bilcclxuXHRcdFx0LnN0YXJ0KCk7XHJcblx0fVxyXG5cclxuXHQvL1VzZWQgYnkgdGhlIENlbGVicmF0ZSBXaW4gdG8gbG9jYXRlIHRoZSB0aWxlcyB0aGF0IHNob3VsZCBnbG93XHJcblx0Z2V0VGlsZUJ5UG9zaXRpb24ocG9zaXRpb24pOiBUaWxlIHtcclxuXHRcdHZhciB0aWxlO1xyXG5cdFx0dmFyIG5ld1Bvc2l0aW9uID0gKHBvc2l0aW9uIC0gMikgKiAtMTQ0O1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRpbGVzLmxlbmd0aDsgaSArPSAxKSB7XHJcblx0XHRcdHZhciB0aGlzTm9kZSA9IHRoaXMudGlsZXNbaV07XHJcblx0XHRcdGlmICh0aGlzTm9kZS5wb3NpdGlvbi55ID09PSBuZXdQb3NpdGlvbikge1xyXG5cdFx0XHRcdHRpbGUgPSB0aGlzLnRpbGVzW2ldLmdldENvbXBvbmVudCgnVGlsZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGlsZTtcclxuXHR9XHJcblxyXG5cdC8vRGVidWdnaW5nIHRvb2xcclxuXHRkZWJ1Z0xvZyhzdHJpbmcpOiBhbnkge1xyXG5cdFx0Y29uc29sZS5sb2coc3RyaW5nKTtcclxuXHR9XHJcbn1cclxuIl19