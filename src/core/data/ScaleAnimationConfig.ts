import { EasingFunction } from 'react-native';
import BaseAnimationConfig from './BaseAnimationConfig';
export interface ScaleAnimationConfig extends BaseAnimationConfig {
    fromScale?: number;
    toScale: number;
    animationDuration: number;
}
