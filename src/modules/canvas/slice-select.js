
class SliceSelect {
	
	// Canvas order in Row-Major order
	constructor(canvas, canvasY, canvasX) { 
		this.canvas = canvas;
		this.canvasX = canvasX;
		this.canvasY = canvasY;
		this.handleWidth = 4;
		this.isOnHandle = { x:false, y:false };
		this.activeHandle = null;
	}

	drawSliceImages() { 
		this.canvasX.drawImage();
		this.canvasY.drawImage();
	}

	getSlices() {
		var x = this.canvasX.sliceIndex;
		var y = this.canvasY.sliceIndex;
		return { x:x, y:y };
	}

	getSliceHandles() { 
		var canvas = this.canvas;
		var slices = this.getSlices();
		var bounds = canvas.draw.getBounds(canvas);
		var aspectRatio = bounds.aspectRatio;

		var line = { x1:slices.x , y1:0, x2:slices.x, y2:bounds.height, isHover:this.isOnHandle.x };
		var line2 = { x1:0, y1:slices.y, x2:bounds.width * aspectRatio, y2:slices.y, isHover:this.isOnHandle.y };
		return { line: line, line2: line2 };
	}

	isOnSliceHandle(point) { 
		var onHandleX = false;
		var onHandleY = false;
		var handles = this.getSliceHandles();
		if(handles.line.x1 - this.handleWidth <= point.x && point.x <= handles.line.x1 + this.handleWidth)
			onHandleX = true;
		if(handles.line2.y1 - this.handleWidth <= point.y && point.y <= handles.line2.y1 + this.handleWidth)
			onHandleY = true;
		this.isOnHandle = { x:onHandleX, y:onHandleY };
		return this.isOnHandle.x || this.isOnHandle.y;
	}

	selectSlice(point) {
		if(this.isOnHandle.x)
			this.canvasX.sliceIndex = point.x;
		else if(this.isOnHandle.y)
			this.canvasY.sliceIndex = point.y;

		this.drawSliceImages();
	}
}

export default SliceSelect;