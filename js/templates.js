// THIS FILE HANDLES TEMPLATE FUNCTIONALLITY
// 1. LOAD IN TEMPLATE BASED ON ID
  
$(function() {

	var template_keys = Object.keys(templates);

	var $templates = $("#templates");

	for (var i = 0; i < template_keys.length; i++) {
		$templates.append('<li>'+template_keys[i]+'</li>');
	}

	$("#templates li").click(function(event) {
		if (confirm(loadMessage)) {
			loadTemplate($(this).text());
		}
	});
	
});

function loadTemplate(t) {

	newFile();
	editor.setValue(templates[t],1);
}

var templates = {
	"Hello World":"print \"Hello World\"\nprint \"All Done\"",
	"House":"import turtle, math\r\n\r\nprint \"Yo, check out my home\"\r\n\r\nt = turtle.Turtle()\r\n\r\nbox_height = 150\r\nbox_width = 250\r\ndoor_width = 40\r\ndoor_height = 80\r\nroof_angle = 45\r\nwindow = 40\r\n\r\nt.penup()\r\nt.forward(box_width\/2)\r\nt.pendown()\r\n\r\nt.right(90)\r\nt.forward(box_height)\r\nt.right(90)\r\n#draw door\r\nt.forward(box_width\/2-door_width\/2)\r\nt.right(90)\r\nt.forward(door_height)\r\nt.left(90)\r\nt.forward(door_width)\r\nt.left(90)\r\n#doorknob\r\nt.forward(door_height\/2)\r\nt.left(90)\r\nt.penup()\r\nt.forward(door_width\/4)\r\nt.pendown()\r\nt.forward(1)\r\nt.penup()\r\nt.backward(door_width\/4+1)\r\nt.pendown()\r\nt.right(90)\r\n#finish door\r\nt.forward(door_height\/2)\r\n\r\n#draw floor\r\nt.right(90)\r\nt.backward(door_width)\r\nt.forward(door_width)\r\n\r\n\r\n#finish floor\r\nt.forward(box_width\/2-door_width\/2)\r\nt.right(90)\r\n#finish wall\r\nt.forward(box_height)\r\nt.right(90)\r\n#finish ceiling\r\nt.forward(box_width)\r\n\r\n#build triangle\r\nt.left(90+roof_angle)\r\nt.forward((box_width\/2)\/math.cos(math.radians(roof_angle)))\r\n\r\nt.left(90)\r\nt.forward((box_width\/2)\/math.cos(math.radians(roof_angle)))\r\n\r\n#first window\r\nt.penup()\r\n\r\nt.left(roof_angle)\r\nt.forward(box_height\/2)\r\nt.left(90)\r\nt.forward(box_width\/4-window)\r\n\r\nt.pendown()\r\nt.forward(window)\r\nt.right(90)\r\nt.forward(window)\r\nt.right(90)\r\nt.forward(window)\r\nt.right(90)\r\nt.forward(window)\r\n#draw hashes\r\nt.right(90)\r\nt.forward(window\/2)\r\nt.right(90)\r\nt.forward(window)\r\nt.right(90)\r\nt.forward(window\/2)\r\nt.right(90)\r\nt.forward(window\/2)\r\nt.right(90)\r\nt.forward(window)\r\n\r\n#second window\r\nt.penup()\r\n\r\nt.forward(box_width\/2)\r\nt.left(90)\r\nt.forward(window\/2)\r\nt.right(90)\r\n\r\nt.pendown()\r\nt.forward(window)\r\nt.right(90)\r\nt.forward(window)\r\nt.right(90)\r\nt.forward(window)\r\nt.right(90)\r\nt.forward(window)\r\n#draw hashes\r\nt.right(90)\r\nt.forward(window\/2)\r\nt.right(90)\r\nt.forward(window)\r\nt.right(90)\r\nt.forward(window\/2)\r\nt.right(90)\r\nt.forward(window\/2)\r\nt.right(90)\r\nt.forward(window)\r\n\r\n\r\n#clear out\r\nt.penup()\r\nt.forward(500)"
};
