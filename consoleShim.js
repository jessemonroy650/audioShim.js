    /* http://stackoverflow.com/questions/7042611/override-console-log-for-production */
    var myConsole = null;
    myConsole = document.getElementById("dbug_console");

    var console = {};
    var theArgs = "";
    // http://stackoverflow.com/questions/4116608/pass-unknown-number-of-arguments-into-javascript-function
    console.log = function() {
        theArgs = "";
        for (var i = 0; i < arguments.length; i++) {
             theArgs = theArgs + JSON.stringify(arguments[i]) + ',' ;
        }
        myConsole.innerHTML = theArgs + "\n" + myConsole.innerHTML;
    };
    window.console = console;
