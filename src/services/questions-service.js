const QUIZZES_URL = "http://localhost:4000/api/quizzes";
const QUESTIONS_URL = "http://localhost:4000/api/questions";


export const findAllQuestions = () =>
    fetch(`${QUESTIONS_URL}`)
        .then(response => response.json())



export const findQuestionsForQuiz = (quizId) =>
    fetch(`${QUIZZES_URL}/${quizId}/questions`)
        .then(response => response.json())






const api = {
    findAllQuestions,
    findQuestionsForQuiz,

}


export default api