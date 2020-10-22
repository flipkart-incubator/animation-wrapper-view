import React from 'react';
import { RippleAnimationWrapper } from './components/RippleAnimationWrapper';
import { ScaleAnimationWrapper } from './components/ScaleAnimationWrapper';
import { BounceAnimationWrapper } from './components/BounceAnimationWrapper';
import { AnimationType } from './models/AnimationType';
import { BaseAnimation } from './models/BaseAnimation';
import { DraggableAnimationWrapper } from './components/DraggableAnimationWrapper';
import { WrapperComponent } from "./Types";
import { AnimationProps } from "./Interfaces";

export abstract class AnimationWrapperView extends React.PureComponent<AnimationProps> {
    private animationWrapper: WrapperComponent;

    protected constructor(props: AnimationProps) {
        super(props);
        this.animationWrapper = AnimationWrapperView._animationWrapperGenerator(props.animationConfig);
    }

    public UNSAFE_componentWillReceiveProps(nextProps: AnimationProps): void {
        if (this.props.animationConfig !== nextProps.animationConfig) {
            this.animationWrapper = AnimationWrapperView._animationWrapperGenerator(nextProps.animationConfig);
        }
    }

    public render(): React.ReactNode | undefined {
        this._assertChildType();
        const { animationDimen, children } = this.props;
        const animationConfig = this.props.animationConfig;
        if (this.animationWrapper && children) {
            return (
                <this.animationWrapper animationConfig={animationConfig} animationDimen={animationDimen}>
                    {children}
                </this.animationWrapper>
            );
        }

        return;
    }

    private static _animationWrapperGenerator(animationConfig: BaseAnimation): WrapperComponent {
        switch (animationConfig.type) {
            case AnimationType.BOUNCE:
                return BounceAnimationWrapper;
            case AnimationType.RIPPLE:
                return RippleAnimationWrapper;
            case AnimationType.SCALE:
                return ScaleAnimationWrapper;
            case AnimationType.DRAGGABLE:
                return DraggableAnimationWrapper;
        }
    }

    private _assertChildType = (): void => {
        if (React.Children.count(this.props.children) !== 1) {
            throw new Error('Only one child can be passed to AnimationWrapperView');
        }
    };
}
