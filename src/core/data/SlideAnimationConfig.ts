import BaseAnimationConfig from './BaseAnimationConfig';

type SlideHorizontalDirection = "ltr" | "rtl";
type SlideVerticalDirection = "up_down" | "down_up";

interface SlideAnimationConfig extends BaseAnimationConfig {
    animationDuration: number;
    initialOffset?: number;
    finalOffset: number;
}

interface SlideHorizontalAnimationConfig extends SlideAnimationConfig {
    direction?: SlideHorizontalDirection;
}

interface SlideVerticalAnimationConfig extends SlideAnimationConfig {
    direction?: SlideVerticalDirection;
}

export {
    SlideHorizontalAnimationConfig,
    SlideVerticalAnimationConfig,
    SlideAnimationConfig,
    SlideHorizontalDirection,
    SlideVerticalDirection
};
