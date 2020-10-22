## AnimationWrapperView
You can use *AnimationWrapperView* and apply animation to any component by simply wrapping it in a container.


### Currently Supported Animations

#### Particle effect animations
 - Ripple background animation
 - Bounce container animation
#### Transition animations
 - Scale Up/Down
 - Fade In/Out animation

#### Interaction animations
 - Draggable view animations


### Future scope 
 

### Sample code
```jsx
const bounceConfig: BounceAnimation = {
    type: AnimationType.BOUNCE,
    triggerType: AnimationTriggerType.ON_CLICK,
    bounceHeight: 20,
    animationDuration: 1000
};

<AnimationWrapperView animationConfig={bounceConfig} animationDimen={{ width: 200, height: 200 }}>
    {/* {your component} */}
</AnimationWrapperView>
```

### Demo
| AnimationType | Demo |
| --- | --- |

| *Bounce Animation* | <img src="/docs/media/bounce.gif" width="50%"> |
| *Drag Animation* | <img src="/docs/media/draggable.gif" width="50%"> |
| *Fade In Animation* | <img src="/docs/media/fade_in.gif" width="50%"> |
| *FadeOu Animation* | <img src="/docs/media/fade_out.gif" width="50%"> |
| *Slide in Animation* | <img src="/docs/media/slide_in.gif" width="50%"> |
| *Slide outAnimation* | <img src="/docs/media/slide_out.gif" width="50%"> |
| *Scale In Animation* | <img src="/docs/media/scale.gif" width="50%"> |
| *Scale Out Animation* | <img src="/docs/media/scale_out.gif" width="50%"> |


#### In Action
![Demore](/docs/media/demo.gif)
