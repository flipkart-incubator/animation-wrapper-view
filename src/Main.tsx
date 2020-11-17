
import React from 'react';
import { Text, View, StyleSheet, ImageBackground, ToastAndroid, Button, GestureResponderEvent } from 'react-native';
import { AnimationWrapperView } from './components/AnimationWrapperView';
import { bounceConfig, draggableConfig, fadeInConfig, fadeOutConfig, rippleConfig, scaleConfig, wiggleAnimation } from './utils/Templates';

export default class Main extends React.Component {

    private _wrapperRef?: AnimationWrapperView | null;

    public render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <AnimationWrapperView
                    ref={(ref) => (this._wrapperRef = ref)}
                    animationConfig={scaleConfig}
                    onAnimationFinish={this._onComplete}>
                    {this._renderCard()}
                </AnimationWrapperView>

                <View style={{margin: 16}}>
                    <Button title={"Click me"} onPress={this._onPress} />
                </View>
            </View>
        );
    }

    private _onPress = (_: GestureResponderEvent) => {
        // Trigger animation on button press.
        this._wrapperRef?.triggerAnimation();
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
