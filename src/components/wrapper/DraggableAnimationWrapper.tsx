import { Animated, PanResponder } from 'react-native';
import React from 'react';
import { BaseAnimationWrapper } from './BaseAnimationWrapper';
import {DraggableAnimation } from '../../models/DraggableAnimation';
import {  DraggableAnimationProps } from "../../utils/Interfaces";


interface DraggableAnimationState {
    pan: Animated.ValueXY,
    panResponder: any
}

export class DraggableAnimationWrapper extends BaseAnimationWrapper<DraggableAnimationProps, DraggableAnimationState> {

    public constructor(props: DraggableAnimationProps) {
        super(props);

        this.state = {
            pan: new Animated.ValueXY(),
            panResponder: undefined
        }
        this.state = this.getAnimationStateFromProps(props);
    }

    public UNSAFE_componentWillReceiveProps(nextProps: Readonly<DraggableAnimationProps>, _nextContext: any): void {
        if (nextProps !== this.props) {
            const nextState: DraggableAnimationState | null = this.getAnimationStateFromProps(nextProps);
            if (null != nextState) {
                this.setState(nextState);
            }
        }
    }



    protected renderAnimation(content: React.ReactNode): React.ReactNode {
        return (
            <Animated.View
                style={this.state.pan.getLayout()}
                {...this.state.panResponder.panHandlers}
            >
                {content}
            </Animated.View>
        );
    }

    protected getAnimationStateFromProps(_: DraggableAnimationProps): DraggableAnimationState {
        const { pan } = this.state;

        return {
            ...this.state,
            panResponder: PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onPanResponderMove: (e, gesture) => {
                    Animated.event([
                        null,
                        {
                            dx: pan.x,
                            dy: pan.y,
                        },
                    ])(e, gesture)
                },
                onPanResponderRelease: () => {
                    Animated.spring(
                        pan, // Auto-multiplexed
                        { toValue: { x: 0, y: 0 }, useNativeDriver: false } // Back to zero
                        ).start();
                    }
            })
        };
    }


    public stopAnimation(): void {
        // this.state.translateY.stopAnimation();
    }
    public resetAnimation(): void {
        this.stopAnimation();
        this.setState(this.getAnimationStateFromProps(this.props));
    }

    public startAnimation(): void {
        // no-op
    }
}
