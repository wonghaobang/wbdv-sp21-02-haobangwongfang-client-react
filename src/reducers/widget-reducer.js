
const initialState = {
    widgets: []
}



const widgetReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_WIDGET":
            return {
                ...state,
                widgets: [
                    ...state.widgets,
                    action.widgetToCreate
                ]
            }

        case "FIND_ALL_WIDGETS_FOR_TOPIC":
            return {
                ...state,
                widgets: action.widgets
            }

        case "DELETE_WIDGET":
            return {
                widgets: state.widgets.filter(widget => {
                    if (widget.id === action.widgetToDelete.id) {
                        return false
                    } else {
                        return true
                    }
                })
            }

        case "UPDATE_WIDGET":
            return {
                widgets: state.widgets.map(w => {
                    if (w.id === action.widgetToUpdate.id) {
                        return action.widgetToUpdate
                    } else {
                        return w
                    }
                })
            }

        // OPTIONAL
        case "FIND_ALL_WIDGETS":
            return {
                ...state,
                widgets: action.widgets
            }

        // OPTIONAL
        case "FIND_WIDGET":
            return {
                ...state,
                widgets: action.widgets
            }

        case "CLEAR_WIDGET":
            return {
                widgets: []
            }

        default:
            return state
    }
}

export default widgetReducer