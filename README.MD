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

*Bounce Animation*
![Bounce](/docs/media/bounce.gif)

*Drag Animation*
![Draggable](/docs/media/draggable.gif)

*FadeIn Animation*
![Fade In](/docs/media/fade_in.gif)

*FadeOut Animation*
![Fae Out](/docs/media/fade_out.gif)

*Scale In Animation*
![Scale In](/docs/media/scale.gif)

*Scale Out Animation*
![Scale out](/docs/media/scale_out.gif)

*Slie In Animation*
![Slide in](/docs/media/slide_in.gif)

*Slide Out Animation*
![Slide out](/docs/media/slide_out.gif)


#### In Action
![Demore](/docs/media/demo.gif)