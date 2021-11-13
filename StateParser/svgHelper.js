let SVGHelper = function(svgElement) {
	this.svg = svgElement;
	let svgNS = "http://www.w3.org/2000/svg";  
	
	let offset = 20;
	
	let columnSeperation = 130;
	let rowSeperation = 100;
	
	let stateHeight = 40;
	let stateWidth = 120;
	
	this.components = {}
	
	let curvesPerRow = []
	
	this.addState = function(name, id, row, column) {
		if(!curvesPerRow[row]) {
			curvesPerRow[row] = 0
		}
		let x = offset + (column*columnSeperation)
		let y = offset + (row*rowSeperation)
		
		let newRect = document.createElementNS(svgNS, "rect");
		newRect.setAttribute("x", x);
		newRect.setAttribute("y", y);
		newRect.setAttribute("width", stateWidth);
		newRect.setAttribute("height", stateHeight);
		newRect.setAttribute('rx', "10");
		newRect.setAttribute('ry', "10");
		newRect.setAttribute("fill", "#5cceee");
		
		let newText = document.createElementNS(svgNS, "text");
		newText.setAttribute("x", x);
		newText.setAttribute("y", y+25);
		newText.innerHTML = name
		
		this.svg.append(newRect)
		this.svg.append(newText)
		this.components[id] = {type: "stateBox", position: {row: row, column: column}, elements: [newRect, newText]}
	}
	
	this.addConection = function(startId, endId) {
		let newLine = document.createElementNS(svgNS, "line");
		if(this.components[startId].position.row + 1 === this.components[endId].position.row) {
			newLine.setAttribute('x1', 3+offset + (stateWidth/2) + (this.components[startId].position.column * columnSeperation));
			newLine.setAttribute('y1', offset + stateHeight +(this.components[startId].position.row * rowSeperation));
			newLine.setAttribute('x2', 3+offset + (stateWidth/2) + (this.components[endId].position.column * columnSeperation));
			newLine.setAttribute('y2', offset-3 + (this.components[endId].position.row * rowSeperation));
			newLine.setAttribute("marker-end", "url(#arrowhead)")
			newLine.setAttribute("stroke", "black")
			this.svg.append(newLine)
		}
		else if(this.components[startId].position.row -1 === this.components[endId].position.row) {
			newLine.setAttribute('x1', -3+offset + (stateWidth/2) + (this.components[startId].position.column * columnSeperation));
			newLine.setAttribute('y1', offset + (this.components[startId].position.row * rowSeperation));
			newLine.setAttribute('x2', -3+offset + (stateWidth/2) + (this.components[endId].position.column * columnSeperation));
			newLine.setAttribute('y2', offset+3 + stateHeight + (this.components[endId].position.row * rowSeperation));
			newLine.setAttribute("marker-end", "url(#arrowhead)")
			newLine.setAttribute("stroke", "black")
			this.svg.append(newLine)
		}
		else if(this.components[startId].position.row === this.components[endId].position.row) {
			let path = ""
			let curveOffset = curvesPerRow[this.components[endId].position.row]*20+50;
			let curveOffset1 = curvesPerRow[this.components[endId].position.row]*5+20;
			let curveOffset2 = curvesPerRow[this.components[endId].position.row]*10;
			console.log(curveOffset)
			let direction  = this.components[startId].position.column < this.components[endId].position.column ? 1 : -1;
			let newPath = document.createElementNS(svgNS, "path");
			
			//StartPoint
			path += "M " +
			(6+offset + (stateWidth/2) + (this.components[startId].position.column * columnSeperation)-(curveOffset2*direction)) + " " 
			+ (offset + stateHeight +(this.components[startId].position.row * rowSeperation)) + " "
			
			//CurveFromStart
			path += "C " +
			(6+offset + (stateWidth/2) + (this.components[startId].position.column * columnSeperation)+(curveOffset*direction)-(curveOffset2*direction)) + " " 
			+ (offset + stateHeight +(this.components[startId].position.row * rowSeperation)+curveOffset1) + ", "
			
			//CurveToEnd
			path += 
			(6+offset + (stateWidth/2) + (this.components[endId].position.column * columnSeperation)-(curveOffset*direction)+(curveOffset2*direction)) + " " 
			+ (offset+1 + stateHeight + (this.components[endId].position.row * rowSeperation)+curveOffset1) + ", "
			
			//EndPoint
			path += 
			(6+offset + (stateWidth/2) + (this.components[endId].position.column * columnSeperation)+(curveOffset2*direction)) + " " 
			+ (offset+1 + stateHeight + (this.components[endId].position.row * rowSeperation)) + " "
			
			newPath.setAttribute("d", path);
			newPath.setAttribute("marker-end", "url(#arrowhead)")
			newPath.setAttribute("stroke", "black")
			newPath.setAttribute("fill", "transparent")
			this.svg.append(newPath)
			curvesPerRow[this.components[endId].position.row] ++
		} else {
			console.log('oof')
		}
	
		this.components[startId + "-" + endId] = {type: "connection", connection: {startId: startId, endId: endId}, elements: [newLine]}
	}
	
	this.connect
}