
import React from 'react';
import { GestureResponderEvent, TouchableWithoutFeedback, View } from 'react-native';
import { AnimationTriggerType } from '../models/AnimationTriggerType';
import { AnimationType } from '../models/AnimationType';
import {AnimationProps} from "../Interfaces";

export abstract class BaseAnimationWrapper<P extends AnimationProps, S> extends React.PureComponent<P, S> {
    public componentDidMount(): void {
        if (this.props.animationConfig && this.props.animationConfig.triggerType === AnimationTriggerType.ON_LOAD) {
            this.triggerAnimation();
        }
    }

    public render(): React.ReactNode {
        const content = this.props.children;
        if (this.props.animationConfig.type !== AnimationType.DRAGGABLE) {
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

    public _onPress = (_: GestureResponderEvent) => {
        const pressParam = this.props.animationConfig;
        if (pressParam && pressParam.triggerType === AnimationTriggerType.ON_CLICK) {
            this.triggerAnimation();
        }
    };

    protected abstract renderAnimation(content: React.ReactNode): React.ReactNode;
    protected abstract triggerAnimation(): void;
    protected abstract getAnimationStateFromProps(animationConfig: P): S;
}
