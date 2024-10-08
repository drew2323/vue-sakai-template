<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import Plotly from 'plotly.js-dist'
  
  const plotlyChart = ref(null); // reference to the DOM element
  
  onMounted(() => {
    const data = [
      {
        x: [1, 2, 3, 4, 5],
        y: [10, 15, 13, 17, 21],
        type: 'scatter',
      },
    ];
  
    const layout = {
      title: 'Simple Plotly Chart',
    };
  
    Plotly.newPlot(plotlyChart.value, data, layout);
  
    // Optional: Clean up the plot when the component is unmounted
    onBeforeUnmount(() => {
      Plotly.purge(plotlyChart.value);
    });
  });
</script>

<template>
    <div ref="plotlyChart" style="width: 50%; height: 400px;"></div>
</template>

<style scoped>
  /* Optional styling for the plot container */
</style>
  