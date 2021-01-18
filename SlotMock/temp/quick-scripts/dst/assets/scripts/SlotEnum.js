
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