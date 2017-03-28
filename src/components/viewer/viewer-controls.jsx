import React from 'react';
import ViewerStore from '../store/viewer-store.js';

class Viewer extends React.Component {

	constructor() {
		super();
		this.state = { canvasMode:ViewerStore.getCanvasMode(), zoomStep:10.0 };
	}

	componentDidMount() { 
		ViewerStore.on('canvasmode', () => {
			this.setState({ canvasMode:ViewerStore.getCanvasMode() });
		})	 				
	}

	handleSelectPanMode() {
		var modes = ViewerStore.getCanvasModes();
		ViewerStore.setCanvasMode(modes.PAN);
	}

	handleSelectROIMode() {
		var modes = ViewerStore.getCanvasModes();
		ViewerStore.setCanvasMode(modes.ROI);
	}

	handleSelectCustomROI() {
		var modes = ViewerStore.getCanvasModes();
		ViewerStore.setCanvasMode(modes.CUSTOM_ROI);
	}

	handleSelectConstrastMode() {
		var modes = ViewerStore.getCanvasModes();
		ViewerStore.setCanvasMode(modes.CONTRAST);
	}

	handleSelectThresholdMode() {
		var modes = ViewerStore.getCanvasModes();
		ViewerStore.setCanvasMode(modes.THRESHOLD);
	}

	handleZoomIn() {
		ViewerStore.zoomIn();
	}

	handleZoomOut() {
		ViewerStore.zoomOut();
	}

	handleZoomChange( event ) {
		this.setState({ zoomStep: event.target.value });

		const ZOOM_STEP = 0.1;
		var zoomValue = this.state.zoomStep * ZOOM_STEP; 
		ViewerStore.setZoom(zoomValue);
	};

	handleZoomReset() {
		ViewerStore.zoomReset();
	}

	render() {
		var mode = this.state.canvasMode;
		var modes = ViewerStore.getCanvasModes();
		var pixelButtonClass = mode == modes.PIXEL ? 'active' : '';
		var panButtonClass = mode == modes.PAN || mode == modes.PAN_UPDATE ? 'active' : '';
		var roiButtonClass = mode == modes.ROI || mode == modes.ROI_UPDATE_POSITION || mode == modes.ROI_UPDATE_RADIUS ? 'active' : '';
		var customRoiButtonClass = mode == modes.CUSTOM_ROI || mode == modes.CUSTOM_ROI_ADD_POINT || mode == modes.CUSTOM_ROI_UPDATE_POINT || mode == modes.CUSTOM_ROI_UPDATE_POSITION ? 'active' : '';
		var contrastButtonClass = mode == modes.CONTRAST ? 'active' : '';
		var thresholdButtonClass = mode == modes.THRESHOLD ? 'active' : '';

		return (
			<section className='viewer-header layout-row' > 
				<div className='icons-left flex'> 
					<button className={'icon-button contrast ' + contrastButtonClass} onClick={this.handleSelectConstrastMode}> <i className='material-icons'>tonality</i> </button>
					<button className={'icon-button pan ' + panButtonClass}       onClick={this.handleSelectPanMode}> <i className='material-icons'>pan_tool</i> </button>
					<button className={'icon-button '     + roiButtonClass}       onClick={this.handleSelectROIMode}> <i className='material-icons'>bubble_chart</i> </button>																		
					<button className={'icon-button edit ' + customRoiButtonClass} onClick={this.handleSelectCustomROI} > <i className='material-icons'>edit_mode</i> </button>
					<button className={'icon-button '     + thresholdButtonClass} onClick={this.handleSelectThresholdMode}> <i className='material-icons'>equalizer</i> </button>						
				</div>
				<div className='icons-right flex'>
					<button className='icon-button' onClick={this.handleZoomReset}> <i className='material-icons'>location_searching</i> </button>
					<button className='icon-button' onClick={this.handleZoomOut}> <i className='material-icons'>zoom_out</i> </button>						
					<span className='zoom-slider'>
						<input type="range" name="zoom" value={this.state.zoomStep} min={1} max={40} onChange={this.handleZoomChange.bind(this)} />
					</span>
					<button className='icon-button' onClick={this.handleZoomIn}> <i className='material-icons'>zoom_in</i> </button>
				</div>
			</section> 
		);
	}
}

export default Viewer;