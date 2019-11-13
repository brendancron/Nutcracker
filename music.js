var audio = document.getElementById("my_audio");
			
var song_list = []

var no = -1;

var list = document.getElementById("song_list");

var table = document.getElementById("my_order");
		
function main() {
	init_song_list();
	make_list();
	song_list = shuffle(song_list);
	make_table();
}
			
function init_song_list() {
	song_list[0] = {
		name: "Overture",
		id: 0			
	}
	song_list[1] = {
		name: "Act I Marie and Fritz",
		id: 1
	}
	song_list[2] = {
		name: "Act I March",
		id: 2				
	}
	song_list[3] = {
		name: "Act I Father-Daughter Dance",
		id: 3
	}
	song_list[4] = {
		name: "Act I Herr Drosselmeier's Arrival",		
		id: 4
	}
	song_list[5] = {
		name: "Act I Herr Drosselmeier's Gifts",			
		id: 5	
	}
	song_list[6] = {
		name: "Act I Grandfather's Dance",
		id: 6
	}
	song_list[7] = {
		name: "Act I Guest's Depart",	
		id: 7
	}
	song_list[8] = {
		name: "Act I Marie's Dream",			
		id: 8
	}
	song_list[9] = {
		name: "Act I The Battle",			
		id: 9
	}
	song_list[10] = {
		name: "Act I Pine Forest",
		id: 10
	}
	song_list[11] = {
		name: "Act I Waltz of the Snowflakes",
		id: 11
	}
	song_list[12] = {
		name: "Act II Sugarplum Fairy",
		id: 12
	}
	song_list[13] = {
		name: "Act II Hot Chocolate",
		id: 13
	}
	song_list[14] = {
		name: "Act II Coffee",
		id: 14
	}
	song_list[15] = {
		name: "Act II Tea",
		id: 15
	}
	song_list[16] = {
		name: "Act II Candy Cane",
		id: 16
	}
	song_list[17] = {
		name: "Act II Marzipan",
		id: 17
	}
	song_list[18] = {
		name: "Act II Mother Ginger",
		id: 18
	}
	song_list[19] = {
		name: "Act II Waltz of the Flowers",
		id: 19
	}
	song_list[20] = {
		name: "Act II Cavalier Pas de Deux",
		id: 20
	}
	song_list[21] = {
		name: "Act II Finale",
		id: 21
	}
}
			
function next_song() {
	no++;
	if(no >= song_list.length) {
		no = 0;	
	}	
	change_music("songs/" + song_list[no].name + ".mp3");
}
			
function change_music(music) {
	audio.pause();
	audio.setAttribute('src', music);
	audio.load();
	audio.play();
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function make_list() {				
	//adds a caption to the table
	list.createCaption().innerHTML = "<b>Soundtrack List</b>"	

	var row = list.createTHead().insertRow(0);
	row.insertCell(0).innerHTML = "<b>Track Number</b>";
	row.insertCell(1).innerHTML = "<b>Song Title</b>";	
	
	for(var i = 1; i <= song_list.length; i++) {
		var row = list.insertRow(i);
		row.insertCell(0).innerHTML = i;
		row.insertCell(1).innerHTML = song_list[i-1].name;
		const NAME = song_list[i-1].name;
		row.onclick = function () {
			makeChoice(NAME);				
		}
	}
}

function checkAnswers() {
	var count = 0;
	table.rows[0].insertCell(2).innerHTML = "<b>Correct Solution</b>"
	for(var i = 1; i <= song_list.length; i++) {
		var row = table.rows[i];
		var cell = row.cells[1];
		var sol = row.insertCell(2);
		sol.innerHTML = song_list[i-1].name;
		if(cell.innerHTML===song_list[i-1].name) {
			cell.style.backgroundColor = "lightgreen";
			count++;					
		} else {
			cell.style.backgroundColor = "red";
		}		
		sol.style.backgroundColor = "lightblue";
	}
	document.getElementById("song_list").style.display = "none";
	document.getElementById("check_answers").style.display = "none";
	document.getElementById("next_song").style.display = "none";
	makePercentWheel(Math.round(count/song_list.length*100));
}

function makeChoice(name) {
	if(no > -1) {
		var table = document.getElementById("my_order");
		row = (table.rows[no+1]);
		row.deleteCell(1);
		row.insertCell(1).innerHTML = name;	
	}
}

function make_table() {			
	//adds a caption to the table
	table.createCaption().innerHTML = "<b>Nutcracker Songs</b>"
	
	var row = table.createTHead().insertRow(0);
	row.insertCell(0).innerHTML = "<b>ID Number</b>";
	row.insertCell(1).innerHTML = "<b>Your Guess</b>";

	for(var i = 1; i <= song_list.length; i++) {
		var row = table.insertRow(i);
		row.insertCell(0).innerHTML = i;
		row.insertCell(1).innerHTML = "not guessed";
	}

}

function makePercentWheel(percent) {
	var svg = document.createElement("svg");
	svg.setAttribute("viewbox", "0 0 36 36");
	svg.setAttribute("class", "circular-chart green");

	var pathbg = document.createElement("path");
	pathbg.setAttribute("class", "circle-bg");
	pathbg.setAttribute("d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831");
	svg.appendChild(pathbg);

	var path = document.createElement("path");
	path.setAttribute("class", "circle");
	var dasharray = percent + ", 100";
	path.setAttribute("stroke-dasharray", dasharray);
	path.setAttribute("d", "M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831");
	svg.appendChild(path);

	var txt = document.createElement("text");
	txt.setAttribute("x", "18");
	txt.setAttribute("y", "20.35");
	txt.setAttribute("class", "percentage");
	txt.innerHTML = percent + "%";
	svg.appendChild(txt);

	document.getElementById("container").appendChild(svg);

	document.getElementById("container").innerHTML += "";
}
		
main();