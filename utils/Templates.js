import { AnimationType, AnimationTriggerType } from "../src/core/data/Enums";
const bounceConfig = {
    type: AnimationType.BOUNCE,
    triggerType: AnimationTriggerType.ON_CLICK,
    bounceHeight: 300,
    animationDuration: 1000
};
const scaleInConfig = {
    type: AnimationType.SCALE,
    triggerType: AnimationTriggerType.ON_CLICK,
    scaleDuration: 1000,
    toScale: 2
};
const scaleOutConfig = {
    type: AnimationType.SCALE,
    triggerType: AnimationTriggerType.ON_CLICK,
    scaleDuration: 1000,
    toScale: .6
};
const rippleConfig = {
    type: AnimationType.RIPPLE,
    triggerType: AnimationTriggerType.ON_CLICK,
    rippleColor: 'blue',
    rippleCount: 5,
    rippleRadius: 150,
    rippleDuration: 1000,
    rippleIntervalDuration: 0,
};
const draggableConfig = {
    type: AnimationType.DRAGGABLE,
    triggerType: AnimationTriggerType.ON_CLICK
};
const fadeInConfig = {
    type: AnimationType.FADE_IN,
    triggerType: AnimationTriggerType.ON_LOAD,
    animationDuration: 2000
};
const fadeOutConfig = {
    type: AnimationType.FADE_OUT,
    triggerType: AnimationTriggerType.ON_CLICK,
    finalOpacity: .5,
    animationDuration: 2000
};
const slideInConfig = {
    type: AnimationType.SLIDE_VERTICAL,
    triggerType: AnimationTriggerType.ON_LOAD,
    animationDuration: 500
};
const slideOutConfig = {
    type: AnimationType.SLIDE_HORIZONTAL,
    triggerType: AnimationTriggerType.ON_CLICK,
    animationDuration: 2000
};
const wiggleAnimation = {
    type: AnimationType.WIGGLE,
    triggerType: AnimationTriggerType.ON_CLICK,
    wiggleDistance: 20,
    animationDuration: 200
};
export { bounceConfig, scaleInConfig, slideInConfig, slideOutConfig, wiggleAnimation, fadeInConfig, fadeOutConfig, rippleConfig, draggableConfig, scaleOutConfig };
//# sourceMappingURL=Templates.js.map