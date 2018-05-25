$(document).ready(function () {

  var worker = new Worker("worker.js");
  var generation_counter = 0;

  worker.onmessage = function (e) {
    generation_counter += 1;
    console.log(e.data);
    $("#display").html("<div id='string_entry'> G# " + generation_counter + ": " + e.data.best_candidate.replace(/[^\w\d\!\? ]+/g, '#') + "</div>"
      + "<div id='best_fitness'> Fitness: " + e.data.best_fitness + "</div>"
      + "<div id='mean_fitness'> Fitness Mean: " + e.data.mean_fitness + "</div>"
    );
    var realHeight = $("#display")[0].scrollHeight;
    $("#display").scrollTop(realHeight);
  };


});
