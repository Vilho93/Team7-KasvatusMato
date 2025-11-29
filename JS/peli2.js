const questions = ['Taso1','Taso2','Taso3','Taso4', 'Taso5' ];
const answers = ['b','c','a','b','a'];
let index = 0;

const images = document.getElementsByTagName('img');
const questionHeader = document.getElementById('question');
const feedback = document.getElementById('feedback');

images[0].addEventListener('click', imageClicked);
images[1].addEventListener('click', imageClicked);
images[2].addEventListener('click', imageClicked);

setImages();
setQuestion();

function setImages(){
    images[0].src = './Images/Peli2/'+ (index+1) +'a.jpg';
    images[0].dataset.answer = 'a';
    images[1].src = './Images/Peli2/'+ (index+1) +'b.jpg';
    images[1].dataset.answer = 'b';
    images[2].src = './Images/Peli2/'+ (index+1) +'c.jpg';
    images[2].dataset.answer = 'c';

}
function setQuestion(){
    questionHeader.textContent = questions[index];
    feedback.textContent = ''; // tyhjennetään palaute uuden kysymyksen alussa
}

function imageClicked(event){
    
    if(event.currentTarget.dataset.answer === answers[index]){
        feedback.textContent = 'Oikea vastaus!';
        feedback.style.color = 'green';
    } else {
        feedback.textContent = 'Väärä vastaus!';
        feedback.style.color = 'red';
    }
    setTimeout(() => {
        index++;
        if(index < questions.length){
            setImages();
            setQuestion();
        } else {
            feedback.textContent = 'Peli loppui!';
            feedback.style.color = 'blue';
        }
    } , 3000);
}

