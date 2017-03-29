import Viewer from '../../modules/viewer.js';
import CanvasModes from '../../modules/modes/canvas-modes.js';
import FeatureTypes from '../../modules/modes/feature-types.js';
import ThresholdModes from '../../modules/modes/threshold-modes.js';
import EventEmitter from 'events';

class ViewerStore extends EventEmitter {

	constructor() {
		super();

		this.getCanvas = this.getCanvas.bind(this);
		this.getCanvasModes = this.getCanvasModes.bind(this);
		this.loadFile = this.loadFile.bind(this);
	}

	setupViewer(width, height) {
		this.viewer = new Viewer(width, height);
		this.viewer.onCanvasModeChange = () => { this.emit('canvasmode'); };
		this.viewer.onMouseMove = () => { this.emit('mousemove'); }; 
		this.viewer.onSettingsChange = () => { this.emit('settings_update'); };
	}

	setViewportSize(width, height) {
		this.viewer.setViewportSize(width, height);
	}

	getCanvas() {
		return this.viewer;
	}

	getCanvasMousePixel() {
		return this.viewer.pixel;
	}

	getCanvasMode() {
		if(this.viewer === undefined)
			return null;
		return this.viewer.canvasMode;
	}

	getCanvasModes() {
		return CanvasModes;
	}

	getFeatureTypes() {
		return FeatureTypes;
	}

	getThresholdModes() {
		return ThresholdModes;
	}

	getFeatures() {
		return this.viewer.getFeatures();
	}

	deleteFeature(index) {
		return this.viewer.deleteFeature(index);
	}

	loadFile(file) {
		this.viewer.loadFile(file);
	}

	drawImage() {
		this.viewer.drawImage();
	}

	drawColorThreshold(colorThreshold) {
		this.viewer.drawColorThreshold(colorThreshold);
	}

	drawMinThreshold(minThreshold) {
		this.viewer.drawMinThreshold(minThreshold);
	}

	setCanvasMode(mode) {
		this.viewer.setCanvasMode(mode);
	}

	setColorPixelOffset(offset) {
		this.viewer.setColorPixelOffset(offset);
	}

	getColorPixelOffset() {
		return this.viewer.getColorPixelOffset();
	}

	getColorThreshold() {
		return this.viewer.getImageParameters().colorThreshold;
	}

	getMinThreshold() {
		return this.viewer.getImageParameters().minThreshold;
	}

	getThresholdMode() {
		return this.viewer.thresholdMode;
	}

	setThresholdMode(thresholdMode) {
		this.viewer.setThresholdMode(thresholdMode);
	}

	getViewMode() {
		return this.viewer.viewMode;
	}
	
	selectPanMode() {
		this.viewer.selectPanMode();
	}

	zoomIn() {
		this.viewer.zoomIn();
	}

	zoomOut() {
		this.viewer.zoomOut();
	}

	setZoom(zoomValue) {
		this.viewer.setZoom(zoomValue);
	}

	zoomReset() {
		this.viewer.zoomReset();
	}

}

export default new ViewerStore();
