let LinkedStates = function() {
	let allConditions = {}
	let State = function(name) {
		this.class = name;
		this.conditionalFlow = [];
	}
	let Condition = function(nextState, isValid, startedByUser, currency) {
		this.nextState = nextState.split(",");
		this.isValid = isValid.split(",");
		this.startedByUser = startedByUser.split(",");
		this.currency = currency.split(",");
		for(key in this) {
			if(!allConditions[key])
				allConditions[key] = []
			allConditions[key] = [...new Set([...allConditions[key], ...this[key]])]
		}
	}
	let data = {};
	data['new'] = new State('new');
	data['pending'] = new State('pending');
	data['positionUpdate'] = new State('positionUpdate');
	data['rejected'] = new State('rejected');
	data['end'] = new State('end');
	
	data['new'].conditionalFlow.push(new Condition("pending", "true", "admin", "USD"));
	data['new'].conditionalFlow.push(new Condition("rejected", "false", "admin", "USD"));
	data['new'].conditionalFlow.push(new Condition("positionUpdate", "false", "admin", "USD"));
	
	data['rejected'].conditionalFlow.push(new Condition("end", "true,false", "admin", "USD"));
	
	data['pending'].conditionalFlow.push(new Condition("pending", "false", "admin", "USD"));
	data['pending'].conditionalFlow.push(new Condition("positionUpdate", "true", "admin", "USD"));
	
	data['positionUpdate'].conditionalFlow.push(new Condition("pending", "false", "admin", "USD"));
	data['positionUpdate'].conditionalFlow.push(new Condition("end", "true", "admin", "USD"));
	

	for(key in data) {
		for(index in data[key].conditionalFlow)
			data[key].conditionalFlow[index].nextStateLink = data[data[key].conditionalFlow[index].nextState[0]]
	}
	this.States = data
	this.entryPoint = data['new']
	this.allConditions = allConditions
}