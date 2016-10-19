
var ImageControls = function() {

	this.panImage = (event) => {
		var x = event.offsetX;
		var y = event.offsetY;

		if(this.isPanning) {
			this.panX = (x - this.startPanX);
			this.panY = (y - this.startPanY);
			this.clear();
			this.drawImage();			
		}
		else {
			this.startPanX = x - this.panX;
			this.startPanY = y - this.panY;
			this.isPanning = true;
		}

	}

	this.stopPanImage = () => {
		this.isPanning = false;
	}

	this.zoomIn = () => {
		this.zoom += ZOOM_STEP;
		this.clear();
		this.drawImage();
	}

	this.zoomOut = () => {
		this.zoom -= ZOOM_STEP;
		this.clear();		
		this.drawImage();
	}

	this.zoomReset = () => {
		this.zoom = 1;
		this.panX = 0;
		this.panY = 0;
		this.clear();		
		this.drawImage();
	}

}

export default ImageControls;

