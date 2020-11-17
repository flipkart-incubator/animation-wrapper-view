import { EasingFunction } from 'react-native';
import { BaseAnimation } from './BaseAnimation';


interface SlideInAnimation extends BaseAnimation {
    animationDuration: number;
    initialOffset?: number;
}

interface SlideOutAnimation extends BaseAnimation {
    animationDuration: number;
    finalOffset?: number;
}


export { SlideInAnimation, SlideOutAnimation };
