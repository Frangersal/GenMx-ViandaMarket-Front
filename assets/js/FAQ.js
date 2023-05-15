const question = document.querySelectorAll(".question");
const answer = document.querySelectorAll(".answer");
const arrow = document.querySelectorAll(".arrow");
console.log(question);
for(let i=0; i < question.length; i++){

    question[i].addEventListener("click", () =>{
        console.log(question);
        answer[i].classList.toggle("answer-opened");
        arrow[i].classList.toggle("arrow-rotated");
    });

}


