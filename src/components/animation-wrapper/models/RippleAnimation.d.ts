import { BaseAnimation } from './BaseAnimation';
export interface RippleAnimation extends BaseAnimation {
    rippleColor: string;
    rippleDuration: number;
    rippleCount: number;
    rippleIntervalDuration: number;
}
