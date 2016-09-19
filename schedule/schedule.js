var fs = require('fs');

var scheduleThu = require(__dirname + "/schedule_thursday.json");

var header = fs.readFileSync(__dirname + "/header.html").toString();
var footer = fs.readFileSync(__dirname + "/footer.html").toString();

var html = "";

html += header;

var scheduleStr ="";
scheduleStr  += "<div class=\"col-xs-12 day-schedule\">";
scheduleStr  += "";
scheduleStr  += "          <div class=\"row\">";
scheduleStr  += "            <div class=\"col-xs-12\">";
scheduleStr  += "              <h1 class=\"schedule-day\">Friday<br>October 7, 2016<\/h1>";
scheduleStr  += "            <\/div>";
scheduleStr  += "          <\/div>";
scheduleStr  += "";
scheduleStr  += "          <div class=\"row schedule-day-header\">";
scheduleStr  += "            <div class=\"col-xs-2 header-title\">";
scheduleStr  += "              <h2>Time<\/h2>";
scheduleStr  += "            <\/div>";
scheduleStr  += "            <div class=\"col-xs-2 header-title\">";
scheduleStr  += "              <h2>Immersed Narratives<\/h2>";
scheduleStr  += "            <\/div>";
scheduleStr  += "            <div class=\"col-xs-2 header-title\">";
scheduleStr  += "              <h2>Neuronal Creations<\/h2>";
scheduleStr  += "            <\/div>";
scheduleStr  += "            <div class=\"col-xs-2 header-title\">";
scheduleStr  += "              <h2>Networked Transplantations<\/h2>";
scheduleStr  += "            <\/div>";
scheduleStr  += "            <div class=\"col-xs-2 header-title\">";
scheduleStr  += "              <h2>Creative Production<\/h2>";
scheduleStr  += "            <\/div>";
scheduleStr  += "            <div class=\"col-xs-2 header-title\">";
scheduleStr  += "              <h2>Random<\/h2>";
scheduleStr  += "            <\/div>";
scheduleStr  += "          <\/div>";
scheduleStr  += "          <div class=\"row schedule-row\">";
scheduleStr  += "            <div class=\"col-xs-2 schedule-element schedule-time\">";
scheduleStr  += "              <p>10:00<\/p>";
scheduleStr  += "            <\/div>";
scheduleStr  += "            <div class=\"col-xs-2 schedule-element\">";
scheduleStr  += "              <p><\/p>";
scheduleStr  += "            <\/div>";
scheduleStr  += "            <div class=\"col-xs-2 schedule-element\">";
scheduleStr  += "              <p><\/p>";
scheduleStr  += "            <\/div>";
scheduleStr  += "            <div class=\"col-xs-2 schedule-element\">";
scheduleStr  += "              <p><\/p>";
scheduleStr  += "            <\/div>";
scheduleStr  += "            <div class=\"col-xs-2 schedule-element\">";
scheduleStr  += "              <p><\/p>";
scheduleStr  += "            <\/div>";
scheduleStr  += "            <div class=\"col-xs-2 schedule-element\">";
scheduleStr  += "              <p><\/p>";
scheduleStr  += "            <\/div>";
scheduleStr  += "          <\/div>";
scheduleStr  += "        <\/div>";




html += scheduleStr;
html += footer;

fs.writeFile("schedule/index.html", html, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("file created successfully!");
});

