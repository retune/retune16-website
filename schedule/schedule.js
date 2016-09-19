var fs = require('fs');
var _ = require('underscore');

var scheduleThu = require(__dirname + "/schedule_thursday.json");
// var scheduleFri = require(__dirname + "/schedule_friday.json");
// var scheduleThu = require(__dirname + "/schedule_saturday.json");

var totalSchedule = [];
totalSchedule.push(scheduleThu);

var header = fs.readFileSync(__dirname + "/header.html").toString();
var footer = fs.readFileSync(__dirname + "/footer.html").toString();

var html = "";

html += header;

var scheduleStr = "";

_.forEach(totalSchedule, function(day){

  scheduleStr  += "<div class=\"col-xs-12 day-schedule\">\n";
  scheduleStr  += "\n";
  scheduleStr  += "          <div class=\"row\">\n";
  scheduleStr  += "            <div class=\"col-xs-12\">\n";
  scheduleStr  += "              <h1 class=\"schedule-day\">" + day.displayTitle + "<\/h1>\n";
  scheduleStr  += "            <\/div>\n";
  scheduleStr  += "          <\/div>\n";
  scheduleStr  += "\n";
  scheduleStr  += "          <div class=\"row schedule-day-header\">\n";
  scheduleStr  += "            <div class=\"col-xs-2 header-title\">\n";
  scheduleStr  += "              <h2>Time<\/h2>\n";
  scheduleStr  += "            <\/div>\n";
  scheduleStr  += "            <div class=\"col-xs-2 header-title\">\n";
  scheduleStr  += "              <h2>Immersed Narratives<\/h2>\n";
  scheduleStr  += "            <\/div>\n";
  scheduleStr  += "            <div class=\"col-xs-2 header-title\">\n";
  scheduleStr  += "              <h2>Neuronal Creations<\/h2>\n";
  scheduleStr  += "            <\/div>\n";
  scheduleStr  += "            <div class=\"col-xs-2 header-title\">\n";
  scheduleStr  += "              <h2>Networked Transplantations<\/h2>\n";
  scheduleStr  += "            <\/div>\n";
  scheduleStr  += "            <div class=\"col-xs-2 header-title\">\n";
  scheduleStr  += "              <h2>Creative Production<\/h2>\n";
  scheduleStr  += "            <\/div>\n";
  scheduleStr  += "            <div class=\"col-xs-2 header-title\">\n";
  scheduleStr  += "              <h2>Random<\/h2>\n";
  scheduleStr  += "            <\/div>\n";
  scheduleStr  += "          <\/div>\n";


  _.forEach(day.schedule, function(row) {

    scheduleStr  += "          <div class=\"row schedule-row\">\n";
    scheduleStr  += "            <div class=\"col-xs-2 schedule-element schedule-time\">\n";
    scheduleStr  += "              <p>" + row.time + "<\/p>\n";
    scheduleStr  += "            <\/div>\n";

    _.forEach(row.topics, function(topic) {

      for (var i=0;i<2;i++) {

        scheduleStr  += "            <div class=\"col-xs-1 schedule-element\">\n";

        if (topic.events[i]){

          scheduleStr  += "              <p data-popup-id=\"" + topic.events[i].id + "\">" + topic.events[i].scheduleTitle + "<\/p>\n";

          scheduleStr += "<div id=\"" + topic.events[i].id + "\" class=\"detail-event\">\n";
          scheduleStr += "                <div class=\"basic-info\">\n";
          scheduleStr += "                  <p>" + day.date + "<\/p>\n";
          scheduleStr += "                  <p>" + row.time + "<\/p>\n";
          scheduleStr += "                  <p>" + topic.events[i].location + "<\/p>\n";
          scheduleStr += "                  <span class=\"close\">X<\/span>\n";
          scheduleStr += "                <\/div>\n";
          scheduleStr += "                <div class=\"detail-info\">\n";

          _.forEach(topic.events[i].speakers, function(speaker){
            scheduleStr += "                  <p>" + speaker + "<\/p>\n";
          });

          scheduleStr += "                  <p class=\"description\">\n";
          scheduleStr += topic.events[i].description;
          scheduleStr += "                  <\/p>\n";
          scheduleStr += "                  <p><a href=\"#\">" + topic.events[i].website + "<\/a><\/p>\n";
          scheduleStr += "                <\/div>\n";
          scheduleStr += "              <\/div>\n";
        }
        else {
          scheduleStr  += "              <p>&nbsp;<\/p>\n";
        }
        scheduleStr  += "            <\/div>\n";
      }

    });


    scheduleStr  += "          <\/div>\n";


  });

  scheduleStr  += "        <\/div>\n";

});

html += scheduleStr;
html += footer;

fs.writeFile("schedule/index.html", html, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("file created successfully!");
});

