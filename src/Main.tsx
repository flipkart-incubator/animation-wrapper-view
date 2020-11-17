
import React from 'react';
import { Text, View, StyleSheet, ImageBackground, ToastAndroid, Button } from 'react-native';
import { AnimationWrapperView } from './components/animation-wrapper/AnimationWrapperView';
import { bounceConfig, draggableConfig, fadeInConfig, fadeOutConfig, rippleConfig, scaleConfig, wiggleAnimation } from './Templates';

export default class Main extends React.Component {

    private wrapperRef?: AnimationWrapperView | null;

    public render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <AnimationWrapperView
                    ref={(ref) => (this.wrapperRef = ref)}
                    animationConfig={fadeInConfig}
                    onAnimationFinish={this.onComplete}>
                    {this._renderCard()}
                </AnimationWrapperView>

                <Button title={"Click me"} onPress={this.onPress} />
            </View>
        );
    }

    private onPress = (_: any) => {
        this.wrapperRef?.triggerAnimation();
    }

    private onComplete = () => {
        ToastAndroid.show("Completed", ToastAndroid.SHORT);
    }

    _renderCard(): React.ReactNode {
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
