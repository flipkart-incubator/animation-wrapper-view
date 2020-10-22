import { AnimationTriggerType } from './AnimationTriggerType';
import { AnimationType } from './AnimationType';
export interface BaseAnimation {
    type: AnimationType;
    triggerType: AnimationTriggerType;
}
