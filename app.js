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
						}
]

var hints = ["audio/0.mp3","audio/1.mp3","audio/2.mp3","audio/3.mp3","audio/4.mp3","audio/5.mp3"
];
//Start new game

$("#new_game").click(function () {
	loadWholeQuestion();
});

$("#next_question").click(function () {
	questionNumber++;
	score++;
	resetWholeQuestion();
	loadWholeQuestion();
	toggleLED();
});


$("#speaker_div").click(function () {
	playHint();
});

$("#choices_list ul li").click(function () {
	console.log($(this).parent("ul").index());	
	})
	
	
function loadWholeQuestion(){
	loadQuestion();
	loadChoices();
	loadHint();
	setScore();
	setQuestionNumber();
}

function resetWholeQuestion(){
	resetQuestion();
	resetChoices();	
}

function loadQuestion(){
	$(".lyrics").append(questions[questionNumber].q);
}

function resetQuestion(){
	$(".lyrics").empty();
}

function loadChoices(){
	for(i=0;i<questions[questionNumber].a.length; i++){
		$("#choices_list").append("<li class='choice'>"+questions[questionNumber].a[i]);	
	}

}

function resetChoices(){
	$("#choices_list").empty();
}

function loadHint(){
	$("#hint").attr("src","audio/"+questionNumber+".mp3");
}

function setQuestionNumber(){
	$("#question").html((questionNumber+1)+"/6");
}

function setScore(){
	$("#score").html(score+"/6");
}	

function toggleLED(){
	$("#lights div:nth-child("+questionNumber+")").removeClass("unanswered");
	$("#lights div:nth-child("+questionNumber+")").addClass("correct");
}
		
function playHint () {
	$("#hint")[0].volume = 0.5;
	$("#hint")[0].load();
	$("#hint")[0].play();
	} 
 
 });