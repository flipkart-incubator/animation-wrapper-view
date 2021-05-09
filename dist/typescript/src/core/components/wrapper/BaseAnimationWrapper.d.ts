import React from 'react';
import { AnimationWrapperProps } from '../../Types';
export declare abstract class BaseAnimationWrapper<P extends AnimationWrapperProps, S> extends React.Component<P, S> {
    abstract startAnimation(): void;
    abstract stopAnimation(): void;
    abstract resetAnimation(): void;
    abstract finishAnimation(): void;
    componentDidMount(): void;
    render(): React.ReactNode;
    componentWillUnmount(): void;
    protected animationFinished: () => void;
    protected animationStarted: () => void;
    protected abstract renderAnimation(content: React.ReactNode): React.ReactNode;
    protected abstract getAnimationStateFromProps(animationConfig: P): S;
    private _onPress;
}
