
import React from 'react';
import { Easing, Text, View, StyleSheet, ImageBackground } from 'react-native';
import { AnimationWrapperView } from './components/animation-wrapper/AnimationWrapperView';
import { AnimationTriggerType } from './components/animation-wrapper/models/AnimationTriggerType';
import { AnimationType } from './components/animation-wrapper/models/AnimationType';
import { BounceAnimation } from './components/animation-wrapper/models/BounceAnimation';
import { DraggableAnimation } from './components/animation-wrapper/models/DraggableAnimation';
import { FadeInAnimation, FadeOutAnimation } from './components/animation-wrapper/models/FadeAnimation';
import { RippleAnimation } from './components/animation-wrapper/models/RippleAnimation';
import { ScaleAnimation } from './components/animation-wrapper/models/ScaleAnimation';
import { WiggleAnimation } from './components/animation-wrapper/models/WiggleAnimation';

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
            triggerType: AnimationTriggerType.ON_LOAD,
            rippleColor: 'blue',
            rippleCount: 2,
            rippleRadius: 100,
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

        const wiggleAnimation: WiggleAnimation = {
            type: AnimationType.WIGGLE,
            triggerType: AnimationTriggerType.ON_CLICK,
            wiggleDistance: 20,
            animationDuration: 200
        }
        return (
            <View style={styles.container}>
                <AnimationWrapperView animationConfig={wiggleAnimation} >
                    {this._renderCard()}
                </AnimationWrapperView>
            </View>
        );
    }

    _renderCard(): React.ReactNode {

       
        return (
            <ImageBackground source={{ uri: 'https://i.imgur.com/fjd3ieX.png'}} style={styles.viewContainer}>
                <View style={{ flex: 1, flexDirection: 'column' }}>

                    <Text style={styles.paragraph}>
                        BannerWidget
                    </Text>
                    <Text style={styles.paragraph}>
                        Demo to apply transitions to this container
                    </Text>
                </View>
            </ImageBackground>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        height: 400,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewContainer: {
        height: 200,
        width: 400,
        backgroundColor: '#fedfed',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: '#EE82EE',
        borderWidth: 2
    },
    paragraph: {
        margin: 8,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
});
