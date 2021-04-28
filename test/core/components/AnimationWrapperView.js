import React from 'react';
import { RippleAnimationWrapper } from './wrapper/RippleAnimationWrapper';
import { ScaleAnimationWrapper } from './wrapper/ScaleAnimationWrapper';
import { BounceAnimationWrapper } from './wrapper/BounceAnimationWrapper';
import { DraggableAnimationWrapper } from './wrapper/DraggableAnimationWrapper';
import { FadeAnimationWrapper } from './wrapper/FadeAnimationWrapper';
import { SlideAnimationWrapper } from './wrapper/SlideAnimationWrapper';
import { WiggleAnimationWrapper } from './wrapper/WiggleAnimationWrapper';
import { JsonAnimationWrapper } from './wrapper/JsonAnimationWrapper';
import { AnimationType } from '../data/Enums';
export default class AnimationWrapperView extends React.PureComponent {
    constructor(props) {
        super(props);
        this._setRef = (ref) => {
            this._animatorRef = ref;
        };
        this._assertChildType = () => {
            if (React.Children.count(this.props.children) !== 1) {
                throw new Error('Only one child can be passed to AnimationWrapperView');
            }
        };
        this._component = AnimationWrapperView._animationWrapperGenerator(props.animationConfig);
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        var _a;
        if (this.props.animationConfig !== nextProps.animationConfig) {
            (_a = this._animatorRef) === null || _a === void 0 ? void 0 : _a.resetAnimation();
            this._component = AnimationWrapperView._animationWrapperGenerator(nextProps.animationConfig);
        }
    }
    /**
     * This function will reset all animated timing functions associated with the current animation
     * and start the animation from it's initial point.
     */
    startAnimation() {
        var _a;
        (_a = this._animatorRef) === null || _a === void 0 ? void 0 : _a.startAnimation();
    }
    /**
     * This function will stop all the Animated timing functions without resetting their values
     * effectively pausing any applied animation when invoked.
     */
    stopAnimation() {
        var _a;
        (_a = this._animatorRef) === null || _a === void 0 ? void 0 : _a.stopAnimation();
    }
    /**
     * This function will clear the animation timing functions and will reset the view before
     * any animation transformation were applied to it.
     */
    resetAnimation() {
        var _a;
        (_a = this._animatorRef) === null || _a === void 0 ? void 0 : _a.resetAnimation();
    }
    finishAnimation() {
        var _a;
        (_a = this._animatorRef) === null || _a === void 0 ? void 0 : _a.finishAnimation();
    }
    render() {
        this._assertChildType();
        const { children, onAnimationFinish, onAnimationStart } = this.props;
        const animationConfig = this.props.animationConfig;
        if (this._component && children) {
            return (<this._component ref={this._setRef} animationConfig={animationConfig} onAnimationFinish={onAnimationFinish} onAnimationStart={onAnimationStart}>
                    {children}
                </this._component>);
        }
        return;
    }
    static _animationWrapperGenerator(animationConfig) {
        switch (animationConfig.type) {
            case AnimationType.BOUNCE:
                return BounceAnimationWrapper;
            case AnimationType.RIPPLE:
                return RippleAnimationWrapper;
            case AnimationType.SCALE:
                return ScaleAnimationWrapper;
            case AnimationType.DRAGGABLE:
                return DraggableAnimationWrapper;
            case AnimationType.FADE_IN:
            case AnimationType.FADE_OUT:
                return FadeAnimationWrapper;
            case AnimationType.SLIDE_VERTICAL:
            case AnimationType.SLIDE_HORIZONTAL:
                return SlideAnimationWrapper;
            case AnimationType.WIGGLE:
                return WiggleAnimationWrapper;
            default:
                return JsonAnimationWrapper;
        }
    }
}
//# sourceMappingURL=AnimationWrapperView.js.map