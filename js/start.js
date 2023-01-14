const main = document.querySelector("#main");
const qna = document.querySelector("#qna"); //const : 변수를 상수를 만들어 주는것 var랑은 좀 다름
const result = document.querySelector("#result");
const select = [0,0,0,0,0,0,0,0,0,0,0,0];
const endPoint = 12

function calResult(){
  var result = select.indexOf(Math.max(...select)); //최대값 반환 | ... :전개구문 (선택한 배열 펼쳐!)
  return result;
}

function setResult(){
  let point = calResult();
  const resultName = document.querySelector('.resultName');
  resultName.innerHTML = infoList[point].name;

  var resultImg = document.createElement('img');
  const imgDiv = document.querySelector("#resultImg");
  var imgURL = "img/image-" + point + ".png";
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[point].desc;
}

function goResult(){
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block";
    }, 450)
  })
  console.log(select);
  setResult();
}

function addAnswer(answerText, qIdx, idx){
  var a = document.querySelector(".answerBox");
  var answer = document.createElement('button'); //버튼 만들기
  answer.classList.add("answerList");
  answer.classList.add("my-3");
  answer.classList.add("py-1");
  answer.classList.add("px-3");
  answer.classList.add("mx-auto");
  answer.classList.add("fadeIn");
  a.appendChild(answer); // answer은 a에 소속됨
  answer.innerHTML = answerText;
  answer.addEventListener("click", function(){                      // 사용자가 클릭하는 부분
    var children = document.querySelectorAll(".answerList");
    for(let i = 0; i < children.length; i++){                       //i++ : i가 증가하면서
      children[i].disabled = true;
      children[i].style.WebkitAnimation = "fadeOut 0.5s";
      children[i].style.animation = "fadeOut 0.5s";
    }
    setTimeout(() => {
      var target = qnaList[qIdx].a[idx].type;
      for(let i = 0; i < target.length; i++){
        select[target[i]] += 1;
      }
      for(let i = 0; i < children.length; i++){                      // i가 증가하는데, 증가하면서 총 길이보다는 적을때까지 반복
        children[i].style.display = 'none';
      }
      goNext(++qIdx);
    }, 450)                          // 950초 이후에 none으로 나타내기
  }, false);
}


function goNext(qIdx){                            // qIdx = 인덱스;
  if(qIdx === endPoint) {                       // qIdx의 값이 맨 마지막일때!
    goResult();
    return;
  }
  var q = document.querySelector(".qBox");
  q.innerHTML = qnaList[qIdx].q;
  for(let i in qnaList[qIdx].a){
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);          //i = 어떤 질문을 클릭 했는지
  }
  var status = document.querySelector(".statusBar");
  status.style.width = (100/endPoint) * (qIdx+1) + "%";
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
  const date = new Date();
  console.log(date);
} // 이 함수가 qna 항목이 나오는거!
