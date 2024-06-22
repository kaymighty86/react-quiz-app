import { shuffledArray } from "../../utils/util";

import { useEffect, useState, forwardRef, useImperativeHandle } from "react";

const OptionsViewer = forwardRef(function OptionsViewer({options, onOptionSelect}, ref){

    const [allOptions, setAllOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(-1);
    const [correctOption, setCorrectOption] = useState(-1);

    useImperativeHandle(ref, ()=>{
        return {
            setCorrectAnswer(id){
                //use the shuffled array index here not the original option Id passed
                setCorrectOption(allOptions.findIndex(option => (option.id === id)));
            }
        }
    });

    useEffect(()=>{
        const optionsWithIds = options.map((value, id) => ({ value, id }));//map it into an array of objects with atrrbutes 'value' and 'id'
        setAllOptions(shuffledArray(optionsWithIds));

        //RESET THE OTHER STATE MANAGEMENT VALUES
        setSelectedOption(-1);
        setCorrectOption(-1);
    }, [options]);
    
    
    function handleOptionSelect (id) {
        setSelectedOption(allOptions.findIndex(option => (option.id === id)));//the id returned by the button is the real 'id' of the option not the index from the shuffled array. So get the index of the array item from the shuffled array
        onOptionSelect(id);
    }

    return (
        <div id="answers">
            {correctOption != -1 && //if we have an aswer for correct option 
                <div style={{fontSize: "x-large"}}>{selectedOption === correctOption? <i className="fa-regular fa-thumbs-up"></i> : <i className="fa-regular fa-circle-xmark"></i>}</div>
            }
            {
                allOptions.map((option, index) => (
                    <div key={index} className="answer">
                        <button onClick={()=>{handleOptionSelect(option.id)}} className={`${index == selectedOption? "selected" : ""} ${(index == selectedOption && correctOption != -1) && (index === correctOption? "correct" : "wrong")}`} disabled={selectedOption == -1? false : true}>
                            {option.value}
                        </button>
                    </div>
                ))
            }
        </div>
    )
});

export default OptionsViewer;