/* When Search Icon is clicked,
Hide Icon, and display search bar */
$(".fa-search").on("click", function(){
  
  $(".fa-search").hide();
  $(".search-bar").hide().fadeIn(2000);
  $("#search-input").focus();
  
});

var currentInput; 

/* When "X" button in input is clicked*/
$(".fa-times").on("click", function(){
  
  currentInput = $("#search-input").val();
  
  if(currentInput == "") {
    $(".search-bar").hide();
    $(".fa-search").hide().fadeIn(1000);
  } else {
     $("#search-input").val("");
  }
  
});

function getWiki() {
  
  //Store innerHTML of emtpy "display-result" Div
  var displayResultDiv = document.getElementById("display-result").innerHTML;
  
  //Move header to top and hide random wiki button
  $(".aligner").css({
    "display": "block",
    "height": "auto",
    "margin": "0 auto",
    "margin-top": "20px",
  });
  $(".fa-question-circle").hide();
  $(".random-explanation").fadeIn();
  
  currentInput = $("#search-input").val();
  
  //if user types in "random" open a random wikipedia page
  if(currentInput === "random" || currentInput === "Random") {
    window.open(
  'https://en.wikipedia.org/wiki/Special:Random',
  '_blank' // <- This is what makes it open in a new window.
);
  }
  
//API Call to get page information based on the search input
$.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cinfo&titles=Main+Page&generator=search&exsentences=1&exlimit=15&exintro=1&exsectionformat=plain&gsrsearch=" + currentInput + "&gsrlimit=15&callback=?", function(data){
  
  //change the innerHTML of the div back to blank
  // (So it wont just keep appending result on top of each other)
  displayResultDiv = document.getElementById("display-result").innerHTML = "";
  
  // itterate through objects since the json response was not in an array
  Object.keys(data.query.pages).forEach(function(key) {
    
    pageId = data.query.pages[key].pageid;
    
    // Add link tag to all divs to their individual pages
    displayResultDiv += "<a href='https://en.wikipedia.org/?curid=" +pageId+ "' class='result-link' target='_blank'><div class='result'>";
    
    // Result Title
    displayResultDiv += "<h2>" +  data.query.pages[key].title + "</h2>";
    
    // Result Excert
    displayResultDiv += data.query.pages[key].extract;
    
    displayResultDiv += "</div></a>";
    
  });
  
  // Push stored variable (html content) into the Display-Result DIV
  $("#display-result").html(displayResultDiv);  
  
});
  
  
} // getWiki() bracket end

  // When "Enter" is pressed, run getWiki() 
  $('#search-input').keypress(function(e){
      if(e.keyCode==13){
        getWiki();
      }
    
});
