const quizQuestions = [
    {
        q: "Hány játékosra épül a Phasmophobia online kooperatív módja az oldal szerint?",
        options: ["2", "3", "4", "6"],
        answer: 2,
        explain: "A Játékról oldalon az szerepel, hogy négyfős online kooperatív pszichológiai horrorjáték."
    },
    {
        q: "Melyik NEM bizonyítéka a Spirit szellemnek ezen az oldalon?",
        options: ["EMF 5-ös szint", "Szellemírás", "Spirit Box", "DOTS projektor"],
        answer: 3,
        explain: "A Spiritnél EMF 5, Szellemírás és Spirit Box szerepel, DOTS projektor nem."
    },
    {
        q: "Melyik szellemhez tartozik az alábbi kombináció: Ujjlenyomat + Szellemgömb + DOTS projektor?",
        options: ["Banshee", "Demon", "Yurei", "Shade"],
        answer: 0,
        explain: "A Szellemek oldalon ez a bizonyíték-kombináció a Banshee-nél látható."
    },
    {
        q: "Mennyibe kerül a Spirit Box a felsorolt eszközök között?",
        options: ["$30", "$45", "$50", "$65"],
        answer: 2,
        explain: "Az Eszközök oldalon a Spirit Box ára $50."
    },
    {
        q: "Melyik eszköz NEM kezdő tárgy a felsorolt kártyák alapján?",
        options: ["Zseblámpa", "Hőmérő", "Spirit Box", "Feszület"],
        answer: 3,
        explain: "Az Eszközök oldalon a Feszületnél a 'Kezdő tárgy' mező értéke: Nem."
    },
    {
        q: "Melyik pálya kapta a 'Nagy pálya' jelölést?",
        options: ["Point Hope", "Prison", "Willow Street", "Camp Woodwind"],
        answer: 1,
        explain: "A Pályák oldalon a Prison nagy pályaként szerepel."
    },
    {
        q: "Melyik pálya leírása említi a függőleges pályadizájnt?",
        options: ["Ridgeview Court", "Bleasdale Farmhouse", "Point Hope", "Sunny Meadows"],
        answer: 2,
        explain: "A Point Hope kártyáján szerepel a függőleges pályadizájn."
    },
    {
        q: "Melyik pálya van 'Kis pálya' címkével ellátva?",
        options: ["Brownstone High School", "Maple Lodge Campsite", "Grafton Farmhouse", "Edgefield Road"],
        answer: 3,
        explain: "Az Edgefield Road kártyáján a 'Kis pálya' címke látható."
    },
    {
        q: "Melyik szellem leírásában szerepel, hogy a sötétség teremtménye?",
        options: ["Mare", "Oni", "Yokai", "Wraith"],
        answer: 0,
        explain: "A Mare leírása említi, hogy a sötétség teremtménye."
    },
    {
        q: "Mi a fő cél a Játékról oldalon leírt bevezető szerint?",
        options: [
            "Minél több szellem kiűzése egy éjszaka alatt",
            "Bizonyítékok gyűjtése és azok értékesítése egy szellemeltávolító csapatnak",
            "Minden pálya rekordidő alatt történő teljesítése",
            "Az összes felszerelés III. szintre fejlesztése"
        ],
        answer: 1,
        explain: "A bevezető szerint a csapat célja a bizonyítékgyűjtés és eladás."
    }
];

const form = document.getElementById('quiz-form');
const questionsWrap = document.getElementById('quiz-questions');
const resultSection = document.getElementById('quiz-result');
const scoreEl = document.getElementById('quiz-score');
const summaryEl = document.getElementById('quiz-summary');
const mistakesWrap = document.getElementById('quiz-mistakes-wrap');
const mistakesList = document.getElementById('quiz-mistakes');
const resetBtn = document.getElementById('reset-quiz');

function renderQuiz() {
    questionsWrap.innerHTML = '';

    quizQuestions.forEach((item, qIdx) => {
        const col = document.createElement('div');
        col.className = 'col-12';

        const card = document.createElement('article');
        card.className = 'quiz-question-card ms-5 me-5';
        card.dataset.question = String(qIdx);

        const title = document.createElement('h3');
        title.className = 'quiz-question-title';
        title.textContent = `${qIdx + 1}. ${item.q}`;
        card.appendChild(title);

        const options = document.createElement('div');
        options.className = 'quiz-options';

        item.options.forEach((opt, optIdx) => {
            const label = document.createElement('label');
            label.className = 'quiz-option';

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `q${qIdx}`;
            input.value = String(optIdx);

            const text = document.createElement('span');
            text.textContent = opt;

            label.appendChild(input);
            label.appendChild(text);
            options.appendChild(label);
        });

        const feedback = document.createElement('p');
        feedback.className = 'quiz-inline-feedback';
        feedback.hidden = true;

        card.appendChild(options);
        card.appendChild(feedback);
        col.appendChild(card);
        questionsWrap.appendChild(col);
    });
}

function getGradeLabel(percent) {
    if (percent === 100) return 'Tökéletes nyomozás.';
    if (percent >= 80) return 'Szép eredmény.';
    if (percent >= 60) return 'Jó alap, de vannak hibák.';
    if (percent >= 40) return 'Érdemes újra átnézni a témákat.';
    return 'Javasolt elolvasni az oldalon található információkat.';
}

function evaluateQuiz() {
    let correctCount = 0;
    const mistakes = [];

    quizQuestions.forEach((item, qIdx) => {
        const card = document.querySelector(`.quiz-question-card[data-question="${qIdx}"]`);
        const feedback = card.querySelector('.quiz-inline-feedback');
        const selected = form.querySelector(`input[name="q${qIdx}"]:checked`);

        card.classList.remove('is-correct', 'is-incorrect');
        feedback.hidden = true;
        feedback.textContent = '';

        if (!selected) {
            card.classList.add('is-incorrect');
            feedback.hidden = false;
            feedback.textContent = `Nincs válasz. Helyes: ${item.options[item.answer]}.`;
            mistakes.push({
                question: item.q,
                selected: 'Nincs válasz',
                correct: item.options[item.answer],
                explain: item.explain
            });
            return;
        }

        const selectedIdx = Number(selected.value);
        const isCorrect = selectedIdx === item.answer;

        if (isCorrect) {
            correctCount += 1;
            card.classList.add('is-correct');
            feedback.hidden = false;
            feedback.textContent = 'Helyes válasz.';
        } else {
            card.classList.add('is-incorrect');
            feedback.hidden = false;
            feedback.textContent = `Helytelen. Helyes: ${item.options[item.answer]}.`;
            mistakes.push({
                question: item.q,
                selected: item.options[selectedIdx],
                correct: item.options[item.answer],
                explain: item.explain
            });
        }
    });

    const total = quizQuestions.length;
    const percent = Math.round((correctCount / total) * 100);

    scoreEl.textContent = `Pontszam: ${correctCount}/${total} (${percent}%)`;
    summaryEl.textContent = getGradeLabel(percent);

    mistakesList.innerHTML = '';
    if (mistakes.length > 0) {
        mistakesWrap.hidden = false;
        mistakes.forEach((item) => {
            const li = document.createElement('li');
            li.className = 'quiz-mistake-item';
            li.innerHTML = `
                <p class="quiz-mistake-q"><strong>Kérdés:</strong> ${item.question}</p>
                <p><strong>A válaszod:</strong> ${item.selected}</p>
                <p><strong>Helyes válasz:</strong> ${item.correct}</p>
                <p class="quiz-mistake-explain"><strong>Magyarázat:</strong> ${item.explain}</p>
            `;
            mistakesList.appendChild(li);
        });
    } else {
        mistakesWrap.hidden = true;
    }

    resultSection.hidden = false;
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    evaluateQuiz();
});

resetBtn.addEventListener('click', () => {
    form.reset();
    resultSection.hidden = true;
    mistakesWrap.hidden = true;
    mistakesList.innerHTML = '';

    document.querySelectorAll('.quiz-question-card').forEach((card) => {
        card.classList.remove('is-correct', 'is-incorrect');
        const feedback = card.querySelector('.quiz-inline-feedback');
        feedback.hidden = true;
        feedback.textContent = '';
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
});

renderQuiz();
