import { IRenderingContext } from '@e2d/render';
import InteractiveObject from './InteractiveObject';
import DisplayObject from './DisplayObject';

export default abstract class DisplayObjectContainer extends InteractiveObject {
	private _children: DisplayObject[] = [];
	mouseChildren = true;

	constructor() {
		super();
	}

	get numChildren(): number {
		return this._children.length;
	}

	getChildAt(index: number): DisplayObject {
		return this._children[index];
	}

	getChildByName(name: string): DisplayObject | undefined {
		return this._children.find((child) => child.name === name);
	}

	getChildIndex(child: DisplayObject): number {
		return this._children.indexOf(child);
	}

	setChildIndex(child: DisplayObject, index: number) {
		const current = this.getChildIndex(child);

		if (current === index) {
			return;
		}

		this._children.splice(current, 1);
		this._children.splice(index, 0, child);
	}

	contains(child: DisplayObject): boolean {
		return child.parent === this;
	}

	addChild(child: DisplayObject): DisplayObject {
		if (!this.contains(child)) {
			if (child.parent) {
				const parent = <DisplayObjectContainer> child.parent;
				parent.removeChild(child);
			}

			child._parent = this;

			this._children.push(child);
		}

		return child;
	}

	addChildAt(child: DisplayObject, index: number): DisplayObject {
		if (!this.contains(child)) {
			if (child.parent != null) {
				const parent = <DisplayObjectContainer>child.parent;
				parent.removeChild(child);
			}

			child._parent = this;

			if (index >= this._children.length) {
				this._children.push(child);
			} else {
				this._children.splice(index, 0, child);
			}
		}

		return child;
	}

	removeChild(child: DisplayObject): DisplayObject {
		if (this.contains(child)) {
			const index = this._children.indexOf(child);

			this.removeChildAt(index);
		}

		return child;
	}

	removeChildAt(index: number): DisplayObject {
		const child = this._children[index];

		if (child) {
			child._parent = null;

			this._children.splice(index, 1);
		}

		return child;
	}

	removeChildren() {
		this._children.forEach((child) => {
			child._parent = null;
		});

		this._children = [];
	}

	renderContent(context: IRenderingContext) {
		this._children.forEach((child) => {
			child.render(context);
		});
	}
}
