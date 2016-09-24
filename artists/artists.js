var fs = require('fs');
var sizeOf = require('image-size');

var j = require(__dirname + "/artists-data.json");

var header = fs.readFileSync(__dirname + "/header.html").toString();
var footer = fs.readFileSync(__dirname + "/footer.html").toString();

var html = "";

html += header;

console.log("number of speakers: " + j.speakers.length);

// sort them by first name
j.speakers.sort(function(a, b) {
   return a.firstName.localeCompare(b.firstName);
});


/* LANDING PAGE */
html += "     <div class=\"speakers-container\">\n";
html += "      <div class=\"col-xs-12 col-md-6\">\n"
html += "        <div class=\"row\">\n"

for(i = 0; i<Math.round(j.speakers.length/2); i++){
	var s = j.speakers[i];
	var fullName = s.firstName + " " + s.lastName;
  if(s.lastName == "") fullName = s.firstName;
  console.log(i + ": " + fullName);
	html += "          <div class=\"col-xs-12 col-md-6\">\n"
	html += "            <h1 class=\"speaker-name\">" + fullName + "</h1>\n"
	html += "          </div>\n"
}

html += "        </div>\n"
html += "      </div>\n"
html += "\n"
html += "      <div class=\"col-xs-12 col-md-6\">\n"
html += "        <div class=\"row\">\n"

for(i = Math.round(j.speakers.length/2); i<j.speakers.length; i++){
  var s = j.speakers[i];
	var fullName = s.firstName + " " + s.lastName;
  if(s.lastName == "") fullName = s.firstName;
  console.log(i + ": " + fullName);
	html += "          <div class=\"col-xs-12\">\n"
	html += "            <h1 class=\"speaker-name\">" + fullName + "</h1>\n"
	html += "          </div>\n"
}

html += "        </div>\n"
html += "      </div>\n"
html += "\n"
html += "    </div>\n"
html += "  </div>\n"
html += "</div>\n"
html += "<div class=\"speakers row\">\n"


/* SPEAKER CARDS */
for(var speaker in j.speakers){
	var s = j.speakers[speaker];
  var fullName = s.firstName + " " + s.lastName;
  if(s.lastName == "") fullName = s.firstName;
	var fullNameDashed = fullName.replace(/ /g, "-");
  fullNameDashed = fullNameDashed.split('&').join(''); // get rid of '&' signs

	html += "<div id=\"" + fullNameDashed + "-detail\" class=\"col-xs-12 speaker-card\">\n"
	html +=	"		<div class=\"row\">\n";
	html += "			<div class=\"col-xs-12 col-md-6 speaker-info\">\n";
	html += "				<h1>" + fullName + "</h1>\n";
	html += "				<p>" + s.session + "</p>\n";
  html += "				<p>" + s.theme + "</p>\n";
  html += "				<div id=\"" + fullNameDashed + "-gallery\" class=\"gallery\">\n";

	for(var img in s.images){
		var i = s.images[img];
		var number = parseInt(img)+1;
		number = ("00" + number).substr(-2,2);  // zero padding
		var fullImagePath = "../img/" + fullNameDashed + "-" + number + "." + i.extension;
		var thumbImagePath = "../img/" + fullNameDashed + "-" + number + "_small." + i.extension;
		var dimensions = sizeOf(__dirname + "/" +  fullImagePath);


		html += "					<a href=\"" + fullImagePath + "\" data-size=\"" + dimensions.width + "x"+ dimensions.height +"\" data-author=\"" + i.credit + "\" class=\"demo-gallery__img--main\">\n";
	  html += "						<img src=\"" + thumbImagePath + "\" alt=\"\" />\n";
	  html += "						<figure>" + i.caption + "</figure>\n";
	  html += "					</a>\n";
	}

  html += "				</div>\n";
  html += "			</div>\n";
  html += "			<div class=\"col-xs-12 col-md-6 speaker-bio\">\n";
  html += "				<div class=\"row\">\n";
  html += "					<div class=\"col-xs-12\">\n";
  html += "						<p>"+ s.bio +"</p>\n";
  html += "					</div>\n";
  html += "					<div class=\"col-md-6 websites-list\">\n";

	for(var web in s.websites){
		var site = s.websites[web];
  	html += "						<p><a href=\"" + site.url + "\" target=\"_blank\">" + site.name + "</a></p>\n";
	}

  html += "					</div>\n";
  html += "					<div class=\"col-md-6 social-media\">\n";

	for(var i in s.social){
		var socialsite = s.social[i];
  	html += "						<p><a href=\"" + socialsite.url + "\" target=\"_blank\">" + socialsite.name + "</a></p>\n";
	}

  html += "					</div>\n";
  html += "				</div>\n";
  html += "			</div>\n";
  html += "		</div>\n";
  html += "</div>\n";
	html += "\n";
}

html += footer;

fs.writeFile("index.html", html, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("file created successfully!");
});
