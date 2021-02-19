import { AnimationTriggerType, AnimationType } from "./Enums";

export default interface BaseAnimationConfig {
    type: AnimationType;
    triggerType: AnimationTriggerType;
}
