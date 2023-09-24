import { subs, url } from "../../helpers/helpers";

export const socket = new WebSocket(url);

socket.onopen = function (e) {
  console.log("Connection established");
  console.log("Sending to server");
  receiveData();
};

socket.onclose = function (event) {
  if (event.wasClean) {
    console.log(
      `Connection closed cleanly, code=${event.code} reason=${event.reason}`
    );
  } else {
    console.log("Connection died");
  }
};

socket.onerror = function (error) {
  console.log(error);
};

export const closeConnection = () => {
  socket.send(
    JSON.stringify({
      action: "SubRemove",
      subs: subs,
    })
  );
};

export const receiveData = () => {
  socket.send(
    JSON.stringify({
      action: "SubAdd",
      subs: subs,
    })
  );
};
