import { EasingFunction } from 'react-native';
import BaseAnimationConfig from './BaseAnimationConfig';
export interface ScaleAnimationConfig extends BaseAnimationConfig {
    toScale: number;
    scaleDuration: number;
}
