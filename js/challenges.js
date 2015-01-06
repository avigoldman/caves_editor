// THIS FILE HANDLES TEMPLATE FUNCTIONALLITY
// 1. LOAD IN TEMPLATE BASED ON ID

challenge = "";

$(function() {

	//load in all the challenges
	var challenge_keys = Object.keys(challenges);

	var $challenges = $("#challenges");

	for (var i = 0; i < challenge_keys.length; i++) {
		$challenges.append('<li>'+challenge_keys[i]+'</li>');
	}

	$("#challenges li").click(function(event) {
		if (confirm(loadMessage)) {
			loadChallenge($(this).text());
		}
	});
	
});

function loadChallenge(c) {
	if (challenge.length == 0)
		setupChallenge();

	challenge = c;

	newFile();

	$("#instructions").text(challenges[c].instructions);

	editor.setValue(challenges[c].baseCode,1);
}


//setup challenge area
function setupChallenge() {
	//show instructions
	$("#instructions").removeClass('hide');

	//show challenges controls
	$("#files-controls").addClass('hide');
	$("#challenges-controls").removeClass('hide');

	//show challenges runner
	$("#run-code").addClass('hide');
	$("#run-challenge").removeClass('hide');
}

//setup basic code area
function setupCode() {
	//show instructions
	$("#instructions").addClass('hide');

	//show challenges controls
	$("#files-controls").removeClass('hide');
	$("#challenges-controls").addClass('hide');

	//show challenges runner
	$("#run-code").removeClass('hide');
	$("#run-challenge").addClass('hide');

	challenge = "";
}

function checkChallenge() {
	try {
    //do the stuff
    eval(Sk.importMainWithBody("<stdin>",false, code)); 
  }
  catch(e) {
    //otherwise throw errors and cry :'(
    $console.html('<span class="error">'+e.toString()+'</span>');
    //clear graphics

  }
}

var challenges = {
	"Hello Name":{
		"instructions": "Given a string name, e.g. \"Bob\", return a greeting of the form \"Hello Bob!\".",
		"methodName":"hello_name",
		"baseCode":"def hello_name(name):\n\t",
		"checkCases":["Avi","Chris"],
		"correctCode":"def hello_name(name):\n\treturn \"Hello \"+name+\"!\""
	}
};
