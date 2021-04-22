import { Easing } from "react-native";
import BaseAnimationConfig from "../src/core/data/BaseAnimationConfig";
import BounceAnimationConfig from "../src/core/data/BounceAnimationConfig";
import { AnimationType, AnimationTriggerType } from "../src/core/data/Enums";

import { FadeInAnimationConfig, FadeOutAnimationConfig } from "../src/core/data/FadeAnimationConfig";
import { JsonAnimationConfig } from "../src/core/data/JsonAnimationConfig";
import { RippleAnimationConfig } from "../src/core/data/RippleAnimationConfig";
import { ScaleAnimationConfig } from "../src/core/data/ScaleAnimationConfig";
import { WiggleAnimationConfig } from "../src/core/data/WiggleAnimation";

const bounceConfig: BounceAnimationConfig = {
    type: AnimationType.BOUNCE,
    triggerType: AnimationTriggerType.ON_CLICK,
    bounceHeight: 300,
    animationDuration: 1000
};

const scaleInConfig: ScaleAnimationConfig = {
    type: AnimationType.SCALE,
    triggerType: AnimationTriggerType.ON_CLICK,
    scaleDuration: 1000,
    toScale: 2
};

const scaleOutConfig: ScaleAnimationConfig = {
    type: AnimationType.SCALE,
    triggerType: AnimationTriggerType.ON_CLICK,
    scaleDuration: 1000,
    toScale: .6
};

const rippleConfig: RippleAnimationConfig = {
    type: AnimationType.RIPPLE,
    triggerType: AnimationTriggerType.ON_CLICK,
    rippleColor: 'blue',
    rippleCount: 5,
    rippleRadius: 150,
    rippleDuration: 1000,
    rippleIntervalDuration: 0,
};

const draggableConfig: BaseAnimationConfig = {
    type: AnimationType.DRAGGABLE,
    triggerType: AnimationTriggerType.ON_CLICK
};

const fadeInConfig: FadeInAnimationConfig = {
    type: AnimationType.FADE_IN,
    triggerType: AnimationTriggerType.ON_LOAD,
    animationDuration: 2000
};

const fadeOutConfig: FadeOutAnimationConfig = {
    type: AnimationType.FADE_OUT,
    triggerType: AnimationTriggerType.ON_CLICK,
    finalOpacity: .5,
    animationDuration: 2000
};

const slideInConfig: FadeInAnimationConfig = {
    type: AnimationType.SLIDE_VERTICAL,
    triggerType: AnimationTriggerType.ON_LOAD,
    animationDuration: 500
};

const slideOutConfig: FadeOutAnimationConfig = {
    type: AnimationType.SLIDE_HORIZONTAL,
    triggerType: AnimationTriggerType.ON_CLICK,
    animationDuration: 2000
};

const wiggleAnimation: WiggleAnimationConfig = {
    type: AnimationType.WIGGLE,
    triggerType: AnimationTriggerType.ON_CLICK,
    wiggleDistance: 20,
    animationDuration: 200
}

export {
    bounceConfig,
    scaleInConfig,
    slideInConfig,
    slideOutConfig,
    wiggleAnimation,
    fadeInConfig,
    fadeOutConfig,
    rippleConfig,
    draggableConfig,
    scaleOutConfig
};