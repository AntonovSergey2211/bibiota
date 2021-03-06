import { Rectangle, Point } from '@e2d/geom';
import { Event } from '@e2d/events';
import { MOUSE_MOVE } from './events';
import DisplayObjectContainer from './DisplayObjectContainer';

export default class Container extends DisplayObjectContainer {
	private _dragBounds: Rectangle | null = null;
	private _dragX = 0;
	private _dragY = 0;
	private _dragListener: ((e: Event) => void) | null = null;

	hitArea: Container | undefined;
	buttonMode = false;
	useHandCursor = false;

	constructor() {
		super();
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	startDrag(lockCenter: boolean = false, bounds: Rectangle | null = null) {
		const { stage } = this;

		if (!stage) {
			return;
		}

		this._dragBounds = bounds;

		this._dragX = this.mouseX;
		this._dragY = this.mouseY;

		if (!this._dragListener) {
			this._dragListener = this.dragMove.bind(this);
		}

		stage.addEventListener(MOUSE_MOVE, this._dragListener);
	}

	stopDrag() {
		const { stage } = this;

		if (!stage) {
			return;
		}

		if (this._dragListener) {
			stage.removeEventListener(MOUSE_MOVE, this._dragListener);
		}
	}

	dragMove() {
		if (!this.parent) {
			return;
		}

		const point = new Point(
			this.mouseX - this._dragX,
			this.mouseY - this._dragY,
		);

		this.transform.concatenatedMatrix.transformPointTo(point, point);

		this.parent.transform.concatenatedMatrix.transformInversePointTo(point, point);

		this.x = point.x;
		this.y = point.y;

		if (this._dragBounds != null) {
			if (this.x < this._dragBounds.left) {
				this.x = this._dragBounds.left;
			} else if (this.x > this._dragBounds.right) {
				this.x = this._dragBounds.right;
			}

			if (this.y < this._dragBounds.top) {
				this.y = this._dragBounds.top;
			} else if (this.y > this._dragBounds.bottom) {
				this.y = this._dragBounds.bottom;
			}
		}
	}
}
