
let correctAnswers = 0;
let problemCount = 0;
let startTime;

function startTimer() {
    startTime = Date.now();
}

function getTimeElapsed() {
    return (Date.now() - startTime) / 1000;
}

function generateProblem() {
    const num1 = Math.floor(Math.random() * 21);
    const num2 = Math.floor(Math.random() * (num1 + 1)); // Ensure answer is always an integer
    const operator = Math.random() < 0.5 ? '+' : '-';
    document.getElementById('problem').textContent = `${num1} ${operator} ${num2}`;
    document.getElementById('answer').value = ''; // Reset input field for new problem
    return { num1, num2, operator };
}

function checkAnswer() {
    const problem = document.getElementById('problem').textContent;
    const answer = parseInt(document.getElementById('answer').value);
    const [num1, operator, num2] = problem.split(' ');

    let correctAnswer;
    if (operator === '+') {
        correctAnswer = parseInt(num1) + parseInt(num2);
    } else {
        correctAnswer = parseInt(num1) - parseInt(num2);
    }

    if (answer === correctAnswer) {
        correctAnswers++;
        document.getElementById('result').textContent = 'よくできました！';
    } else {
        document.getElementById('result').textContent = 'ざんねん！もういちど';
    }

    problemCount++;
    if (problemCount < 10) {
        generateProblem();
    } else {
        const timeElapsed = getTimeElapsed();
        const rank = calculateRank(correctAnswers, timeElapsed);
        document.getElementById('score').textContent = `せいかい: ${correctAnswers} / 10`;
        document.getElementById('rank').textContent = `ランク: ${rank}`;
    }
}

function calculateRank(correctAnswers, timeElapsed) {
    if (correctAnswers >= 9 && timeElapsed < 60) {
        return 'すごい！';
    } else if (correctAnswers >= 7 && timeElapsed < 90) {
        return 'よくできました！';
    } else if (correctAnswers >= 5) {
        return 'がんばったね！';
    } else {
        return 'つぎはがんばろう！';
    }
}

window.onload = function() {
    startTimer();
    generateProblem();
};
