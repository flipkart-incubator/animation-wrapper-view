import { PanResponderGestureState } from "react-native";

const inRange = (x: number, min: number, max: number): boolean => {
    return ((x - min) * (x - max) <= 0);
}

export enum DragState {
    UNDEFINED = 'UNDEFINED',
    FREE_DRAG = 'FREE_DRAG',
    SWIPE_LEFT = 'SWIPE_LEFT',
    SWIPE_RIGHT = 'SWIPE_RIGHT',
    SWIPE_UP = 'SWIPE_UP',
    SWIPE_DOWN = 'SWIPE_DOWN'
}

export class DragStateMachine {
    public dragState: DragState = DragState.UNDEFINED;

    private readonly disableDragDetection: boolean;
    private readonly blacklistedDragStates: DragState[];
    private readonly touchSnapDelta: number;

    private dx: number[];
    private dy: number[];

    constructor(disableDragDetection?: boolean, blacklistedDragStates?: DragState[], touchSnapDelta?: number) {
        this.disableDragDetection = disableDragDetection ?? false;
        this.dx = [];
        this.dy = [];
        this.blacklistedDragStates = blacklistedDragStates ?? [];
        this.touchSnapDelta = touchSnapDelta ?? 20;
    }

    public clearState() {
        this.dx = [];
        this.dy = [];
        this.dragState = DragState.UNDEFINED;
    }

    public isTapGesture(gesture: PanResponderGestureState): boolean {
        const { dx, dy } = gesture;
        if (dx > 2 || dx < -2 || dy > 2 || dy < -2) {
            return false;
        }
        return true;
    }

    public getDragState(dx?: number, dy?: number): DragState {
        if (this.disableDragDetection || !this.blacklistedDragStates.includes(DragState.FREE_DRAG)) {
            return DragState.FREE_DRAG;
        }
        if (dx && dy) {
            if (this.dx.length <= 3) {
                this.dx.push(dx);
                this.dy.push(dy);
            } else if (this.dx.length === 3 || this.dragState === DragState.UNDEFINED) {
                const xMean = this.dx.reduce((a, b) => a + b, 0);
                const yMean = this.dy.reduce((a, b) => a + b, 0);
                if (inRange(xMean, -this.touchSnapDelta, this.touchSnapDelta)) { // Detected Vertical Swipe
                    if (dy > 0 && !this.blacklistedDragStates.includes(DragState.SWIPE_DOWN)) { // Detected swipe in downward direction
                        this.dragState = DragState.SWIPE_DOWN;
                    } else if (dy < 0 && !this.blacklistedDragStates.includes(DragState.SWIPE_UP)) { // Detected swipe in upward direction
                        this.dragState = DragState.SWIPE_UP;
                    }
                } else if (inRange(yMean, -this.touchSnapDelta, this.touchSnapDelta)) { // Detected Horizontal Swipe
                    if (dx > 0 && !this.blacklistedDragStates.includes(DragState.SWIPE_RIGHT)) { // Detected swipe in right direction
                        this.dragState = DragState.SWIPE_RIGHT;
                    } else if (dx < 0 && !this.blacklistedDragStates.includes(DragState.SWIPE_LEFT)) { // Detected swipe in left direction
                        this.dragState = DragState.SWIPE_LEFT;
                    }
                } else if (!this.blacklistedDragStates.includes(DragState.FREE_DRAG)) {
                    this.dragState = DragState.FREE_DRAG; // Fallback to free swipe direction.
                }
            }
        }
        return this.dragState;
    }
}
