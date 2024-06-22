import { useState, useRef } from "react";
import Header from "./components/header.jsx";
import QuestionViewer from "./components/main/QuestionViewer.jsx";
import ResultViewer from "./components/result/resultViewer.jsx";

import questions from "./questions.js";
import { shuffledArray } from "./utils/util.js";

function App() {
    const shuffledQuestionsRef = useRef();
    const [currentQuestion, setCurrentQuestion] = useState(undefined);
    const [userAnswers, updateUserAnswers] = useState([]);

    function handleTestStart(){
        //shuffle the questions and set the starting question
        shuffledQuestionsRef.current = shuffledArray(questions);
        setCurrentQuestion(shuffledQuestionsRef.current[0]);
    }

    function handleAnswerSubmission(questionId, chosenAnswerId){
        const questionInView = questions.find(item=>(item.id === questionId));
        
        if(questionInView != undefined){//IF THE QUESTION EXISTS 
            let answerCorrect = undefined;
            if(chosenAnswerId != undefined){//if the user did not skip the question
                answerCorrect = questionInView.correctAnswerId === chosenAnswerId? true : false;//check if the answer is correct
            }
            
            const compiledAnswerItem = {
                questionId, 
                question: questionInView.text, 
                chosenAnswerId, 
                chosenAnswer: questionInView.answers[chosenAnswerId] || 'None', 
                answerCorrect
            }

            updateUserAnswers(prevAnswers=>{
                const updatedAnswers = [...prevAnswers, compiledAnswerItem];
                // console.log(updatedAnswers);
                return updatedAnswers;
            });

            //get next question array-element index (from the schuffled array) and set the next question
            const nextQuestionIndex = shuffledQuestionsRef.current.findIndex(question => (question.id === questionId)) + 1;
            if(nextQuestionIndex < shuffledQuestionsRef.current.length){
                setCurrentQuestion(shuffledQuestionsRef.current[nextQuestionIndex]);
            }
        }
    }

    return (
        <>
            <Header />
            {
                //check if test has started. If it hasn't render the start button
                currentQuestion == undefined &&
                <div  id="quiz">
                    <button id="mainButton" onClick = {handleTestStart}>Start Test</button>
                </div>
            }
            
            {
                currentQuestion != undefined && (
                    userAnswers.length < shuffledQuestionsRef.current.length?
                    <div id="quiz">
                        <QuestionViewer question={currentQuestion} onAnswerSubmit={handleAnswerSubmission}/>
                    </div>
                     : 
                    <ResultViewer answersRecord={userAnswers}/>
                )
            }
        </>
    )
}

export default App;
