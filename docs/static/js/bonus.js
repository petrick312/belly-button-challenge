//Function to populate the Gauge Chart
function buildGaugeChart(sample) {
  // Use D3 to retrieve all of the data
  d3.json(url).then((data) => {
    
    //Assiging metadata to a variable
    let metadata = data.metadata;
    
    // Filter based on values of the sample
    let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    
    // Get the first index from the array
    let result = resultArray[0];
    
    // Get the washing frequency value
    let wfreq = result.wfreq;
    
    // Set up the trace for the gauge chart
    let trace = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        title: { text: "Belly Button Washing Frequency" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 9] },
          bar: { color: "darkblue" },
          steps: [
            { range: [0, 1], color: "#D6EAF8" },
            { range: [1, 2], color: "#AED6F1" },
            { range: [2, 3], color: "#85C1E9" },
            { range: [3, 4], color: "#5DADE2" },
            { range: [4, 5], color: "#3498DB" },
            { range: [5, 6], color: "#2E86C1" },
            { range: [6, 7], color: "#2874A6" },
            { range: [7, 8], color: "#21618C" },
            { range: [8, 9], color: "#1B4F72" }
          ],
        }
      }
    ];
    
    // Set up the layout
    let layout = { width: 500, height: 400, margin: { t: 0, b: 0 } };
    
    // Call Plotly to plot the gauge chart
    Plotly.newPlot("gauge", trace, layout);
  });
}