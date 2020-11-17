import { Easing } from "react-native";
import { AnimationTriggerType } from "./components/animation-wrapper/models/AnimationTriggerType";
import { AnimationType } from "./components/animation-wrapper/models/AnimationType";
import { BounceAnimation } from "./components/animation-wrapper/models/BounceAnimation";
import { DraggableAnimation } from "./components/animation-wrapper/models/DraggableAnimation";
import { FadeInAnimation, FadeOutAnimation } from "./components/animation-wrapper/models/FadeAnimation";
import { RippleAnimation } from "./components/animation-wrapper/models/RippleAnimation";
import { ScaleAnimation } from "./components/animation-wrapper/models/ScaleAnimation";
import { WiggleAnimation } from "./components/animation-wrapper/models/WiggleAnimation";

const bounceConfig: BounceAnimation = {
    type: AnimationType.BOUNCE,
    triggerType: AnimationTriggerType.ON_CLICK,
    bounceHeight: 30,
    animationDuration: 1000
};

const scaleConfig: ScaleAnimation = {
    type: AnimationType.SCALE,
    triggerType: AnimationTriggerType.ON_CLICK,
    scaleDuration: 1000,
    toScale: .6,
    easing: Easing.bounce
};
const rippleConfig: RippleAnimation = {
    type: AnimationType.RIPPLE,
    triggerType: AnimationTriggerType.ON_LOAD,
    rippleColor: 'blue',
    rippleCount: 2,
    rippleRadius: 100,
    rippleDuration: 1000,
    rippleIntervalDuration: 0,
};

const draggableConfig: DraggableAnimation = {
    type: AnimationType.DRAGGABLE,
    triggerType: AnimationTriggerType.ON_CLICK
};

const fadeInConfig: FadeInAnimation = {
    type: AnimationType.FADE_IN,
    triggerType: AnimationTriggerType.ON_LOAD,
    animationDuration: 2000
};

const fadeOutConfig: FadeOutAnimation = {
    type: AnimationType.FADE_OUT,
    triggerType: AnimationTriggerType.ON_CLICK,
    animationDuration: 2000
};

const slideInConfig: FadeInAnimation = {
    type: AnimationType.SLIDE_IN,
    triggerType: AnimationTriggerType.ON_LOAD,
    animationDuration: 500
};

const slideOutConfig: FadeOutAnimation = {
    type: AnimationType.SLIDE_OUT,
    triggerType: AnimationTriggerType.ON_CLICK,
    animationDuration: 2000
};

const wiggleAnimation: WiggleAnimation = {
    type: AnimationType.WIGGLE,
    triggerType: AnimationTriggerType.ON_CLICK,
    wiggleDistance: 20,
    animationDuration: 200
}

export {
    bounceConfig,
    scaleConfig,
    slideInConfig,
    slideOutConfig,
    wiggleAnimation,
    fadeInConfig,
    fadeOutConfig,
    rippleConfig,
    draggableConfig
};