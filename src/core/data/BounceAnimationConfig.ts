import { EasingFunction } from 'react-native';
import BaseAnimationConfig from './BaseAnimationConfig';
export interface BounceAnimationConfig extends BaseAnimationConfig {
    bounceHeight: number;
    animationDuration: number;
}
