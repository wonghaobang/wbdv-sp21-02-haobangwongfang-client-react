import React, {useState} from 'react'


const MultipleChoiceQuestion = ({question}) => {
    const [yourAnswer, setYourAnswer] = useState("")
    const [graded, setGraded] = useState(false)
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
                                    <input type="radio" name={question._id} className="mr-2"
                                           onClick={() => {
                                               setYourAnswer(choice)
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
            <button className="btn btn-success" onClick={() => setGraded(true)}>Grade</button>

            <hr/>
            <br/>
        </div>
    )
}

export default MultipleChoiceQuestion
