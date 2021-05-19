
import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Button, GestureResponderEvent, TouchableOpacity, ToastAndroid } from 'react-native';
import AnimationWrapperView from './src/core/components/AnimationWrapperView';
import BaseAnimationConfig from './src/core/data/BaseAnimationConfig';
import { cardFlipJson, swingJson, zoomInJson } from './utils/JsonTemplates';
import { bounceConfig, draggableConfig, fadeInConfig, fadeOutConfig, rippleConfig, scaleInConfig, scaleOutConfig, slideInConfig, slideOutConfig, wiggleAnimation } from './utils/Templates';

interface State {
    animationConfig: BaseAnimationConfig
}
export default class Main extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            animationConfig: swingJson
        }
    }

    private _wrapperRef?: AnimationWrapperView | null;
    // private _wrapperRef2?: AnimationWrapperView | null;

    public render(): React.ReactNode {

        return (
            <View>
                <View style={styles.container}>
                    <AnimationWrapperView
                        ref={(ref) => (this._wrapperRef = ref)}
                        animationConfig={this.state.animationConfig}
                        onAnimationStart={this._onStart}
                        onAnimationFinish={this._onComplete}>

                        {this._renderCard()}
                    </AnimationWrapperView>
                    {/* <AnimationWrapperView
                        ref={(ref) => (this._wrapperRef2 = ref)}
                        animationConfig={this.state.animationConfig}
                        onAnimationFinish={this._onComplete}>
                        {this._renderCard()}
                    </AnimationWrapperView> */}
                </View>

                <View style={styles.container}>
                    <View style={{ margin: 16, justifyContent: 'space-between', flexDirection: 'row', width: 300 }}>
                        <Button title={"Start"} onPress={this._onPressToStart} />
                        <Button title={"Stop"} onPress={this._onPressToStop} />
                        <Button title={"Reset"} onPress={this._onPressToReset} />
                        <Button title={"Finish"} onPress={this._onPressToFinish} />
                    </View>


                    <View style={{ flexDirection: 'row' }}>
                        <Button title={"Json(Card)"} onPress={() => (this.setState({ animationConfig: cardFlipJson }))} />
                        <Button title={"Json(Swing)"} onPress={() => (this.setState({ animationConfig: swingJson }))} />
                        <Button title={"Json(ZoomIn)"} onPress={() => (this.setState({ animationConfig: zoomInJson }))} />
                    </View>
                    <View style={{ margin: 16, flexDirection: 'column' }}>

                        <Button title={"Fade In"} onPress={() => (this.setState({ animationConfig: fadeInConfig }))} />
                        <Button title={"Fade out"} onPress={() => (this.setState({ animationConfig: fadeOutConfig }))} />
                        <Button title={"Slide Out"} onPress={() => (this.setState({ animationConfig: slideOutConfig }))} />
                        <Button title={"Slide In"} onPress={() => (this.setState({ animationConfig: slideInConfig }))} />
                        <Button title={"Wiggle"} onPress={() => (this.setState({ animationConfig: wiggleAnimation }))} />
                        <Button title={"Scale In"} onPress={() => (this.setState({ animationConfig: scaleInConfig }))} />
                        <Button title={"Scale Out"} onPress={() => (this.setState({ animationConfig: scaleOutConfig }))} />
                        <Button title={"Bounce"} onPress={() => (this.setState({ animationConfig: bounceConfig }))} />
                        <Button title={"Ripple"} onPress={() => (this.setState({ animationConfig: rippleConfig }))} />
                        <Button title={"Draggable"} onPress={() => (this.setState({ animationConfig: draggableConfig }))} />
                    </View>
                </View>
            </View>
        );
    }

    private _onPressToStart = (_: GestureResponderEvent) => {
        // Trigger animation on button press.
        this._wrapperRef?.startAnimation();
    }
    private _onPressToStop = (_: GestureResponderEvent) => {
        // Trigger animation on button press.
        this._wrapperRef?.stopAnimation();
    }
    private _onPressToReset = (_: GestureResponderEvent) => {
        // Trigger animation on button press.
        this._wrapperRef?.resetAnimation();
    }

    private _onPressToFinish = (_: GestureResponderEvent) => {
        // Trigger animation on button press.
        this._wrapperRef?.finishAnimation();
    }

    private _onComplete = () => {
        console.log('AnimationWrapperView', 'onComplete');
    }

    private _onStart = () => {
        console.log('AnimationWrapperView', 'onStart');
    }

    private _renderCard(): React.ReactNode {
        return (
            <ImageBackground source={{}} style={styles.viewContainer}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>

                    <Text style={styles.paragraph}>
                        BannerWidget
                    </Text>
                    <Button onPress={this.onPressButton} title={"hello"} />
                    <TouchableOpacity onPress={this.onPressButton}>
                        <Text style={{ backgroundColor: 'red', padding: 12 }}>
                            Hello
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );

    }

    private onPressButton = (ev: any) => {
        ToastAndroid.show("hello", ToastAndroid.SHORT);
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
        width: 200,
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
