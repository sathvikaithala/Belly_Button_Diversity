// Plots.js file holds the functions called in index.html to create plots and filter data

// Select data/ID from dropdown list
function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();

  // build chart when the requested dataset is selected
  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }

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
    
    d3.json("samples.json").then((data)=>{
      //var metadata = data.metadata;
      //var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      //var result = resultArray[0];
        
      // build bar plot


      var sortedSpecies = sample.sort((a,b) =>
            a.sample_values - b.sample_values).reverse(); 

      var topTenSpecies = sortedSpecies.slice(0,10);

      var topTenSpeciesNames = topTenSpecies.map(species => species.otu_ids);
      var topTenSpeciesValues = topTenSpecies.map(species => parseInt(species.sample_values));

      var trace = {
            x: topTenSpeciesNames,
            y: topTenSpeciesValues,
            type: "bar"
          };
      var data = [trace];
      var layout = {
            title: "Top Ten Bacteria Species",
            xaxis: { title: "Species" },
            yaxis: { title: "Sample Values"}
          };
      Plotly.newPlot("bar", data, layout);


        // build bubble plot


        // var PANEL = d3.select("#gauge");
        // build gauge plot
    })


  }


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