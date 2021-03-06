import { StrokeStyle, FillStyle } from './types';

export interface IRenderingContext {
	width: number;
	height: number;
	readonly element: HTMLElement;
	setTransform(a: number, b: number, c: number, d: number, tx: number, ty: number): void;
	moveTo(x: number, y: number): void;
	lineTo(x: number, y: number): void;
	rect(x: number, y: number, width: number, height: number): void;
	bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
	quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
	save(): void;
	restore(): void;
	beginPath(): void;
	closePath(): void;
	fill(pattern: IRenderingPattern, style: FillStyle): void;
	stroke(pattern: IRenderingPattern, style: StrokeStyle): void;
	clip(): void;
}

export interface IRenderingPattern {
}

export interface IBitmapDrawable {
	render(context: IRenderingContext): void;
	renderContent(context: IRenderingContext): void;
}
