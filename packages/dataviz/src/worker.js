self.onmessage = function (e) {
  console.log('Worker: Message received from worker.js');
  self.postMessage('message from worker.js');
};
