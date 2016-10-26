
import FeatureROI from './feature-roi.js';
import FeatureTypes from './feature-types.js';

class FeatureCircleROI extends FeatureROI {
	constructor() {
		super();
		this.type = FeatureTypes.CIRCLE;
		this.radius = null;
	}

	updateROI(event) {
		var x = event.offsetX;
		var y = event.offsetY;
		var dx = Math.abs(this.x - x);
		var dy = Math.abs(this.y - y);
		this.radius = Math.sqrt(dx*dx + dy*dy);
	}

	isPositionInROI(event) {
		if(this.radius == null)
			return false;

		var x = event.offsetX;
		var y = event.offsetY;		
		var xCheck = (this.x - this.radius) <= x && x <= (this.x + this.radius);
		var yCheck = (this.y - this.radius) <= y && y <= (this.y + this.radius);
		return xCheck && yCheck;
	}

	// TODO: fix width, height
	calcAveragePixelValue(image) {
		var canvas = document.createElement('canvas');
		canvas.width = image.width;
		canvas.height = image.height;
    var context = canvas.getContext('2d');
		context.drawImage(image.img, 0, 0, canvas.width, canvas.height);

		var sx = this.x - this.radius;
		var sy = this.y - this.radius;
		var width = this.radius;
		var height = this.radius;
		var imageData = context.getImageData(sx, sy, width, height);
		var data = imageData.data;
		var total = 0;
		for (var i = 0; i < data.length; i += 4) {
			total += (data[i] + data[i +1] + data[i +2]) / 3;
		}
		return total / (data.length / 4);
	}

	getNonZeroPixelCount(image) {
		var canvas = document.createElement('canvas');
		canvas.width = image.width;
		canvas.height = image.height;
    var context = canvas.getContext('2d');
		context.drawImage(image.img, 0, 0, canvas.width, canvas.height);
		
		var sx = this.x - this.radius;
		var sy = this.y - this.radius;
		var width = this.radius;
		var height = this.radius;
		var imageData = context.getImageData(sx, sy, width, height);
		var data = imageData.data;
		var count = 0;
		for (var i = 0; i < data.length; i += 4) {
			var avg = (data[i] + data[i +1] + data[i +2]) / 3;
			if(avg > image.minThreshold) {
				count += 1;
			}
		}
    return count;
	}

}

export default FeatureCircleROI;