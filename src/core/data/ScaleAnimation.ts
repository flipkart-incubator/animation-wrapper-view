import { EasingFunction } from 'react-native';
import { BaseAnimationConfig } from './BaseAnimation';
export interface ScaleAnimationConfig extends BaseAnimationConfig {
    toScale: number;
    easing?: EasingFunction;
    scaleDuration: number;
}
