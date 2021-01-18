
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/migration/use_v2.1-2.2.1_cc.Toggle_event');
require('./assets/scripts/GameManager');
require('./assets/scripts/SlotEnum');
require('./assets/scripts/slots/Machine');
require('./assets/scripts/slots/Reel');
require('./assets/scripts/slots/Tile');

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
//------QC-SOURCE-SPLIT------

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2xvdHNcXFJlZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0NBQThCO0FBR3hCLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWtDLHdCQUFZO0lBQTlDO1FBQUEscUVBZ0tDO1FBOUpPLGdCQUFVLEdBQUcsSUFBSSxDQUFDO1FBR2xCLG1CQUFhLEdBQUcsa0JBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBR2xDLFdBQUssR0FBRyxFQUFFLENBQUM7UUFHWixpQkFBVyxHQUFHLElBQUksQ0FBQztRQWtCbEIsWUFBTSxHQUFrQixFQUFFLENBQUM7UUFFNUIsa0JBQVksR0FBRyxLQUFLLENBQUM7O0lBaUk3QixDQUFDO0lBbEpBLHNCQUFJLDRCQUFVO2FBQWQ7WUFDQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDekIsQ0FBQzthQUVELFVBQWUsU0FBb0I7WUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7WUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBRWhCLElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNsQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDZjtRQUNGLENBQUM7OztPQVhBO0lBaUJELDhDQUE4QztJQUM5Qyx5QkFBVSxHQUFWO1FBQ0MsSUFBSSxPQUFnQixDQUFDO1FBQ3JCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUU5QixPQUFPLEdBQUcsRUFBRSxDQUFDLFdBQVcs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LENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDOzZDQUNKO0lBRzFCO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQzswQ0FHN0I7SUFoQm1CLElBQUk7UUFEeEIsT0FBTztPQUNhLElBQUksQ0FnS3hCO0lBQUQsV0FBQztDQWhLRCxBQWdLQyxDQWhLaUMsRUFBRSxDQUFDLFNBQVMsR0FnSzdDO2tCQWhLb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBdXggZnJvbSAnLi4vU2xvdEVudW0nO1xyXG5pbXBvcnQgVGlsZSBmcm9tICcuL1RpbGUnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlZWwgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cdEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUgfSlcclxuXHRwdWJsaWMgcmVlbEFuY2hvciA9IG51bGw7XHJcblxyXG5cdEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkVudW0oQXV4LkRpcmVjdGlvbikgfSlcclxuXHRwdWJsaWMgc3BpbkRpcmVjdGlvbiA9IEF1eC5EaXJlY3Rpb24uRG93bjtcclxuXHJcblx0QHByb3BlcnR5KHsgdHlwZTogW2NjLk5vZGVdLCB2aXNpYmxlOiBmYWxzZSB9KVxyXG5cdHByaXZhdGUgdGlsZXMgPSBbXTtcclxuXHJcblx0QHByb3BlcnR5KHsgdHlwZTogY2MuUHJlZmFiIH0pXHJcblx0cHVibGljIF90aWxlUHJlZmFiID0gbnVsbDtcclxuXHJcblx0QHByb3BlcnR5KHsgdHlwZTogY2MuUHJlZmFiIH0pXHJcblx0Z2V0IHRpbGVQcmVmYWIoKTogY2MuUHJlZmFiIHtcclxuXHRcdHJldHVybiB0aGlzLl90aWxlUHJlZmFiO1xyXG5cdH1cclxuXHJcblx0c2V0IHRpbGVQcmVmYWIobmV3UHJlZmFiOiBjYy5QcmVmYWIpIHtcclxuXHRcdHRoaXMuX3RpbGVQcmVmYWIgPSBuZXdQcmVmYWI7XHJcblx0XHR0aGlzLnJlZWxBbmNob3IucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuXHRcdHRoaXMudGlsZXMgPSBbXTtcclxuXHJcblx0XHRpZiAobmV3UHJlZmFiICE9PSBudWxsKSB7XHJcblx0XHRcdHRoaXMuY3JlYXRlUmVlbCgpO1xyXG5cdFx0XHR0aGlzLnNodWZmbGUoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgcmVzdWx0OiBBcnJheTxudW1iZXI+ID0gW107XHJcblxyXG5cdHB1YmxpYyBzdG9wU3Bpbm5pbmcgPSBmYWxzZTtcclxuXHJcblx0Ly9TdGFydCAxIC0gY3JlYXRlcyB0aGUgcmVlbCBhbmQgcG9wdWxhdGUgdGhlbVxyXG5cdGNyZWF0ZVJlZWwoKTogdm9pZCB7XHJcblx0XHRsZXQgbmV3VGlsZTogY2MuTm9kZTtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSArPSAxKSB7XHJcblxyXG5cdFx0XHRuZXdUaWxlID0gY2MuaW5zdGFudGlhdGUodGhpcy50aWxlUHJlZmFiKTtcclxuXHRcdFx0dGhpcy5yZWVsQW5jaG9yLmFkZENoaWxkKG5ld1RpbGUpO1xyXG5cdFx0XHR0aGlzLnRpbGVzW2ldID0gbmV3VGlsZTtcclxuXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvL1N0YXJ0IDIgLSBzZXRzIHRpbGVzIGFzIHJhbmRvbSBhbmQgbm90IGdsb3dpbmdcclxuXHRzaHVmZmxlKCk6IHZvaWQge1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRpbGVzLmxlbmd0aDsgaSArPSAxKSB7XHJcblx0XHRcdHRoaXMudGlsZXNbaV0uZ2V0Q29tcG9uZW50KCdUaWxlJykuc2V0UmFuZG9tKCk7XHJcblx0XHRcdHRoaXMudGlsZXNbaV0uZ2V0Q29tcG9uZW50KCdUaWxlJykuU2V0R2xvdyhmYWxzZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvL0dldHMgdGhlIHByZWRlZmluZWQgcmVzdWx0IGFuZCBwb3B1bGF0ZSB0aGVtIG9uIHRoZSByaWdodCBkaXJlY3Rpb25cclxuXHRyZWFkeVN0b3AobmV3UmVzdWx0OiBBcnJheTxudW1iZXI+KTogdm9pZCB7XHJcblx0XHRjb25zdCBjaGVjayA9IHRoaXMuc3BpbkRpcmVjdGlvbiA9PT0gQXV4LkRpcmVjdGlvbi5Eb3duIHx8IG5ld1Jlc3VsdCA9PSBudWxsO1xyXG5cdFx0dGhpcy5yZXN1bHQgPSBjaGVjayA/IG5ld1Jlc3VsdCA6IG5ld1Jlc3VsdC5yZXZlcnNlKCk7XHJcblx0XHR0aGlzLnN0b3BTcGlubmluZyA9IHRydWU7XHJcblx0fVxyXG5cclxuXHQvL0NoYW5nZXMgdGlsZSBpZiBpdCByZWFjaGVkIHRoZSBib3JkZXIsIHNldHRpbmcgbmV3IHBvc2l0aW9uIGFuZCBuZXcgYW5pbWFsXHJcblx0Y2hhbmdlQ2FsbGJhY2soZWxlbWVudDogY2MuTm9kZSA9IG51bGwpOiB2b2lkIHtcclxuXHRcdGNvbnN0IGVsID0gZWxlbWVudDtcclxuXHRcdGNvbnN0IGRpck1vZGlmaWVyID0gdGhpcy5zcGluRGlyZWN0aW9uID09PSBBdXguRGlyZWN0aW9uLkRvd24gPyAtMSA6IDE7XHJcblx0XHRpZiAoZWwucG9zaXRpb24ueSAqIGRpck1vZGlmaWVyID4gMjg4KSB7XHJcblx0XHRcdGVsLnBvc2l0aW9uID0gY2MudjMoMCwgLTI4OCAqIGRpck1vZGlmaWVyLCAwKTtcclxuXHJcblx0XHRcdGxldCBwb3AgPSBudWxsO1xyXG5cdFx0XHRpZiAodGhpcy5yZXN1bHQgIT0gbnVsbCAmJiB0aGlzLnJlc3VsdC5sZW5ndGggPiAwKSB7XHJcblx0XHRcdFx0cG9wID0gdGhpcy5yZXN1bHQucG9wKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHBvcCAhPSBudWxsICYmIHBvcCA+PSAwKSB7XHJcblx0XHRcdFx0ZWwuZ2V0Q29tcG9uZW50KCdUaWxlJykuc2V0VGlsZShwb3ApO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGVsLmdldENvbXBvbmVudCgnVGlsZScpLnNldFJhbmRvbSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvL0dldHMgY2hlY2tlZCBpZiBpdCBpcyB0aW1lIHRvIHN0b3AsIG90aGVyd2lzZSBzcGlucyBhZ2FpblxyXG5cdGNoZWNrRW5kQ2FsbGJhY2soZWxlbWVudDogY2MuTm9kZSA9IG51bGwpOiB2b2lkIHtcclxuXHRcdGNvbnN0IGVsID0gZWxlbWVudDtcclxuXHRcdGlmICh0aGlzLnN0b3BTcGlubmluZykge1xyXG5cdFx0XHR0aGlzLmdldENvbXBvbmVudChjYy5BdWRpb1NvdXJjZSkucGxheSgpO1xyXG5cdFx0XHR0aGlzLmRvU3RvcChlbCk7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5kb1NwaW5uaW5nKGVsKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vU3RhcnRzIHRoZSBzcGluXHJcblx0ZG9TcGluKHdpbmRVcDogbnVtYmVyKTogdm9pZCB7XHJcblx0XHR0aGlzLnN0b3BTcGlubmluZyA9IGZhbHNlO1xyXG5cdFx0dGhpcy5yZWVsQW5jaG9yLmNoaWxkcmVuLmZvckVhY2goZWxlbWVudCA9PiB7XHJcblx0XHRcdGNvbnN0IGRpck1vZGlmaWVyID0gdGhpcy5zcGluRGlyZWN0aW9uID09PSBBdXguRGlyZWN0aW9uLkRvd24gPyAtMSA6IDE7XHJcblxyXG5cdFx0XHRjb25zdCBkZWxheSA9IGNjLnR3ZWVuKGVsZW1lbnQpLmRlbGF5KHdpbmRVcCk7XHJcblx0XHRcdGNvbnN0IHN0YXJ0ID0gY2MudHdlZW4oZWxlbWVudCkuYnkoMC4yNSwgeyBwb3NpdGlvbjogY2MudjIoMCwgMTQ0ICogZGlyTW9kaWZpZXIpIH0sIHsgZWFzaW5nOiAnYmFja0luJyB9KTtcclxuXHRcdFx0Y29uc3QgZG9DaGFuZ2UgPSBjYy50d2VlbigpLmNhbGwoKCkgPT4gdGhpcy5jaGFuZ2VDYWxsYmFjayhlbGVtZW50KSk7XHJcblx0XHRcdGNvbnN0IGNhbGxTcGlubmluZyA9IGNjLnR3ZWVuKGVsZW1lbnQpLmNhbGwoKCkgPT4gdGhpcy5kb1NwaW5uaW5nKGVsZW1lbnQsIDUpKTtcclxuXHJcblx0XHRcdGRlbGF5XHJcblx0XHRcdFx0LnRoZW4oc3RhcnQpXHJcblx0XHRcdFx0LnRoZW4oZG9DaGFuZ2UpXHJcblx0XHRcdFx0LnRoZW4oY2FsbFNwaW5uaW5nKVxyXG5cdFx0XHRcdC5zdGFydCgpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvL1NwaW4gTG9vcCwgZ29lcyBvbiB1bnRpbCByZWNlaXZlcyB0aGUgU3RvcFxyXG5cdGRvU3Bpbm5pbmcoZWxlbWVudDogY2MuTm9kZSA9IG51bGwsIHRpbWVzID0gMSk6IHZvaWQge1xyXG5cdFx0Y29uc3QgZGlyTW9kaWZpZXIgPSB0aGlzLnNwaW5EaXJlY3Rpb24gPT09IEF1eC5EaXJlY3Rpb24uRG93biA/IC0xIDogMTtcclxuXHJcblx0XHRjb25zdCBtb3ZlID0gY2MudHdlZW4oKS5ieSgwLjA0LCB7IHBvc2l0aW9uOiBjYy52MigwLCAxNDQgKiBkaXJNb2RpZmllcikgfSk7XHJcblx0XHRjb25zdCBkb0NoYW5nZSA9IGNjLnR3ZWVuKCkuY2FsbCgoKSA9PiB0aGlzLmNoYW5nZUNhbGxiYWNrKGVsZW1lbnQpKTtcclxuXHRcdGNvbnN0IHJlcGVhdCA9IGNjLnR3ZWVuKGVsZW1lbnQpLnJlcGVhdCh0aW1lcywgbW92ZS50aGVuKGRvQ2hhbmdlKSk7XHJcblx0XHRjb25zdCBjaGVja0VuZCA9IGNjLnR3ZWVuKCkuY2FsbCgoKSA9PiB0aGlzLmNoZWNrRW5kQ2FsbGJhY2soZWxlbWVudCkpO1xyXG5cclxuXHRcdHJlcGVhdC50aGVuKGNoZWNrRW5kKS5zdGFydCgpO1xyXG5cdH1cclxuXHJcblx0Ly9GaW5hbCBsb29wIHdpdGggYSBib3VjZSBlZmZlY3Qgd2hlbiBpdCBzdG9wc1xyXG5cdGRvU3RvcChlbGVtZW50OiBjYy5Ob2RlID0gbnVsbCk6IHZvaWQge1xyXG5cdFx0Y29uc3QgZGlyTW9kaWZpZXIgPSB0aGlzLnNwaW5EaXJlY3Rpb24gPT09IEF1eC5EaXJlY3Rpb24uRG93biA/IC0xIDogMTtcclxuXHJcblx0XHRjb25zdCBtb3ZlID0gY2MudHdlZW4oZWxlbWVudCkuYnkoMC4wNCwgeyBwb3NpdGlvbjogY2MudjMoMCwgMTQ0ICogZGlyTW9kaWZpZXIsIDApIH0pO1xyXG5cdFx0Y29uc3QgZG9DaGFuZ2UgPSBjYy50d2VlbigpLmNhbGwoKCkgPT4gdGhpcy5jaGFuZ2VDYWxsYmFjayhlbGVtZW50KSk7XHJcblx0XHRjb25zdCB1cCA9IGNjLnR3ZWVuKGVsZW1lbnQpLmJ5KDAuMiwgeyBwb3NpdGlvbjogY2MudjMoMCwgNTAgKiBkaXJNb2RpZmllciwgMCkgfSwgeyBlYXNpbmc6ICdib3VuY2VPdXQnIH0pO1xyXG5cdFx0Y29uc3QgZG93biA9IGNjLnR3ZWVuKGVsZW1lbnQpLmJ5KDAuMiwgeyBwb3NpdGlvbjogY2MudjMoMCwgNTAgKiBkaXJNb2RpZmllciAqIC0xLCAwKSB9LCB7IGVhc2luZzogJ2JvdW5jZU91dCcgfSk7XHJcblxyXG5cdFx0bW92ZVxyXG5cdFx0XHQudGhlbihkb0NoYW5nZSlcclxuXHRcdFx0LnRoZW4obW92ZSlcclxuXHRcdFx0LnRoZW4oZG9DaGFuZ2UpXHJcblx0XHRcdC50aGVuKG1vdmUpXHJcblx0XHRcdC50aGVuKGRvQ2hhbmdlKVxyXG5cdFx0XHQudGhlbih1cClcclxuXHRcdFx0LnRoZW4oZG93bilcclxuXHRcdFx0LnN0YXJ0KCk7XHJcblx0fVxyXG5cclxuXHQvL1VzZWQgYnkgdGhlIENlbGVicmF0ZSBXaW4gdG8gbG9jYXRlIHRoZSB0aWxlcyB0aGF0IHNob3VsZCBnbG93XHJcblx0Z2V0VGlsZUJ5UG9zaXRpb24ocG9zaXRpb24pOiBUaWxlIHtcclxuXHRcdHZhciB0aWxlO1xyXG5cdFx0dmFyIG5ld1Bvc2l0aW9uID0gKHBvc2l0aW9uIC0gMikgKiAtMTQ0O1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRpbGVzLmxlbmd0aDsgaSArPSAxKSB7XHJcblx0XHRcdHZhciB0aGlzTm9kZSA9IHRoaXMudGlsZXNbaV07XHJcblx0XHRcdGlmICh0aGlzTm9kZS5wb3NpdGlvbi55ID09PSBuZXdQb3NpdGlvbikge1xyXG5cdFx0XHRcdHRpbGUgPSB0aGlzLnRpbGVzW2ldLmdldENvbXBvbmVudCgnVGlsZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGlsZTtcclxuXHR9XHJcblxyXG5cdC8vRGVidWdnaW5nIHRvb2xcclxuXHRkZWJ1Z0xvZyhzdHJpbmcpOiBhbnkge1xyXG5cdFx0Y29uc29sZS5sb2coc3RyaW5nKTtcclxuXHR9XHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/SlotEnum.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cbbb2wH3jBHYJaS87r8RQdn', 'SlotEnum');
// scripts/SlotEnum.ts

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
var ccclass = cc._decorator.ccclass;
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
})(Direction || (Direction = {}));
var SlotEnum = /** @class */ (function (_super) {
    __extends(SlotEnum, _super);
    function SlotEnum() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SlotEnum.Direction = Direction;
    SlotEnum = __decorate([
        ccclass
    ], SlotEnum);
    return SlotEnum;
}(cc.Component));
exports.default = SlotEnum;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcU2xvdEVudW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQVEsSUFBQSxPQUFPLEdBQUssRUFBRSxDQUFDLFVBQVUsUUFBbEIsQ0FBbUI7QUFFbEMsSUFBSyxTQUdKO0FBSEQsV0FBSyxTQUFTO0lBQ1oscUNBQUUsQ0FBQTtJQUNGLHlDQUFJLENBQUE7QUFDTixDQUFDLEVBSEksU0FBUyxLQUFULFNBQVMsUUFHYjtBQUdEO0lBQXNDLDRCQUFZO0lBQWxEOztJQUVBLENBQUM7SUFEUSxrQkFBUyxHQUFHLFNBQVMsQ0FBQztJQURWLFFBQVE7UUFENUIsT0FBTztPQUNhLFFBQVEsQ0FFNUI7SUFBRCxlQUFDO0NBRkQsQUFFQyxDQUZxQyxFQUFFLENBQUMsU0FBUyxHQUVqRDtrQkFGb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcyB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmVudW0gRGlyZWN0aW9uIHtcclxuICBVcCxcclxuICBEb3duLFxyXG59XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbG90RW51bSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgc3RhdGljIERpcmVjdGlvbiA9IERpcmVjdGlvbjtcclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/slots/Tile.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '23da8goMpRLyoF0XDrNCKrG', 'Tile');
// scripts/slots/Tile.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Tile = /** @class */ (function (_super) {
    __extends(Tile, _super);
    function Tile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textures = [];
        return _this;
    }
    Tile.prototype.onLoad = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadTextures()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tile.prototype.resetInEditor = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadTextures()];
                    case 1:
                        _a.sent();
                        this.setRandom();
                        return [2 /*return*/];
                }
            });
        });
    };
    Tile.prototype.loadTextures = function () {
        return __awaiter(this, void 0, Promise, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                return [2 /*return*/, new Promise(function (resolve) {
                        cc.loader.loadResDir('gfx/Square', cc.SpriteFrame, function afterLoad(err, loadedTextures) {
                            self.textures = loadedTextures;
                            resolve(true);
                        });
                    })];
            });
        });
    };
    Tile.prototype.setTile = function (index) {
        this.node.getComponent(cc.Sprite).spriteFrame = this.textures[index];
    };
    Tile.prototype.setRandom = function () {
        var randomIndex = Math.floor(Math.random() * this.textures.length);
        this.setTile(randomIndex);
    };
    //Sets the glow
    Tile.prototype.SetGlow = function (condition) {
        this.node.getChildByName('glow').active = condition;
    };
    __decorate([
        property({ type: [cc.SpriteFrame], visible: true })
    ], Tile.prototype, "textures", void 0);
    Tile = __decorate([
        ccclass
    ], Tile);
    return Tile;
}(cc.Component));
exports.default = Tile;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcc2xvdHNcXFRpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQU0sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUFvQ0M7UUFsQ1csY0FBUSxHQUFHLEVBQUUsQ0FBQzs7SUFrQzFCLENBQUM7SUFoQ1MscUJBQU0sR0FBWjt1Q0FBZ0IsT0FBTzs7OzRCQUNuQixxQkFBTSxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUE7O3dCQUF6QixTQUF5QixDQUFDOzs7OztLQUM3QjtJQUVLLDRCQUFhLEdBQW5CO3VDQUF1QixPQUFPOzs7NEJBQzFCLHFCQUFNLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBQTs7d0JBQXpCLFNBQXlCLENBQUM7d0JBQzFCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7Ozs7S0FDcEI7SUFFSywyQkFBWSxHQUFsQjt1Q0FBc0IsT0FBTzs7O2dCQUNuQixJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixzQkFBTyxJQUFJLE9BQU8sQ0FBVSxVQUFBLE9BQU87d0JBQy9CLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLFNBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRSxjQUFjOzRCQUNyRixJQUFJLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQzs0QkFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNsQixDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsRUFBQzs7O0tBQ047SUFFRCxzQkFBTyxHQUFQLFVBQVEsS0FBYTtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELHdCQUFTLEdBQVQ7UUFDSSxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELGVBQWU7SUFDZixzQkFBTyxHQUFQLFVBQVEsU0FBa0I7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztJQUN4RCxDQUFDO0lBakNEO1FBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzswQ0FDOUI7SUFGTCxJQUFJO1FBRHhCLE9BQU87T0FDYSxJQUFJLENBb0N4QjtJQUFELFdBQUM7Q0FwQ0QsQUFvQ0MsQ0FwQ2lDLEVBQUUsQ0FBQyxTQUFTLEdBb0M3QztrQkFwQ29CLElBQUkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGlsZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBbY2MuU3ByaXRlRnJhbWVdLCB2aXNpYmxlOiB0cnVlIH0pXHJcbiAgICBwcml2YXRlIHRleHR1cmVzID0gW107XHJcblxyXG4gICAgYXN5bmMgb25Mb2FkKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMubG9hZFRleHR1cmVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgcmVzZXRJbkVkaXRvcigpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBhd2FpdCB0aGlzLmxvYWRUZXh0dXJlcygpO1xyXG4gICAgICAgIHRoaXMuc2V0UmFuZG9tKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgbG9hZFRleHR1cmVzKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xyXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPihyZXNvbHZlID0+IHtcclxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXNEaXIoJ2dmeC9TcXVhcmUnLCBjYy5TcHJpdGVGcmFtZSwgZnVuY3Rpb24gYWZ0ZXJMb2FkKGVyciwgbG9hZGVkVGV4dHVyZXMpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYudGV4dHVyZXMgPSBsb2FkZWRUZXh0dXJlcztcclxuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbGUoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHRoaXMudGV4dHVyZXNbaW5kZXhdO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFJhbmRvbSgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMudGV4dHVyZXMubGVuZ3RoKTtcclxuICAgICAgICB0aGlzLnNldFRpbGUocmFuZG9tSW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vU2V0cyB0aGUgZ2xvd1xyXG4gICAgU2V0R2xvdyhjb25kaXRpb246IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ2dsb3cnKS5hY3RpdmUgPSBjb25kaXRpb247XHJcbiAgICB9XHJcbn1cclxuIl19
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/migration/use_v2.1-2.2.1_cc.Toggle_event.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3b821sKH35BJo1FUWKfFd2y', 'use_v2.1-2.2.1_cc.Toggle_event');
// migration/use_v2.1-2.2.1_cc.Toggle_event.js

"use strict";

/*
 * This script is automatically generated by Cocos Creator and is only used for projects compatible with the v2.1.0 ～ 2.2.1 version.
 * You do not need to manually add this script in any other project.
 * If you don't use cc.Toggle in your project, you can delete this script directly.
 * If your project is hosted in VCS such as git, submit this script together.
 *
 * 此脚本由 Cocos Creator 自动生成，仅用于兼容 v2.1.0 ~ 2.2.1 版本的工程，
 * 你无需在任何其它项目中手动添加此脚本。
 * 如果你的项目中没用到 Toggle，可直接删除该脚本。
 * 如果你的项目有托管于 git 等版本库，请将此脚本一并上传。
 */
if (cc.Toggle) {
  // Whether to trigger 'toggle' and 'checkEvents' events when modifying 'toggle.isChecked' in the code
  // 在代码中修改 'toggle.isChecked' 时是否触发 'toggle' 与 'checkEvents' 事件
  cc.Toggle._triggerEventInScript_isChecked = true;
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcbWlncmF0aW9uXFx1c2VfdjIuMS0yLjIuMV9jYy5Ub2dnbGVfZXZlbnQuanMiXSwibmFtZXMiOlsiY2MiLCJUb2dnbGUiLCJfdHJpZ2dlckV2ZW50SW5TY3JpcHRfaXNDaGVja2VkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7OztBQVlBLElBQUlBLEVBQUUsQ0FBQ0MsTUFBUCxFQUFlO0FBQ1g7QUFDQTtBQUNBRCxFQUFBQSxFQUFFLENBQUNDLE1BQUgsQ0FBVUMsK0JBQVYsR0FBNEMsSUFBNUM7QUFDSCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogVGhpcyBzY3JpcHQgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgQ29jb3MgQ3JlYXRvciBhbmQgaXMgb25seSB1c2VkIGZvciBwcm9qZWN0cyBjb21wYXRpYmxlIHdpdGggdGhlIHYyLjEuMCDvvZ4gMi4yLjEgdmVyc2lvbi5cclxuICogWW91IGRvIG5vdCBuZWVkIHRvIG1hbnVhbGx5IGFkZCB0aGlzIHNjcmlwdCBpbiBhbnkgb3RoZXIgcHJvamVjdC5cclxuICogSWYgeW91IGRvbid0IHVzZSBjYy5Ub2dnbGUgaW4geW91ciBwcm9qZWN0LCB5b3UgY2FuIGRlbGV0ZSB0aGlzIHNjcmlwdCBkaXJlY3RseS5cclxuICogSWYgeW91ciBwcm9qZWN0IGlzIGhvc3RlZCBpbiBWQ1Mgc3VjaCBhcyBnaXQsIHN1Ym1pdCB0aGlzIHNjcmlwdCB0b2dldGhlci5cclxuICpcclxuICog5q2k6ISa5pys55SxIENvY29zIENyZWF0b3Ig6Ieq5Yqo55Sf5oiQ77yM5LuF55So5LqO5YW85a65IHYyLjEuMCB+IDIuMi4xIOeJiOacrOeahOW3peeoi++8jFxyXG4gKiDkvaDml6DpnIDlnKjku7vkvZXlhbblroPpobnnm67kuK3miYvliqjmt7vliqDmraTohJrmnKzjgIJcclxuICog5aaC5p6c5L2g55qE6aG555uu5Lit5rKh55So5YiwIFRvZ2dsZe+8jOWPr+ebtOaOpeWIoOmZpOivpeiEmuacrOOAglxyXG4gKiDlpoLmnpzkvaDnmoTpobnnm67mnInmiZjnrqHkuo4gZ2l0IOetieeJiOacrOW6k++8jOivt+WwhuatpOiEmuacrOS4gOW5tuS4iuS8oOOAglxyXG4gKi9cclxuXHJcbmlmIChjYy5Ub2dnbGUpIHtcclxuICAgIC8vIFdoZXRoZXIgdG8gdHJpZ2dlciAndG9nZ2xlJyBhbmQgJ2NoZWNrRXZlbnRzJyBldmVudHMgd2hlbiBtb2RpZnlpbmcgJ3RvZ2dsZS5pc0NoZWNrZWQnIGluIHRoZSBjb2RlXHJcbiAgICAvLyDlnKjku6PnoIHkuK3kv67mlLkgJ3RvZ2dsZS5pc0NoZWNrZWQnIOaXtuaYr+WQpuinpuWPkSAndG9nZ2xlJyDkuI4gJ2NoZWNrRXZlbnRzJyDkuovku7ZcclxuICAgIGNjLlRvZ2dsZS5fdHJpZ2dlckV2ZW50SW5TY3JpcHRfaXNDaGVja2VkID0gdHJ1ZTtcclxufVxyXG4iXX0=
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------
