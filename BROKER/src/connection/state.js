const State = {};

export default {
  setConnected() {
    State.connected = true;
  },
  setDisconnected() {
    State.connected = false;
  },
  isConnected() {
    return State.connected;
  },
};
