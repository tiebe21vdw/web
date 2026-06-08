const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const imageContainer = document.getElementById('image-container');
const quizImage = document.getElementById('quiz-image');
const fillInContainer = document.getElementById('fill-in-container');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-btn');
const feedbackContainer = document.getElementById('feedback-container');
const correctAnswerDisplay = document.getElementById('correct-answer-display');
const autoCheckMsg = document.getElementById('auto-check-msg');
const correctButton = document.getElementById('correct-btn');
const wrongButton = document.getElementById('wrong-btn');
const answerArea = document.getElementById('answer-area');
const nextButton = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');
const scoreText = document.getElementById('score-text');
const menuContainer = document.getElementById('menu-container');
const quizContent = document.getElementById('quiz-content');

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

const quizData = {
    'H3': [
        {
            type: 'open',
            question: 'Wat is de Overschoot day?',
            answer: 'Dat is de dag waarop we alle grondstoffen die de aarde per jaar geproduceerd heeft hebben opgebruikt.'
        },
        {
            type: 'open',
            question: 'In 2022 viel deze dag op 29 juli. Zou het beter zijn dat deze dag eerder op het jaar zou vallen? \nWaarom wel/niet?',
            answer: 'Nee, als deze dag eerder valt dan betekent dat wij sneller de jaarproductie aan grondstoffen van de aarde hebben opgebruikt. Overshoot day zou later moeten vallen.'
        },
        {
            type: 'multiple-choice',
            question: 'Lineaire economie is het ... principe.',
            answers: [
                { text: 'take-make-waste', correct: true },
                { text: 'cradle-to-cradle', correct: false }
            ]
        },
        {
            type: 'open',
            question: 'Wat zijn fossiele brandstoffen? \nGeef minimaal twee voorbeelden van fossiele brandstoffen.',
            answer: 'Fossiele brandstoffen zijn koolwaterstoffen die ontstaan zijn uit de resten van planten en dieren. \nVoorbeelden: steenkool, aardolie en aardgas'
        },
        {
            type: 'open',
            question: 'Geef twee nadelen van het gebruik van fossiele brandstoffen.',
            answer: 'Ze zijn beperkt voorradig en hernieuwen slechts na miljoenen jaren. \nZe stoten CO2 (broeikasgas) uit.'
        },
        {
            type: 'open',
            question: 'Waarom is een totale overschakeling naar enkel wind- en zonne-energie geen goed alternatief?',
            answer: 'Deze energiebronnen zijn niet altijd voorradig. \nAls er geen zon is, heb je geen zonne-energie.\nAls er geen wind is, heb je geen windenergie.'
        },
        {
            type: 'open',
            question: 'Leg het verschil tussen groen en grijs waterstofgas uitvoerig uit.',
            answer: 'Grijze waterstof wordt gewonnen uit fossiele brandstoffen. \nHierbij komt CO2 in de atmosfeer terecht. Dit soort waterstof is het minst duurzaam. \nGroene waterstof wordt geproduceerd door elektrolyse van water. \nDit is een duurzamere manier om waterstofgas te produceren op basis van water en groene elektriciteit.'
        },
        {
            type: 'open',
            question: 'Wat is urban-mining en geef een synoniem.',
            answer: 'Het principe dat wordt besproken is het terugwinnen van grondstoffen uit oude gebouwen, schroot en andere afgedankte producten. \nSynoniem: Stedelijk mijnen / mijnen uit de stad.'
        },
        {
            type: 'fill-in',
            question: 'Bekijk de afbeelding en vul de juiste term aan bij de juiste letter',
            image: 'img/b4e29bf055d18dd7_S_233_400.4fed128b69473e0462e83e688414db4a.png',
            blanks: [
                { label: 'A', answer: 'Lineare economie' },
                { label: 'B', answer: 'circulaire economie' },
                { label: 'C', answer: 'duurzame keteneconomie met recyclage' },
                { label: 'D', answer: 'keteneconomie met recyclage' }
            ]
        }
    ],
    'H4': [
        {
            type: 'fill-in',
            question: 'Geef aan om welk type botsing het gaat in onderstaande afbeeldingen.',
            image: 'img/b4e29bf055d18dd7_S_588_363.37d1f618452e2be2adb77594a88f4fb7.png',
            blanks: [
                { label: '1', answer: 'Elastische botsing' },
                { label: '2', answer: 'Effectieve botsing' },
            ]
        },
        {
            type: 'fill-in',
            question: 'Geef aan wat in de invulvakken hoort, kies uit: Geactiveerd complex, Losse of vrije atomen, Exo-energetische, Endo-energetische.',
            image: 'img/b4e29bf055d18dd7_S_466_400.6201119d66e89175b2aee018bbf4551f.png',
            blanks: [
                { label: 'Groene cirkel', answer: 'Losse of vrije atomen' },
                { label: 'Paarse cirkel', answer: 'Geactiveerd complex' },
                { label: 'De afbeelding geeft een ... reactie weer.', answer: 'Exo-energetisch' },
            ]
        },
        {
            type: 'fill-in',
            question: 'Gegeven is de reactie: 2 NO + Cl2 --> 2 NOCl ΔE=−38kJΔE=−38kJ.De activeringsenergie van deze reactie bedraagt 62 kJ.',
            blanks: [
                { label: 'De gegeven reactie is een ... reactie.', answer: 'exotherme' },
                { label: 'De activeringsenergie van de omgekeerde reactie bedraagt ...', answer: '100kJ' },
            ]
        },
        {
            type: 'open',
            question: 'Wanneer spreekt men volgens het botsingsmodel van een effectieve botsing?',
            answer: 'Als de deeltjes met elkaar in contact komen, voldoende kinetische energie bezitten én de juiste oriëntatie hebben.'
        },
        {
            type: 'open',
            question: 'Wat ontstaat er direct door de opslorping van kinetische energie bij een effectieve botsing? ',
            answer: 'Een geactiveerd complex (een onstabiele tussenfase met een hogere energie-inhoud).'
        },
        {
            type: 'open',
            question: 'De activeringsenergie van de reactie 2NO(g) + Cl2(g) -> 2NOCl(g) is 62kJ en bE = -38kJ. Wat is de activeringsenergie van de omgekeerde reactie? ',
            answer: '100kJ'

        },
        {
            type: 'open',
            question: 'Wat gebeurt er in de regel met de ogenblikkelijke reactiesnelheid naarmate een chemische reactie vordert?',
            answer: 'Deze neemt bijna altijd af, omdat er steeds minder deeltjes overblijven om effectief mee te botsen. '
        },
        {
            type: 'open',
            question: 'In welke eenheid wordt de (gemiddelde of ogenblikkelijke) reactiesnelheid uitgedrukt? ',
            answers: 'mol . L-1 . s-1 '
        },
        {
            type: 'open',
            question: 'Wat laat een Boltzmann-verdeling simpelweg zien in een gas of vloeistof? ',
            answer: 'Hoe de snelheid (of kinetische energie) verdeeld is over de deeltjes. '
        },
        {
            type: 'open',
            question: 'Waarom zorgt een temperatuurverhoging voor een stijging van de reactiesnelheid? ',
            answer: 'De deeltjes krijgen een hogere kinetische energie en de kans op effectieve botsingen stijgt.'
        },
        {
            type: 'open',
            question: 'Wat is de invloed van de verdelingsgraad op de reactiesnelheid (bijv. fijn gekliefd aanmaakhout)?',
            answer: 'Hoe fijner verdeeld, hoe groter de verhouding contactoppervlak/volume, wat de reactie versnelt.'
        },
        {
            type: 'open',
            question: 'Hoe beïnvloedt een katalysator een chemische reactie?',
            answer: 'Het verlaagt de activeringsenergie door een ander geactiveerd complex te vormen, zonder zelf verbruikt te worden. '
        },
        {
            type: 'open',
            question: 'Een klontje suiker blijft op tafel weken liggen, maar wordt in het lichaam van een hond meteen verbrand. Wat is de verklaring? ',
            answer: 'Enzymen in het lichaam werken als katalysatoren en verlagen de activeringsenergie. '
        }
    ],
    'H5': [
        {
            type: 'open',
            question: 'Wat is het belangrijkste verschil tussen massa en gewicht?',
            answer: 'Massa is de hoeveelheid materie (in kg) en is overal gelijk, terwijl gewicht de kracht is waarmee een voorwerp op een steun drukt (in N) en afhangt van de zwaartekracht.'
        },
        {
            type: 'open',
            question: 'Welke wet van Newton stelt dat een voorwerp in rust blijft of met constante snelheid rechtlijnig blijft bewegen als de som van de krachten nul is?',
            answer: 'De eerste wet van Newton (Wet van de traagheid / inertie).'
        },
        {
            type: 'open',
            question: 'Volgens de tweede wet van Newton (F_res = m . a), wat gebeurt er met de versnelling (a) als je de resulterende kracht op een constante massa verdubbelt?',
            answer: 'De versnelling wordt twee keer zo groot.'
        },
        {
            type: 'open',
            question: 'Als een boek op een tafel ligt en er een zwaartekracht op werkt, wat is dan de tegenkracht (reactiekracht) volgens de derde wet van Newton (actie-reactie)?',
            answer: 'De normaalkracht die de tafel op het boek uitoefent.'
        },
        {
            type: 'open',
            question: 'Wat gebeurt er met de remweg van een voertuig als de beginsnelheid verdubbelt (bij gelijkblijvende remkracht)?',
            answer: 'De remweg wordt vier keer zo lang, omdat de kinetische energie kwadratisch afhangt van de snelheid.'

        }
    ],
    'H6': [
        {
            type: 'open',
            question: 'Wat is de definitie van de amplitude (A) bij een harmonische trilling?',
            answer: 'De maximale uitwijking van het trillende voorwerp ten opzichte van de evenwichtsstand.'
        },
        {
            type: 'open',
            question: 'Hoe verhouden de frequentie (f in Hz) en de periode (T in s) van een trilling zich tot elkaar?',
            answer: 'Ze zijn omgekeerd evenredig met elkaar (f = 1 / T).'
        },
        {
            type: 'open',
            question: 'Wat is het kenmerkende verschil tussen een transversale golf en een longitudinale golf?',
            answer: 'Bij een transversale golf trillen deeltjes loodrecht op de voortplantingsrichting; bij een longitudinale golf trillen ze parallel aan de voortplantingsrichting.'
        },
        {
            type: 'open',
            question: 'Als de golflengte (lambda) van een golf halveert terwijl de voortplantingssnelheid (v) constant blijft, wat gebeurt er dan met de frequentie (f)?',
            answer: 'De frequentie verdubbelt (v = f . lambda).'

        },
        {
            type: 'open',
            question: 'Wat gebeurt er wanneer twee golftoppen elkaar ontmoeten en er constructieve interferentie optreedt?',
            answer: 'De amplitudes versterken elkaar, waardoor een tijdelijk grotere top ontstaat.'
        }
    ]
};

// Helper functie om een array willekeurig te husselen
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function selectChapter(chapter) {
    if (chapter === 'ALL') {
        // Combineer alle vragen van alle hoofdstukken in één lijst
        questions = Object.values(quizData).flat();
    } else {
        questions = [...quizData[chapter]]; // Maak een kopie van de hoofdstuk-vragen
    }

    if (questions.length === 0) {
        alert("Dit hoofdstuk heeft nog geen vragen.");
        return;
    }

    // Hussel de geselecteerde vragen door elkaar
    shuffleArray(questions);

    menuContainer.classList.add('hide');
    quizContent.classList.remove('hide');
    startQuiz();
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add('hide');
    nextButton.classList.add('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    if (currentQuestion.image) {
        imageContainer.classList.remove('hide');
        quizImage.src = currentQuestion.image;
        quizImage.classList.add('quiz-image');
    }

    if (currentQuestion.type === 'multiple-choice') {
        answerButtonsElement.classList.remove('hide');
        answerArea.classList.add('hide');
        
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    } else if (currentQuestion.type === 'open') {
        answerButtonsElement.classList.add('hide');
        answerArea.classList.remove('hide');
        answerInput.value = '';
    } else if (currentQuestion.type === 'fill-in') {
        fillInContainer.classList.remove('hide');
        fillInContainer.innerHTML = '';
        currentQuestion.blanks.forEach((blank, index) => {
            const div = document.createElement('div');
            div.classList.add('fill-in-row');
            div.innerHTML = `
                <label>${blank.label}:</label>
                <input type="text" class="blank-input" data-index="${index}" autocomplete="off">
            `;
            fillInContainer.appendChild(div);
        });
        const checkBtn = document.createElement('button');
        checkBtn.innerText = 'Controleer antwoorden';
        checkBtn.classList.add('next-btn');
        checkBtn.onclick = submitAnswer;
        fillInContainer.appendChild(checkBtn);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    
    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('wrong');
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
    });

    showNextOrEnd();
}

// Helper functie om tekst te normaliseren (geen hoofdletters, trimmen, dubbele spaties weg)
function normalizeText(text) {
    if (!text) return "";
    return text.toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, ' ');
}

function submitAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    let isAutoMatch = false;

    if (currentQuestion.type === 'open') {
        correctAnswerDisplay.innerText = currentQuestion.answer;
        isAutoMatch = normalizeText(answerInput.value) === normalizeText(currentQuestion.answer);
    } else if (currentQuestion.type === 'fill-in') {
        const inputs = fillInContainer.querySelectorAll('.blank-input');
        const answersList = currentQuestion.blanks.map(b => `${b.label}: ${b.answer}`).join(' | ');
        correctAnswerDisplay.innerText = answersList;

        isAutoMatch = currentQuestion.blanks.every((blank, index) => {
            return normalizeText(inputs[index].value) === normalizeText(blank.answer);
        });
    }

    // Geef een hint of de computer denkt dat het goed is
    if (isAutoMatch) {
        autoCheckMsg.innerText = "Computer zegt: Exacte match! ✅";
        autoCheckMsg.style.color = "var(--success-color)";
    } else {
        autoCheckMsg.innerText = "Computer zegt: Geen exacte match. (Kijk zelf even) 🔍";
        autoCheckMsg.style.color = "orange";
    }

    answerArea.classList.add('hide');
    fillInContainer.classList.add('hide');
    feedbackContainer.classList.remove('hide');
}

function handleAssessment(isCorrect) {
    if (isCorrect) score++;
    feedbackContainer.classList.add('hide');
    
    // Bij een open vraag gaan we direct naar de volgende vraag na de beoordeling
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showNextOrEnd() {
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showScore();
    }
}

function resetState() {
    nextButton.classList.add('hide');
    feedbackContainer.classList.add('hide');
    autoCheckMsg.innerText = "";
    imageContainer.classList.add('hide');
    fillInContainer.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function showScore() {
    answerArea.classList.add('hide');
    answerButtonsElement.classList.add('hide');
    questionElement.innerText = "Quiz voltooid!";
    scoreText.innerText = `Je score is ${score} van de ${questions.length}`;
    scoreContainer.classList.remove('hide');
}

submitButton.addEventListener('click', submitAnswer);
correctButton.addEventListener('click', () => handleAssessment(true));
wrongButton.addEventListener('click', () => handleAssessment(false));

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();
});

function restartQuiz() {
    quizContent.classList.add('hide');
    menuContainer.classList.remove('hide');
    scoreContainer.classList.add('hide');
}

window.addEventListener('DOMContentLoaded', () => {
    const messages = document.querySelectorAll('.flash-message');

    messages.forEach((msg) => {
        requestAnimationFrame(() => {
            msg.classList.add('visible');
        });

        setTimeout(() => {
            msg.classList.add('fade-out');
        }, 4000);

        msg.addEventListener('transitionend', () => {
            if (msg.classList.contains('fade-out')) {
                msg.remove();
            }
        }, { once: true });
    });

    const loadingOverlay = document.getElementById('loading-overlay');
    const uploadForms = document.querySelectorAll('form.admin-form');
    const rerunButtons = document.querySelectorAll('.rerun-ai-btn');

    if (loadingOverlay) {
        uploadForms.forEach((form) => {
            form.addEventListener('submit', () => {
                loadingOverlay.classList.add('active');
            });
        });
    }

    rerunButtons.forEach((button) => {
        button.addEventListener('click', async () => {
            const projectId = button.dataset.projectId;
            if (!projectId) {
                alert('Het project kon niet worden gevonden.');
                return;
            }

            button.disabled = true;
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Controleren...';

            try {
                const response = await fetch(`/rerun_project_ai/${projectId}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });

                const data = await response.json();
                if (!response.ok) {
                    alert(data.error || 'Er is iets misgegaan bij het opnieuw analyseren van je project.');
                    return;
                }

                const card = button.closest('.project-card');
                if (card) {
                    const scoreElement = card.querySelector('.ai-score-value');
                    const feedbackElement = card.querySelector('.ai-feedback-text');
                    if (scoreElement) scoreElement.textContent = `${data.ai_score}/5`;
                    if (feedbackElement) feedbackElement.textContent = `"${data.ai_feedback}"`;
                }

                alert('AI-heranalyse is voltooid. De score is bijgewerkt.');
            } catch (error) {
                alert('Er ging iets mis bij de verbinding met de server. Probeer opnieuw.');
            } finally {
                button.disabled = false;
                button.innerHTML = originalHTML;
            }
        });
    });
});