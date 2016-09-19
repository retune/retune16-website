var fs = require('fs');

var scheduleThu = require(__dirname + "/schedule_thursday.json");

var header = fs.readFileSync(__dirname + "/header.html").toString();
var footer = fs.readFileSync(__dirname + "/footer.html").toString();

var html = "";

html += header;

var scheduleStr = "";
scheduleStr  += "<div class=\"col-xs-12 day-schedule\">\n";
scheduleStr  += "\n";
scheduleStr  += "          <div class=\"row\">\n";
scheduleStr  += "            <div class=\"col-xs-12\">\n";
scheduleStr  += "              <h1 class=\"schedule-day\">Friday<br>October 7, 2016<\/h1>\n";
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
scheduleStr  += "          <div class=\"row schedule-row\">\n";
scheduleStr  += "            <div class=\"col-xs-2 schedule-element schedule-time\">\n";
scheduleStr  += "              <p>10:00<\/p>\n";
scheduleStr  += "            <\/div>\n";
scheduleStr  += "            <div class=\"col-xs-2 schedule-element\">\n";
scheduleStr  += "              <p><\/p>\n";
scheduleStr  += "            <\/div>\n";
scheduleStr  += "            <div class=\"col-xs-2 schedule-element\">\n";
scheduleStr  += "              <p><\/p>\n";
scheduleStr  += "            <\/div>\n";
scheduleStr  += "            <div class=\"col-xs-2 schedule-element\">\n";
scheduleStr  += "              <p><\/p>\n";
scheduleStr  += "            <\/div>\n";
scheduleStr  += "            <div class=\"col-xs-2 schedule-element\">\n";
scheduleStr  += "              <p><\/p>\n";
scheduleStr  += "            <\/div>\n";
scheduleStr  += "            <div class=\"col-xs-2 schedule-element\">\n";
scheduleStr  += "              <p><\/p>\n";
scheduleStr  += "            <\/div>\n";
scheduleStr  += "          <\/div>\n";
scheduleStr  += "        <\/div>\n";


html += scheduleStr;
html += footer;

fs.writeFile("schedule/index.html", html, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("file created successfully!");
});

