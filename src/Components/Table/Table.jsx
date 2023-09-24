import { round } from "../../helpers/helpers";
import { useCryptoData } from "../../context/liveDataContext";

function TableData() {
  const [crypto] = useCryptoData();

  let Row = (sub) => {
    return (
      <tr>
        <td>{sub?.symbol}</td>
        <td>{round(sub?.fullVolume[sub?.fullVolume?.length - 1]?.y)} </td>
        <td>
          {round(sub?.topTierFullVolume[sub?.topTierFullVolume?.length - 1]?.y)}{" "}
        </td>
      </tr>
    );
  };

  return (
    <table>
      <tbody>
        <tr>
          <th>Symbol</th>
          <th>FullVolume</th>
          <th>TopTierFullVolume</th>
        </tr>
        {crypto?.map((sub) => {
          return Row(sub);
        })}
      </tbody>
    </table>
  );
}

export default TableData;
