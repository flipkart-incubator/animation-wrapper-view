
import React from 'react';
import { Easing, Text, View, StyleSheet, Image } from 'react-native';
import { AnimationWrapperView } from './components/animation-wrapper/AnimationWrapperView';
import { AnimationTriggerType } from './components/animation-wrapper/models/AnimationTriggerType';
import { AnimationType } from './components/animation-wrapper/models/AnimationType';
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
            bounceHeight: 30,
            animationDuration: 1000
        };

        const scaleConfig: ScaleAnimation = {
            type: AnimationType.SCALE,
            triggerType: AnimationTriggerType.ON_CLICK,
            scaleDuration: 1000,
            toScale: .6,
            easing: Easing.bounce
        };
        const rippleConfig: RippleAnimation = {
            type: AnimationType.RIPPLE,
            triggerType: AnimationTriggerType.ON_CLICK,
            rippleColor: 'blue',
            rippleCount: 2,
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
            animationDuration: 2000
        };

        const fadeOutConfig: FadeOutAnimation = {
            type: AnimationType.FADE_OUT,
            triggerType: AnimationTriggerType.ON_CLICK,
            animationDuration: 2000
        };

        const slideInConfig: FadeInAnimation = {
            type: AnimationType.SLIDE_IN,
            triggerType: AnimationTriggerType.ON_LOAD,
            animationDuration: 500
        };

        const slideOutConfig: FadeOutAnimation = {
            type: AnimationType.SLIDE_OUT,
            triggerType: AnimationTriggerType.ON_CLICK,
            animationDuration: 2000
        };
        return (
            <View style={{
                flexDirection: 'column',
                flex: 1,
                height: 400,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <AnimationWrapperView animationConfig={slideInConfig} animationDimen={{ width: 300, height: 300 }}>
                    {this._renderCard()}
                </AnimationWrapperView>
                {/* 
                <AnimationWrapperView animationConfig={slideOutConfig} animationDimen={{ width: 200, height: 200 }}>
                    <Text style={{ backgroundColor: 'blue', fontSize: 20, padding: 8, color: 'white' }}>Bounce Component</Text>
                </AnimationWrapperView>

                <AnimationWrapperView animationConfig={scaleConfig} animationDimen={{ width: 200, height: 200 }}>
                    <Text style={{ backgroundColor: 'green', fontSize: 20, padding: 8, color: 'white' }}>Scale Component</Text>
                </AnimationWrapperView>

                <AnimationWrapperView animationConfig={draggableConfig} animationDimen={{ width: 200, height: 200 }}>
                    <Text style={{ backgroundColor: 'gray', fontSize: 20, padding: 8, color: 'white' }}>Draggable Component</Text>
                </AnimationWrapperView> */}
            </View>
        );
    }

    _renderCard(): React.ReactNode {
        return (
            <View style={styles.container}>
                <View style={{flex: 1, flexDirection: 'column'}}>

                    <Text style={styles.paragraph}>
                        This is a widget view
                    </Text>
                    <Text style={styles.paragraph}>
                        Demo to apply transitions to this container
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#34495e',
        borderWidth: 1
    },
    paragraph: {
        margin: 8,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
});
