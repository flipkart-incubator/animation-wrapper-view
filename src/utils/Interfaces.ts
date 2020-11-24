import { BaseAnimation } from "../models/BaseAnimation";
import { BounceAnimation } from "../models/BounceAnimation";
import { RippleAnimation } from "../models/RippleAnimation";
import { ScaleAnimation } from "../models/ScaleAnimation";
import { DraggableAnimation } from "../models/DraggableAnimation";
import { FadeInAnimation, FadeOutAnimation } from "../models/FadeAnimation";
import { SlideInAnimation, SlideOutAnimation } from "../models/SlideAnimation";
import { WiggleAnimation } from "../models/WiggleAnimation";
import { JsonAnimation } from "../models/JsonAnimation";

type WrapperProps = {
    animationConfig: BaseAnimation | JsonAnimation; 
    onAnimationFinish?: () => void;
}

type FadeAnimationProps = WrapperProps;
type SlideAnimationProps = WrapperProps;

type BounceAnimationProps = WrapperProps & {
    animationConfig: BounceAnimation;
}

type ScaleAnimationProps = WrapperProps & {
    animationConfig: ScaleAnimation;
}

type DraggableAnimationProps = WrapperProps & {
    animationConfig: DraggableAnimation;
}

type RippleAnimationProps = WrapperProps & {
    animationConfig: RippleAnimation;
}

type FadeInAnimationProps = FadeAnimationProps & {
    animationConfig: FadeInAnimation;
}

type FadeOutAnimationProps = FadeAnimationProps & {
    animationConfig: FadeOutAnimation;
}

type SlideInAnimationProps = SlideAnimationProps & {
    animationConfig: SlideInAnimation;
}

type SlideOutAnimationProps = SlideAnimationProps & {
    animationConfig: SlideOutAnimation;
}
type WiggleAnimationProps = WrapperProps & {
    animationConfig: WiggleAnimation;
}

export {
    WrapperProps as AnimationProps,
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
    WiggleAnimationProps
};