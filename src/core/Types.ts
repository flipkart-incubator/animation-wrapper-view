import { JsonAnimationProps } from "./components/wrapper/JsonAnimationWrapper";
import { BaseAnimationConfig } from "./data/BaseAnimation";
import { BounceAnimationConfig } from "./data/BounceAnimation";

import { FadeInAnimationConfig, FadeOutAnimationConfig } from "./data/FadeAnimation";
import { RippleAnimationConfig } from "./data/RippleAnimation";
import { ScaleAnimationConfig } from "./data/ScaleAnimation";
import { SlideInAnimationConfig, SlideOutAnimationConfig } from "./data/SlideAnimation";
import { WiggleAnimationConfig } from "./data/WiggleAnimation";

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
    onAnimationFinish?: () => void;
}

type FadeAnimationProps = AnimationWrapperProps;
type SlideAnimationProps = AnimationWrapperProps;

type BounceAnimationProps = AnimationWrapperProps & {
    animationConfig: BounceAnimationConfig;
}

type ScaleAnimationProps = AnimationWrapperProps & {
    animationConfig: ScaleAnimationConfig;
}

type DraggableAnimationProps = AnimationWrapperProps & {
    animationConfig: DraggableAnimation;
}

type RippleAnimationProps = AnimationWrapperProps & {
    animationConfig: RippleAnimationConfig;
}

type FadeInAnimationProps = FadeAnimationProps & {
    animationConfig: FadeInAnimationConfig;
}

type FadeOutAnimationProps = FadeAnimationProps & {
    animationConfig: FadeOutAnimationConfig;
}

type SlideInAnimationProps = SlideAnimationProps & {
    animationConfig: SlideInAnimationConfig;
}

type SlideOutAnimationProps = SlideAnimationProps & {
    animationConfig: SlideOutAnimationConfig;
}
type WiggleAnimationProps = AnimationWrapperProps & {
    animationConfig: WiggleAnimationConfig;
}

type Dimension = {
    width: number;
    height: number;
};


export {
    WrapperComponent,
    AnimationWrapperProps,
    FadeAnimationProps,
    FadeOutAnimationProps,
    FadeInAnimationProps,
    BounceAnimationProps,
    RippleAnimationProps,
    SlideAnimationProps,
    SlideInAnimationProps,
    SlideOutAnimationProps,
    DraggableAnimationProps,
    ScaleAnimationProps,
    WiggleAnimationProps,
    Dimension
};

