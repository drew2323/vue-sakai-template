<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import Plotly from 'plotly.js-dist'
  
  const plotlyChart = ref(null); // reference to the DOM element
  
  onMounted(() => {
      let z1 = [
        [8.83,8.89,8.81,8.87,8.9,8.87],
        [8.89,8.94,8.85,8.94,8.96,8.92],
        [8.84,8.9,8.82,8.92,8.93,8.91],
        [8.79,8.85,8.79,8.9,8.94,8.92],
        [8.79,8.88,8.81,8.9,8.95,8.92],
        [8.8,8.82,8.78,8.91,8.94,8.92],
        [8.75,8.78,8.77,8.91,8.95,8.92],
        [8.8,8.8,8.77,8.91,8.95,8.94],
        [8.74,8.81,8.76,8.93,8.98,8.99],
        [8.89,8.99,8.92,9.1,9.13,9.11],
        [8.97,8.97,8.91,9.09,9.11,9.11],
        [9.04,9.08,9.05,9.25,9.28,9.27],
        [9,9.01,9,9.2,9.23,9.2],
        [8.99,8.99,8.98,9.18,9.2,9.19],
        [8.93,8.97,8.97,9.18,9.2,9.18]
    ];

    let z2 = [];
    for (var i=0;i<z1.length;i++ ) { 
      let z2_row = [];
        for(var j=0;j<z1[i].length;j++) { 
          z2_row.push(z1[i][j]+1);
        }
        z2.push(z2_row);
    }

    let z3 = []
    for (var i=0;i<z1.length;i++ ) { 
      let z3_row = [];
        for(var j=0;j<z1[i].length;j++) { 
          z3_row.push(z1[i][j]-1);
        }
        z3.push(z3_row);
    }
    var data_z1 = {z: z1, type: 'surface'};
    var data_z2 = {z: z2, showscale: false, opacity:0.9, type: 'surface'};
    var data_z3 = {z: z3, showscale: false, opacity:0.9, type: 'surface'};

    const layout = {
      title: '3D Plotly Chart',
    };

    Plotly.newPlot(plotlyChart.value, [data_z1, data_z2, data_z3], layout);
  
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
  