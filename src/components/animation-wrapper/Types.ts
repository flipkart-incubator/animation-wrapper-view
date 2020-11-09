import React from "react";
import {BounceAnimationProps, DraggableAnimationProps, RippleAnimationProps, ScaleAnimationProps, SlideAnimationProps, FadeAnimationProps, WiggleAnimationProps} from "./Interfaces";


/**
 * Append the React.ComponentClass<T extends AnimationProps> for each class extending from BaseAnimationWrapper
 */

export type WrapperComponent = React.ComponentClass<RippleAnimationProps>
    | React.ComponentClass<ScaleAnimationProps>
    | React.ComponentClass<BounceAnimationProps>
    | React.ComponentClass<SlideAnimationProps>
    | React.ComponentClass<FadeAnimationProps>
    | React.ComponentClass<DraggableAnimationProps>
    | React.ComponentClass<WiggleAnimationProps>;