import { BaseAnimation } from "./BaseAnimation"

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

export interface JsonAnimation extends BaseAnimation {
    animationConfig: AnimationDescription[]
}

/**
 * tr: Array of TransformFunction.
 * d: Duration for which the animation.
 * i: Interpolation function for the animation.
 */
export type AnimationDescription = {
    tr: TransformDef[], 
    d: number,
    i?: InterpolationDef
}

/**
 * key: Defines the property to transform
 * f: from value
 * t: to value
 */
export type TransformDef = {
    key: TransformType,
    f: number,
    t: number
}

/**
 * e: Defines the easing function
 * p: Additional params needed by some easing functions
 */
export type InterpolationDef = {
    e: EasingType;
    p?: InterpolationParams;
}

type InterpolationParams = {
    back?: number,
    bounciness?: number
}