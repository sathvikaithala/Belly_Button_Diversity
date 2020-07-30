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