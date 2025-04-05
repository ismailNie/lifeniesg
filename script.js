document.addEventListener('DOMContentLoaded', () => { 
    const questionContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result-container');
    let primaryAlignmentKey = null; // To store the primary alignment while checking for secondary

    // --- DATA STRUCTURES ---

    // Define contact information (REPLACE WITH ACTUAL CONTACTS)
    const contactInfo = {
        childHumanDev: "<strong>Contact:</strong><br>A/P Lim Kam Ming, Head / PCHD (Chair)<br>A/P Caroline Koh, PCHD (Co-chair)",
        scienceOfLearning: "<strong>Contact:</strong><br>Prof Kenneth Poon, Dean / Research (Advisor)<br>Prof David Hung, CD / SoLEC (Co-chair)<br>A/P Anne Rifkin​, Dy CD / LSA (Co-chair)",
        assessmentEvaluation: "<strong>Contact:</strong><br>Prof Chang Chew Hung, NIE Sustainability Officer (Chair)<br>A/P Chong Wan Har, PCHD (Co-chair)<br>Dr Tay Hui Yong, Sr Lecturer / LSA (Co-chair)",
        valuesEthics: "<strong>Contact:</strong><br>Prof Low Ee Ling, Dean / AFA (Chair)<br>Dr Dennis Kwek, CD / CRPP (Co-chair)<br>Prof Tan Oon Seng, Dean / SPJ and CD / SCCCE (Dir. SCCCE)",
        emergingTech: "<strong>Contact:</strong><br>A/P Ang Keng Cheng, Dean / GPL​ (Advisor)<br>A/P Tan Seng Chee​​​, AD / PLD (Chair)<br>A/P Chen Wenli​, Head / LSA (Co-chair)<br>A/P Chua Bee Leng, CLIO (Co-chair)",
        disciplinaryCurriculum: "<strong>Contact:</strong><br>Strategic Planning and Engagement (SPE)",
        teacherEdDev: "<strong>Contact:</strong><br>Strategic Planning and Engagement (SPE)",
        eduTransformSustain: "<strong>Contact:</strong><br>Strategic Planning and Engagement (SPE)",
        speOffice: "<strong>Contact:</strong><br>Strategic Planning and Engagement Department [spenie@nie.edu.sg] for general LIFE@NIE SG ® queries."
    };

    // Define result descriptions based on the areas
    const results = {
        childHumanDev: {
            title: "Strategic Growth Area: Child and Human Development",
            description: "Focuses on understanding developmental processes (physical, cognitive, socio-emotional) across different learner groups (e.g., early childhood, adolescents, special needs) to improve educational practices, policies, and well-being.",
            contact: contactInfo.childHumanDev
        },
        scienceOfLearning: {
            title: "Strategic Growth Area: Science of Learning",
            description: "Focuses on the underlying mechanisms of learning, potentially integrating disciplines like neuroscience, cognitive science, psychology, or AI to enhance precision, personalisation and support successful learning.",
            contact: contactInfo.scienceOfLearning
        },
        assessmentEvaluation: {
            title: "Strategic Growth Area: Assessment and Evaluation",
            description: "Involves developing or applying methods to collect and analyse evidence on student learning, program effectiveness, or educational outcomes, contributing to assessment literacy and informed decision-making.",
            contact: contactInfo.assessmentEvaluation
        },
        valuesEthics: {
            title: "Strategic Growth Area: Values and Ethics",
            description: "Centers on cultivating moral character, ethical decision-making, or positive values in educators and learners through research, programs, or innovative pedagogies.",
            contact: contactInfo.valuesEthics
        },
        emergingTech: {
            title: "Strategic Growth Area: Emerging Technologies",
            description: "Focuses on designing, developing, implementing, or evaluating the use of innovative technologies (like AI, simulations, learning analytics) to enhance teaching, learning, assessment, or educational processes.",
            contact: contactInfo.emergingTech
        },
        disciplinaryCurriculum: {
            title: "Evergreen Strength: Disciplinary Knowledge and Curriculum",
            description: "Grounded in deepening subject matter expertise or developing/refining curriculum within specific disciplines, leveraging NIE's synergy of content and curriculum experts.",
            contact: contactInfo.disciplinaryCurriculum
        },
        teacherEdDev: {
            title: "Evergreen Strength: Teacher Education and Professional Development",
            description: "Focuses on preparing or equipping educators with knowledge, skills, values, or pedagogical know-how, contributing directly to pre-service or in-service teacher development.",
            contact: contactInfo.teacherEdDev
        },
        eduTransformSustain: {
            title: "Evergreen Strength: Education, Transformation and Sustainability",
            description: "Aims to bridge research, theory, and practice to inform educational policy, drive systemic changes, or contribute to a sustainable and progressive society through education.",
            contact: contactInfo.eduTransformSustain
        },
         noStrongAlignment: {
            title: "Potential Alignment Across Areas or Further Clarification Needed",
            description: "Based on your selections, the primary alignment isn't immediately clear or might span multiple areas. Consider if your project strongly supports NIE's Evergreen Strengths.",
            contact: contactInfo.speOffice
        },
         // Placeholder for intermediate states if needed, though not used as direct results
    };

    // Define the expanded question structure
    const questions = {
        // --- LAYER 1 ---
        start: {
            questionText: "What is the primary domain of your project/research?",
            options: [
                { text: "Understanding learners: their development, cognition, or behaviour.", nextQuestionId: "q2_learnerFocus" },
                { text: "Educational methods: teaching strategies, assessment techniques, or interventions.", nextQuestionId: "q2_methodFocus" },
                { text: "Subject matter & curriculum: deepening content knowledge or designing curricula.", primaryResult: "disciplinaryCurriculum", nextQuestionId: "q_checkSecondary_fromEvergreen" }, // Directly identify Evergreen, then check secondary
                { text: "Technology in education: its development, application, or evaluation.", nextQuestionId: "q2_techFocus" },
                { text: "Values & ethics: character development, moral reasoning, or citizenship education.", primaryResult: "valuesEthics", nextQuestionId: "q_checkSecondary_fromStrategic" }, // Directly identify Strategic, then check secondary
                { text: "Educational systems & policy: systemic change, policy impact, or societal goals.", primaryResult: "eduTransformSustain", nextQuestionId: "q_checkSecondary_fromEvergreen" } // Directly identify Evergreen, then check secondary
            ]
        },

        // --- LAYER 2 Branches ---
        q2_learnerFocus: {
            questionText: "Within the 'Understanding Learners' domain, what is the core focus?",
            options: [
                { text: "Developmental trajectories or characteristics of specific learner groups (e.g., early years, adolescents, SEN).", nextQuestionId: "q3_devFocus" },
                { text: "Fundamental cognitive or neurological processes underlying learning (e.g., memory, attention, brain function).", nextQuestionId: "q3_cogNeuroFocus" },
                { text: "How learners interact with or understand specific disciplinary content.", primaryResult: "disciplinaryCurriculum", nextQuestionId: "q_checkSecondary_fromEvergreen"}, // Falls under Evergreen
                { text: "Socio-emotional aspects, motivation, or well-being in learning contexts.", nextQuestionId: "q3_socioEmoFocus" } // Could link to Child/Human Dev or Values
            ]
        },
        q2_methodFocus: {
            questionText: "Within the 'Educational Methods' domain, what is the core focus?",
            options: [
                { text: "Designing, implementing, or evaluating teaching strategies or pedagogical models.", nextQuestionId: "q3_pedagogyFocus" },
                { text: "Developing, validating, or applying assessment tools or evaluation frameworks.", nextQuestionId: "q3_assessmentFocus" },
                { text: "Specifically aimed at training or enhancing the professional practice of educators.", primaryResult: "teacherEdDev", nextQuestionId: "q_checkSecondary_fromEvergreen" } // Directly Teacher Ed/PD
            ]
        },
        q2_techFocus: {
            questionText: "Within the 'Technology in Education' domain, what is the core focus?",
            options: [
                { text: "Developing or engineering new educational technologies or platforms.", nextQuestionId: "q3_techDev" },
                { text: "Applying or evaluating existing technologies to enhance teaching or learning processes.", nextQuestionId: "q3_techApp" },
                { text: "Using technology specifically as a tool to investigate learning processes (e.g., eye-tracking, fMRI).", primaryResult: "scienceOfLearning", nextQuestionId: "q_checkSecondary_fromStrategic" }, // Tech as tool for SoL
                { text: "Examining the ethical implications or societal impact of educational technology.", primaryResult: "valuesEthics", nextQuestionId: "q_checkSecondary_fromStrategic" } // Ethics of tech
            ]
        },

        // --- LAYER 3 Branches ---
        // From q2_learnerFocus
        q3_devFocus: {
            questionText: "Regarding developmental trajectories/groups, is the main goal:",
            options: [
                { text: "Understanding fundamental developmental processes or characteristics.", primaryResult: "childHumanDev", nextQuestionId: "q_checkSecondary_fromStrategic" },
                { text: "Designing or evaluating interventions targeted at specific developmental needs.", primaryResult: "childHumanDev", nextQuestionId: "q_checkSecondary_fromStrategic" },
                { text: "Focusing primarily on the role of values or character in development.", primaryResult: "valuesEthics", nextQuestionId: "q_checkSecondary_fromStrategic" }
            ]
        },
         q3_cogNeuroFocus: {
            questionText: "Regarding cognitive/neuro processes, is the work primarily:",
             options: [
                { text: "Basic science research exploring fundamental learning mechanisms.", primaryResult: "scienceOfLearning", nextQuestionId: "q_checkSecondary_fromStrategic" },
                { text: "Translating cognitive/neuro principles into applicable educational strategies.", primaryResult: "scienceOfLearning", nextQuestionId: "q_checkSecondary_fromStrategic" },
                { text: "Using AI/computational models to simulate or understand these processes.", primaryResult: "scienceOfLearning", nextQuestionId: "q_checkSecondary_fromStrategic" } // Could also link Emerging Tech
             ]
         },
        q3_socioEmoFocus: {
             questionText: "Regarding socio-emotional aspects/well-being, is the focus on:",
             options: [
                 { text: "Understanding these factors as part of overall child/human development.", primaryResult: "childHumanDev", nextQuestionId: "q_checkSecondary_fromStrategic" },
                 { text: "Developing character, resilience, or ethical values related to well-being.", primaryResult: "valuesEthics", nextQuestionId: "q_checkSecondary_fromStrategic" },
                 { text: "How these factors impact learning processes from a cognitive perspective.", primaryResult: "scienceOfLearning", nextQuestionId: "q_checkSecondary_fromStrategic" }
             ]
         },
        // From q2_methodFocus
        q3_pedagogyFocus: {
             questionText: "Regarding teaching strategies/pedagogy, does it heavily involve:",
             options: [
                 { text: "Leveraging emerging technologies (AI, VR, simulations, analytics).", primaryResult: "emergingTech", nextQuestionId: "q_checkSecondary_fromStrategic" },
                 { text: "Applying principles from the Science of Learning (cognitive science, neuroscience).", primaryResult: "scienceOfLearning", nextQuestionId: "q_checkSecondary_fromStrategic" },
                 { text: "Developing teachers' skills in using these strategies.", primaryResult: "teacherEdDev", nextQuestionId: "q_checkSecondary_fromEvergreen" },
                 { text: "Focusing on subject-specific pedagogy within a discipline.", primaryResult: "disciplinaryCurriculum", nextQuestionId: "q_checkSecondary_fromEvergreen" },
                 { text: "General pedagogical approaches not primarily linked to the above.", primaryResult: "teacherEdDev", nextQuestionId: "q_checkSecondary_fromEvergreen" } // Default to Teacher Ed if general pedagogy
            ]
        },
        q3_assessmentFocus: {
            questionText: "Regarding assessment/evaluation, is the primary activity:",
            options: [
                { text: "Developing new assessment instruments or frameworks.", primaryResult: "assessmentEvaluation", nextQuestionId: "q_checkSecondary_fromStrategic" },
                { text: "Conducting large-scale program evaluations or system-level assessments.", primaryResult: "assessmentEvaluation", nextQuestionId: "q_checkSecondary_fromStrategic" },
                { text: "Improving classroom-based assessment practices or assessment literacy.", primaryResult: "assessmentEvaluation", nextQuestionId: "q_checkSecondary_fromStrategic" }, // Could also link Teacher Ed/PD
                { text: "Utilizing advanced technologies (e.g., AI, analytics) for assessment.", primaryResult: "assessmentEvaluation", nextQuestionId: "q_checkSecondary_AE_tech" } // Flag tech link
            ]
        },
        // From q2_techFocus
        q3_techDev: {
            questionText: "When developing new EdTech, is the core innovation related to:",
             options: [
                 { text: "Artificial Intelligence applications (e.g., personalization, feedback).", primaryResult: "emergingTech", nextQuestionId: "q_checkSecondary_fromStrategic" },
                 { text: "Immersive technologies (VR/AR), simulations, or visualizations.", primaryResult: "emergingTech", nextQuestionId: "q_checkSecondary_fromStrategic" },
                 { text: "Learning analytics dashboards or data infrastructure.", primaryResult: "emergingTech", nextQuestionId: "q_checkSecondary_ET_analytics" }, // Flag assessment link
                 { text: "Other novel hardware or software for educational purposes.", primaryResult: "emergingTech", nextQuestionId: "q_checkSecondary_fromStrategic" }
             ]
        },
        q3_techApp: {
            questionText: "When applying/evaluating existing EdTech, is the main purpose to:",
            options: [
                 { text: "Improve teaching or learning effectiveness in a specific context.", primaryResult: "emergingTech", nextQuestionId: "q_checkSecondary_fromStrategic" },
                 { text: "Enhance assessment methods or provide better learning feedback.", primaryResult: "emergingTech", nextQuestionId: "q_checkSecondary_ET_assessment" }, // Flag assessment link
                 { text: "Support teacher professional development in using technology.", primaryResult: "teacherEdDev", nextQuestionId: "q_checkSecondary_TDev_tech" }, // Flag tech link
                 { text: "Facilitate learning based on known Science of Learning principles.", primaryResult: "emergingTech", nextQuestionId: "q_checkSecondary_ET_SoL"} // Flag SoL link
             ]
         },

        // --- LAYER 4: Check Secondary Alignments ---
        // Generic checker after identifying a Strategic Growth Area primary
        q_checkSecondary_fromStrategic: {
            questionText: "Your project shows primary alignment with a Strategic Growth Area. Does it also strongly contribute to one of NIE's Evergreen Strengths?",
            options: [
                { text: "Yes, significantly enhances core Teacher Education or Professional Development.", secondaryResult: "teacherEdDev" },
                { text: "Yes, substantially deepens Disciplinary Knowledge or refines Curriculum.", secondaryResult: "disciplinaryCurriculum" },
                { text: "Yes, strongly informs Educational Transformation, Policy, or Sustainability.", secondaryResult: "eduTransformSustain" },
                { text: "Not a strong secondary focus on these Evergreen areas.", secondaryResult: null } // No secondary Evergreen alignment
            ]
        },
        // Generic checker after identifying an Evergreen Strength primary
         q_checkSecondary_fromEvergreen: {
            questionText: "Your project aligns primarily with an Evergreen Strength. Does it ALSO significantly leverage or contribute to a Strategic Growth Area?",
             options: [
                { text: "Yes, incorporates insights/methods from Science of Learning.", secondaryResult: "scienceOfLearning" },
                { text: "Yes, involves development/understanding related to Child/Human Development.", secondaryResult: "childHumanDev" },
                { text: "Yes, utilizes or studies Emerging Technologies.", secondaryResult: "emergingTech" },
                { text: "Yes, develops or applies advanced Assessment/Evaluation techniques.", secondaryResult: "assessmentEvaluation" },
                 { text: "Yes, integrates or promotes Values/Ethics.", secondaryResult: "valuesEthics" },
                { text: "Not a strong secondary focus on these Strategic Growth areas.", secondaryResult: null } // No secondary Strategic alignment
            ]
        },
        // Specific secondary checks based on L3 paths (Examples)
         q_checkSecondary_AE_tech: { // From Assessment path that flagged tech
             questionText: "Primary alignment is Assessment & Evaluation. Given the technology focus, does it also strongly align with Emerging Technologies?",
            options: [
                 { text: "Yes, the technology aspect is a major component.", secondaryResult: "emergingTech" },
                 { text: "No, technology is secondary to the assessment goals.", nextQuestionId: "q_checkSecondary_fromStrategic" } // Go to generic Evergreen check
             ]
         },
         q_checkSecondary_ET_analytics: { // From Tech Dev path that flagged analytics
            questionText: "Primary alignment is Emerging Technologies (Analytics). Does it also strongly contribute to Assessment & Evaluation practices?",
             options: [
                 { text: "Yes, improving assessment/evaluation is a key outcome.", secondaryResult: "assessmentEvaluation" },
                 { text: "No, the focus is mainly on the technology/data itself.", nextQuestionId: "q_checkSecondary_fromStrategic" } // Go to generic Evergreen check
             ]
         },
         q_checkSecondary_ET_assessment: { // From Tech App path that flagged assessment
             questionText: "Primary alignment is Emerging Technologies (for Assessment). Does it also strongly contribute to Assessment & Evaluation knowledge/practice?",
            options: [
                { text: "Yes, advancing assessment/evaluation is a key outcome.", secondaryResult: "assessmentEvaluation" },
                { text: "No, the focus is mainly on the application of the technology.", nextQuestionId: "q_checkSecondary_fromStrategic" } // Go to generic Evergreen check
            ]
        },
         q_checkSecondary_TDev_tech: { // From Tech App path that flagged Teacher Ed
            questionText: "L4: Primary alignment is Teacher Ed/Prof Dev (using Tech). Does the project also involve significant development or evaluation of the Emerging Technology itself?",
            options: [
                { text: "Yes, the technology aspect is innovative or under significant study.", secondaryResult: "emergingTech" },
                { text: "No, the technology is primarily a tool for teacher training.", nextQuestionId: "q_checkSecondary_fromEvergreen" } // Go to generic Strategic check
            ]
        },
        q_checkSecondary_ET_SoL: { // From Tech App path that flagged SoL
            questionText: "Primary alignment is Emerging Technologies (based on SoL). Does the project also significantly contribute to the Science of Learning research itself?",
            options: [
                 { text: "Yes, it generates new insights into learning mechanisms.", secondaryResult: "scienceOfLearning" },
                 { text: "No, it primarily applies known SoL principles via technology.", nextQuestionId: "q_checkSecondary_fromStrategic" } // Go to generic Evergreen check
             ]
         }
        // Add more specific secondary checks here as needed...
    };


    // --- FUNCTIONS ---

    function displayQuestion(questionId) {
        const questionData = questions[questionId];

        if (!questionData) {
            console.error("Error: Question ID not found", questionId);
            displayResult(primaryAlignmentKey || "noStrongAlignment", null); // Show generic or stored primary if error
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

        const startOverButton = document.createElement('button');
        startOverButton.className = 'option-button';
        startOverButton.textContent = 'Start Over';
        startOverButton.onclick = startOver; // Assuming startOver is a function defined elsewhere
        // Append the "Start Over" button to the optionsContainer
        optionsContainer.appendChild(startOverButton);
        questionContainer.appendChild(optionsContainer);
        
        questionContainer.style.display = 'block'; // Ensure question area is visible
    }

    function handleOptionClick(option) {
         // Reset secondary if we are moving to a new primary question path implicitly
         // This happens if an option only has 'nextQuestionId' without setting a primary/secondary result yet.
        // Note: This reset might need refinement depending on desired flow complexity.

        // Priority 1: If option defines a primary result, store it.
        if (option.primaryResult) {
            primaryAlignmentKey = option.primaryResult;
        }

        // Priority 2: If option defines a secondary result (meaning we finished L4 check)
        if (option.hasOwnProperty('secondaryResult')) { // Check if key exists (even if null)
            displayResult(primaryAlignmentKey, option.secondaryResult);
        }
        // Priority 3: If option has a next question ID (could be L2, L3, or L4)
        else if (option.nextQuestionId) {
            displayQuestion(option.nextQuestionId);
        }
         // Priority 4: If option only has a direct 'result' (older structure, less likely now)
         else if (option.result) {
             // This path might imply a direct result without secondary check - display accordingly
            displayResult(option.result, null);
        }
        // Fallback: Error or unexpected structure
         else {
            console.error("Error: Option has no valid destination", option);
            displayResult(primaryAlignmentKey || "noStrongAlignment", null);
        }
    }

    function displayResult(primaryKey, secondaryKey) {
        const primaryResultData = results[primaryKey];
        const secondaryResultData = secondaryKey ? results[secondaryKey] : null;

        if (!primaryResultData) {
             console.error("Error: Primary result key not found", primaryKey);
             resultContainer.innerHTML = `
                <h3>Error</h3>
                <p>An unexpected error occurred determining primary alignment. Please contact the SPE office.</p>
                <div class="contact-info">${contactInfo.speOffice}</div>
                <button class="option-button" onclick="startOver()">Start Over</button>
            `;
         } else {
              let secondaryHtml = '';
              if (secondaryResultData) {
                  secondaryHtml = `
                    <div class="secondary-alignment">
                        <h4>Potential Secondary Alignment: ${secondaryResultData.title}</h4>
                        <p>${secondaryResultData.description}</p>
                        <p>${secondaryResultData.contact || contactInfo.speOffice}</p>
                    </div>
                  `;
              } else if (secondaryKey === null && primaryKey !== 'noStrongAlignment') {
                 // Explicitly state no strong secondary alignment was identified by the tool
                  secondaryHtml = `
                    <div class="secondary-alignment">
                         <p><em>This tool did not identify a strong secondary alignment based on your selections. You may still discuss potential cross-area contributions with the relevant contacts.</em></p>
                    </div>`;
              }

              resultContainer.innerHTML = `
                <h3>Alignment Suggestion</h3>
                <h4>Primary Alignment: ${primaryResultData.title}</h4>
                <p>${primaryResultData.description}</p>
                <div class="contact-info">
                    <p>For discussion regarding this primary area, please reach out to:</p>
                    <p>${primaryResultData.contact || contactInfo.speOffice}</p>
                     ${primaryKey === 'noStrongAlignment' ? '<p>Consider discussing your project with the SPE office to explore potential alignments further.</p>' : ''}
                </div>
                ${secondaryHtml}
                <button class="option-button" onclick="startOver()">Start Over</button>
            `;
         }

        questionContainer.style.display = 'none'; // Hide questions
        resultContainer.style.display = 'block'; // Show results
        resultContainer.scrollIntoView({ behavior: 'smooth' }); // Scroll to show the result
        primaryAlignmentKey = null; // Reset stored primary key after showing result
    }

     // Make startOver globally accessible
     window.startOver = () => {
         primaryAlignmentKey = null; // Reset stored primary key
         displayQuestion('start');
     }

    // --- INITIALIZATION ---
    displayQuestion('start'); // Start with the first question
});
