<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { createChart } from 'lightweight-charts'

let chart;
const chartContainer = ref();

onMounted(() => {
    // Create the Lightweight Charts Instance using the container ref.
    chart = createChart(chartContainer.value, { width: 400, height: 300 });
    const lineSeries = chart.addLineSeries();
    lineSeries.setData([
    { time: '2019-04-11', value: 80.01 },
    { time: '2019-04-12', value: 96.63 },
    { time: '2019-04-13', value: 76.64 },
    { time: '2019-04-14', value: 81.89 },
    { time: '2019-04-15', value: 74.43 },
    { time: '2019-04-16', value: 80.01 },
    { time: '2019-04-17', value: 96.63 },
    { time: '2019-04-18', value: 76.64 },
    { time: '2019-04-19', value: 81.89 },
    { time: '2019-04-20', value: 74.43 },
]);
});

onUnmounted(() => {
    if (chart) {
        chart.remove();
        chart = null;
    }
});

</script>

<template>
    <div class="lw-chart" ref="chartContainer"></div>
</template>
<style scoped>
    .lw-chart {
        height: 100%;
    }
</style>