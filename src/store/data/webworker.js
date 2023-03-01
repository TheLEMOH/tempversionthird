

function StartWork(task,) {

}

function Work(task, callback) {
    task = `${task};(function(){this.postMessage(${task.name}())})();`;
    var worker = new Worker(URL.createObjectURL(new Blob([task])));
    worker.onmessage = e => worker.terminate() || callback(e);
}

export default Work
