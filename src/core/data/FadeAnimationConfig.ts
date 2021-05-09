import { EasingFunction } from 'react-native';
import BaseAnimationConfig from './BaseAnimationConfig';
export interface FadeAnimationConfig extends BaseAnimationConfig {
    animationDuration: number;
    initialOpacity: number;
    finalOpacity: number;
}
