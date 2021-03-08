
const initialState = {
    topics: []
}



const topicReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_TOPIC":
            return {
                ...state,
                topics: [
                    ...state.topics,
                    action.topicToCreate
                ]
            }

        case "FIND_TOPICS_FOR_LESSON":
            return {
                ...state,
                topics: action.topics
            }

        case "DELETE_TOPIC":
            const newState1 = {
                topics: state.topics.filter(topic => {
                    if (topic._id === action.topicToDelete._id) {
                        return false
                    } else {
                        return true
                    }
                })
            }
            return newState1

        case "UPDATE_TOPIC":
            return {
                topics: state.topics.map(t => {
                    if (t._id === action.topicToUpdate._id) {
                        return action.topicToUpdate
                    } else {
                        return t
                    }
                })
            }

        case "CLEAR_TOPIC":
            return {
                topics: []
            }

        default:
            return state
    }
}

export default topicReducer