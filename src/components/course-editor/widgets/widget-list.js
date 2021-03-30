import React, {useState, useEffect} from 'react'
import HeadingWidget from "./heading-widget";
import ParagraphWidget from "./paragraph-widget";
import {Link, useParams} from "react-router-dom"
import {connect} from "react-redux";
import widgetService from "../../../services/widget-service";
import ListWidget from "./list-widget";
import ImageWidget from "./image-widget";

const WidgetList = ({widgets, findWidgetsForTopic, createWidget, updateWidget, deleteWidget}) => {
    const {topicId} = useParams()

    const [editingWidget, setEditingWidget] = useState({})

    useEffect(() => {
        findWidgetsForTopic(topicId)
    }, [topicId])


    return (
        <div>
            <i onClick={() => {
                topicId === undefined ? alert("pick a topic first") : createWidget(topicId)
            }} className="fas fa-plus float-right fa-2x">
            </i>

            <br/><br/>
            <ul className="list-group">
                {
                    widgets.map(widget =>
                        <li key={widget.id} className="list-group-item">

                            {
                                widget.id === editingWidget.id &&
                                <>
                                    <i onClick={() => deleteWidget(widget)} className="fas fa-trash text-danger float-right"></i>
                                    <i onClick={() => {
                                        updateWidget(widget.id, editingWidget)
                                        setEditingWidget({})
                                    }} className="fas fa-check float-right pr-1 text-success">
                                    </i>
                                </>
                            }


                            {
                                widget.id !== editingWidget.id &&
                                <i onClick={() => {
                                    setEditingWidget(widget)
                                }} className="fas fa-cog float-right">
                                </i>
                            }


                            {
                                widget.type === "HEADING" &&
                                <HeadingWidget
                                    setWidget={setEditingWidget}
                                    editing={widget.id === editingWidget.id}
                                    widget={widget}/>
                            }

                            {
                                widget.type === "PARAGRAPH" &&
                                <ParagraphWidget
                                    setWidget={setEditingWidget}
                                    editing={widget.id === editingWidget.id}
                                    widget={widget}/>
                            }

                            {
                                widget.type === "LIST" &&
                                <ListWidget
                                    setWidget={setEditingWidget}
                                    editing={widget.id === editingWidget.id}
                                    widget={widget}/>
                            }

                            {
                                widget.type === "IMAGE" &&
                                <ImageWidget
                                    setWidget={setEditingWidget}
                                    editing={widget.id === editingWidget.id}
                                    widget={widget}/>
                            }

                        </li>
                    )
                }

                {JSON.stringify(widgets)}

            </ul>
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

    updateWidget: (widgetId, widget) => {
        widgetService.updateWidget(widgetId, widget)
            .then(status => dispatch({
                type: "UPDATE_WIDGET",
                widgetToUpdate: widget
            }))
    },

    deleteWidget: (widget) => {
        widgetService.deleteWidget(widget.id)
            .then(status => dispatch({
                type: "DELETE_WIDGET",
                widgetToDelete: widget
            }))
    },


})


export default connect(stpm, dtpm)(WidgetList);