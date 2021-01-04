import { EasingFunction } from 'react-native';
import { BaseAnimationConfig } from './BaseAnimation';
export interface BounceAnimationConfig extends BaseAnimationConfig {
    bounceHeight: number;
    animationDuration: number;
}
