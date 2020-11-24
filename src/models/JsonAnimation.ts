import { BaseAnimation } from "./BaseAnimation"

type TransformType = "SCALE" | "FADE" | "OPACITY" | "TRANSLATE_Y" | "ROTATE" | "TRANSLATE_X" | "ROTATE_X" | "ROTATE_Y" | "SCALE_X" | "SCALE_Y"



// Todo (Swapnil:: V1 implementation to have sequenstial impl of animation
export interface JsonAnimation extends BaseAnimation {
    animation: AnimationDescription
}

export interface AnimationDescription {
    timing: TimingFunction,
    transformations: TransformFunction[]
}

export type TransformFunction = {
    key: TransformType,
    from: number,
    to: number
}

export type TimingFunction = {
    duration: number,
    interpolation: InterpolationFunction
}

interface InterpolationFunction {
}