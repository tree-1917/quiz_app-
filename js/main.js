// Catch Element
let questionBox = document.querySelector('.question-box')
let question = document.querySelector('#ask')
let answers = document.querySelectorAll('.option li')
let moveForwardBtn = document.querySelector('#moveforward')
let moveBackBtn = document.querySelector('#moveback')
let endBtn = document.querySelector('#end')
let hour = document.getElementById('hour')
let min = document.getElementById('min')
let sec = document.getElementById('sec')
let testTime = '00:01:00'
// [1] Dummy Data
let questiones = [
    {
    'question':'what is Your Name ? ',
    'option' : 'Ali,Hassan,Ahmed,Ibrahim',
    'right': 'Hassan'
    },
    {
    'question':'what is Your age ? ',
    'option' : '10,15,18,20',
    'right': '15'
    },
    {
    'question':'what is Your countary ? ',
    'option' : 'Egypt,Iraq,France,England',
    'right': 'Iraq'
    },
    {
    'question':'what is Your Jop ? ',
    'option' : 'Front-End,Back-End,Full-stack,UI-UX',
    'right': 'Full-stack'
    },
    {
    'question':'what is Your School ? ',
    'option' : 'AMS,CIE,DON,NOD',
    'right': 'CIE'
    }
]
// [2] startpoint
let questionNumber = 0; 
let userAnswer = new Array(questiones.length)
function startQuiz(){
    // [1] Push Question To Apper For User
    makeq(questionNumber);
    // Make Timer Work
    // [1] initial Time
    let timeTest = testTime.split(':')
    hour.innerHTML = timeTest[0]
    min.innerHTML = timeTest[1]
    sec.innerHTML = timeTest[2]
}
startQuiz();

// Make Time Work 
const timer = setInterval(()=>{
if(sec.innerHTML === '00'){
    console.log('here')
    if(min.innerHTML === '00'){
        if(hour.innerHTML === '00'){
            console.log('hreeeee')
            clearInterval(timer)
            // Here call Function Which Make Simualtion Event On End Button
            endBtn.click();
        }else{
            // [1] make hour less one
            hour.innerHTML -=1;
            min.innerHTML =59;
        }
    }else{
        // [1] make min less one
        min.innerHTML -=1 ;
        sec.innerHTML = 59 ;
    }
}else {
    sec.innerHTML -= 1 ;
}
},1000)
// [1] Make Question

// <<<_>>>Try To Use DeSturcting
function makeq(questionNumber){
    // [1] Show Question For User
    question.innerHTML = questiones[questionNumber]['question']

    // [2] Show Option For User
    let option = questiones[questionNumber]['option'].split(',')
    for(let i = 0 ; i < option.length ; i++){
        // Push Them to User
        answers[i].innerHTML = option[i]
        // Remove All Active Form Them
        answers[i].classList.contains('active')? answers[i].classList.remove('active'): 0;
        // Add Active 
        if(userAnswer[questionNumber] !== undefined && userAnswer[questionNumber] === option[i]){
           answers[i].classList.add('active')
        }
    }
}

// [2] Move In Question 

function testMover(){
    // Move ForWard
    moveForwardBtn.addEventListener(('click'),(e) =>{
        //[1] Store And Update Data In UserAnswer
        //[2] Make New Question
        if(questionNumber < questiones.length-1){
            // console.log(questionNumber)
            makeq(++questionNumber)
            // Make Back Button Active For User
            if(moveBackBtn.classList.contains('un-active')){
                moveBackBtn.classList.remove('un-active')
            }
        }
        if(questionNumber === questiones.length-1){
            moveForwardBtn.classList.add('un-active')
        }
    })
    // Move BackWord
    moveBackBtn.addEventListener(('click'),(e)=>{
        if(questionNumber > 0){
            // console.log(questionNumber)
            // Make Question
            makeq(--questionNumber)
            // Make Forward Active
            if(moveForwardBtn.classList.contains('un-active')){
                moveForwardBtn.classList.remove('un-active')
            }
        }
        if(questionNumber === 0){
            // console.log('your are in first question')
            moveBackBtn.classList.add('un-active')
        }

    })
    // Update User Choose
    answers.forEach((e)=> e.addEventListener(('click'),(e) =>{
        // Store For Useranswer
        userAnswer[questionNumber] = e.target.innerHTML;
        // Mark it
        answers.forEach((a)=> (a.classList.contains('active'))? a.classList.remove('active') : 0)
        e.target.classList.add('active')
        // Test Point
        // console.log(userAnswer)
    }))
}
testMover();

// End Test 
endBtn.addEventListener('click',()=>{
    // Check For All Values To Find Result
    let userResult = 0;
    // Check For All Values For User
    userAnswer.forEach((e,index)=> {
        // console.log(questiones[index]['right'])
        // console.log(e)
        (e === questiones[index]['right'] )? ++userResult : 0
    })
    // console.log(userResult)
    // Stop Time
    clearInterval(timer)
    // Make End Message
    finalResult(userResult);
})

// Final Result Message
function finalResult(userResult){
    // console.log(userResult)
    let finalMsg = `Your Result Is ${userResult} Rate is ${userResult > questiones.length/2 ? 'Good':'Bad'}`
    questionBox.innerHTML = finalMsg
    let reviweBtn = document.createElement('button')
    reviweBtn.innerHTML = 'Reviwe'
    reviweBtn.classList.add('reviwe-btn');
    questionBox.appendChild(reviweBtn)
    console.log('here')
}
// Make Button To Make User Reviwe For All Question In Test To See The Right Value And Show Right For Him 
// And Make Becuase In bottom