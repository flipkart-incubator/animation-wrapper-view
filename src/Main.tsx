
import React from 'react';
import { Text, View, StyleSheet, ImageBackground, ToastAndroid, Button, GestureResponderEvent } from 'react-native';
import { AnimationWrapperView } from './components/AnimationWrapperView';
import { BaseAnimation } from './models/BaseAnimation';
import { JsonAnimation } from './models/JsonAnimation';
import { bounceConfig, draggableConfig, fadeInConfig, fadeOutConfig, rippleConfig, scaleConfig, slideInConfig, slideOutConfig, wiggleAnimation } from './utils/Templates';

interface State {
    animationConfig: BaseAnimation
}
export default class Main extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            animationConfig: rippleConfig
        }
    }

    private _wrapperRef?: AnimationWrapperView | null;

    public render(): React.ReactNode {


        const jsonString = {
            "animation": [
                {
                    "transformations": [
                        {
                            "key": "SCALE",
                            "from": 0,
                            "to": 1
                        }
                    ],
                    "duration": 1000,
                    "interpolation": {
                        "easing": "bounce"
                    }

                },
                {
                    "transformations": [
                        {
                            "key": "SCALE_X",
                            "from": 2,
                            "to": 1
                        }
                    ],
                    "duration": 1000,
                    "interpolation": {
                        "easing": "circle"
                    }
                }
            ]
        };

        const jsonAnimation: JsonAnimation = jsonString as JsonAnimation;

        return (
            <View>
                <View style={styles.container}>
                    <AnimationWrapperView
                        ref={(ref) => (this._wrapperRef = ref)}
                        animationConfig={jsonAnimation}
                        onAnimationFinish={this._onComplete}>
                        {this._renderCard()}
                    </AnimationWrapperView>
                </View>

                <View style={styles.container}>
                    <View style={{ margin: 16, justifyContent: 'space-between', flexDirection: 'row', width: 300 }}>
                        <Button title={"Start"} onPress={this._onPress} />
                        <Button title={"Pause"} onPress={this._onPressToStop} />
                        <Button title={"Reset"} onPress={this._onPressToReset} />
                    </View>
                    <View style={{ margin: 16, flexDirection: 'column' }}>

                        <Button title={"Fade In"} onPress={() => (this.setState({ animationConfig: fadeInConfig }))} />
                        <Button title={"Fade out"} onPress={() => (this.setState({ animationConfig: fadeOutConfig }))} />
                        <Button title={"Slide Out"} onPress={() => (this.setState({ animationConfig: slideOutConfig }))} />
                        <Button title={"Slide In"} onPress={() => (this.setState({ animationConfig: slideInConfig }))} />
                        <Button title={"Wiggle"} onPress={() => (this.setState({ animationConfig: wiggleAnimation }))} />
                        <Button title={"Bounce"} onPress={() => (this.setState({ animationConfig: bounceConfig }))} />
                        <Button title={"Ripple"} onPress={() => (this.setState({ animationConfig: rippleConfig }))} />
                        <Button title={"Draggable"} onPress={() => (this.setState({ animationConfig: draggableConfig }))} />
                    </View>
                </View>
            </View>
        );
    }

    private _onPress = (_: GestureResponderEvent) => {
        // Trigger animation on button press.
        this._wrapperRef?.startAnimation();
    }
    private _onPressToStop = (_: GestureResponderEvent) => {
        // Trigger animation on button press.
        this._wrapperRef?.pauseAnimation();
    }
    private _onPressToReset = (_: GestureResponderEvent) => {
        // Trigger animation on button press.
        this._wrapperRef?.resetAnimation();
    }

    private _onComplete = () => {
        ToastAndroid.show("Completed", ToastAndroid.SHORT);
    }

    private _renderCard(): React.ReactNode {
        return (
            <ImageBackground source={{}} style={styles.viewContainer}>
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewContainer: {
        height: 200,
        width: 400,
        backgroundColor: '#123123',
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
