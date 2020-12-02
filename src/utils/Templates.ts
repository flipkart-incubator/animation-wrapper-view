import { Easing } from "react-native";
import { AnimationTriggerType } from "../models/AnimationTriggerType";
import { AnimationType } from "../models/AnimationType";
import { BounceAnimation } from "../models/BounceAnimation";
import { DraggableAnimation } from "../models/DraggableAnimation";
import { FadeInAnimation, FadeOutAnimation } from "../models/FadeAnimation";
import { JsonAnimation } from "../models/JsonAnimation";
import { RippleAnimation } from "../models/RippleAnimation";
import { ScaleAnimation } from "../models/ScaleAnimation";
import { WiggleAnimation } from "../models/WiggleAnimation";

const bounceConfig: BounceAnimation = {
    type: AnimationType.BOUNCE,
    triggerType: AnimationTriggerType.ON_CLICK,
    bounceHeight: 300,
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
    triggerType: AnimationTriggerType.ON_CLICK,
    rippleColor: 'blue',
    rippleCount: 5,
    rippleRadius: 150,
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
    finalOpacity: .5,
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