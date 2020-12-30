import { AnimationTriggerType } from "../models/AnimationTriggerType";
import { AnimationType } from "../models/AnimationType";
import { JsonAnimation } from "../models/JsonAnimation";

export const cardFlipJson: JsonAnimation = {
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

export const cardRotateJson: JsonAnimation = {
    triggerType: AnimationTriggerType.ON_CLICK,
    type: AnimationType.JSON,
    animationConfig: {
        transforms: [
            {
                key: "translateX",
                from: 0,
                to: 100
            },
            {
                key: "rotate",
                from: 0,
                to: 90
            }

        ],
        duration: 2000,
        interpolation: {
            easing: "linear"
        }
    }
};

export const swingJson: JsonAnimation = {
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

export const zoomInJson: JsonAnimation = {
    triggerType: AnimationTriggerType.ON_CLICK,
    type: AnimationType.JSON,
    animationConfig: {
        transforms: [
            {
                key: "scale",
                from: 0,
                to: 1
            }, {
                key: "rotate",
                from: -30,
                to: 0
            }
        ],
        duration: 500,
        interpolation: {
            easing: "back",
            params: {
                back: 1
            }
        }
    }
};