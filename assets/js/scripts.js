//Declare global variables 
var startButton = document.querySelector('.startButton');
var question = '';
var instructions = document.querySelector('.instructions');
var answerButton = document.querySelector('.answerButton');
var userChoice = document.querySelector('.userChoice');
var isCorrect = true; 
var counter = 75;
var index = 0;
var wins = 0;
var losses = 0;
var button;
var countDown;
var sliceIndex= 0;


document.querySelector('.header').style.display = 'inline-flex';

//This array contains the questions that will be on the quiz.
var questionArray = [
    'Commonly used data types DO NOT include:',
    'The condition in an if/else statement is enclosed within ____.',
    'Arrays in JavaScript can be used to store ____.',
    'String values must be enclosed within ____ when being assigned to variables.',
    'A very useful tool used during development and debugging for printing content to the debugger is:'
];

//This multidimensional array has all of the quiz answers which are used to create the answer buttons dynamically. Each outer array element contains an inner array that corresponds to the questionArray elements of the same index.
var answersArray = [
    ['strings', 'booleans', 'alerts', 'numbers'],
    ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
    ['commas', 'curly brackets', 'quotes', 'parentheses'],
    ['JavaScript', 'terminal/bash', 'for loops', 'console.log']
];

function countDownTimer(){
    document.querySelector('.header').style.display = 'inline-flex';
    timer = document.createElement('div');
    timer.setAttribute('id', 'timer');
    document.querySelector('.header').appendChild(timer);
    timer.innerHTML ='Time: ' + counter;
    document.querySelector('#timer').style.position = 'relative';
    document.querySelector('#timer').style.justifyContent = 'end';

     countDown = setInterval(function(){
        counter--;
        document.querySelector('#timer').textContent = 'Time: ' + counter;

        if(counter==0 || index>=answersArray.length){
            //call gameOver function
            clearInterval(countDown);
        }
    }, 1000)
}

       
function makeButtons(){
    //This line reads the inner array of the multidimensional array created above at [index]. It then slices the elements of the multidimensional array and casts them to a string. The string is then split into separate strings which are added to the answers array. A side note for anyone who may read this: This took me hours to figure out and originally had probably 30 lines of code. Now it's just one. Why use many lines when one line does trick?
    var answers = answersArray;
    answers= answers[index].slice(sliceIndex).toString().split(',');
    console.log(answers);
    //This for loop iterates through the answers array and for each element creates a List tag that's appended to the Ordered List tag in the HTML. It then creates a button which is appended to each List tag. The buttons are labeled with the corresponding elements from the answers array. 
    document.querySelector('ul').textContent ='';
    for(i=0; i<answers.length; i++){
        var listElement = document.createElement('li');
        listElement.setAttribute('id', 'listElement' + (i+1));
        var btn = document.createElement('BUTTON');
        btn.setAttribute('id', 'answerButton' + (i+1));
        document.querySelector('ul').appendChild(listElement);
        listElement.appendChild(btn);
        btn.innerHTML = (i+1) + ". " + answers[i];
        listElement.style.listStyleType = 'none';
        btn.style.textAlign = 'left';
    }
};    


//The questionPage() function dynamically creates pages that will have each question and the appropriate answer buttons. First it creates an Ordered List element which is appended onto the section tag in HTML. Then an index variable is declared and set to 0. This will be used for determining the index of the question and answerArray arrays created as global variables. It is also used as the terminating condition for the while loop at the end of the function.
async function questionPage(){
    //This block creates a div element in the section tag and renders the quiz question to the page.
    document.querySelector('.section').textContent='';
    question = questionArray[index];
    var temp = document.createElement('div');
    temp.setAttribute('id', 'quizQuestion');
    document.querySelector('.section').appendChild(temp);
    temp.textContent = question;
    
    //This block creates a second div element in the section tag and appends the unordered list tag to it.
    var listDiv = document.createElement('div');
    listDiv.setAttribute('class', 'listDiv');
    document.querySelector('.section').appendChild(listDiv);
    var unorderedListTag = document.createElement('ul');
    // unorderedListTag.setAttribute('id', 'unorderedList');
    console.log(document.querySelector('.listDiv'));
    listDiv.appendChild(unorderedListTag);
    
    //call the makeButtons function
    makeButtons();
    
    //This block creates an event listener that looks at all the generated buttons on the page and calls the checkAnswer function on click.
    button = document.querySelectorAll('button[id^=answerButton]')
    button.forEach(button => {
    button.addEventListener('click', checkAnswer);
    });
    
        
        console.log(index);
        console.log(questionArray[index]);
    
};

    
       
//This function checks the user's answer. It's called by the eventListener in the questionPage() function. The class .userChoice is added to the clicked button. This was cast to a global variable above. An if statement compares the index of the question array with the value of the userChoice button and if both are true an isCorrect boolean is set to true. If the && logic is false then isCorrect is set to false and 10 seconds are subtracted from the score.
function checkAnswer(event){
    // event.stopPropagation();
    // userChoice = event.currentTarget;
    userChoice = this.id;
    console.log(questionArray[index]);
    console.log(userChoice.textContent);
    console.log(index);
    console.log(this.id)
    
    if (
        ((index == 0) && (userChoice == "answerButton3")) ||
        (index == 1 && (userChoice == "answerButton3")) ||
        (index == 2 && (userChoice == "answerButton4")) ||
        (index == 3 && (userChoice == "answerButton3")) ||
        (index == 4 && (userChoice == "answerButton4"))){
        console.log(index == 0);
        console.log(index == 1);
        isCorrect = true;
        wins++;
        localStorage.setItem('wins', wins.valueOf());

    }
    else {
        isCorrect = false;
        counter = counter - 10;
        losses++;
        localStorage.setItem('losses', losses.valueOf());
    }
    console.log(isCorrect);
    if (index<answersArray.length){
        index++;
  
        clearPage();
        questionPage();
    }else {
        clearInterval(countDown);
    }
    
    };


//This function is used to start the quiz. It removes the start button and the instructions. It then calls the questionPage() function to generate the first page.
async function startQuiz(){
    startButton.remove();
    instructions.remove();
    document.querySelector('.nav').remove();
    questionPage();
    countDownTimer();
    

    // await checkAnswer();

    if(index == (questionArray.length - 1)){
        // index++;
        console.log(index);
        // clearPage();
        // questionPage(index);
        // countDownTimer();
        console.log(questionArray[index]);
        console.log('it looped');
        
    }else{
       
        console.log(index);
        //call gameOver function
       
    }
};

function finishQuiz(){

}

//This function clears the appended unordered list and it's children from the page to allow for the next page to render.
function clearPage(){
    var ulElement = document.querySelector("#unorderedList");
    if(ulElement != null){
        ulElement.remove();
    }

}

//The init is used to reset the page to it's original state on reload. Not sure if it's needed yet.
function init(){
    clearPage();
    document.body.appendChild('.startButton');
    document.body.firstChild.appendChild('.instructions');
}
//Event Listener to start quiz
startButton.addEventListener('click', startQuiz);
// startQuiz();
