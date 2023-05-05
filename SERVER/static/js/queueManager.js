class QueueManager {
  #queue;
  constructor() {
    this.#queue = [];
  }
  addToQueue(item) {
    this.#queue.push(item);
  }
  getNext() {
    return this.#queue.shift();
  }
}

export default QueueManager;
