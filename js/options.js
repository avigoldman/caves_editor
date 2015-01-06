// THIS FILE HANDLES ALL OPTIONS FUNCTIONALLITY
// 1. OPENING OLD FILES
// 2. SAVING CURRENT FILE
// 3. CHANGING THEMES

var file = "";
var files;
var keys;

var loadMessage = "Any unsaved work will be lost. Continue?";
var storage = false;
//if local storage is allowed
if(typeof(Storage) !== "undefined") {
	storage = true;
}
  

$(function() {
	//*********LOAD IN PREVIOUS THEME*********//
	if (storage) {
		if (localStorage.theme != undefined) {
			editor.setTheme(localStorage.theme);
			$("#theme").val(localStorage.theme);
		}
	}

	//*********FILES**********//
	if (storage) {

		//if files does not exist create it	
  	if (!localStorage.files) {
   	  localStorage.files = JSON.stringify({});
		}
		else {
			populateFiles();
		}

		//load in files
		$("#files-form").submit(function(event) {
			event.preventDefault();
			if (confirm(loadMessage)) {
				loadFile($("#files").val());
				$(this).slideUp('fast');
			}
		});

		//delete file
		$("#delete-file").click(function(event) {
			event.preventDefault();
			if (confirm("Are you sure you want to delete "+$("#files").val()+"?")) {
				
				deleteFile($("#files").val());
				
				newFile();

				populateFiles();
			}

			$("#files-form").slideUp('fast');
		});

		//save current file
		$("#save-file").click(function(event) {


			//if the file is un named get the file name
			while (file=='')
				file = prompt("Name file", "");

			//if the user canceled the file naming then don't save
			if (file==null)
				return;

			//save the file and repopulate the list of files
			saveFile();

			populateFiles();

			saveMessage();

		});

		var saveTimeout = null;
		//save automatically
		editor.getSession().on("change", function(e){
			if (file != '') {
				clearTimeout(saveTimeout);
				saveTimeout = setTimeout(function () {
					saveFile();

					saveMessage();
				}, 2000);
			}
		});

		//set up for a blank file
		$("#new-file").click(function(event) {
			newFile();
		});

		$("#open-file").click(function(event) {
			$("#files-form").slideToggle('fast');
		});
	}

	//if localstorage is not supported
	else {
	  $("#files-controls").replaceWith('<div class="error">Please use a browser that supports local storage.</div>');
	}



	//*********CHANGING THEMES*********//
	$("#theme").change(function(event) {
		editor.setTheme($(this).val());
		if (storage)
			localStorage.theme = $(this).val();
	});
});


function populateFiles() {
	//get all keys and files
	files = JSON.parse(localStorage.files);
	keys = Object.keys(files);
	
	//if files is not empty
	if (keys.length > 0) {
		//clear files
		$("#files").html('');
		//populate the list with the files
		for (var i = 0; i < keys.length; i++) {
			$("#files").append('<option value="'+keys[i]+'">'+keys[i]+'</option>');
		}
	}
}


//load file
function loadFile(f) {
	file = f;
	$("#file-name").text(file);
	editor.setValue(files[file],1);
}

//save file
function saveFile() {
	$("#file-name").text(file);

	files[file] = editor.getValue();

	localStorage.files = JSON.stringify(files);
}

function saveMessage() {
	message("saving...");

		setTimeout(function() {

		message("saved");

		setTimeout(function(){
			message("");
		},600);

	},400);
}

//delete file
function deleteFile(f) {
	delete files[f];

	localStorage.files = JSON.stringify(files);
}

//prepare for new file
function newFile() {
	//make the file editing blank			
	file = '';

	//do the same with the ui
	$("#file-name").text('');

	//blank the editor
	editor.setValue('',-1);
}