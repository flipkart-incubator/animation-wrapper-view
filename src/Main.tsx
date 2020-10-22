
import React from 'react';
import { Easing, Text, View } from 'react-native';
import { AnimationWrapperView } from './components/animation-wrapper/AnimationWrapperView';
import { AnimationTriggerType } from './components/animation-wrapper/models/AnimationTriggerType';
import { AnimationType } from './components/animation-wrapper/models/AnimationType';
import { BaseAnimation } from './components/animation-wrapper/models/BaseAnimation';
import { BounceAnimation } from './components/animation-wrapper/models/BounceAnimation';
import { DraggableAnimation } from './components/animation-wrapper/models/DraggableAnimation';
import { RippleAnimation } from './components/animation-wrapper/models/RippleAnimation';
import { ScaleAnimation } from './components/animation-wrapper/models/ScaleAnimation';

export default class Main extends React.Component {

    private animationConfig: BaseAnimation;
    constructor(props) {
        super(props);
        this.animationConfig = {
            type: AnimationType.RIPPLE,
            triggerType: AnimationTriggerType.ON_CLICK,
            rippleColor: 'red',
            rippleCount: 1,
            rippleDuration: 2000,
            rippleIntervalDuration: 0,
        };
    }

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
        return (
            <View style={{
                flexDirection: 'column', flex: 1,
                justifyContent: 'space-evenly'
            }}>
                <AnimationWrapperView animationConfig={rippleConfig} animationDimen={{ width: 200, height: 200 }}>
                    <Text style={{ backgroundColor: 'red', fontSize: 20, padding: 8, color: 'white' }}>Ripple Component</Text>
                </AnimationWrapperView>

                <AnimationWrapperView animationConfig={bounceConfig} animationDimen={{ width: 200, height: 200 }}>
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