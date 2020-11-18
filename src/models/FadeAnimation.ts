import { EasingFunction } from 'react-native';
import { BaseAnimation } from './BaseAnimation';


interface FadeInAnimation extends BaseAnimation {

    animationDuration: number;
    initialOpacity?: number;
}

interface FadeOutAnimation extends BaseAnimation {
    animationDuration: number;
    finalOpacity?: number;
}


export { FadeInAnimation, FadeOutAnimation };
