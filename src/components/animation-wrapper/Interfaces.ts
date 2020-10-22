import { BaseAnimation } from "./models/BaseAnimation";
import { Dimension } from "./models/Dimension";
import { BounceAnimation } from "./models/BounceAnimation";
import { RippleAnimation } from "./models/RippleAnimation";
import { ScaleAnimation } from "./models/ScaleAnimation";
import { DraggableAnimation } from "./models/DraggableAnimation";
import { FadeInAnimation, FadeOutAnimation } from "./models/FadeAnimation";
import { SlideInAnimation, SlideOutAnimation } from "./models/SlideAnimation";


interface AnimationProps {
    animationConfig: BaseAnimation;
    animationDimen: Dimension;
}


interface BounceAnimationProps extends AnimationProps {
    animationConfig: BounceAnimation;
}

interface ScaleAnimationProps extends AnimationProps {
    animationConfig: ScaleAnimation;
}

interface DraggableAnimationProps extends AnimationProps {
    animationConfig: DraggableAnimation;
}

interface RippleAnimationProps extends AnimationProps {
    animationConfig: RippleAnimation;
}

interface FadeAnimationProps extends AnimationProps {
}
interface FadeInAnimationProps extends FadeAnimationProps {
    animationConfig: FadeInAnimation;
}

interface FadeOutAnimationProps extends FadeAnimationProps {
    animationConfig: FadeOutAnimation;
}

interface SlideAnimationProps extends AnimationProps {
}
interface SlideInAnimationProps extends FadeAnimationProps {
    animationConfig: SlideInAnimation;
}

interface SlideOutAnimationProps extends FadeAnimationProps {
    animationConfig: SlideOutAnimation;
}

export {
    AnimationProps,
    FadeAnimationProps,
    FadeOutAnimationProps,
    FadeInAnimationProps,
    BounceAnimationProps,
    RippleAnimationProps,
    SlideAnimationProps,
    SlideInAnimationProps,
    SlideOutAnimationProps,
    DraggableAnimationProps,
    ScaleAnimationProps
};