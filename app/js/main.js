//document ready
$( document ).ready(function() {
    setRandomWord();
});

//timer items
var start = new Date;
var timer = setInterval(checkTime, 1000);

//get a random word
function setRandomWord(){
  $.getJSON( "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=100&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=7&maxLength=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5", function( data ) {
    var random;
    $.each( data, function( key, val ) {
      random = val;
    });
    getLengthRandom(random);
    splitWord(random);
  });
}

//get length of word
function getLengthRandom(word){
  var randomSize = word.length;
  $("#js-entry-holder").append("<input type='text' class='entry-field m-y-3' maxlength='"+randomSize+"' autofocus>");
  $(".entry-field").focus();
}

function clearEntryHolder(){
  $(".entry-field").remove();
}

//get all the letters from the word
function splitWord(word){
  var wordArray = word.split('');
  shuffleWord(wordArray);
}

//shuffle the word
function shuffleWord(wordArray){
  wordArray = wordArray.sort(function(){
    return 0.5 - Math.random()
  });
  var count = 0;
  $(wordArray).each(function(){
    var testWord = jQuery.inArray( " ", testWord );
    if (testWord != -1){
      restartGame();
    }else{
      $("#js-word-array-holder").append("<div id='js-letter-"+count+"'class='card letter-card'><div class='card-block'>"+this+"</div></div>");
      count++;
    }
  });
}

function removerLetterCards(){
  $(".letter-card").each(function(){
    $(this).remove();
  });
}

//check to see that input is using the right letters
$('#js-entry-holder').keyup(function(event) {
  var userInput = $(".entry-field").val();
  if(event.which == 13){
    clearActiveLetters();
    clearEntry();
    isRealWord(userInput);
  }else{
    //split user input into an array
    var userArray = userInput.split("");
    var userLength = userArray.length;
    var lastLetter = userArray[userLength-1];
    testWord = clearActiveLetters();
    checkLetters(userArray, testWord);
  }
});

//clear entry field
function clearEntry(){
  $(".entry-field").val("");
}

//check against acceptable letters
function checkLetters(userArray, testWord){
  $(userArray).each(function(){
    var letterCheck = this.toLowerCase();
    var testLetter = jQuery.inArray( letterCheck, testWord );
    if(testLetter != -1){
      var counter = 0;
      $(".letter-card").each( function(){
        target= $(this).text().toLowerCase();
        targetClass= $(this).hasClass("letter-card--selected");
        if (target == letterCheck && counter == 0 && targetClass == false){
          $(this).addClass("letter-card--selected");
          counter++;
        }
      });
      testWord.splice(testLetter,1);
      return testWord;
    }else{
      userArray.splice(testLetter,1);
      $(".entry-field").val(userArray.toString().replace(/,/g,""));
    }
  });
}


//check to see if the input is a real word
function isRealWord(tryWord){
  $.getJSON( "http://api.wordnik.com:80/v4/word.json/"+tryWord+"/definitions?limit=200&includeRelated=false&sourceDictionaries=webster&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5", function( data ) {
    var testResults = "lose";
    if ( data.length == 0 ) {
    }else{
      testResults = "win";
      wordListAdd(tryWord);
    }
  });
}
var wordList = [];
function wordListAdd(word){
  var deDup = jQuery.inArray(word, wordList);
  if(deDup == -1){
    wordList.push(word);
    $("#js-correct-words").append("<p class='words'>"+word+"</p>");
  }else{
  }
}
function clearWordList(){
  $(".words").each(function(){
    $(this).remove();
  });
}
//clear active letters & reset array to test against
function clearActiveLetters(){
  var testWord = []
  $(".letter-card").each( function(){
    $(this).removeClass("letter-card--selected");
    target= $(this).text();
    target = target.toLowerCase();
    testWord.push(target);
  });
  return testWord;
}

function checkTime() {
  var currentSeconds = Math.round((new Date - start) / 1000);
  var allowedSeconds = 90;
  var remainingTime = allowedSeconds - currentSeconds;
  if (remainingTime == 0 || remainingTime < 0){
    $('.final-timer').text("You are out of time!");
    clearInterval(timer);
    endOfGame();
    return;
  }else{
    $('.final-timer').html('Time Remaining: <span class="timer"></span>');
    $('.timer').text(remainingTime);
    if (remainingTime < 30){
      $('.timer').addClass("time-warning");
    }
  }
}

function endOfGame(){
  clearInterval(timer);
  hidePlayingField();
  showEnding();
  var correctWords = wordList.length; //set score
  $("#js-score").text("You guessed "+correctWords+" correct words!");
  $("#new-word").text("Play Again");
}

$("#new-word").click(function(){
  restartGame();
});

function restartGame(){
  $("#new-word").text("New Word");
  $('.timer').removeClass("time-warning");
  clearWordList();
  clearEntryHolder();
  removerLetterCards();
  hideEnding(); //hide ending stuff
  showPlayingField(); //show fields
  setRandomWord(); //get new random word & scramble it
  wordList=[]; //clear guess list
  start = new Date;
  timer = setInterval(checkTime, 1000);
}

function hideEnding(){
  $(".ending").each(function(){
    $(this).hide();
  });
}

function hidePlayingField(){
  $(".playing").each(function(){
    $(this).hide();
  });
}

function showEnding(){
  $(".ending").each(function(){
    $(this).show();
  });
}

function showPlayingField(){
  $(".playing").each(function(){
    $(this).show();
  });
}
