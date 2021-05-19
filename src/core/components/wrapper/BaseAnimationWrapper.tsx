import React from 'react';
import { Animated, GestureResponderEvent, TouchableWithoutFeedback, View } from 'react-native';
import { AnimationTriggerType } from '../../data/Enums';
import { AnimationWrapperProps } from '../../Types';

export abstract class BaseAnimationWrapper<P extends AnimationWrapperProps> extends React.PureComponent<P> {

    public abstract finishAnimation(): void;
    protected abstract renderAnimation(content: React.ReactNode): React.ReactNode;
    protected abstract updateCompositeAnimation(): void;

    protected _compositeAnimation: Animated.CompositeAnimation | undefined;

    public shouldComponentUpdate(nextProps: Readonly<AnimationWrapperProps>, _: any): boolean {
        const shouldUpdate = nextProps.animationConfig !== this.props.animationConfig;
        return shouldUpdate;
    }

    public componentDidMount(): void {
        this._triggerOnLoadAnimation();
    }

    public componentDidUpdate(): void {
        this._triggerOnLoadAnimation();
    }

    public componentWillUnmount(): void {
        this.stopAnimation();
    }

    public render(): React.ReactNode {
        const content = this.props.children;
        if (this.props.animationConfig?.triggerType === AnimationTriggerType.ON_CLICK) {
            return (
                <TouchableWithoutFeedback onPress={this._onPress}>
                    {this.renderAnimation(content)}
                </TouchableWithoutFeedback>
            );
        } else {
            return (
                <View>
                    {this.renderAnimation(content)}
                </View>
            )
        }
    }
    
    public startAnimation(): void {
        this._compositeAnimation?.reset();
        this.updateCompositeAnimation();
        this._compositeAnimation?.start(() => {
            this.props.onAnimationFinish?.(this.props.animationConfig);
        });
        this.props.onAnimationStart?.(this.props.animationConfig);
    }

    public stopAnimation(): void {
        this._compositeAnimation?.stop();
    }

    public resetAnimation(): void {
        this._compositeAnimation?.reset();
    }

    private _onPress = (_: GestureResponderEvent): void => {
        this.startAnimation();
    };

    private _triggerOnLoadAnimation(): void {
        const { triggerDelay, triggerType } = this.props.animationConfig;
        if (triggerType === AnimationTriggerType.ON_LOAD) {
            if (triggerDelay) {
                setTimeout(() => {
                    this.startAnimation();
                }, triggerDelay);
            } else {
                this.startAnimation();
            }
        }
    }
}
