import { EasingFunction } from 'react-native';
import { BaseAnimation } from './BaseAnimation';
export interface ScaleAnimation extends BaseAnimation {
    toScale: number;
    easing?: EasingFunction;
    scaleDuration: number;
}
