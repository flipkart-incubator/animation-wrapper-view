import { JsonAnimation } from "../models/JsonAnimation";

export const cardFlipJson = {
    "triggerType": "ON_CLICK",
    "type": "JSON",
    "animationConfig": [
        {
            "tr": [
                {
                    "key": "scale",
                    "f": .4,
                    "t": 1
                }, {
                    "key": "rotateX",
                    "f": 0,
                    "t": 360
                }
            ],
            "d": 2000,
            "i": {
                "e": "quad"
            }
        },
        {
            "tr": [
                {
                    "key": "scale",
                    "f": 1,
                    "t": .4
                }, {
                    "key": "rotateY",
                    "t": 0,
                    "f": -360
                }

            ],
            "d": 2000,
            "i": {
                "e": "circle"
            }
        }
    ]
} as JsonAnimation;


export const swingJson = {
    "triggerType": "ON_LOAD",
    "type": "JSON",
    "animationConfig": [
        {
            "tr": [
                {
                    "key": "translateX",
                    "f": 0,
                    "t": 100
                }, {
                    "key": "rotate",
                    "f": 0,
                    "t": 5
                }
            ],
            "d": 500,
            "i": {
                "e": "quad"
            }
        },
        {
            "tr": [
                {
                    "key": "translateX",
                    "f": 50,
                    "t": -100
                }, {
                    "key": "rotate",
                    "f": 5,
                    "t": -5

                }

            ],
            "d": 500,
            "i": {
                "e": "quad"
            }
        },
        {
            "tr": [
                {
                    "key": "translateX",
                    "f": -100,
                    "t": 0
                }, {
                    "key": "rotate",
                    "f": -5,
                    "t": 0

                }

            ],
            "d": 500,
            "i": {
                "e": "ease"
            }
        }

    ]
} as JsonAnimation;


export const zoomInJson = {
    "triggerType": "ON_CLICK",
    "type": "JSON",
    "animationConfig": {
        "tr": [
            {
                "key": "scale",
                "f": 0,
                "t": 1
            }, {
                "key": "rotate",
                "f": -30,
                "t": 0
            }
        ],
        "d": 500,
        "i": {
            "e": "linear"
        }
    }
} as JsonAnimation;