const questions = ['Question one',' Question two','Question three',' Question four', 'Question five' ];
const answers = ['b','c','a','b','a'];
const index = 0;

const images = document.getElementsByTagName('img');
const questionHeader = document.getElementById('question');

images[0].addEventListener('click', imageClicked);
images[1].addEventListener('click', imageClicked);
images[2].addEventListener('click', imageClicked);

setImages();
setQuestion();

function setImages(){
    images[0].src = './Images/Peli2/'+ (index+1) +'a.jpg';
    images[1].src = './Images/Peli2/'+ (index+1) +'b.jpg';
    images[2].src = './Images/Peli2/'+ (index+1) +'c.jpg';

}
function setQuestion(){
    questionHeader.textContent = questions[index];
}

function imageClicked(){

}
