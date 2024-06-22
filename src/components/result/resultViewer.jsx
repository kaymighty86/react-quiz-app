import resultLogo from "../../assets/quiz-complete.png";

export default function ResultViewer({answersRecord}){

    const correctAnswers = Math.floor((answersRecord.filter(answerItem => (answerItem.answerCorrect === true))).length / answersRecord.length * 100); //in percentage (/100)
    const wrongAnswers = 100-correctAnswers;//in percentage (/100)

    return (
        <div id="summary">
            <img src={resultLogo} alt="result icon"/>
            <h2>QUIZ COMPLETED!</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">{`${correctAnswers}%`}</span>
                    <span className="text">ANSWERED CORRECTLY</span>
                </p>
                <p>
                    <span className="number">{`${wrongAnswers}%`}</span>
                    <span className="text">ANSWERED INCORRECTLY</span>
                </p>
            </div>
            <div id="summary">
                <ol>
                    {answersRecord.map((answerItem, id) => {
                            let answerType = "";
                            switch(answerItem.answerCorrect){
                                case true: answerType = 'correct'; break;
                                case false: answerType ='wrong'; break;
                                case undefined: answerType = 'skipped'; break;
                            }

                            return (
                                <li key={answerItem.questionId}>
                                    <h3>{id + 1}</h3>
                                    <p className="question">{answerItem.question}</p>
                                    <p className={`user-answer ${answerType}`}>{answerItem.chosenAnswer}</p>
                                </li>
                            )
                        })
                    }
                </ol>
            </div>
        </div>
    );
}