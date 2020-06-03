<template>
  <div id="kLineTemplate">
    <highcharts :constructor-type="'stockChart'" :options="chartOptions"></highcharts>
  </div>
</template>


<script>
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import stockInit from "highcharts/modules/stock";

stockInit(Highcharts);
export default {
  name: "KLine",
  props: {
    // flied: Array,
    // datas: Array
  },
  data() {
    return {
      chartOptions: {
      //   rangeSelector: {
      //     selected: 1,
      //     inputDateFormat: "%Y-%m-%d"
      //   },
      //   title: {
      //     text: "平安银行历史股价"
      //   },
      //   xAxis: {
      //     dateTimeLabelFormats: {
      //       millisecond: "%H:%M:%S.%L",
      //       second: "%H:%M:%S",
      //       minute: "%H:%M",
      //       hour: "%H:%M",
      //       day: "%m-%d",
      //       week: "%m-%d",
      //       month: "%y-%m",
      //       year: "%Y"
      //     }
      //   },
      //   tooltip: {
      //     split: false,
      //     shared: true
      //   },
      //   yAxis: [
      //     {
      //       labels: {
      //         align: "right",
      //         x: -3
      //       },
      //       title: {
      //         text: "股价"
      //       },
      //       height: "65%",
      //       resize: {
      //         enabled: true
      //       },
      //       lineWidth: 2
      //     },
      //     {
      //       labels: {
      //         align: "right",
      //         x: -3
      //       },
      //       title: {
      //         text: "成交量"
      //       },
      //       top: "65%",
      //       height: "35%",
      //       offset: 0,
      //       lineWidth: 2
      //     }
      //   ],
      //   series: [
      //     {
      //       type: "candlestick",
      //       name: "平安银行",
      //       color: "green",
      //       lineColor: "green",
      //       upColor: "red",
      //       upLineColor: "red",
      //       tooltip: {},
      //       navigatorOptions: {
      //         color: Highcharts.getOptions().colors[0]
      //       },
      //       data: ohlc,
      //       dataGrouping: {
      //         units: groupingUnits
      //       },
      //       id: "sz"
      //     },
      //     {
      //       type: "column",
      //       data: volume,
      //       yAxis: 1,
      //       dataGrouping: {
      //         units: groupingUnits
      //       }
      //     }
      //   ]
      }
    };
  },
  components: {
    highcharts: Chart
  }
};
</script>

<style scoped lang="scss">
#kLineTemplate {
}
</style>
