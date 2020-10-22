import {BaseAnimation} from "./models/BaseAnimation";
import {Dimension} from "./models/Dimension";
import {BounceAnimation} from "./models/BounceAnimation";
import {RippleAnimation} from "./models/RippleAnimation";
import {ScaleAnimation} from "./models/ScaleAnimation";
import {DraggableAnimation} from "./models/DraggableAnimation";


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

export {AnimationProps, BounceAnimationProps, RippleAnimationProps, DraggableAnimationProps, ScaleAnimationProps};