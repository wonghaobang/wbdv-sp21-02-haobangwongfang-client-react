import React, {useEffect} from 'react'
import {connect} from "react-redux";
import EditableItem from "./editable-item";
import {useParams} from "react-router-dom";
import topicService from '../services/topic-service'


const TopicPills = ({
                        topics = [
                            {_id: "123", title: "topic A"},
                            {_id: "234", title: "topic B"},
                            {_id: "345", title: "topic C"}
                        ],
                        findTopicsForLesson,
                        createTopic,
                        deleteTopic = (item) => alert("delete " + item._id),
                        updateTopic = (topic) => alert("delete " + topic._id),
                        clearTopic = () => console.log("Hao say: clear topic did not work")
                    }) => {
    const {courseId, moduleId, lessonId, layout, topicId} = useParams()
    useEffect(() => {
        console.log("LOAD TOPICS FOR LESSON: " + lessonId)
        if ((moduleId !== "undefined" && typeof moduleId !== "undefined") &&
            (lessonId !== "undefined" && typeof lessonId !== "undefined")) {
            findTopicsForLesson(lessonId)
        }
        return () => {
            clearTopic()
        }
    }, [lessonId], [moduleId])

    return (
        <div>
            <h2>Topics</h2>
            <ul className="nav nav-tabs">
                {
                    topics.map(topic =>
                        <li className="nav-item" key={topic._id}>
                            <EditableItem
                                active={topic._id === topicId}
                                to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lessonId}/topics/${topic._id}`}
                                updateItem={updateTopic}
                                deleteItem={deleteTopic}
                                item={topic}/>
                        </li>
                    )
                }

                <li>
                    <i onClick={() => {lessonId === undefined || moduleId === undefined ? alert("pick a lesson first") : createTopic(lessonId)}}
                       className="fas fa-plus fa-2x text-primary"></i>
                </li>
            </ul>
        </div>)
}



const stpm = (state) => ({
    topics: state.topicReducer.topics
})



const dtpm = (dispatch) => ({
    findTopicsForLesson: (lessonId) => {
        // console.log("LOAD TOPICS FOR LESSON")
        // console.log(lessonId)
        topicService.findTopicsForLesson(lessonId)
            .then(theTopics => dispatch({
                type: "FIND_TOPICS_FOR_LESSON",
                topics: theTopics
                // topics   (prof just used topics as shortcut)
            }))
    },

    createTopic: (lessonId) => {
        // console.log("CREATE TOPIC FOR LESSON: " + lessonId)
        topicService.createTopic(lessonId, {title: "New Topic"})
            .then(theActualTopic => dispatch({
                type: "CREATE_TOPIC",
                topic: theActualTopic
                // topics   (prof just used topics as shortcut)
            }))
    },

    updateTopic: (topic) => {
        topicService.updateTopic(topic._id, topic)
            .then(status => dispatch({
                type: "UPDATE_TOPIC",
                topicToUpdate: topic      // prof just used topics (shortcut)
                // topics
            }))
    },

    deleteTopic: (item) => {
        topicService.deleteTopic(item._id)
            .then(status => dispatch({
                type: "DELETE_TOPIC",
                topicToDelete: item
            }))
    },

    clearTopic: () => {
         dispatch({
            type: "CLEAR_TOPIC"
         })
    },



})

export default connect(stpm, dtpm)(TopicPills)