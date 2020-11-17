import { EasingFunction } from 'react-native';
import { BaseAnimation } from './BaseAnimation';
export interface BounceAnimation extends BaseAnimation {
    bounceHeight: number;
    animationDuration: number;
}
