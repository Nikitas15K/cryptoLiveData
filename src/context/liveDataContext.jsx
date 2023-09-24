import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

export const CryptoLiveDataContext = createContext();

export function CryptoLiveDataProvider(props) {
  const [liveData, setLiveData] = createStore(props.liveData || []),
    crypto = [
      liveData,
      {
        addNewUpdate(newUpdate) {
          let nowTimeStamp = new Date();
          let nowTime = nowTimeStamp?.toLocaleTimeString();
          let subToBeUpdated = liveData?.filter((sub) => {
            return sub?.symbol === newUpdate?.SYMBOL;
          });
          if (subToBeUpdated.length === 0) {
            setLiveData([
              ...liveData,
              {
                symbol: newUpdate?.SYMBOL,
                fullVolume: newUpdate?.FULLVOLUME
                  ? [{ x: nowTime, y: parseFloat(newUpdate?.FULLVOLUME) }]
                  : [],
                topTierFullVolume: newUpdate?.TOPTIERFULLVOLUME
                  ? [
                      {
                        x: nowTime,
                        y: parseFloat(newUpdate.TOPTIERFULLVOLUME),
                      },
                    ]
                  : [],
              },
            ]);
          } else {
            if (
              newUpdate.FULLVOLUME &&
              subToBeUpdated[0]?.fullVolume[
                subToBeUpdated[0]?.fullVolume?.length - 1
              ]?.x !== nowTime
            ) {
              setLiveData(
                (sub) => sub?.symbol === newUpdate?.SYMBOL,
                "fullVolume",
                (fullVolume) => [
                  ...fullVolume,
                  { x: nowTime, y: parseFloat(newUpdate.FULLVOLUME) },
                ]
              );
            } else if (newUpdate.TOPTIERFULLVOLUME) {
              setLiveData(
                (sub) =>
                  sub?.symbol === newUpdate?.SYMBOL &&
                  subToBeUpdated[0]?.topTierFullVolume[
                    subToBeUpdated[0]?.topTierFullVolume?.length - 1
                  ]?.x !== nowTime,
                "topTierFullVolume",
                (topTierFullVolume) => [
                  ...topTierFullVolume,
                  { x: nowTime, y: parseFloat(newUpdate.TOPTIERFULLVOLUME) },
                ]
              );
            } else {
              //pass
            }
          }
        },
      },
    ];

  return (
    <CryptoLiveDataContext.Provider value={crypto}>
      {props.children}
    </CryptoLiveDataContext.Provider>
  );
}

export function useCryptoData() {
  return useContext(CryptoLiveDataContext);
}
