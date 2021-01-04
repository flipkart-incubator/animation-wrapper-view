import { EasingFunction } from 'react-native';
import { BaseAnimationConfig } from './BaseAnimation';


interface SlideInAnimationConfig extends BaseAnimationConfig {
    animationDuration: number;
    initialOffset?: number;
}

interface SlideOutAnimationConfig extends BaseAnimationConfig {
    animationDuration: number;
    finalOffset?: number;
}


export { SlideInAnimationConfig, SlideOutAnimationConfig };
