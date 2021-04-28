import { EasingFunction } from 'react-native';
import BaseAnimationConfig from './BaseAnimationConfig';
export interface WiggleAnimationConfig extends BaseAnimationConfig {
    wiggleDistance: number;
    wiggleCount?: number;
    easing?: EasingFunction;
    animationDuration: number;
}
