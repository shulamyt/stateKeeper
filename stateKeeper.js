var setState = fucntion(delta){

	var runUpdateState = function(){
		cloneWaitingForUpdate = JSON.parse(JSON.stringify(waitingForUpdate));
		return new Promise(function(resolve, reject) {
			self.setState(cloneWaitingForUpdate, function(){
				resolve();
			})
		});
	}

	var registerRecursively = function(){
		if(waitingForUpdate){
			runUpdatePromise = runUpdateState();
			waitingForUpdate = undefined;
			runUpdatePromise.then(function(){
				registerRecursively();
			});
		}
		else{
			runUpdatePromise = undefined;
		}
	}

	if(!waitingForUpdate){
		var waitingForUpdate = {};
	}

	Object.assign(waitingForUpdate, delta);

	if(!runUpdatePromise){
		var runUpdatePromise = runUpdateState();
		waitingForUpdate = {};
		runUpdatePromise.then(function(){
			registerRecursively();
		});
	}
}