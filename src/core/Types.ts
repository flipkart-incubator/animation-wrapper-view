import { FadeAnimationProps } from './components/wrapper/FadeAnimationWrapper';
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
type WrapperComponent = React.ComponentClass<RippleAnimationProps>
    | React.ComponentClass<ScaleAnimationProps>
    | React.ComponentClass<BounceAnimationProps>
    | React.ComponentClass<SlideAnimationProps>
    | React.ComponentClass<FadeAnimationProps>
    | React.ComponentClass<DraggableAnimationProps>
    | React.ComponentClass<WiggleAnimationProps>
    | React.ComponentClass<JsonAnimationProps>;

type AnimationWrapperProps = {
    animationConfig: BaseAnimationConfig;
    onAnimationFinish?: (animationConfig?: BaseAnimationConfig) => void;
    onAnimationStart?: (animationConfig?: BaseAnimationConfig) => void;
}

type SlideAnimationProps = AnimationWrapperProps;

type Dimension = {
    width: number;
    height: number;
};

export {
    WrapperComponent,
    AnimationWrapperProps,
    FadeAnimationProps,
    SlideAnimationProps,
    Dimension
};

