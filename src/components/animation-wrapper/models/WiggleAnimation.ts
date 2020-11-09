import { EasingFunction } from 'react-native';
import { BaseAnimation } from './BaseAnimation';
export interface WiggleAnimation extends BaseAnimation {
    wiggleDistance: number;
    wiggleCount?: number;
    easing?: EasingFunction;
    animationDuration: number;
}
