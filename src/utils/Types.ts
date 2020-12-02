import React from "react";
import { JsonAnimationProps } from "../components/wrapper/JsonAnimationWrapper";
import { JsonAnimation } from "../models/JsonAnimation";
import { BounceAnimationProps, DraggableAnimationProps, RippleAnimationProps, ScaleAnimationProps, SlideAnimationProps, FadeAnimationProps, WiggleAnimationProps, AnimationProps } from "./Interfaces";


/**
 * Append the React.ComponentClass<T extends AnimationProps> for each class extending from BaseAnimationWrapper
 */

export type WrapperComponent = React.ComponentClass<RippleAnimationProps>
    | React.ComponentClass<ScaleAnimationProps>
    | React.ComponentClass<BounceAnimationProps>
    | React.ComponentClass<SlideAnimationProps>
    | React.ComponentClass<FadeAnimationProps>
    | React.ComponentClass<DraggableAnimationProps>
    | React.ComponentClass<WiggleAnimationProps>
    | React.ComponentClass<JsonAnimationProps>;
