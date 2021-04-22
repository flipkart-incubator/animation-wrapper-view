import { EasingFunction } from 'react-native';
import BaseAnimationConfig from './BaseAnimationConfig';
export default interface BounceAnimationConfig extends BaseAnimationConfig {
    bounceHeight: number;
    animationDuration: number;
}
