// Plots.js file holds the functions called in index.html to create plots and filter data

// Select data/ID from dropdown list
function init() {
    var selector = d3.select("#selDataset");
    var options;
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
    });

    optionChanged(document.getElementById("selDataset").options[0].value);
})}
  
// define buildMetadata
function buildMetadata(sample) {
    d3.json("samples.json").then((data) => { //D3 pulls in entire dataset
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample); // then filters it
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      PANEL.append("h6").text("ID: " + result.id);
      PANEL.append("h6").text("Ethnicity: " + result.ethnicity);
      PANEL.append("h6").text("Gender: " + result.gender);
      PANEL.append("h6").text("Age: " + result.age);
      PANEL.append("h6").text("Location: " + result.location);
      PANEL.append("h6").text("Belly Button Type: " + result.bbtype);
      PANEL.append("h6").text("Wash Frequency: " + result.wfreq);

    });
}

function buildCharts(sample){
    var samples;
    d3.json("samples.json").then((data)=>{
      
      /*var metadata = data.metadata;
      var resultArrayMD = metadata.filter(sampleObj=>sampleObj.id==sample);
      var resultMD = resultArrayMD[0]; */
      
      
      var samples = data.samples;
      // console.log(samples) // testing to see if code works
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      console.log(result);

      /* getting first ten otu's per id (for bar chart)
      Bar chart: When an individual’s ID is selected, the top 10 bacterial species (OTUs) should be visualized with a bar chart. Create a horizontal bar chart to display the top 10 OTUs found in that individual.
      Use sample_values as the values for the bar chart.
      Use otu_ids as the labels for the bar chart.
      Use otu_labels as the hover text for the chart.
      */
      
      let otu_ids = result.otu_ids; // selecting list of species for selected ID (for labels)

      let tenOtu = otu_ids.slice(0,10); // taking first 10 in array 

      let sampleVals = result.sample_values; // getting sample value sizes for selected id

      let tenVals = sampleVals.slice(0,10); // getting top ten sample sizes (for values of bar chart)

      let otuLabs = result.otu_labels; // getting labels

      let tenLabs = tenOtu.map(otu => "OTU" + otu); // getting top ten labels

      // build each chart

      // Bar chart:

      var bartrace = {
            x: tenVals.reverse(),
            y: tenLabs.reverse(),
            type: "bar",
            orientation: 'h',
            marker: {color: 'rgb(192,0,0)'}
      };

      var bardata = [bartrace];
      var layout = {
            title: "Top Ten Bacteria Species",
            xaxis: { title: "Species" },
            yaxis: { title: "Sample Values"}
      };
      
      Plotly.newPlot("bar", bardata, layout);


      /*
      Create a bubble chart that displays each sample:
      Use otu_ids for the x-axis values.
      Use sample_values for the y-axis values.
      Use sample_values for the marker size.
      Use otu_ids for the marker colors.
      Use otu_labels for the text values.
      */ 
      
      var bubtrace = {
        x: otu_ids,
        y: sampleVals,
        text: otuLabs,
        mode: 'markers',
        marker:{
          color: otu_ids,
          size: sampleVals,
        }
      };

      var bubdata = [bubtrace];

      Plotly.newPlot('bubble',bubdata);




      /* 
      Gauge chart:
      To plot the weekly washing frequency of the individual. 
      You will need to modify the example gauge code to account for values ranging from 0 through 9. 
      Update the chart whenever a new sample is selected. */
      


      var metadata = data.metadata;
      var resultArrayMD = metadata.filter(sampleObj=>sampleObj.id==sample);
      var resultMD = resultArrayMD[0];
     
      console.log("wash freq" + resultMD.wfreq);

      var gaugetrace = {
        domain:{x:[0,1],y:[0,1]},
        value: resultMD.wfreq,
        title: "<b>Belly Button Wash Frequency</b><br>(Times Per Week)</br>",
        type: "indicator",
        mode: "gauge+number"

      };

      var gaugedata = [gaugetrace];

      gaugelayout = {
        width: 450,
        height: 450
      };

      Plotly.newPlot('gauge',gaugedata, gaugelayout); 
    
     
    })


}

  // build chart when the requested dataset is selected
function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
}

init(); // initialize the page after running everything

/*
  Bar chart: When an individual’s ID is selected, the top 10 bacterial species (OTUs) should be visualized with a bar chart. Create a horizontal bar chart to display the top 10 OTUs found in that individual.
    Use sample_values as the values for the bar chart.
    Use otu_ids as the labels for the bar chart.
    Use otu_labels as the hover text for the chart.


Create a bubble chart that displays each sample:
    Use otu_ids for the x-axis values.
    Use sample_values for the y-axis values.
    Use sample_values for the marker size.
    Use otu_ids for the marker colors.
    Use otu_labels for the text values. 

Gauge chart:
    To plot the weekly washing frequency of the individual. 
    You will need to modify the example gauge code to account for values ranging from 0 through 9. 
    Update the chart whenever a new sample is selected.
    */