// const WIDGETS_URL = "http://localhost:8080/api";
const WIDGETS_URL = process.env.REACT_APP_WIDGETS_URL


export const createWidget = (topicId, widget) =>
    fetch(`${WIDGETS_URL}/topics/${topicId}/widgets`, {
        method: "POST",
        body: JSON.stringify(widget),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())



export const findWidgetsForTopic = (topicId) =>
    fetch(`${WIDGETS_URL}/topics/${topicId}/widgets`)
        .then(response => response.json())


// OPTIONAL
export const findAllWidgets = () =>
    fetch(`${WIDGETS_URL}/widgets`)
        .then(response => response.json())


// OPTIONAL
export const findWidgetById = (widgetId) =>
    fetch(`${WIDGETS_URL}/widgets/${widgetId}`)
        .then(response => response.json())




export const updateWidget = (widgetId, widget) =>
    fetch(`${WIDGETS_URL}/widgets/${widgetId}`, {
        method: "PUT",
        body: JSON.stringify(widget),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())



export const deleteWidget = (widgetId) =>
    fetch(`${WIDGETS_URL}/widgets/${widgetId}`, {
        method: "DELETE"
    })
        .then(response => response.json())



const api = {
    createWidget: createWidget,
    findWidgetsForTopic: findWidgetsForTopic,
    findAllWidgets: findAllWidgets,
    findWidgetById: findWidgetById,
    updateWidget: updateWidget,
    deleteWidget: deleteWidget
}


export default api