AnimationWrapperView is a collection of a well defined set of component level animations, that a developer can utilize just by providing some configurations. AnimationWrapperView will add plug and play type support to the already robust Animated API,  and will take care of all the intricate details of each animation type.
 

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
- Robustly exposed API to allow developer to have control over various aspects of predefined animations.
- Ability to compose your own animations on the fly by providing a custom JSON.

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
| onAnimationStart | () => void | (optional) Callback function, if provided will be invoked when the animation is triggered. |


### Define your custom animations!
AnimationWrapperView also gives you the capability to define your custom animation using JSON.
This tool is very powerful as it allows you to play with various transformation attributes that can be applied to any Animated.View.

 - A `TransformDef` object defines an individual piece of transformation, `f`(from) to `t`(to) value and the `p`(property) to transform. 
 - An array of `TransformDef` along with the `duration` and the `InterpolationDef` will create an `AnimationDef` object. All the transformations defined in the array will play in parallel.
 - An array of `AnimationDef` definitions can be played in sequence to render any type of animation (limited by imagination :P).

Type definitions:

| Type name | params | usage |
| --- | --- | --- |
| TransformDef | property: TransformType  | Defines the property to transform: SCALE, FADE,OPACITY, TRANSLATE_Y, ROTATE, TRANSLATE_X, ROTATE_X, ROTATE_Y , SCALE_X, SCALE_Y |
| | to:number | The starting value of the transformation |
| | from:number | The final value of transformation after animation |


| Type name | params | usage |
| --- | --- | --- |
| InterpolationDef | easing: EasingType | Defines the easing that will be applied to the transformation set: linear, quad, circle, elastic, bounce, back. |
| | params: InterpolationParams | Some easing functions require extra params, we use this object to populate the optional params for easing functions, please note if a non optional param is not provided for the specified easing function, it will fallback to linear easing. |


| Type name | params | usage |
| --- | --- | --- |
| InterpolationParams | back: number | https://reactnative.dev/docs/easing#back |
| | bounciness: number | https://reactnative.dev/docs/easing#bounce |

| Type name | params | usage |
| --- | --- | --- |
| AnimationDef | TransformDef[] | An array of transformation functions can be defined, that will be applied to the object in parallel |
| | duration | Duration in which the set of transformations complete animating. |
| | InterpolationDef | This param will describe the easing function that will be applied to this set of transformations. ||


Multiple set of transformations can be played in a sequence.

Sample Json
```json
{
  "animation": [
    {
      "transformations": [
        {
          "key": "SCALE",
          "from": 0,
          "to": 1
        },
        {
          "key": "ROTATE",
          "from": 0,
          "to": 90
        },
        {
          "key": "ROTATE_X",
          "from": 0,
          "to": 180
        }
      ],
      "duration": 1000,
      "interpolation": {
          "easing": "linear"
      }
    }
  ]
}
```
![Json Animation Demo](/media/json_animation.gif)
![Json Animation Demo](/media/json_demo.gif)
### Demo
| Animation Type | Demo GIF |
| --- | --- |
| *Bounce Animation* | ![Bounce](/media/bounce.gif) |
| *Drag Animation* | ![Draggable](/media/draggable.gif) |
| *Fade In Animation* | ![Fade In](/media/fade_in.gif) |
| *Fade Out Animation* | ![Fae Out](/media/fade_out.gif) |
| *Ripple Animation* | ![Ripple](/media/ripple.gif) |
| *Scale In Animation* | ![Scale In](/media/scale.gif) |
| *Scale Out Animation* | ![Scale out](/media/scale_out.gif) |
| *Slide In Animation* | ![Slide in](/media/slide_in.gif) |
| *Slide Out Animation* | ![Slide out](/media/slide_out.gif)| 


#### In Action
![Demore](/media/demo.gif)
