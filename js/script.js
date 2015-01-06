// THIS FILE HANDLES ALL BASIC FUNCTIONALLITY
// 1. CODE EDITOR
// 2. RUNNING CODE
// 3. SETTING/MAINTAINING UI

//variables
$console = $("#console");
$graphics = $("#graphics");
editor = null;


$(function() {


  //setup
  config(); 


  //**********EVENTS**********//

  //run code on click
  $("#run-code").click(function(event) {
    run();
  });


  //accordion
  $("button.accordion").click(function(event) {
    var $next = $(this).next('section.accordion');
    $('section.accordion').not($next).slideUp('200');
    $next.slideDown('200');
  });

  //on resize
  $(document).resize(function(event) {
    size();
  });


  //**********METHODS**********//  
  
  //this method is referenced when the code is run. it determines what happens with the output
  function outf(text) { 
      $console.append(text);
  } 

  //no idea what this does, but it seems important :)
  function builtinRead(x) {
      if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
              throw "File not found: '" + x + "'";
      return Sk.builtinFiles["files"][x];
  }

  //this sets up all the sizing for the ui that could not be handled with css
  function size() {
    //set up ui
    $("#container").css('padding-top', $("#controls").outerHeight()+"px");

    $graphicsContainer = $("#graphics-container");
    $graphics.attr("height", $graphicsContainer.height());
    $graphics.attr("width", $graphicsContainer.width());

    //logo
    var $logo = $("#logo");
    var $controls = $("#controls");
    $logo.css({
      lineHeight: $controls.outerHeight()+"px"
    });

    $controls.children('#runners').css('margin-left', $logo.outerWidth());
  }

  //this is a function that is called one time to set up the editor and compiler
  function config() {
    
    size();

    //define the cavas and console
    Sk.canvas = "graphics";
    Sk.pre = "console";

    //set up editor
    editor = ace.edit("code");
    editor.setTheme('ace/theme/dreamweaver');
    editor.setShowPrintMargin(false);
    editor.getSession().setMode("ace/mode/python");
    editor.getSession().setUseWrapMode(true);
  }

  //this runs the code
  function run() {

    // get the code
    var code = editor.getValue(); 

    //reset the console
    $console.html("");
    
    try {
      //configure for output
      Sk.configure({output:outf, read:builtinRead});
      
      //do the stuff
      eval(Sk.importMainWithBody("<stdin>",false, code)); 
    }
    catch(e) {
      //otherwise throw errors and cry :'(
      $console.html('<span class="error">'+e.toString()+'</span>');
      //clear graphics

    }
  }

});



function message(text) {
  $("#message").text(text);
}