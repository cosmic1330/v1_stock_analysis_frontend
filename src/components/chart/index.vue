<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<style>
.highcharts-container {
  width: 600px;
  height: 400px;
  border: 1px solid #ddd;
  margin: auto;
}
</style>

<script>
import { Chart } from "highcharts-vue";

export default {
  name: "Chart",
  components: {
    highcharts: Chart
  },
  data() {
    return {
      chartOptions: {
        title: {
          text: "移動平均線"
        },
        subtitle: {
          text: "2308"
        },
        yAxis: {
          title: {
            text: "2308"
          }
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle"
        },
        plotOptions: {
          series: {
            label: {
              connectorAllowed: false
            },
            pointStart: 0,
          }
        },
        series: [
          {
            name: "MA5",
            data: this.$store.getters.ma5
          },
          {
            name: "MA10",
            data: this.$store.getters.ma10
          },
          {
            name: "MA20",
            data: this.$store.getters.ma20,
          },
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom"
                }
              }
            }
          ]
        }
      }
    };
  },
  computed:{
  },
  methods: {
  }
};
</script>