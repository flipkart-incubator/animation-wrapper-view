AnimationWrapperView is a collection of a well defined set of component level animations, that a developer can utilize just by providing some configurations. AnimationWrapperView will add plug and play type support to the already robust Animated API,  and will take care of all the intricate details of each animation type.
 
### Features
 - Power animation payload from anywhere (backend ? 😉)
 - Extremely light-weight (4KB gzipped + minified).
 - Out-of-box support for iOS, Android and RNW.
 - Great selection of well defined animations. 
 - Declarative transformation animations with JSON.
 - Imperative controls to the animation state. (start/pause/reset)

### Sample code
```jsx
const bounceConfig: BounceAnimation = {
    type: AnimationType.BOUNCE,
    triggerType: AnimationTriggerType.ON_CLICK,
    bounceHeight: 20,
    animationDuration: 1000
};

<AnimationWrapperView animationConfig={bounceConfig}>
    {/* {your component} */}
</AnimationWrapperView>
```

### Steps to integrate

```
npm install animation-wrapper-view
```

### AnimationWrapperView capabilities

#### Start, Pause and Reset Animation
```jsx
private _wrapperRef: AnimationWrapperView | null;

render() {
    return (
        <AnimationWrapperView
            ref={(ref) => (this._wrapperRef = ref)}
            animationConfig={this.state.animationConfig}
            onAnimationFinish={this._onComplete}>
                {your component}
        </AnimationWrapperView>
    );
}

// Start animation from the view ref.
private _onPressToStart = (_: GestureResponderEvent) => {
    this._wrapperRef?.startAnimation();
}

// Pause animation from the view ref.
private _onPressToPause = (_: GestureResponderEvent) => {
    this._wrapperRef?.pauseAnimation();
}

// Reset animation from the view ref.
private _onPressToReset = (_: GestureResponderEvent) => {
    this._wrapperRef?.resetAnimation();
}
```



