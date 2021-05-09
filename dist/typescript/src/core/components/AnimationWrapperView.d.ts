import React from 'react';
import { AnimationWrapperProps } from "../Types";
export default class AnimationWrapperView extends React.PureComponent<AnimationWrapperProps> {
    private _component;
    private _animatorRef?;
    protected constructor(props: AnimationWrapperProps);
    UNSAFE_componentWillReceiveProps(nextProps: AnimationWrapperProps): void;
    /**
     * This function will reset all animated timing functions associated with the current animation
     * and start the animation from it's initial point.
     */
    startAnimation(): void;
    /**
     * This function will stop all the Animated timing functions without resetting their values
     * effectively pausing any applied animation when invoked.
     */
    stopAnimation(): void;
    /**
     * This function will clear the animation timing functions and will reset the view before
     * any animation transformation were applied to it.
     */
    resetAnimation(): void;
    finishAnimation(): void;
    render(): React.ReactNode | undefined;
    private _setRef;
    private static _animationWrapperGenerator;
    private _assertChildType;
}
