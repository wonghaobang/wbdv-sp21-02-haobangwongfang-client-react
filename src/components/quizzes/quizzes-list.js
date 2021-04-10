import React, {useState, useEffect} from 'react'
import quizService from "../../services/quiz-service"

import {Link, useParams} from "react-router-dom";

const QuizzesList = () => {
    const {courseId} = useParams()
    const [quizzes, setQuizzes] = useState([])

    useEffect(() => {
        quizService.findAllQuizzes().then((quizzes) => {
            setQuizzes(quizzes)
        }, [])
    })

    return (
        <div>
            <h2>Quizzes</h2>
            <ul className="list-group">
                {
                    quizzes.map((quiz) => {
                        return (
                            <li className="list-group-item text-primary" key={quiz._id}>
                                {quiz.title}
                                <Link to={`/courses/${courseId}/quizzes/${quiz._id}`}>
                                    <button className="btn btn-primary float-right">Start</button>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default QuizzesList