
import { AnimationTriggerType, AnimationType } from "../src/core/data/Enums";
import { JsonAnimationConfig } from "../src/core/data/JsonAnimationConfig";

export const cardFlipJson: JsonAnimationConfig = {
    triggerType: AnimationTriggerType.ON_CLICK,
    type: AnimationType.JSON,
    animationConfig: [
        {
            transforms: [
                {
                    key: "scale",
                    from: .4,
                    to: 1
                }, {
                    key: "rotateX",
                    from: 0,
                    to: 360
                }
            ],
            duration: 2000,
            interpolation: {
                easing: "quad"
            }
        },
        {
            transforms: [
                {
                    key: "scale",
                    from: 1,
                    to: .4
                }, {
                    key: "rotateY",
                    to: 0,
                    from: -360
                }

            ],
            duration: 2000,
            interpolation: {
                easing: "circle"
            }
        }
    ]
};

export const cardRotateJson: JsonAnimationConfig = {
    triggerType: AnimationTriggerType.ON_CLICK,
    type: AnimationType.JSON,
    animationConfig: {
        transforms: [
            {
                key: "rotate",
                from: 0,
                to: 90
            },
            {
                key: "scale",
                from: 0, 
                to: 1
            }
        ],
        duration: 2000,
        interpolation: {
            easing: "linear"
        }
    }
};

export const swingJson: JsonAnimationConfig = {
    triggerType: AnimationTriggerType.ON_LOAD,
    type: AnimationType.JSON,
    animationConfig: [
        {
            transforms: [
                {
                    key: "translateX",
                    from: 0,
                    to: 100
                }, {
                    key: "rotate",
                    from: 0,
                    to: 5
                }
            ],
            duration: 500,
            interpolation: {
                easing: "quad"
            }
        },
        {
            transforms: [
                {
                    key: "translateX",
                    from: 50,
                    to: -100
                }, {
                    key: "rotate",
                    from: 5,
                    to: -5

                }
            ],
            duration: 500,
            interpolation: {
                easing: "quad"
            }
        },
        {
            transforms: [
                {
                    key: "translateX",
                    from: -100,
                    to: 0
                }, {
                    key: "rotate",
                    from: -5,
                    to: 0

                }

            ],
            duration: 500,
            interpolation: {
                easing: "linear"
            }
        }

    ]
};

export const zoomInJson: JsonAnimationConfig = {
    triggerType: AnimationTriggerType.ON_CLICK,
    type: AnimationType.JSON,
    animationConfig: [
        {
            transforms: [
                {
                    key: "scale",
                    from: 0,
                    to: 1
                }, {
                    key: "rotate",
                    from: -90,
                    to: 0
                }, {
                    key: "rotateY",
                    from: 0,
                    to: 360
                }
            ],
            duration: 1500,
            interpolation: {
                easing: "quad"
            }
        },
        {
            transforms: [
                {
                    key: "scale",
                    from: 1,
                    to: .7
                }
            ],
            duration: 500,
            interpolation: {
                easing: "exp"
            }
        }
    ]
};