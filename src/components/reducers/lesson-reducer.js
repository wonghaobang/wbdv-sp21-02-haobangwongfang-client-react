
const initialState = {
    lessons: []
}



const lessonReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_LESSON":
            return {
                ...state,
                lessons: [
                    ...state.lessons,
                    action.lesson
                ]
            }

        case "FIND_LESSONS_FOR_MODULE":
            return {
                ...state,
                lessons: action.lessons
            }

        case "DELETE_LESSON":
            const newState1 = {
                lessons: state.lessons.filter(lesson => {
                    if (lesson._id === action.lessonToDelete._id) {
                        return false
                    } else {
                        return true
                    }
                })
            }
            return newState1

        case "UPDATE_LESSON":
            return {
                lessons: state.lessons.map(les => {
                    if (les._id === action.lessonToUpdate._id) {
                        return action.lessonToUpdate
                        // if (m._id === action.module._id) {
                        //     return action.module
                    } else {
                        return les
                    }
                })
            }

        default:
            return state
    }
}

export default lessonReducer