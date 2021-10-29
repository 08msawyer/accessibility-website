const questions = [
    {
        prompt: "What is the attribute for embedding a description in an image?",
        options: ["src", "class", "height", "alt", "data-atf", "data-frt"],
        correct: "alt"
    },
    {
        prompt: "Is making text bold a suitable way of distinguishing key information?",
        options: ["Yes", "No"],
        correct: "Yes"
    },
    {
        prompt: "How should you present numbered text?",
        options: ["A paragraph", "An ordered list", "An unordered list", "Alt text in an image", "A table"],
        correct: "An ordered list"
    },
    {
        prompt: "Is it better to specify the font of text using in-line style attributes or defining font for all of one element in a style sheet?",
        options: ["In-line style", "Style sheet"],
        correct: "Style sheet"
    },
    {
        prompt: "How does one specify the language of the website?",
        options: ["lang=\"en\"", "lang=\"eng\"", "lang=\"UTF-8\""],
        correct: "lang=\"en\""
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
    document.getElementById("quiz-content").innerHTML = `
        <h3>You scored ${score}/${questions.length}!</h3>
        <div id="feedback">
            <textarea placeholder="Have any feedback about our quiz?"></textarea>
            <br>
            <button class="btn-primary" onclick="submitFeedback()">Submit</button>
        </div>
    `
    document.getElementById("quiz-button").remove()
}

function submitFeedback() {
    console.log("You think we actually read this?")
    document.getElementById("feedback").innerHTML = `<h4>Thanks for your feedback!</h4>`
}

function checkAnswer() {
    let selected = document.querySelector('input[name="answer"]:checked')
    if (!selected) {
        alert("You must pick an option!")
        return false
    }

    if (selected.value === questions[currentQuestion].correct) {
        score++
        alert("Correct!")
    } else {
        alert("Incorrect!")
    }
    return true
}

function setQuizContent(question) {
    let options = ""
    for (let option of question.options) {
        options += `
        <input type="radio" value='${option}' name="answer" id='${option}'>
        <label for="${option}">${option}</label>
        <br>
        `
    }
    document.getElementById("quiz-content").innerHTML = `
        <h3>${question.prompt}</h3>
        <div id="questions">
            ${options}
        </div>
    `
}

function setButtonText(text) {
    document.getElementById("quiz-button").innerText = text
}