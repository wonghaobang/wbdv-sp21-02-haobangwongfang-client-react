import React, {useState} from 'react'


const MultipleChoiceQuestion = ({question, graded, setGraded}) => {
    const [yourAnswer, setYourAnswer] = useState("")
    const [selectedIndex, setSelectedIndex] = useState("")

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

            <ul className="list-group">
                {
                    question.choices.map((choice, index) => {
                        return (
                            <li key={index} className={`list-group-item 
                            ${selectedIndex === index && yourAnswer === question.correct && graded ? "list-group-item-success" : ""}
                            ${selectedIndex === index && yourAnswer !== question.correct && graded ? "list-group-item-danger" : ""}
                            ${graded && question.correct === choice ? "list-group-item-success" : ""}`}>
                                <label>
                                    <input type="radio" disabled={graded === true} name={question._id} className="mr-2"
                                           onClick={() => {
                                               setYourAnswer(choice)
                                               question.answer = choice
                                               setSelectedIndex(index)
                                           }}
                                    />
                                    {choice}
                                </label>
                                {graded && question.correct === choice ?
                                    <i className="fas fa-check float-right text-success"></i> : ""}
                                {graded && selectedIndex === index && question.correct !== choice ?
                                    <i className="fas fa-times float-right text-danger"></i> : ""}
                            </li>
                        )
                    })
                }
            </ul>

            <br/>

            <div className="mb-2">Your answer: {yourAnswer}</div>

            <hr/>
            <br/>
        </div>
    )
}

export default MultipleChoiceQuestion
