## AnimationWrapperView
AnimationWrapperView is a collection of a well defined set of component level animations, that a developer can utilize just by just providing some configurations. AnimationWrapperView will add plug and play type support to the already robust Animated API,  and will take care of all the intricate details of each animation type.
 

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

### AnimationWrapperView capabilities
Robustly exposed API to allow developer to have control over various aspects of animation, such as

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

// Start animation on button press.
private _onPressToStart = (_: GestureResponderEvent) => {
    this._wrapperRef?.startAnimation();
}

// Pause animation on button press.
private _onPressToPause = (_: GestureResponderEvent) => {
    this._wrapperRef?.pauseAnimation();
}

// Reset animation on button press.
private _onPressToReset = (_: GestureResponderEvent) => {
    this._wrapperRef?.resetAnimation();
}
```

### AnimationWrapperView props
| Prop name | Prop Type | Description |
| --- | --- | --- | 
| animationConfig | BaseAnimation | Object which will contain all optional and non-optional parameters needed to render the animation, including AnimationType, AnimationTriggerType, etc. |
| onAnimationFinish | () => void | (optional) Callback function, if provided will be invoked once animation is finished. |

### Demo
| Animation Type | Demo GIF |
| --- | --- |
| *Bounce Animation* | ![Bounce](/docs/media/bounce.gif) |
| *Drag Animation* | ![Draggable](/docs/media/draggable.gif) |
| *Fade In Animation* | ![Fade In](/docs/media/fade_in.gif) |
| *Fade Out Animation* | ![Fae Out](/docs/media/fade_out.gif) |
| *Ripple Animation* | ![Ripple](/docs/media/ripple.gif) |
| *Scale In Animation* | ![Scale In](/docs/media/scale.gif) |
| *Scale Out Animation* | ![Scale out](/docs/media/scale_out.gif) |
| *Slide In Animation* | ![Slide in](/docs/media/slide_in.gif) |
| *Slide Out Animation* | ![Slide out](/docs/media/slide_out.gif)| 


#### In Action
![Demore](/docs/media/demo.gif)
