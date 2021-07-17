import { AnimationTriggerType, WiggleAnimationConfig, AnimationType, BounceAnimationConfig, FadeAnimationConfig, RippleAnimationConfig, SlideHorizontalDirection, SlideHorizontalAnimationConfig, SlideVerticalDirection, SlideVerticalAnimationConfig } from "..";

export function getWiggleAnimationConfig(
    animationDuration: number,
    wiggleDistance: number,
    triggerType?: AnimationTriggerType
): WiggleAnimationConfig {
    return {
        type: AnimationType.WIGGLE,
        wiggleDistance,
        animationDuration,
        triggerType: triggerType ? triggerType : AnimationTriggerType.ON_LOAD
    };
};

export function getBounceAnimationConfig(
    animationDuration: number,
    bounceHeight: number,
    triggerType?: AnimationTriggerType
): BounceAnimationConfig {
    return {
        type: AnimationType.BOUNCE,
        triggerType: triggerType ? triggerType : AnimationTriggerType.ON_LOAD,
        bounceHeight,
        animationDuration
    }
};

export function getFadeAnimationConfig(
    animationDuration: number,
    initialOpacity: number,
    finalOpacity: number,
    triggerType?: AnimationTriggerType
): FadeAnimationConfig{
    return {
        type: AnimationType.FADE,
        triggerType: triggerType ? triggerType : AnimationTriggerType.ON_LOAD,
        finalOpacity,
        initialOpacity,
        animationDuration
    } as FadeAnimationConfig;
};

export function getRippleAnimationConfig(rippleColor: string,
    rippleCount: number,
    rippleDuration: number,
    rippleRadius: number,
    rippleIntervalDuration?: number,
    triggerType?: AnimationTriggerType
): RippleAnimationConfig {

    return {
        type: AnimationType.RIPPLE,
        triggerType: triggerType ? triggerType : AnimationTriggerType.ON_LOAD,
        rippleColor,
        rippleCount,
        rippleDuration,
        rippleRadius,
        rippleIntervalDuration: rippleIntervalDuration ?? 0
    };
};

export function getHorizontalSlideAnimationConfig (
    animationDuration: number,
    initialOffset: number,
    finalOffset: number,
    direction?: SlideHorizontalDirection,
    triggerType?: AnimationTriggerType
): SlideHorizontalAnimationConfig  {
    return {
        type: AnimationType.SLIDE_HORIZONTAL,
        triggerType: triggerType ?? AnimationTriggerType.ON_LOAD,
        direction,
        initialOffset,
        finalOffset,
        animationDuration: animationDuration,
        interpolationDef: {
            easing: 'elastic',
            params: {
                bounciness: 1
            }
        }
    };
};

export function getVerticalSlideAnimationConfig (
    animationDuration: number,
    initialOffset: number,
    finalOffset: number,
    direction?: SlideVerticalDirection,
    triggerType?: AnimationTriggerType
): SlideVerticalAnimationConfig {
    return {
        type: AnimationType.SLIDE_VERTICAL,
        triggerType: triggerType ? triggerType : AnimationTriggerType.ON_LOAD,
        direction: direction,
        initialOffset: initialOffset,
        finalOffset: finalOffset,
        animationDuration,
        interpolationDef: {
            easing: 'elastic',
            params: {
                bounciness: 1
            }
        }
    };
};