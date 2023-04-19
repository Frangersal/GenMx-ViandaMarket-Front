const question = document.querySelectorAll(".question");
const answer = document.querySelectorAll(".answer");
const arrow = document.querySelectorAll(".arrow");

for(let i=0; i < question.length; i++){

    question[i].addEventListener("click", () =>{
        answer[i].classList.toggle("answer-opened");
        arrow[i].classList.toggle("arrow-rotated");
    });

}