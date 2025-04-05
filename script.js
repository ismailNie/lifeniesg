document.addEventListener('DOMContentLoaded', () => {
    const questionContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result-container');

    // --- DATA STRUCTURES ---

    // Define contact information (REPLACE WITH ACTUAL CONTACTS)
    const contactInfo = {
        childHumanDev: "<strong>Contact:</strong> Chair, Child and Human Development Steering Committee [email protected] / ext XXXX",
        scienceOfLearning: "<strong>Contact:</strong> Director, SoLEC@NIE [email protected] / ext XXXX",
        assessmentEvaluation: "<strong>Contact:</strong> Chair, Assessment and Evaluation Steering Committee [email protected] / ext XXXX",
        valuesEthics: "<strong>Contact:</strong> Chair, Values and Ethics Steering Committee [email protected] / ext XXXX",
        emergingTech: "<strong>Contact:</strong> Chair, Emerging Technologies Steering Committee [email protected] / ext XXXX",
        disciplinaryCurriculum: "<strong>Contact:</strong> Please consult your relevant Academic Group Head/Representative.",
        teacherEdDev: "<strong>Contact:</strong> Assoc Dean, Teacher Education / Assoc Dean, Professional Development [email protected] / ext XXXX",
        eduTransformSustain: "<strong>Contact:</strong> Chair, Education Transformation and Sustainability Steering Committee [email protected] / ext XXXX",
        speOffice: "<strong>Contact:</strong> Strategic Planning and Engagement Office [email protected] / ext XXXX for general LIFE@NIE SG queries."
    };

    // Define result descriptions based on the areas
    const results = {
        childHumanDev: {
            title: "Strategic Growth Area: Child and Human Development",
            description: "Your project appears to align well with understanding developmental processes (physical, cognitive, socio-emotional) across different learner groups (e.g., early childhood, adolescents, special needs) to improve educational practices, policies, and well-being.",
            contact: contactInfo.childHumanDev
        },
        scienceOfLearning: {
            title: "Strategic Growth Area: Science of Learning",
            description: "Your project seems focused on the underlying mechanisms of learning, potentially integrating disciplines like neuroscience, cognitive science, psychology, or AI to enhance precision, personalization, and support successful learning.",
            contact: contactInfo.scienceOfLearning
        },
        assessmentEvaluation: {
            title: "Strategic Growth Area: Assessment and Evaluation",
            description: "Your work likely involves developing or applying methods to collect and analyze evidence on student learning, program effectiveness, or educational outcomes, contributing to assessment literacy and informed decision-making.",
            contact: contactInfo.assessmentEvaluation
        },
        valuesEthics: {
            title: "Strategic Growth Area: Values and Ethics",
            description: "Your project appears centered on cultivating moral character, ethical decision-making, or positive values in educators and learners through research, programs, or innovative pedagogies.",
            contact: contactInfo.valuesEthics
        },
        emergingTech: {
            title: "Strategic Growth Area: Emerging Technologies",
            description: "Your project likely focuses on designing, developing, implementing, or evaluating the use of innovative technologies (like AI, simulations, learning analytics) to enhance teaching, learning, assessment, or educational processes.",
            contact: contactInfo.emergingTech
        },
        disciplinaryCurriculum: {
            title: "Evergreen Strength: Disciplinary Knowledge and Curriculum",
            description: "Your work seems grounded in deepening subject matter expertise or developing/refining curriculum within specific disciplines, leveraging NIE's unique synergy of content and curriculum experts.",
            contact: contactInfo.disciplinaryCurriculum
        },
        teacherEdDev: {
            title: "Evergreen Strength: Teacher Education and Professional Development",
            description: "Your project appears focused on preparing or equipping educators with knowledge, skills, values, or pedagogical know-how, contributing directly to pre-service or in-service teacher development.",
            contact: contactInfo.teacherEdDev
        },
        eduTransformSustain: {
            title: "Evergreen Strength: Education, Transformation and Sustainability",
            description: "Your work likely aims to bridge research, theory, and practice to inform educational policy, drive systemic changes, or contribute to a sustainable and progressive society through education.",
            contact: contactInfo.eduTransformSustain
        },
         noStrongAlignment: {
            title: "Potential Alignment Across Areas or Further Clarification Needed",
            description: "Based on your selections, the primary alignment isn't immediately clear or might span multiple areas. It could also strongly align with our Evergreen Strengths.",
            contact: contactInfo.speOffice // General contact if unsure
        },
        checkEvergreen: { // Intermediate state, not a final result
            title: "Checking Evergreen Alignment",
            description: "Your project doesn't seem to strongly align with a primary Strategic Growth Area based on the initial questions. Let's check its alignment with NIE's Evergreen Strengths and Distinctive Capabilities."
            // No contact here, leads to another question
        }
    };

    // Define the question structure
    const questions = {
        start: {
            questionText: "What is the PRIMARY focus or outcome of your project/research?",
            options: [
                { text: "Understanding how individuals or groups learn, develop, or behave in educational contexts.", nextQuestionId: "q_learnerFocus" },
                { text: "Developing, refining, or evaluating methods for teaching, assessment, or educational interventions.", nextQuestionId: "q_methodFocus" },
                { text: "Creating, enhancing, or evaluating curriculum content or disciplinary knowledge for education.", result: "disciplinaryCurriculum" }, // Direct to Evergreen
                { text: "Exploring or implementing the use of technology to enhance learning, teaching, or educational processes.", nextQuestionId: "q_techFocus" },
                { text: "Investigating, promoting, or evaluating values, ethics, character development, or citizenship in education.", result: "valuesEthics" }, // Direct to Strategic
                { text: "Informing educational policy, driving systemic change, or addressing broad societal goals through education.", result: "eduTransformSustain" } // Direct to Evergreen
            ]
        },
        // --- Branch 1: Learner Focus ---
        q_learnerFocus: {
            questionText: "Regarding the focus on learners, are you primarily investigating:",
            options: [
                { text: "Developmental stages (e.g., early childhood, adolescence), specific learner groups (e.g., special needs), or socio-emotional well-being?", result: "childHumanDev" },
                { text: "The underlying cognitive or neurological processes of how learning occurs (e.g., memory, attention, brain activity)?", result: "scienceOfLearning" },
                { text: "How learners interact with specific subject matter or curriculum?", result: "disciplinaryCurriculum" }, // Possible overlap with Evergreen
                 { text: "Other aspects of learner experience or behaviour not covered above.", nextQuestionId: "q_checkEvergreen" } // Fallback
            ]
        },
        // --- Branch 2: Method Focus ---
        q_methodFocus: {
            questionText: "Regarding the focus on methods, is your project primarily about:",
            options: [
                { text: "Developing or validating tools/processes to measure learning, evaluate programs, or assess skills?", result: "assessmentEvaluation" },
                { text: "Designing, implementing, or evaluating teaching strategies or pedagogical approaches for educators?", nextQuestionId: "q_pedagogyType"},
                { text: "Training or developing educators' skills, knowledge, or professional practice?", result: "teacherEdDev" }, // Direct to Evergreen
                 { text: "Other methodological aspects not covered above.", nextQuestionId: "q_checkEvergreen" } // Fallback
            ]
        },
         q_pedagogyType: {
            questionText: "Does this pedagogical approach heavily rely on or investigate the use of new/emerging technologies?",
             options: [
                { text: "Yes, technology (e.g., AI, simulations, VR, analytics) is a core component.", result: "emergingTech" },
                { text: "No, it focuses more on non-tech based strategies, teacher practices, or learning environment design.", result: "teacherEdDev" }, // Link back to Teacher Ed/PD
            ]
         },
        // --- Branch 3: Technology Focus ---
        q_techFocus: {
            questionText: "Regarding the focus on technology, is its primary role in your project to:",
             options: [
                { text: "Serve as a tool/platform to deliver instruction, enhance learning experiences, or automate processes?", result: "emergingTech" },
                { text: "Be used to study the mechanisms of learning itself (e.g., using eye-tracking, brain imaging with tech stimuli)?", result: "scienceOfLearning" },
                { text: "Facilitate new ways of assessing or evaluating learning outcomes?", result: "assessmentEvaluation" }, // Tech for Assessment
                { text: "Other applications of technology in education.", result: "emergingTech" } // Default Tech alignment
            ]
        },

        // --- Fallback Check for Evergreen ---
        q_checkEvergreen: {
             questionText: "It seems your project might not have a primary fit with the Strategic Growth Areas, or needs more context. Does it strongly relate to one of NIE's core, ongoing strengths?",
            options: [
                 { text: "Yes, it focuses on deepening subject matter knowledge or curriculum design within a discipline.", result: "disciplinaryCurriculum" },
                 { text: "Yes, it aims to improve teacher preparation or ongoing professional development for educators.", result: "teacherEdDev" },
                 { text: "Yes, it connects research to practice to inform policy or contribute to educational system transformation/sustainability.", result: "eduTransformSustain" },
                 { text: "Unsure, or it doesn't strongly align with these descriptions.", result: "noStrongAlignment" } // Final fallback
             ]
        }
    };


    // --- FUNCTIONS ---

    function displayQuestion(questionId) {
        const questionData = questions[questionId];
         // Handle intermediate "check Evergreen" state which isn't a final result but triggers next question
        if (results[questionId] && results[questionId].title === "Checking Evergreen Alignment") {
            // Optionally display a brief message before showing the Evergreen check question
             questionContainer.innerHTML = `<p class="intro">${results[questionId].description}</p>`;
             // Add a small delay before showing the next question for smoother transition
             setTimeout(() => {
                 displayQuestion('q_checkEvergreen'); // Go to the evergreen check question
             }, 1500); // 1.5 second delay
             return; // Stop further processing for this ID
        }


        if (!questionData) {
            console.error("Error: Question ID not found", questionId);
            displayResult("noStrongAlignment"); // Show generic message if error
            return;
        }

        // Clear previous content
        questionContainer.innerHTML = '';
        resultContainer.style.display = 'none'; // Hide result area

        // Display the question text
        const questionTextElem = document.createElement('p');
        questionTextElem.className = 'question-text';
        questionTextElem.textContent = questionData.questionText;
        questionContainer.appendChild(questionTextElem);

        // Display the options
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';
        questionData.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = option.text;
            button.onclick = () => handleOptionClick(option);
            optionsContainer.appendChild(button);
        });
        questionContainer.appendChild(optionsContainer);
         questionContainer.style.display = 'block'; // Ensure question area is visible
    }

    function handleOptionClick(option) {
        if (option.nextQuestionId) {
            displayQuestion(option.nextQuestionId);
        } else if (option.result) {
            // Special check if result is 'checkEvergreen'
            if(option.result === 'checkEvergreen') {
                 displayQuestion('checkEvergreen'); // Directly call displayQuestion for this intermediate state
            } else {
                displayResult(option.result);
            }
        } else {
            console.error("Error: Option has no destination", option);
            displayResult("noStrongAlignment");
        }
    }

    function displayResult(resultKey) {
        const resultData = results[resultKey];
        if (!resultData) {
             console.error("Error: Result key not found", resultKey);
             // Display a generic error/contact message
             resultContainer.innerHTML = `
                <h3>Error</h3>
                <p>An unexpected error occurred. Please contact the SPE office for assistance.</p>
                <div class="contact-info">${contactInfo.speOffice}</div>
            `;
         } else {
              resultContainer.innerHTML = `
                <h3>Alignment Suggestion</h3>
                <h4>${resultData.title}</h4>
                <p>${resultData.description}</p>
                <div class="contact-info">
                    <p>For more information or discussion regarding this area, please reach out to:</p>
                    <p>${resultData.contact || contactInfo.speOffice}</p>
                     ${resultKey === 'noStrongAlignment' ? '<p>Consider discussing your project with the SPE office to explore potential alignments further.</p>' : ''}
                </div>
                <button class="option-button" onclick="startOver()">Start Over</button>
            `;
         }

        questionContainer.style.display = 'none'; // Hide questions
        resultContainer.style.display = 'block'; // Show results
        resultContainer.scrollIntoView({ behavior: 'smooth' }); // Scroll to show the result
    }

     // Make startOver globally accessible or attach it to the window object
     window.startOver = () => {
         displayQuestion('start');
     }


    // --- INITIALIZATION ---
    displayQuestion('start'); // Start with the first question
});
