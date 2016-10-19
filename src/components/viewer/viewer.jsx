import React from 'react';
import ReactDOM from 'react-dom';
import ViewerStore from '../store/viewer-store.js';

class Viewer extends React.Component {

	constructor() {
		super();
		this.state = { canvasMode:null };
	}

	componentDidMount() {
		var width = this.refs.Viewer.offsetWidth;
		var height = this.refs.Viewer.offsetHeight;
		ViewerStore.setupViewer(width, height);
		ViewerStore.loadImage('../src/assets/image.png');
	 	var element = document.getElementById("image-viewer");
	 	var canvas = ViewerStore.getCanvas().canvas;
		element.appendChild(canvas);

		this.setState({ canvasMode:ViewerStore.getCanvasMode() });

		ViewerStore.on('canvasmode', () => {
			this.setState({ canvasMode:ViewerStore.getCanvasMode() });
		})	 		
	}

	handleSelectPixelMode() {
		var modes = ViewerStore.getCanvasModes();
		ViewerStore.setCanvasMode(modes.PIXEL);
	}

	handleSelectPanMode() {
		var modes = ViewerStore.getCanvasModes();
		ViewerStore.setCanvasMode(modes.PAN);
	}

	handleSelectROIMode() {
		var modes = ViewerStore.getCanvasModes();
		ViewerStore.setCanvasMode(modes.ROI);
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

	handleZoomReset() {
		ViewerStore.zoomReset();
	}

	render() {
		var mode = this.state.canvasMode;
		var modes = ViewerStore.getCanvasModes();
		var pixelButtonClass = mode == modes.PIXEL ? 'active' : '';
		var panButtonClass = mode == modes.PAN || mode == modes.PAN_UPDATE ? 'active' : '';
		var roiButtonClass = mode == modes.ROI || mode == modes.ROI_UPDATE_POSITION || mode == modes.ROI_UPDATE_RADIUS ? 'active' : '';
		var contrastButtonClass = mode == modes.CONTRAST ? 'active' : '';
		var thresholdButtonClass = mode == modes.THRESHOLD ? 'active' : '';

		return (
			<div className='viewer-container'>
				<div className='viewer-header layout-row' > 
					<div className='icons-left flex'> 
						<button className={'icon-button '     + pixelButtonClass}     onClick={this.handleSelectPixelMode}> <i className='material-icons'>touch_app</i> </button>					
						<button className={'icon-button pan ' + panButtonClass}       onClick={this.handleSelectPanMode}> <i className='material-icons'>pan_tool</i> </button>
						<button className={'icon-button '     + roiButtonClass}       onClick={this.handleSelectROIMode}> <i className='material-icons'>bubble_chart</i> </button>																		
						<button className={'icon-button '     + contrastButtonClass}  onClick={this.handleSelectConstrastMode}> <i className='material-icons'>opacity</i> </button>												
						<button className={'icon-button '     + thresholdButtonClass} onClick={this.handleSelectThresholdMode}> <i className='material-icons'>equalizer</i> </button>						
					</div>
					<div className='icons-right flex'>
						<button className='icon-button' onClick={this.handleZoomReset}> <i className='material-icons'>location_searching</i> </button>
						<button className='icon-button' onClick={this.handleZoomIn}> <i className='material-icons'>zoom_in</i> </button>
						<button className='icon-button' onClick={this.handleZoomOut}> <i className='material-icons'>zoom_out</i> </button>
					</div>
				</div>
				<div className='viewer' id='image-viewer' ref='Viewer'> </div>
			</div>
		);
	}
}

export default Viewer;
