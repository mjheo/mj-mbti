const main = document.querySelector("#main");
const qna = document.querySelector("#qna"); //const : 변수를 상수를 만들어 주는것 var랑은 좀 다름


function addAnswer(answerText, qIdx){
  var a = document.querySelector(".answerBox");
  var answer = document.createElement('button'); //버튼 만들기
  answer.classList.add("answerList")
  a.appendChild(answer); // answer은 a에 소속됨
  answer.innerHTML = answerText;
  answer.addEventListener("click", function(){
    var children = document.querySelectorAll(".answerList");
    for(let i = 0; i < children.length; i++){   //i++ : i가 증가하면서
      children[i].disabled = true;
      children[i].style.display = "none";
    }
    goNext(++qIdx);
  }, false);
}


function goNext(qIdx){
  var q = document.querySelector(".qBox");
  q.innerHTML = qnaList[qIdx].q;
  for(let i in qnaList[qIdx].a){
    addAnswer(qnaList[qIdx].a[i].answer, qIdx);
  }
}

function begin(){
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block";
    }, 450)
    let qIdx = 0; //여기에서 1씩 증가 하나봄
    goNext(qIdx);
  }, 450);
} // 이 함수가 qna 항목이 나오는거!
