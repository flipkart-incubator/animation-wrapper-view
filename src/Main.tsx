
import React from 'react';
import { Easing, Text, View } from 'react-native';
import { AnimationWrapperView } from './components/animation-wrapper/AnimationWrapperView';
import { AnimationTriggerType } from './components/animation-wrapper/models/AnimationTriggerType';
import { AnimationType } from './components/animation-wrapper/models/AnimationType';
import { BaseAnimation } from './components/animation-wrapper/models/BaseAnimation';
import { BounceAnimation } from './components/animation-wrapper/models/BounceAnimation';
import { DraggableAnimation } from './components/animation-wrapper/models/DraggableAnimation';
import { FadeInAnimation, FadeOutAnimation } from './components/animation-wrapper/models/FadeAnimation';
import { RippleAnimation } from './components/animation-wrapper/models/RippleAnimation';
import { ScaleAnimation } from './components/animation-wrapper/models/ScaleAnimation';

export default class Main extends React.Component {


    render() {
        const bounceConfig: BounceAnimation = {
            type: AnimationType.BOUNCE,
            triggerType: AnimationTriggerType.ON_CLICK,
            bounceHeight: 20,
            animationDuration: 1000
        };

        const scaleConfig: ScaleAnimation = {
            type: AnimationType.SCALE,
            triggerType: AnimationTriggerType.ON_CLICK,
            scaleDuration: 1000,
            toScale: 3,
            easing: Easing.bounce
        };
        const rippleConfig: RippleAnimation = {
            type: AnimationType.RIPPLE,
            triggerType: AnimationTriggerType.ON_CLICK,
            rippleColor: 'red',
            rippleCount: 5,
            rippleDuration: 1000,
            rippleIntervalDuration: 0,
        };

        const draggableConfig: DraggableAnimation = {
            type: AnimationType.DRAGGABLE,
            triggerType: AnimationTriggerType.ON_CLICK
        };

        const fadeInConfig: FadeInAnimation = {
            type: AnimationType.FADE_IN,
            triggerType: AnimationTriggerType.ON_LOAD,
            animationDuration: 40000
        };

        const fadeOutConfig: FadeOutAnimation = {
            type: AnimationType.FADE_OUT,
            triggerType: AnimationTriggerType.ON_CLICK,
            animationDuration: 400
        };
        
        const slideInConfig: FadeInAnimation = {
            type: AnimationType.SLIDE_IN,
            triggerType: AnimationTriggerType.ON_LOAD,
            animationDuration: 500
        };

        const slideOutConfig: FadeOutAnimation = {
            type: AnimationType.SLIDE_OUT,
            triggerType: AnimationTriggerType.ON_CLICK,
            animationDuration: 400
        };
        return (
            <View style={{
                flexDirection: 'column', flex: 1,
                justifyContent: 'space-evenly'
            }}>
                <AnimationWrapperView animationConfig={slideInConfig} animationDimen={{ width: 200, height: 200 }}>
                    <Text style={{ backgroundColor: 'red', fontSize: 20, padding: 8, color: 'white' }}>Ripple Component</Text>
                </AnimationWrapperView>

                <AnimationWrapperView animationConfig={slideOutConfig} animationDimen={{ width: 200, height: 200 }}>
                    <Text style={{ backgroundColor: 'blue', fontSize: 20, padding: 8, color: 'white' }}>Bounce Component</Text>
                </AnimationWrapperView>

                <AnimationWrapperView animationConfig={scaleConfig} animationDimen={{ width: 200, height: 200 }}>
                    <Text style={{ backgroundColor: 'green', fontSize: 20, padding: 8, color: 'white' }}>Scale Component</Text>
                </AnimationWrapperView>

                <AnimationWrapperView animationConfig={draggableConfig} animationDimen={{ width: 200, height: 200 }}>
                    <Text style={{ backgroundColor: 'gray', fontSize: 20, padding: 8, color: 'white' }}>Draggable Component</Text>
                </AnimationWrapperView>
            </View>
        );
    }
}