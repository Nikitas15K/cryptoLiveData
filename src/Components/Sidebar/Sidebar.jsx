import crypto from "../../assets/crypto.png";
import { selectedCharts, setSelectedCharts } from "../../App";
import { convertChartsToArrayOfObjects } from "../../helpers/helpers";

const Sidebar = () => {
  console.log(selectedCharts());
  return (
    <div class="sidebar">
      <img src={crypto} alt="crypto" className="crypto" />
      <div class="sidebarButtonArea">
        {convertChartsToArrayOfObjects(selectedCharts())?.map(
          (chartCloseButton) => {
            return (
              <button
                onClick={() => {
                  console.log(chartCloseButton?.symbol);
                }}
                disabled={
                  chartCloseButton?.symbol === "BTC" &&
                  chartCloseButton?.volume === "fullVolume"
                }
              >
                <span>x</span>
                {chartCloseButton?.symbol} -{" "}
                {chartCloseButton?.volume === "fullVolume"
                  ? "Full Volume"
                  : "Top Tier Full Volume"}
              </button>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Sidebar;
