/// <reference types="react" />
import { BounceAnimationProps } from "./components/wrapper/BounceAnimationWrapper";
import { DraggableAnimationProps } from "./components/wrapper/DraggableAnimationWrapper";
import { JsonAnimationProps } from "./components/wrapper/JsonAnimationWrapper";
import { RippleAnimationProps } from "./components/wrapper/RippleAnimationWrapper";
import { ScaleAnimationProps } from "./components/wrapper/ScaleAnimationWrapper";
import { WiggleAnimationProps } from "./components/wrapper/WiggleAnimationWrapper";
import BaseAnimationConfig from "./data/BaseAnimationConfig";
/**
 * Append the React.ComponentClass<T extends AnimationProps> for each class extending from BaseAnimationWrapper
 */
declare type WrapperComponent = React.ComponentClass<RippleAnimationProps> | React.ComponentClass<ScaleAnimationProps> | React.ComponentClass<BounceAnimationProps> | React.ComponentClass<SlideAnimationProps> | React.ComponentClass<FadeAnimationProps> | React.ComponentClass<DraggableAnimationProps> | React.ComponentClass<WiggleAnimationProps> | React.ComponentClass<JsonAnimationProps>;
declare type AnimationWrapperProps = {
    animationConfig: BaseAnimationConfig;
    onAnimationFinish?: () => void;
    onAnimationStart?: () => void;
};
declare type FadeAnimationProps = AnimationWrapperProps;
declare type SlideAnimationProps = AnimationWrapperProps;
declare type Dimension = {
    width: number;
    height: number;
};
export { WrapperComponent, AnimationWrapperProps, FadeAnimationProps, SlideAnimationProps, Dimension };
