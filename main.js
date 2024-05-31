let questioncount = document.getElementById("questioncount");
let next = document.getElementById("choose");
let ready = document.getElementById("ready");
let question = document.getElementById("content");
let frameAnswer = document.getElementById("frameAnswer");
let element = document.getElementsByClassName("scorelist");
let answers = document.getElementsByClassName("left-align-button");
let trueNofilication = document.getElementById("sm-nonfilication");
var welcomeAudio = document.getElementById("backgroundAudio");
var nextAudio = document.getElementById("nextAudio");
var next1Audio = document.getElementById("next1Audio");

function playAudio(x) {
    x.play();
}

function pauseAudio(x) {
    x.pause();
}

next.onclick = () => {
    playAudio(nextAudio);
    runscore();
    next.setAttribute("disabled", "disabled")
}

function startGame() {
    playAudio(welcomeAudio);
    hide();
}

function hide() {
    document.getElementById("start").classList.add("d-none");
    document.getElementById("player").classList.remove("d-none");
}

function runscore() {
    question.innerText = "Có tất cả  15  câu hỏi trong chương trình ai là triệu phú";
    let i = 14;
    let r = setInterval(() => {
        if (i > -1) {
            element[i].classList.add("score-active");
        }
        if (i < 14)
            element[i + 1].classList.remove("score-active");
        i--;
        if (i < -1) {
            clearInterval(r);
        }
    }, 120);
    setTimeout(() => {

        question.innerText = "Trong đó có 3 mốc rất quan trọng đó là 5,10 và 15";
        let moc = document.getElementsByClassName("scorelist");
        let i = 10;
        let itv = setInterval(() => {

            moc[i].classList.add("score-active");
            if (i < 10) {
                moc[i + 5].classList.remove("score-active");
            }
            i -= 5;

            if (i < 0) {
                setTimeout(() => {
                    moc[0].classList.remove("score-active");
                }, 500)
                clearInterval(itv);
                //
            }
        }, 1000)
    }, 3000)
    setTimeout(() => {
        question.innerText = "Và bạn có 3 quyền trợ giúp là 50:50, gọi điện thoại cho người thân và hỏi ý kiến khán giả trong trường quay.Bạn đã sẵn sàng chưa?";
        let s1 = document.getElementsByClassName("s1");
        let i = 0;
        let support = setInterval(() => {
            s1[i].classList.add("active");
            if (i > 0) {
                s1[i - 1].classList.remove("active");
            }
            setTimeout(() => {
                s1[2].classList.remove("active");
            }, 2000)
            if (i == 2) {
                next.parentElement.classList.add("d-none");
                ready.parentElement.classList.remove("d-none");
                clearInterval(support);
            }
            i++;
        }, 700)

    }, 7800)
}

ready.onclick = () => {
    playAudio(next1Audio);
    question.innerText = " ";
    ready.setAttribute("disabled", "disabled");
    setTimeout(() => {
        ready.parentElement.classList.add("d-none");
        frameAnswer.classList.remove("d-none");
        questioncount.classList.remove("d-none");
        readData();
    }, 1000);
}
let data1 = data.slice();
let count = 0;
let answerCheck = null;

function readData() {
    let countList = 14;
    element[countList - count].classList.add("score-active");
    element[countList - count + 1].classList.remove("score-active");
    count++;
    let randomIndex = Math.floor(Math.random() * data1.length);
    question.innerText = data1[randomIndex].question;
    questioncount.children[0].innerText = count;
    for (let i = 0; i < frameAnswer.children.length; i++) {
        frameAnswer.children[i].children[0].innerText = data1[randomIndex].answer[i];
    }
    answerCheck = data1[randomIndex].check;
    data1.splice(randomIndex, 1);
    deathTime();
    for (let i = 0; i < answers.length; i++) {
        answers[i].classList.remove("chooseanswer");
        answers[i].removeAttribute("disabled");
        answers[i].classList.remove("invisible");
    }
    // console.log(data);
}
function checkAnswer(obj) {
    for (let i = 0; i < answers.length; i++) {
        answers[i].setAttribute("disabled", "disabled");
    }
    obj.classList.add("chooseanswer");
    setTimeout(() => {
        if (obj.value == answerCheck) {
            showNofilication(obj.value + " là câu trả lời đúng, xin chúc mừng");

        } else {
            defeat("Thua cuộc");
            alert(answerCheck+" mới là câu trả lời đúng, rất tiếc khi phải nói lời tạm biệt tại đây. Chúc bạn gặp nhiều thành công trong cuộc sống");
        }
    }, 1000)
    // alert(obj.value);
    // alert(answerCheck);
}

let clock = document.getElementById("clock");
let isDeathTimeRunning = false;
let deathTimeInterval;
function deathTime() {
    if (isDeathTimeRunning) {
        clearInterval(deathTimeInterval);
    }
    let time = 30;
    deathTimeInterval = setInterval(() => {
        if (time == 0) {
            clearInterval(deathTimeInterval);
            isDeathTimeRunning = false;
            defeat("Thua cuộc");
        }
        clock.innerHTML = time;
        time--;
    }, 1000);

    isDeathTimeRunning = true;
}

let nofilication = document.getElementById("nofilication");

function defeat(str) {
    for (let i = 0; i < answers.length; i++) {
        answers[i].setAttribute("disabled", "disabled");
    }
    nofilication.innerText = str;
    nofilication.classList.remove("d-none");
}

function showNofilication(message) {
    trueNofilication.classList.remove("d-none");
    trueNofilication.innerText = message;
    setTimeout(() => {
        trueNofilication.classList.add("d-none");
        readData();
    }, 1500)
}

function deleteTwoAnswer(obj) {
    obj.setAttribute("disabled", "disabled");
    obj.classList.add("bg-danger");
    let index = 0;
    for (let i = 0; i < answers.length; i++) {
        if (answers[i].value != answerCheck) {
            index++;
            answers[i].classList.add("invisible");
            if (index == 2) {
                break;
            }

        }
    }
//
}

function showAnswer(obj) {
    obj.setAttribute("disabled", "disabled");
    obj.classList.add("bg-danger");
    trueNofilication.classList.remove("d-none");
    trueNofilication.innerText = "Lionel messi:Tôi chắc chắn là phương án " + answerCheck;
    setTimeout(() => {
        trueNofilication.classList.add("d-none");
    }, 1500)
}

function ask(obj) {
    obj.setAttribute("disabled", "disabled");
    obj.classList.add("bg-danger");
    let a = generateRandomNumber(70);
    let b = generateRandomNumber(70 - a);
    let c = generateRandomNumber(70 - a - b);
    let d = 70 - a - b - c;
    switch (answerCheck) {
        case  "A":
            a += 30;
            break;
        case  "B":
            b += 30;
            break;
        case  "C":
            c += 30;
            break;
        case  "D":
            d += 30;
            break;
    }
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
}

function generateRandomNumber(num) {
    return Math.floor(Math.random() * num + 1);
}