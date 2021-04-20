import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from "react-router-dom"
import questionService from "../../services/questions-service"
import quizService from "../../services/quiz-service"
import Question from "./questions/question";

const Quiz = () => {
    const {quizId} = useParams()
    const history = useHistory()
    const [questions, setQuestions] = useState([])
    const [graded, setGraded] = useState(false)
    const [attempts, setAttempts] = useState([])

    useEffect(() => {
        questionService.findQuestionsForQuiz(quizId).then((questions) => setQuestions(questions))
    }, [])


    useEffect(() => {
        quizService.findAttemptsForQuiz(quizId).then((data) => setAttempts(data))
    }, [graded])




    const handleQuizSubmit = () => {
        setGraded(!graded)
        if (graded === false) {                             // setGraded not working as intended
            quizService.submitQuiz(quizId, questions)

        }
    }



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
                            <Question question={question} key={question._id} graded={graded} setGraded={setGraded}/>
                        )
                    })
                }
            </ul>

            <button className="btn btn-success btn-lg" onClick={handleQuizSubmit}>{graded ? 'Retake Quiz' : 'Submit'}</button>
            {/*<button className="btn btn-primary btn-lg" onClick={handleShowAttempts}>{showAttempts ? 'Hide Attempts' : 'Show Attempts'}</button>*/}

            {

                attempts.map((attempt, ndx) => {
                    return(
                        <div key={attempt._id}> Attempt {ndx+1} : {attempt.score}</div>
                    )
                })
            }

            {
                attempts.length === 0 && <div>No records</div>
            }




        </div>
    )
}

export default Quiz