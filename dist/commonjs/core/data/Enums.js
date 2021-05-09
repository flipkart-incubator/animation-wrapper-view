"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationType = exports.AnimationTriggerType = void 0;
let AnimationTriggerType;
exports.AnimationTriggerType = AnimationTriggerType;

(function (AnimationTriggerType) {
  AnimationTriggerType["ON_CLICK"] = "ON_CLICK";
  AnimationTriggerType["ON_LOAD"] = "ON_LOAD";
})(AnimationTriggerType || (exports.AnimationTriggerType = AnimationTriggerType = {}));

let AnimationType;
exports.AnimationType = AnimationType;

(function (AnimationType) {
  AnimationType["RIPPLE"] = "RIPPLE";
  AnimationType["BOUNCE"] = "BOUNCE";
  AnimationType["SCALE"] = "SCALE";
  AnimationType["FADE_IN"] = "FADE_IN";
  AnimationType["FADE_OUT"] = "FADE_OUT";
  AnimationType["DRAGGABLE"] = "DRAGGABLE";
  AnimationType["SLIDE_VERTICAL"] = "SLIDE_VERTICAL";
  AnimationType["SLIDE_HORIZONTAL"] = "SLIDE_HORIZONTAL";
  AnimationType["WIGGLE"] = "WIGGLE";
  AnimationType["JSON"] = "JSON";
})(AnimationType || (exports.AnimationType = AnimationType = {}));
//# sourceMappingURL=Enums.js.map