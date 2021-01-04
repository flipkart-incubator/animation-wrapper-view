import { BaseAnimationConfig } from "./BaseAnimation"

type TransformType = "scale"
    | "fade"
    | "opacity"
    | "translateX"
    | "translateY"
    | "rotate"
    | "rotateY"
    | "rotateX"
    | "scaleX"
    | "scaleY";

type EasingType = "linear" | "quad" | "circle" | "elastic" | "bounce" | "back";

export interface JsonAnimationConfig extends BaseAnimationConfig {
    animationConfig: AnimationDef | AnimationDef[] 
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
    bounciness?: number
}