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
![Demo](/docs/media/demo.gif | width=10)
![Bounce](/docs/media/bounce.gif | width=10)
![Draggable](/docs/media/draggable.gif | width=10)
![Fade In](/docs/media/fade_in.gif | width=10)
![Fae Out](/docs/media/fade_out.gif | width=10)
![Scale In](/docs/media/scale.gif | width=10)
![Scale out](/docs/media/scale_out.gif | width=10)
![Scale out](/docs/media/slide_in.gif | width=10)
![Scale out](/docs/media/slide_out.gif | width=10)