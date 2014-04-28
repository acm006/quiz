$(document).ready(function(){

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

/*--------gameplay variables-------*/
var questionNumber = 0;
var score = 0;

//q-> question, a->answer choices, c->correct answer	
var questions = [ 
						{q: "<p>If they ask about Charlemange,</p><p>Be polite, say something vague</p>",
						 a: ["Killer Parties", "Barely Breathing", "One For The Cutters", "We Can Get Together"],
						 c: 0						
						},
						{q: "<p>She put $900</p><p>One the fifth horse in the sixth race</p>",
						 a: ["Don't Let Me Explode", "Sequestered in Memphis", "Spinners", "Chips Ahoy!"],
						 c: 3						
						},
						{q: "<p>They didn't name her for a saint,</p><p>They named her for a storm</p>",
						 a: ["Yeah Sapphire", "Navy Sheets", "Hot Soft Light", "Hurricane J"],
						 c: 3
						},
						{q: "<p>Raise a toast to St. Joe Strummer!</p>",
						 a: ["Both Crosses", "Chillout Tent", "Constructive Summer", "Stevie Nix"],
						 c: 2
						},
						{q: "<p>Tiny little text etched into her neck it said</p><p>\"Jesus lived and died for all your sins\"</p>",
						 a: ["Your Little Hoodrat Friend", "Sketchy Metal", "Massive Night", "First Night"],
						 c: 0
						},
						{q: "She said, \"The theme of this party</p><p>is the Industrial Age</p><p>You came in dressed like a train wreck.\"</p>",
						 a: ["Sweet Payne", "The Weekenders", "Knuckles", "Banging Camp"],
						 c: 1
						}
]

//file location for audio hints
var hints = ["audio/0.mp3","audio/1.mp3","audio/2.mp3","audio/3.mp3","audio/4.mp3","audio/5.mp3"
];

//Start new game on "New Game" click. Adapt to use on front page.
$("#new_game").click(function () {
	questionNumber = 0;
	score = 0;
	resetWholeQuestion();
	resetLED();
	loadWholeQuestion();
});

//Advance to next button on button click.  Adapt to function on choice submit
$("#next_question").click(function () {
	resetWholeQuestion();
	loadWholeQuestion();
	toggleLEDWrong();
});

//play audio hint
$("#speaker_div").click(function () {
	playHint();
});

//testing choice input and comparing to correct answer
$("#choices_list").on("click", ".choice", function () {
	var choice = $(this).index();
	var answer = questions[questionNumber].c;
	if(choice===answer){
		correctAnswer();
	}
	else{
		wrongAnswer(answer);
	}
	resetWholeQuestion();
	loadWholeQuestion()
}); //Get index of answer clicked for comparisons
	
//loads question, choices, audio hint. updates score & question number (-->move to choices function)	
function loadWholeQuestion(){
	loadQuestion();
	loadChoices();
	loadHint();
	showQuestionNumber();
}

//clears question and answers
function resetWholeQuestion(){
	resetQuestion();
	resetChoices();	
}

//loads question lyrics in top div
function loadQuestion(){
	$(".lyrics").append(questions[questionNumber].q);
}

//clears top question div, ready for new question
function resetQuestion(){
	$(".lyrics").empty();
}

//loads four choices for answers
function loadChoices(){
	for(i=0;i<questions[questionNumber].a.length; i++){
		$("#choices_list").append("<li class='choice'>"+questions[questionNumber].a[i]);	
	}
}

//clears four choices for answers, ready for new question
function resetChoices(){
	$("#choices_list").empty();
}

//loads appropriate audio cue for corresponding question number.
function loadHint(){
	$("#hint").attr("src","audio/"+questionNumber+".mp3");
}

//updates question counter in left div
function showQuestionNumber(){
	$("#question").html((questionNumber+1)+"/6");
}

//updates score in right div
function showScore(){
	$("#score").html(score+"/6");
}	

//update variables for correct answer
function correctAnswer(){
	score++;
	questionNumber++;	
	toggleLEDCorrect();
	showScore();
}

function wrongAnswer(answer){
	alert("The correct answer is "+questions[questionNumber].a[answer]); //alerts correct answer.  Adapt to div that fades in and out
	questionNumber++;
	toggleLEDWrong();
	showScore();
}

//sets LED as correct for correct answers
function toggleLEDCorrect(){
	$("#lights div:nth-child("+questionNumber+")").removeClass("unanswered");
	$("#lights div:nth-child("+questionNumber+")").addClass("correct");
}

//sets LED as wrong for incorrect answers.
function toggleLEDWrong(){
	$("#lights div:nth-child("+questionNumber+")").removeClass("unanswered");
	$("#lights div:nth-child("+questionNumber+")").addClass("wrong");
}

//Puts all LEDs to gray unnaswered
function resetLED(){
	$("#lights div").removeClass("wrong");
	$("#lights div").removeClass("correct");
	$("#lights div").addClass("unanswered");
}
	
//plays audio hint	
function playHint () {
	$("#hint")[0].volume = 0.5;
	$("#hint")[0].load();
	$("#hint")[0].play();
	} 
 
});