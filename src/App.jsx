import { createSignal } from "solid-js";
import Chart from "./Components/Chart/Chart";
import Header from "./Components/Header/Header";
import { useCryptoData } from "./context/liveDataContext";
import {
  // closeConnection,
  receiveData,
  socket,
} from "./services/sockets/sockets";
import TableData from "./Components/Table/Table";
import Sidebar from "./Components/Sidebar/Sidebar";
import { convertChartsToArrayOfObjects } from "./helpers/helpers";

export const [selectedCharts, setSelectedCharts] = createSignal([
  "BTC-fullVolume",
]);

function App() {
  const [crypto, { addNewUpdate }] = useCryptoData();

  socket.onopen = function (e) {
    receiveData();
  };

  socket.onmessage = function (event) {
    let update = JSON.parse(event.data);
    const nowTimeStamp = new Date();
    //check if update is about task completed or heartbeat
    if (
      update?.MESSAGE?.endsWith("COMPLETE") ||
      update?.TYPE === "999" ||
      update?.TYPE === "20"
    ) {
      //pass
    }
    //check if there is an error message
    else if (update?.TYPE.length === 3) {
      throw new Error(
        console.log(
          `Error: ${update.SUB}, ${
            update.MESSAGE
          } at ${nowTimeStamp.toDateString()}`
        )
      );
    } else {
      addNewUpdate(update);
    }
  };

  return (
    <>
      <Header />
      <div className="main">
        <Sidebar />
        <div className="dataArea">
          <div className="chartsWrapper">
            {convertChartsToArrayOfObjects(selectedCharts()).map((chart) => {
              return (
                <div className="chartContainer" style={{}}>
                  <Chart symbol={chart?.symbol} volume={chart?.volume} />
                </div>
              );
            })}
          </div>
          <TableData />
          {/* <button
            onClick={() => {
              closeConnection();
            }}
          >
            Stop update
          </button>
          <button
            onClick={() => {
              receiveData();
            }}
          >
            Restart update
          </button> */}
          <button
            onClick={() => {
              socket.close();
            }}
          >
            Stop Updating
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
