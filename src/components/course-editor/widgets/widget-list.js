import React, {useState, useEffect} from 'react'
import HeadingWidget from "./heading-widget";
import ParagraphWidget from "./paragraph-widget";
import {useParams} from "react-router-dom";
import widgetService from "../../../services/widget-service"
import {connect} from "react-redux";



const WidgetList = ({widgets, findWidgetsForTopic, createWidget, updateWidget, deleteWidget}) => {

    // TODO: move state management to widgets-reducer
    // const [widgets, setWidgets] = useState([])
    const {topicId} = useParams();
    const [editingWidget, setEditingWidget] = useState({})

    useEffect(() => {
        // TODO: move server communication to widget-service
        // widgetService.findAllWidgets()
        // widgetService.findWidgetsForTopic(topicId)
            // .then(widgets => setWidgets(widgets))
        findWidgetsForTopic(topicId)
    }, [topicId])


    const createWidgetForTopic = () => {
        // fetch(`http://localhost:8080/api/topics/${topicId}/widgets`, {
        //     method: "POST",
        //     body: JSON.stringify({type: "HEADING", size: 1, text: "New Widget"}),
        //     headers: {
        //         'content-type': 'application/json'
        //     }
        // })
        //     .then(response => response.json())
        // widgetService.createWidget(topicId, {type: "HEADING", size: 1, text: "New Widget"})
        //     .then(actualWidget => {
        //         setWidgets(widgets => ([...widgets, actualWidget]))
        //     })
    }



    return (

        <div>
            <i onClick={() => createWidget(topicId)} className="fas fa-plus fa-2x float-right"></i>
            <h2>Widget List ({widgets.length}) {editingWidget.id}</h2>
            <ul className="list-group">
                {
                    widgets.map(widget =>
                        <li className="list-group-item" key={widget.id}>

                            {
                                editingWidget.id === widget.id &&
                                    <>
                                        <i onClick={() => {
                                            updateWidget(widget, editingWidget)
                                            setEditingWidget({})
                                        }} className="fas fa-check fa-2x float-right"></i>
                                        <i onClick={() => deleteWidget(widget)} className="fas fa-trash fa-2x float-right"></i>
                                    </>
                            }

                            {
                                editingWidget.id !== widget.id &&
                                <i onClick={() => setEditingWidget(widget)} className="fas fa-cog fa-2x float-right"></i>
                            }


                            {
                                widget.type === "HEADING" &&
                                <HeadingWidget
                                    editing={editingWidget.id === widget.id}
                                    widget={widget}/>
                            }
                            {
                                widget.type === "PARAGRAPH" &&
                                <ParagraphWidget
                                    editing={editingWidget.id === widget.id}
                                    widget={widget}/>
                            }
                        </li>
                    )
                }
            </ul>
            {JSON.stringify(widgets)}
        </div>

    )
}



const stpm = (state) => ({
    widgets: state.widgetReducer.widgets
})



const dtpm = (dispatch) => ({
    findWidgetsForTopic: (topicId) => {
        widgetService.findWidgetsForTopic(topicId)
            .then(theWidgets => dispatch({
                    type: "FIND_ALL_WIDGETS_FOR_TOPIC",
                    widgets: theWidgets
                }))
    },

    createWidget: (topicId) => {
        widgetService.createWidget(topicId, {type: "HEADING", size: 1, text: "New Widget"})
            .then(theActualWidget => dispatch({
                    type: "CREATE_WIDGET",
                    widgetToCreate: theActualWidget
                }))
    },

    updateWidget: (widget) => {
        widgetService.updateWidget(widget.id, widget)      // I think this should be widget.id, not widget._id
            .then(status => dispatch({                      // because our id does not come from database yet
                    type: "UPDATE_WIDGET",
                    widgetToUpdate: widget
                }))
    },

    deleteWidget: (widget) => {
        widgetService.deleteWidget(widget.id)              // I think this should be widget.id, not widget._id
            .then(status => dispatch({                      // because our id does not come from database yet
                    type: "DELETE_WIDGET",
                    widgetToDelete: widget
                }))
    },


})


export default connect(stpm, dtpm)(WidgetList);