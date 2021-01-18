"use strict";
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