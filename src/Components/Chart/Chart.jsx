import { SolidApexCharts } from "solid-apexcharts";
import { createMemo } from "solid-js";
import { round } from "../../helpers/helpers";
import { useCryptoData } from "../../context/liveDataContext";

const Chart = (props) => {
  const [crypto] = useCryptoData();
  let data = () => {
    let sub = crypto.filter((sub) => sub.symbol === props.symbol)[0];
    if (sub) {
      return sub[props.volume];
    } else {
      return [];
    }
  };

  let chartData = createMemo(() => {
    return {
      series: [
        {
          data: data()?.slice(-20),
        },
      ],
      xaxis: {
        type: "datetime",
      },
      chart: {
        ID: "realtime",
      },
      options: {
        chart: {
          height: 450,
          type: "line",
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000,
            },
          },
        },
        stroke: {
          curve: "smooth",
        },
        markers: {
          size: 0,
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: [
          {
            title: {
              text: props.symbol + " - " + props.volume,
            },
            labels: {
              formatter: (y) => round(y),
            },
          },
        ],
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: (y) => round(y),
          },
        },
      },
    };
  });

  return (
    <Show
      when={data() && data()?.length > 3}
      fallback={<div className="chart">Loading...</div>}
    >
      <SolidApexCharts
        type="line"
        width="100%"
        options={chartData().options}
        series={chartData().series}
      />
    </Show>
  );
};
export default Chart;
