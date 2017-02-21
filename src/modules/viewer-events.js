
import CanvasModes from './canvas-modes.js';
import FeatureTypes from './feature-types.js';
import ThresholdModes from './threshold-modes.js';

/**
 * Canvas based image viewer
 */
class ViewerEvents {

	fixCanvasMode() {
		// Fix Canvas Movde if not active feature
		if(this.featureManager.activeFeature == null) {
			var roi_actions = {
				[CanvasModes.ROI_UPDATE_RADIUS]: () => { this.canvasMode = CanvasModes.ROI; },
				[CanvasModes.ROI_UPDATE_POSITION]: () => { this.canvasMode = CanvasModes.ROI; },
				[CanvasModes.CUSTOM_ROI_ADD_POINT]: () => { this.canvasMode = CanvasModes.CUSTOM_ROI; },
				[CanvasModes.CUSTOM_ROI_UPDATE_POINT]: () => { this.canvasMode = CanvasModes.CUSTOM_ROI; },
				[CanvasModes.CUSTOM_ROI_UPDATE_POSITION]: () => { this.canvasMode = CanvasModes.CUSTOM_ROI; }
			};		

			(roi_actions[this.canvasMode] || this.defaultAction)();
		}
	}
	
	handleMouseMove(event) { 

		var canvas_actions = {
			[CanvasModes.PAN_UPDATE]: () => { this.panImage(event); }
		};

		var roi_actions = {
			[CanvasModes.ROI]: () => { this.featureManager.hoverOnFeature(event); },
			[CanvasModes.ROI_UPDATE_RADIUS]: () => { this.featureManager.updateActiveFeature(event); },
			[CanvasModes.ROI_UPDATE_POSITION]: () => { this.featureManager.updatePosition(event); },
			[CanvasModes.CUSTOM_ROI]: () => { this.featureManager.hoverOnFeature(event); },
			//[CanvasModes.CUSTOM_ROI_ADD_POINT]: () => { },
			[CanvasModes.CUSTOM_ROI_UPDATE_POINT]: () => { this.featureManager.updateActiveFeature(event); },
			[CanvasModes.CUSTOM_ROI_UPDATE_POSITION]: () => { this.featureManager.updatePosition(event); },
			[CanvasModes.THRESHOLD]: () => { this.featureManager.hoverOnFeature(event); }
		};

		var roi_action = () => {
			event = this.canvasDraw.removeOffsetAndZoom(event);
			roi_actions[this.canvasMode]();
			this.canvasDraw.drawImage();
		}

		this.getPixelData(event);
		this.fixCanvasMode();
		var a = canvas_actions[this.canvasMode];
		var b = roi_actions[this.canvasMode] ? roi_action : null;
		var c = this.defaultAction;
		(a || b || c)();
		this.onMouseMove();
	}

	handleMouseDown(event) {

		var actions = {
			[CanvasModes.PAN]: () => {
				this.canvasMode = CanvasModes.PAN_UPDATE;
				this.panImage(event);
			},

			[CanvasModes.ROI]: () => {
				event = this.canvasDraw.removeOffsetAndZoom(event);
				this.featureManager.setActiveFeature(event);

				if(this.featureManager.activeFeature == null) {
					this.canvasMode = CanvasModes.ROI_UPDATE_RADIUS;
					this.featureManager.createFeature(event, FeatureTypes.CIRCLE);
					this.canvasDraw.drawImage();			
				}
				else 
					this.canvasMode = this.featureManager.clickOnActiveFeature(event);
			},

			[CanvasModes.CUSTOM_ROI]: () => {
				event = this.canvasDraw.removeOffsetAndZoom(event);
				this.featureManager.setActiveFeature(event);

				if(this.featureManager.activeFeature == null) {
					this.featureManager.createFeature(event, FeatureTypes.CUSTOM);
					this.featureManager.activeFeature.addPoint(event);
					this.canvasMode = CanvasModes.CUSTOM_ROI_ADD_POINT;
					this.canvasDraw.drawImage();
				}
				else 
					this.canvasMode = this.featureManager.clickOnActiveFeature(event);
			},

			[CanvasModes.CUSTOM_ROI_ADD_POINT]: () => { 
				event = this.canvasDraw.removeOffsetAndZoom(event);
				this.featureManager.activeFeature.addPoint(event);
				if(this.featureManager.activeFeature.isClosedShape) 
					this.canvasMode = CanvasModes.CUSTOM_ROI;
				this.featureManager.updateActiveFeature(event);
				this.canvasDraw.drawImage();
			},

			[CanvasModes.THRESHOLD]: () => {
				event = this.canvasDraw.removeOffsetAndZoom(event);
				this.featureManager.setActiveFeature(event);

				if(this.featureManager.activeFeature != null)
					this.canvasMode = this.featureManager.clickOnActiveFeature(event);
			},

			[CanvasModes.THRESHOLD_EYEDROPPER]: () => {
				if(this.thresholdMode == ThresholdModes.COLOR) {
					var colorPixel = this.getPixelData(event);
					this.drawColorThresholdWithPixel(colorPixel);
					this.onSettingsChange();
					this.canvasMode = CanvasModes.THRESHOLD
				}
			}
		};

		this.fixCanvasMode();
		(actions[this.canvasMode] || this.defaultAction)();
		this.onCanvasModeChange();
	}

	handleMouseUp() {
		var canvas_actions = {
			[CanvasModes.PAN_UPDATE]: () => { this.canvasMode = CanvasModes.PAN; this.stopPanImage(event); }
		};

		var roi_actions = {
			[CanvasModes.ROI_UPDATE_RADIUS]: () => { this.canvasMode = CanvasModes.ROI; },
			[CanvasModes.ROI_UPDATE_POSITION]: () => { this.canvasMode = CanvasModes.ROI },
			[CanvasModes.CUSTOM_ROI_UPDATE_POINT]: () => { this.canvasMode = CanvasModes.CUSTOM_ROI; },
			[CanvasModes.CUSTOM_ROI_UPDATE_POSITION]: () => { 
				this.featureManager.updatePosition(null); 
				this.canvasMode = CanvasModes.CUSTOM_ROI;
			}
		};

		this.fixCanvasMode();
		(canvas_actions[this.canvasMode] || roi_actions[this.canvasMode] || this.defaultAction)();
	}

}

export default ViewerEvents;

