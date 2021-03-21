import React, {useState, useEffect} from 'react'
import HeadingWidget from "./heading-widget";
import ParagraphWidget from "./paragraph-widget";
import {useParams} from "react-router-dom"
import {connect} from "react-redux";
import widgetService from "../../../services/widget-service";

const WidgetList = ({widgets, findWidgetsForTopic, createWidget, updateWidget, deleteWidget}) => {
    const {topicId} = useParams()

    const [widget, setWidget] = useState({})

    useEffect(() => {
        findWidgetsForTopic(topicId)
    }, [topicId])



    return(
        <div>
            <i onClick={() => {topicId === undefined ? alert("pick a topic first") : createWidget(topicId)}} className="fas fa-plus float-right fa-2x"></i>
            {/*<h1>Widget List {widget.id}</h1>*/}
            <br/>
            <br/>
            <ul className="list-group">
                {
                    widgets.map(_widget =>
                        <li key={_widget.id} className="list-group-item">
                            {
                                _widget.id === widget.id &&
                                <>
                                    <i onClick={() => deleteWidget(_widget)} className="fas fa-trash float-right"></i>
                                    <i onClick={() => {
                                        updateWidget(_widget.id, widget)
                                        setWidget({})
                                    }} className="fas fa-check float-right"></i>
                                </>
                            }
                            {
                                _widget.id !== widget.id &&
                                <i onClick={() => setWidget(_widget)} className="fas fa-cog float-right"></i>
                            }
                            {
                                _widget.type === "HEADING" &&
                                <HeadingWidget
                                    setWidget={setWidget}
                                    editing={_widget.id === widget.id}
                                    widget={_widget}/>
                            }
                            {
                                _widget.type === "PARAGRAPH" &&
                                <ParagraphWidget
                                    setWidget={setWidget}
                                    editing={_widget.id === widget.id}
                                    widget={_widget}/>
                            }
                        </li>
                    )
                }
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
        widgetService.updateWidget(widgetId, widget)      // I think this should be widget.id, not widget._id
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