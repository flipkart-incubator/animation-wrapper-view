import { BaseAnimation } from "./BaseAnimation"

type TransformType = "SCALE" | "FADE" | "OPACITY" | "TRANSLATE_Y" | "ROTATE" | "TRANSLATE_X" | "ROTATE_X" | "ROTATE_Y" | "SCALE_X" | "SCALE_Y"
type EasingType = "linear" | "quad" | "circle" | "elastic" | "bounce" | "back";


// Todo (Swapnil:: V1 implementation to have sequenstial impl of animation
export interface JsonAnimation extends BaseAnimation {
    animation: AnimationDescription[]
}

export interface AnimationDescription {
    transformations: TransformFunction[],
    duration: number,
    interpolation?: InterpolationFunction
}

export type TransformFunction = {
    key: TransformType,
    from: number,
    to: number
}

export interface InterpolationFunction {
    easing: EasingType;
    params?: InterpolationParams;
}

type InterpolationParams = {
    back?: number,
    bounciness?: number
}