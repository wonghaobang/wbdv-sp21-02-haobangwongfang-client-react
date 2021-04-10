import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from "react-router-dom"
import questionService from "../../services/questions-service"
import Question from "./questions/question";

const Quiz = () => {
    const {quizId} = useParams()
    const history = useHistory()
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        questionService.findQuestionsForQuiz(quizId).then((questions) => {
            setQuestions(questions)
        })
    }, [])

    return (

        <div>
            <i onClick={() => history.goBack()}
               className="fas fa-arrow-left fa-2x text-muted float-right">
            </i>

            <h2 className="text-info">{questions.length} Question(s)</h2>
            <br/>
            <ul className="list-group">
                {
                    questions.map((question) => {
                        return (
                            <Question question={question} key={question._id}/>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Quiz