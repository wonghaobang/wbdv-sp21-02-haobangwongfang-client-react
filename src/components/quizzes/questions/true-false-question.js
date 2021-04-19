import React, {useState} from 'react'


const TrueFalseQuestion = ({question, graded, setGraded}) => {
    const [yourAnswer, setYourAnswer] = useState("")
    // const [graded, setGraded] = useState(false)
    // const [disable, setDisable] = useState(false)

    return (
        <div>
            <h4>
                {question.question}
                {
                    question.correct === yourAnswer && graded &&
                    <i className="fas fa-check float-right text-success"></i>
                }

                {
                    question.correct !== yourAnswer && graded &&
                    <i className="fas fa-times float-right text-danger"></i>
                }
            </h4>

            <li className={`list-group-item 
            ${graded && yourAnswer === question.correct && question.correct === "true" ? "list-group-item-success" : ""}
            ${graded && yourAnswer !== question.correct && question.correct === "false" ? "list-group-item-danger" : ""}
            ${graded && question.correct === "true" ? "list-group-item-success" : ""}
            `}>
                <label>
                    <input type="radio" disabled={graded === true} name={question._id} className="mr-2"
                           onClick={() => {
                               setYourAnswer("true")
                               question.answer = "true"
                           }}/>
                    TRUE
                </label>

                {graded && question.correct === "true" && yourAnswer === "true" ?
                    <i className="fas fa-check float-right text-success"></i> : ""}
                {graded && question.correct === "false" && yourAnswer === "true" ?
                    <i className="fas fa-times float-right text-danger"></i> : ""}
                {graded && question.correct === "true" && yourAnswer === "false" ?
                    <i className="fas fa-check float-right text-success"></i> : ""}

            </li>


            <li className={`list-group-item 
            ${graded && yourAnswer === question.correct && question.correct === "false" ? "list-group-item-success" : ""}
            ${graded && yourAnswer !== question.correct && question.correct === "true" ? "list-group-item-danger" : ""}
            ${graded && question.correct === "false" ? "list-group-item-success" : ""}
            `}>
                <label>
                    <input type="radio" disabled={graded === true} name={question._id} className="mr-2"
                           onClick={() => {
                               setYourAnswer("false")
                               question.answer = "false"
                           }}/>
                    FALSE
                </label>
                {graded && question.correct === "false" && yourAnswer === "false" ?
                    <i className="fas fa-check float-right text-success"></i> : ""}
                {graded && question.correct === "true" && yourAnswer === "false" ?
                    <i className="fas fa-times float-right text-danger"></i> : ""}
                {graded && question.correct === "false" && yourAnswer === "true" ?
                    <i className="fas fa-check float-right text-success"></i> : ""}

            </li>

            <br/>

            <div className="mb-2">Your answer: {yourAnswer}</div>

            <hr/>
            <br/>
        </div>
    )
}

export default TrueFalseQuestion