// Assign the url to a constant variable
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"

// Use D3 library to read the JSON file from the URL
d3.json(url).then(function(data) {
  console.log(data);
});

// Initialize the dashboard  
function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Use D3 to get sample names and populate the drop-down selector
    d3.json(url).then((data) => {
        
        // Set a variable for the sample names
        let names = data.names;

        // Add  samples to dropdown menu
        names.forEach((id) => {

            // print the value of the variables during the entire loop
            console.log(id);
            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });

        // Set the first sample from the list
        let sample_one = names[0];

        // Print the value of sample_one
        console.log(sample_one);

        // Build the initial plots
        buildMetadata(sample_one);
        buildBarChart(sample_one);
        buildBubbleChart(sample_one);
        buildGaugeChart(sample_one);
    });
};

// Function to populate metadata info
function buildMetadata(sample) {

    // Use D3 to retrieve all data
    d3.json(url).then((data) => {

        // Retrieve all metadata
        let metadata = data.metadata;

        // Filter based on the value of the sample
        let value = metadata.filter(x => x.id == sample);

        // Print the array of metadata objects
        console.log(value)

        // Get the first index from the array
        let valueData = value[0];

        // Clear metadata content to make it ready for user input
        d3.select("#sample-metadata").html("");

        // Use Object.entries to add each key/value pair to the panel
        Object.entries(valueData).forEach(([key,value]) => {

            // Print the individual key/value pairs as they are being appended to the metadata panel
            console.log(key,value);
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
};

// Function to populate the bar chart
function buildBarChart(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {

        // Retrieve all sample data
        let sampleInfo = data.samples;

        // Filter based on the value of the sample
        let value = sampleInfo.filter(x => x.id == sample);

        // Get the first index from the array
        let valueData = value[0];

        // Get the otu_ids, lables, and sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        // Log the data to the console
        console.log(otu_ids,otu_labels,sample_values);
   
        // Set up the trace for the bar chart
        let trace = {
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation: 'h',
        };

        // Setup the layout
        let barlayout = {
            title: "Top 10 Bateria Cultured Present",
            margin: {
                l: 150, 
                r: 30, 
                t: 30, 
                b: 30
            }
        };

        // Data array
        barData = [trace];

        // Call Plotly to plot the bar chart
        Plotly.newPlot("bar", barData, barlayout)
    });
};

// Function to populate the bubble chart
function buildBubbleChart(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {
        
        // Retrieve all sample data
        let sampleInfo = data.samples;

        // Filter based on the value of the sample
        let value = sampleInfo.filter(x => x.id == sample);

        // Get the first index from the array
        let valueData = value[0];

        // Get the otu_ids, lables, and sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        // Log the data to the console
        console.log(otu_ids,otu_labels,sample_values);
        
        // Set up the trace for bubble chart
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "YlGnBu"
            }
        };

        // Set up the layout
        let bubbleLayout = {
            title: "Bacteria Per Sample"
        };

        // Data array
        bubbleData = [trace1];

        // Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", bubbleData, bubbleLayout)
    });
};

// Function that updates dashboard when sample is changed
function optionChanged(value) { 

    // Log the new value
    console.log(value); 

    // Call all functions 
    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
    buildGaugeChart(value);
};

// Initialize function
init();