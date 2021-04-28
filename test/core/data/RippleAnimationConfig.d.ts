import BaseAnimationConfig from './BaseAnimationConfig';
export interface RippleAnimationConfig extends BaseAnimationConfig {
    rippleColor: string;
    rippleDuration: number;
    rippleCount: number;
    rippleIntervalDuration: number;
    rippleRadius: number;
}
