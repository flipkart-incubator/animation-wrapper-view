import BaseAnimationConfig from "./BaseAnimationConfig"
import { OrderType } from "./Enums";

export type TransformType = "scale"
    | "opacity"
    | "translateX"
    | "translateY"
    | "rotate"
    | "rotateY"
    | "rotateX"
    | "rotateZ"
    | "scaleX"
    | "scaleY"
    | "skewX"
    | "skewY"
    | "width"
    | "height"
;

export type EasingType = "linear"
    | "quad"
    | "circle"
    | "elastic"
    | "bounce"
    | "back"
    | "cubic"
    | "sine"
    | "expo-in"
    | "expo-out"
    | "ease-in"
    | "ease-out"
    | "ease-in-out"
    | "custom-bezier"
;

export interface JsonAnimationConfig extends BaseAnimationConfig {
    animationConfig: AnimationDef | AnimationDef[] | AnimationDefTree,
}

/**
 * Support for custom sequence, parallel and delay animations.
 */
type AnimationDefTree = {
    type: OrderType,
    animationConfig: (AnimationDefTree | AnimationDef | DelayAnimationDef)[]
}

/**
 * tr: Array of TransformFunction.
 * d: Duration for which the animation.
 * i: Interpolation function for the animation.
 */
export type AnimationDef = {
    transforms: TransformDef[], 
    duration: number,
    interpolation?: InterpolationDef
}

/**
 * key: Defines the property to transform
 * f: from value
 * t: to value
 */
export type TransformDef = {
    key: TransformType,
    from: number,
    to: number
}

/**
 * e: Defines the easing function
 * p: Additional params needed by some easing functions
 */
export type InterpolationDef = {
    easing: EasingType;
    params?: InterpolationParams;
}

type InterpolationParams = {
    back?: number,
    bounciness?: number,
    bezierCurvePoints?: Array<number>
}

type DelayAnimationDef = {
    duration: number;
}
