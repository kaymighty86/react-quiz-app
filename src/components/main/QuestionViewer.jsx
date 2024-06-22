import OptionsViewer from "./OptionsViewer.jsx";

import { useRef } from "react";

export default function QuestionViewer({question, onAnswerSubmit}){

    const optionsViewer = useRef();

    function handleOptionSelected(optionID){

        setTimeout(()=>{
            //tell the options viewer what the correct answer is
            optionsViewer.current.setCorrectAnswer(question.correctAnswerId);

            //wait for anothr small time before notifying the app
            setTimeout(()=>{
                onAnswerSubmit(question.id, optionID);
            }, 700);
        }, 500);
    }

    return (
        <>
            <div id="question">
                <h2>{question.text}</h2>
            </div>
            <OptionsViewer ref={optionsViewer} options={question.answers} onOptionSelect={handleOptionSelected} />
        </>
    )
}