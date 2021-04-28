import BaseAnimationConfig from './BaseAnimationConfig';
declare type SlideHorizontalDirection = "ltr" | "rtl";
declare type SlideVerticalDirection = "top_down" | "bottom_up";
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
export { SlideHorizontalAnimationConfig, SlideVerticalAnimationConfig, SlideAnimationConfig, SlideHorizontalDirection, SlideVerticalDirection };
