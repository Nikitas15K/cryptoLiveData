import { createSignal } from "solid-js";
import { selectedCharts, setSelectedCharts } from "../../App";
import { subs } from "../../helpers/helpers";

function Header() {
  const [lineChartSelected, setLineChartSelected] = createSignal("");
  const [exchangesIn, setExchangesIn] = createSignal("");
  let getAllCryptoSymbols = [
    ...new Set(
      subs?.map((sub) => {
        return sub?.substring(3);
      })
    ),
  ];

  const onPressOK = () => {
    let graphChecked = lineChartSelected() + "-" + exchangesIn();
    let index = selectedCharts().indexOf(graphChecked);
    if (index === -1) {
      setSelectedCharts([...selectedCharts(), graphChecked]);
    } else {
      setSelectedCharts(
        selectedCharts().filter((selected) => selected !== graphChecked)
      );
    }
    setLineChartSelected("");
    setExchangesIn("");
  };

  return (
    <header>
      <p>This product uses the CryptoCompare API</p>
      <div>
        <select
          value={lineChartSelected()}
          onChange={(event) => {
            setLineChartSelected(event.target.value);
          }}
        >
          <option value="" disabled={true}>
            Select sub
          </option>
          {getAllCryptoSymbols.map((option) => {
            return <option value={option}>{option}</option>;
          })}
        </select>

        <select
          disabled={!lineChartSelected()}
          value={exchangesIn()}
          onChange={(event) => {
            setExchangesIn(event.target.value);
          }}
        >
          <option value="" disabled={true}>
            Exchanges in
          </option>
          <option value="fullVolume" disabled={lineChartSelected() === "BTC"}>
            Full Volume
          </option>
          <option value="topTierFullVolume">Top Tier Full Volume</option>
        </select>
      </div>
      <button
        onClick={onPressOK}
        disabled={!lineChartSelected() || !exchangesIn() ? true : false}
      >
        OK
      </button>
    </header>
  );
}

export default Header;
