import { Animated, PanResponder } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';

import { AnimationWrapperProps } from '../../Types';
import BaseAnimationConfig from '../../data/BaseAnimationConfig';

import { DragState, DragStateMachine } from './DragStateMachine';
export interface DraggableAnimationProps extends AnimationWrapperProps {
    animationConfig: DraggableAnimationConfig;
}

export interface DraggableAnimationConfig extends BaseAnimationConfig {
    blacklistedStates?: DragState[];
    enableStateDetection?: boolean;
    snapDelta?: number;
    onDragRelease?: (dragState: DragState, dx: number, dy: number, x: number, y: number) => void;
    onDragDirectionDetected?: (dragState: DragState) => void;
}

export class DraggableAnimationWrapper extends BaseAnimationWrapper<DraggableAnimationProps> {
    private pan: Animated.ValueXY = new Animated.ValueXY();;
    private panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onStartShouldSetPanResponderCapture: () => false,
        onMoveShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderMove: (e, gesture) => {
            const dragState = this.dragStateMachine.getDragState(gesture.dx, gesture.dy);
            if (dragState !== DragState.UNDEFINED) {
                this.props.animationConfig.onDragDirectionDetected?.(dragState);
            }
            switch (dragState) {
                case DragState.SWIPE_LEFT:
                case DragState.SWIPE_RIGHT:
                    if (dragState === DragState.SWIPE_LEFT && gesture.dx < 0) {
                        Animated.event([null, {
                            dx: this.pan.x
                        }])(e, gesture);
                    } else if (dragState === DragState.SWIPE_RIGHT &&  gesture.dx > 0) {
                        Animated.event([null, {
                            dx: this.pan.x
                        }])(e, gesture);
                    }
                    break;
                case DragState.SWIPE_DOWN:
                case DragState.SWIPE_UP:
                    if (dragState === DragState.SWIPE_UP && gesture.dy < 0) {
                        Animated.event([null, {
                            dy: this.pan.y
                        }])(e, gesture);
                    } else if (dragState === DragState.SWIPE_DOWN && gesture.dy > 0) {
                        Animated.event([null, {
                            dy: this.pan.y
                        }])(e, gesture);
                    }
                    break;
                case DragState.FREE_DRAG:
                    Animated.event([null, {
                        dx: this.pan.x,
                        dy: this.pan.y
                    }])(e, gesture);
                    break;
            }
            return true;
        },
        onPanResponderRelease: (_, gesture) => {
            Animated.spring(
                this.pan,
                { toValue: { x: 0, y: 0 }, useNativeDriver: false }
            ).start();
            this.props.animationConfig.onDragRelease?.(this.dragStateMachine.dragState, gesture.dx, gesture.dy, gesture.x0 + gesture.dx, gesture.y0 + gesture.dy);
            this.dragStateMachine.clearState();
            return true;
        }
    });
    private dragStateMachine: DragStateMachine;

    public constructor(props: DraggableAnimationProps) {
        super(props);

        const { enableStateDetection: enableAxisDetection, blacklistedStates: blacklistedAxis, snapDelta: touchSnapDelta } = this.props.animationConfig;

        this.dragStateMachine = new DragStateMachine(enableAxisDetection, blacklistedAxis, touchSnapDelta);

        this.updateCompositeAnimation();
    }

    protected renderAnimation(content: React.ReactNode): React.ReactNode {
        return (
            <Animated.View
                style={this.pan.getLayout()}
                {...this.panResponder.panHandlers}
            >
                {content}
            </Animated.View>
        );
    }

    protected updateCompositeAnimation(): void { }

    public finishAnimation(): void { }
}
