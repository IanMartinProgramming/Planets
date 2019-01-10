// remove data-rel=dialog from call to #individual
// show refresh on individual page
// comment out rowid = line
// include save of rowid and plist to localStorage
// retrieve rowid and plist from localStorage
// NOTE: when doing this, the main menu appends list...not sure why

var plist = new Array();
var newPlanet;
var rowid;

function Planet(pname, pcolor, pradius, pdistance, pimage) {
	this.pname = pname;
	this.pcolor = pcolor;
	this.pradius = pradius;
	this.pdistance = pdistance;
	this.pimage = pimage;
}
	
$(document).on("pagecreate", "#planet", function() {		
// only done on initial page load
	console.log("in pagecreate");
	$.getJSON("planets.json", function (data) {
		console.log("in getJSON");
		var start=data.solarSystem.planets;

		for (var x=0; x < start.length; x++) {
			newPlanet = new Planet(start[x].planetName,
														 start[x].planetColor,
														 start[x].planetRadius,
														 start[x].distanceFromSun,
														 start[x].image);
			plist.push(newPlanet);
		}	
		console.log(plist);
		loadCollapsible();
	});
});	

function loadCollapsible() {

	$("ul#planetmenu").html("");
	for (var x=0; x < plist.length; x++) {
		$("ul#planetmenu").append(
			"<li li-id='"+x+"' class='ui-btn ui-icon-" + 
									plist[x].pname.toLowerCase() + " ui-btn-icon-right'>" +
				"<a href='#individual'>" + 
					"<span id='n" + x + "'>" + 
						plist[x].pname + 
					"</span>" + 
				"</a></li>");									
	}
	$("#planetmenu").listview("refresh");	
	
	for (var x=0; x < plist.length; x++) {
		$("#n"+x).css("color", plist[x].pcolor.toLowerCase());
		$("#n"+x).css("text-shadow", "1px 1px 1px black," + 
																 "-1px -1px 1px black," +
																 "-1px 1px 1px black," +
"																 1px -1px 1px black");
	}	
}

$(document).on("click", "#planetmenu >li", function() {
	//rowid = $(this).closest("li").attr("li-id");
	localStorage.setItem("rowid", $(this).closest("li").attr("li-id"));
	localStorage.setItem("plist", JSON.stringify(plist));
	/* localStorage only supports strings; arrays must be converted 
		 to a string format; convert into a JSON array */
})

$(document).on("pageshow", "#individual", function() {
	rowid = localStorage.getItem("rowid");
	plist = JSON.parse(localStorage.getItem("plist"));
	
	$("#pname").html(plist[rowid].pname);
	$("#mainblocka").html("");
	$("#mainblockb").html("");
	$("#mainblocka").append(
		"<br><table><tr><th>NAME:  </th><td>" + plist[rowid].pname + "</td></tr>" +
							 "<tr><th>COLOUR:  </th><td>" +	plist[rowid].pcolor + "</td></tr>" +
							 "<tr><th>RADIUS:  </th><td>" +	plist[rowid].pradius + "</td></tr>" +
							 "<tr><th>DISTANCE FROM SUN:  </th><td>" +	plist[rowid].pdistance + "</td></tr>" +	
				"</table>" 	
		);
	$("#mainblockb").html(
			"<p><img src='_images/" + plist[rowid].pimage + "' width='150'></p>");
});
