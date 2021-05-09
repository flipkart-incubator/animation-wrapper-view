import React from 'react';
import BaseAnimationConfig from './src/core/data/BaseAnimationConfig';
interface State {
    animationConfig: BaseAnimationConfig;
}
export default class Main extends React.Component<{}, State> {
    constructor(props: any);
    private _wrapperRef?;
    render(): React.ReactNode;
    private _onPressToStart;
    private _onPressToStop;
    private _onPressToReset;
    private _onPressToFinish;
    private _onComplete;
    private _onStart;
    private _renderCard;
    private onPressButton;
}
export {};
