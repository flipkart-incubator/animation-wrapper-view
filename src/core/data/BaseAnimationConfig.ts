import { AnimationTriggerType, AnimationType } from "./Enums";
import {InterpolationDef} from "./JsonAnimationConfig";

export default interface BaseAnimationConfig {
    type: AnimationType;
    triggerType: AnimationTriggerType;
    interpolationDef?: InterpolationDef;
    triggerDelay?: number; // only for triggerType -> ON_LOAD
    metaData?: any;
}
