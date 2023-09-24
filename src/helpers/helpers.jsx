export const subs = [
  "11~BTC",
  "21~BTC",
  "11~ETH",
  "21~ETH",
  "11~BCH",
  "21~BCH",
  "11~EOS",
  "21~EOS",
  "11~XRP",
  "21~XRP",
  "11~LTC",
  "21~LTC",
  "11~ETC",
  "21~ETC",
  "11~BSV",
  "21~BSV",
  "11~LINK",
  "21~LINK",
  "11~ATOM",
  "21~ATOM",
];

export const url =
  "wss://streamer.cryptocompare.com/v2?api_key=" +
  import.meta.env.VITE_APP_CRYPTO_API_KEY;

export const round = (number) => {
  return Math.round(number * 1000) / 1000;
};

export const convertChartsToArrayOfObjects = (charts) => {
  return charts.map((chartArray) => {
    let separateSymbolVolume = chartArray?.split("-");
    return {
      symbol: separateSymbolVolume[0],
      volume: separateSymbolVolume[1],
    };
  });
};
