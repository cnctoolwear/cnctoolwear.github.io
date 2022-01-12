const predictButton = document.getElementById('predict');
const newPredictionButton = document.getElementById('newprediction');
const container = document.getElementById('container');

predictButton.addEventListener('click', (e) => {
	e.preventDefault();
	container.classList.add("right-panel-active");
	predict();
});

newPredictionButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
	newPrediction();
});



function predict() {

	let feedRate = parseFloat(document.getElementById('feed-rate').value);
	let clampPressure = parseFloat(document.getElementById('clamp-pressure').value);

	const passColor = "lightgreen";
	const failColor = "red";

	let toolCondition = true;
	let machiningCompleted = true;
	let visualInspection = true;

	let toolConditionScore = -1.57124688 + (feedRate * 0.03758486) + (clampPressure * 0.42119294);
	
	if(toolConditionScore < 0) {

		toolCondition = true;

		if(toolConditionScore < -0.5) {

			machiningCompleted = true;

			if(toolConditionScore < -1.0) {

				visualInspection = true;

			} else {

				visualInspection = false;

			}
		} else {

			machiningCompleted = false;
			visualInspection = false;

		}
	} else {

		toolCondition = false;
		machiningCompleted = false;
		visualInspection = false;

	}

	if(toolCondition) {
		document.getElementById("tool-condition").innerHTML = "Tool Condtion: Unworn";
		document.getElementById("tool-condition").style.backgroundColor = passColor;
	} else {
		document.getElementById("tool-condition").innerHTML = "Tool Condtion: Worn";
		document.getElementById("tool-condition").style.backgroundColor = failColor;
	}

	if(machiningCompleted) {
		document.getElementById("machining-completed").innerHTML = "Machining: Completed";
		document.getElementById("machining-completed").style.backgroundColor = passColor;
	} else {
		document.getElementById("machining-completed").innerHTML = "Machining: Incomplete";
		document.getElementById("machining-completed").style.backgroundColor = failColor;
	}

	if(visualInspection) {
		document.getElementById("visual-inspection").innerHTML = "Visual Inspection: Passed";
		document.getElementById("visual-inspection").style.backgroundColor = passColor;
	} else {
		document.getElementById("visual-inspection").innerHTML = "Visual Inspection: Failed";
		document.getElementById("visual-inspection").style.backgroundColor = failColor;
	}
}

function newPrediction() {
	document.getElementById('feed-rate').value = '';
	document.getElementById('clamp-pressure').value = '';
}
