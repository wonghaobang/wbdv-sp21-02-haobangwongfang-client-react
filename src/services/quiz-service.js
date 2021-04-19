const QUIZZES_URL = "http://localhost:4000/api/quizzes";



export const findAllQuizzes = () =>
    fetch(`${QUIZZES_URL}`)
        .then(response => response.json())



export const findQuizById = (qid) => {
    fetch(`${QUIZZES_URL}/${qid}`)
        .then(response => response.json())
}


export const submitQuiz = (quizId, questions) => {
    fetch(`${QUIZZES_URL}/${quizId}/attempts`, {
        method: 'POST',
        body: JSON.stringify(questions),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
}



export const findAttemptsForQuiz = (quizId) => {
    fetch(`${QUIZZES_URL}/${quizId}/attempts`)
        .then(response => response.json())

}


const api = {
    findAllQuizzes,
    findQuizById,
    submitQuiz,
    findAttemptsForQuiz,
}


export default api