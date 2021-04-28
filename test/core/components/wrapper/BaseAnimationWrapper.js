import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { AnimationTriggerType, AnimationType } from '../../data/Enums';
export class BaseAnimationWrapper extends React.Component {
    constructor() {
        super(...arguments);
        this.animationFinished = () => {
            if (this.props.onAnimationFinish) {
                this.props.onAnimationFinish();
            }
        };
        this.animationStarted = () => {
            if (this.props.onAnimationStart) {
                this.props.onAnimationStart();
            }
        };
        this._onPress = (_) => {
            const pressParam = this.props.animationConfig;
            if (pressParam && pressParam.triggerType === AnimationTriggerType.ON_CLICK) {
                this.startAnimation();
            }
        };
    }
    componentDidMount() {
        const { triggerDelay, triggerType } = this.props.animationConfig;
        if (triggerType === AnimationTriggerType.ON_LOAD) {
            if (triggerDelay) {
                setTimeout(() => {
                    this.startAnimation();
                }, triggerDelay);
            }
            else {
                this.startAnimation();
            }
        }
    }
    render() {
        const content = this.props.children;
        if (this.props.animationConfig.type !== AnimationType.DRAGGABLE) {
            return (<TouchableWithoutFeedback onPress={this._onPress}>
                    {this.renderAnimation(content)}
                </TouchableWithoutFeedback>);
        }
        else {
            return (<View>
                    {this.renderAnimation(content)}
                </View>);
        }
    }
    componentWillUnmount() {
        this.stopAnimation();
    }
}
//# sourceMappingURL=BaseAnimationWrapper.js.map