
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
                    action.lessonToCreate
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
                    } else {
                        return les
                    }
                })
            }

        case "CLEAR_LESSON":
            return {
                lessons: []
            }

        default:
            return state
    }
}

export default lessonReducer