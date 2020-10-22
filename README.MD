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
![Demo](/docs/media/demo.gif)
