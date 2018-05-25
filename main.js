$(document).ready(function () {

  var worker = new Worker("worker.js");
  var generation_counter = 0;

  generation_counter_array = []
  worker.onmessage = function (e) {
    generation_counter += 1;
    generation_counter_array.push(generation_counter)

    console.log(e.data);
    $("#display").html("<div id='string_entry'> G# " + generation_counter + ": " + e.data.best_candidate.replace(/[^\w\d\!\? ]+/g, '#') + "</div>"
      + "<div id='best_fitness'> Fitness: " + e.data.best_fitness + "</div>"
      + "<div id='mean_fitness'> Fitness Mean: " + e.data.mean_fitness + "</div>"
      + "<div id='plot'></div>"
    );
    if (e.data.best_fitness == 0) {
      plot(e.data.best_fitness_array, e.data.mean_fitness_array);
    }
  };


});

function plot(best_fitness_array, mean_fitness_array) {
  var mean = {
    x: generation_counter_array,
    y: mean_fitness_array,
    type: 'scatter',
    name: 'Mean Fitness'
  };

  var bests = {
    x: generation_counter_array,
    y: best_fitness_array,
    type: 'scatter',
    name: 'Best Fitness'
  };

  var layout = {
    title: 'String Evolution Fitness',
    xaxis: {
      title: 'Generation',
      showgrid: false,
      zeroline: false
    },
    yaxis: {
      title: 'Fitness',
      showline: false
    }
  };

  var data = [mean, bests];

  Plotly.newPlot('plot', data, layout);
}