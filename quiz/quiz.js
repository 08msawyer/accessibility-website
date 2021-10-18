const questions = [
    {
        prompt: "What is your favourite colour?",
        options: ["Red", "Blue", "Green", "Yellow"],
        correct: "Blue"
    },
    {
        prompt: "What is your favourite animal?",
        options: ["Tiger", "Lion", "Frog", "Possum"],
        correct: "Frog"
    }
]

let started = false

let currentQuestion = 0

let score = 0

function buttonClick() {
    if (currentQuestion >= questions.length) return
    if (!started) {
        started = true
        setButtonText("Next")
    } else {
        if (!checkAnswer()) return
        currentQuestion++
        if (currentQuestion === questions.length - 1) {
            setButtonText("Finish")
        }
    }
    if (currentQuestion >= questions.length) {
        handleDone()
        return
    }

    let question = questions[currentQuestion]
    setQuizContent(question)
}

function handleDone() {
    document.getElementById("quiz-content").innerHTML = `<h3>You scored ${score}/${questions.length}!</h3>`
    document.getElementById("quiz-button").remove()
}

function checkAnswer() {
    let selected = document.querySelector('input[name="answer"]:checked')
    if (!selected) {
        alert("You must pick an option!")
        return false
    }

    if (selected.value === questions[currentQuestion].correct) {
        score++
        console.log("Correct!")
    } else {
        console.log("Incorrect!")
    }
    return true
}

function setQuizContent(question) {
    document.getElementById("quiz-content").innerHTML = `
        <h3>${question.prompt}</h3>
        <div id="questions">
            ${question.options.map(it => `
             <input type="radio" value="${it}" name="answer" id="${it}">
             <label for="${it}">${it}</label>
             <br>
            `).join('')}
        </div>
    `
}

function setButtonText(text) {
    document.getElementById("quiz-button").innerText = text
}