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
    private enableStateDetection: boolean;
    public dragState: DragState = DragState.UNDEFINED;

    private blacklistedAxis: DragState[];
    private dx: number[];
    private dy: number[];

    constructor(enableStateDetection?: boolean, blacklistedAxis?: DragState[]) {
        this.enableStateDetection = enableStateDetection ?? true;
        this.dx = [];
        this.dy = [];
        this.blacklistedAxis = blacklistedAxis ?? [];
    }

    public clearState() {
        this.dx = [];
        this.dy = [];
        this.dragState = DragState.UNDEFINED;
    }

    public getDragState(dx?: number, dy?: number): DragState {
        if (!this.enableStateDetection) {
            return this.dragState;
        }
        if (dx && dy && this.dx.length <= 5) {
            this.dx.push(dx);
            this.dy.push(dy);
        }
        console.log(this.dragState);
        if (this.dy.length === 5 && dy && dx) {
            const xMean = this.dx.reduce((a, b) => a + b, 0);
            const yMean = this.dy.reduce((a, b) => a + b, 0);
            if (!inRange(xMean, -15, 15) && !inRange(yMean, -15, 15) || (inRange(xMean, -15,15) && inRange(yMean, -15, 15))) {
                this.dragState = DragState.FREE_DRAG;
            } else if (inRange(xMean, -15, 15)) {
                if (dy > 0 && !this.blacklistedAxis.includes(DragState.SWIPE_DOWN)) {
                    this.dragState = DragState.SWIPE_DOWN;
                } else if (dy < 0 && !this.blacklistedAxis.includes(DragState.SWIPE_UP)) {
                    this.dragState = DragState.SWIPE_UP;
                }
            } else if (inRange(yMean, -15, 15)) {
                if (dx > 0 && !this.blacklistedAxis.includes(DragState.SWIPE_RIGHT)) {
                    this.dragState = DragState.SWIPE_RIGHT;
                } else if (dx < 0 && !this.blacklistedAxis.includes(DragState.SWIPE_LEFT)) {
                    this.dragState = DragState.SWIPE_LEFT;
                }
            }
        }
        return this.dragState;
    }
}
