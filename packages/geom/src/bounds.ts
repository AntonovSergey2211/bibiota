import { Point } from './point';
import { Rectangle } from './rectangle';

export interface Bounds {
	minX: number,
	minY: number,
	maxX: number,
	maxY: number,
}

export namespace Bounds {
	export function empty(): Bounds {
		return {
			minX: Number.MAX_VALUE,
			minY: Number.MAX_VALUE,
			maxX: Number.MIN_VALUE,
			maxY: Number.MIN_VALUE,
		};
	}

	export function isEmpty(bounds: Bounds): boolean {
		const {
			minX, minY, maxX, maxY,
		} = bounds;
		return minX === Number.MAX_VALUE
			&& minY === Number.MAX_VALUE
			&& maxX === Number.MIN_VALUE
			&& maxY === Number.MIN_VALUE;
	}

	export function toRectangle(bounds: Bounds): Rectangle {
		const {
			minX, minY, maxX, maxY,
		} = bounds;
		return {
			x: minX,
			y: minY,
			width: maxX - minX,
			height: maxY - minY,
		};
	}

	export function testX(bounds: Bounds, x: number) {
		if (bounds.minX > x) {
			bounds.minX = x;
		} else if (bounds.maxX < x) {
			bounds.maxX = x;
		}
	}

	export function testY(bounds: Bounds, y: number) {
		if (bounds.minY > y) {
			bounds.minY = y;
		} else if (bounds.maxY < y) {
			bounds.maxY = y;
		}
	}

	export function test(bounds: Bounds, x: number, y: number) {
		if (bounds.minX > x) {
			bounds.minX = x;
		} else if (bounds.maxX < x) {
			bounds.maxX = x;
		}

		if (bounds.minY > y) {
			bounds.minY = y;
		} else if (bounds.maxY < y) {
			bounds.maxY = y;
		}
	}

	export function testPoint(bounds: Bounds, point: Point) {
		const { x, y } = point;
		if (bounds.minX > x) {
			bounds.minX = x;
		} else if (bounds.maxX < x) {
			bounds.maxX = x;
		}

		if (bounds.minY > y) {
			bounds.minY = y;
		} else if (bounds.maxY < y) {
			bounds.maxY = y;
		}
	}
}
