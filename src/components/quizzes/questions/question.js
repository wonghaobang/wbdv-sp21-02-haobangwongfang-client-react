import React from 'react'
import TrueFalseQuestion from "./true-false-question";
import MultipleChoiceQuestion from "./multiple-choice-question";


const Question = ({question, graded, setGraded}) => {
    return (
        <div>

            {/*{*/}
            {/*    question.type === "TRUE_FALSE" &&*/}
            {/*    <MultipleChoiceQuestion question={{...question, choices: ["true", "false"], answer: "ABC"}}/>*/}
            {/*}*/}

            {
                question.type === "TRUE_FALSE" &&
                    <TrueFalseQuestion question={question} graded={graded} setGraded={setGraded}/>
            }

            {
                question.type === "MULTIPLE_CHOICE" &&
                    <MultipleChoiceQuestion question={question} graded={graded} setGraded={setGraded}/>
            }

        </div>
    )
}

export default Question