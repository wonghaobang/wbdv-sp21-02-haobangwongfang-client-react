import React, {useEffect} from 'react'
import {connect} from "react-redux";
import EditableItem from "../editable-item";
import {useParams} from "react-router-dom";
import topicService from '../../services/topic-service'


const TopicPills = ({
                        topics = [
                            {_id: "777", title: "topic A"},
                            {_id: "888", title: "topic B"},
                            {_id: "999", title: "topic C"}
                        ],
                        findTopicsForLesson = (lessonId) => alert("failed to load topis with lessonId: " + lessonId),
                        createTopic = () => alert("did not receive createTopic from redux, trying to create a new topic"),
                        deleteTopic = (item) => alert("did not receive deleteTopic from redux, trying to delete: " + item._id),
                        updateTopic = (item) => alert("did not receive updateTopic from redux, trying to update: " + item._id),
                        clearTopic = () => alert("clear topic did not work")
                    }) => {

    const {courseId, moduleId, lessonId, layout, topicId} = useParams()
    useEffect(() => {
        if ((moduleId !== "undefined" && typeof moduleId !== "undefined") &&
            (lessonId !== "undefined" && typeof lessonId !== "undefined")) {
            findTopicsForLesson(lessonId)
        }
        return () => {
            clearTopic()
        }
    }, [moduleId, lessonId])


    return (
        <div>
            <ul className="nav nav-pills pt-3">
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
                       className="fas fa-plus fa-2x text-primary pl-3"></i>
                </li>

            </ul>
        </div>)
}



const stpm = (state) => ({
    topics: state.topicReducer.topics
})



const dtpm = (dispatch) => ({
    findTopicsForLesson: (lessonId) => {
        topicService.findTopicsForLesson(lessonId)
            .then(theTopics => dispatch({
                type: "FIND_TOPICS_FOR_LESSON",
                topics: theTopics
            }),
                console.log("loaded topics for lessonId: " + lessonId))
    },

    createTopic: (lessonId) => {
        topicService.createTopic(lessonId, {title: "New Topic"})
            .then(theActualTopic => dispatch({
                type: "CREATE_TOPIC",
                topicToCreate: theActualTopic
            }),
                console.log("created topic for lessonId: " + lessonId))
    },

    updateTopic: (topic) => {
        topicService.updateTopic(topic._id, topic)
            .then(status => dispatch({
                type: "UPDATE_TOPIC",
                topicToUpdate: topic
            }),
                console.log("updated topicId: " + topic._id))
    },

    deleteTopic: (topic) => {
        topicService.deleteTopic(topic._id)
            .then(status => dispatch({
                type: "DELETE_TOPIC",
                topicToDelete: topic
            }),
                console.log("deleted topicId: " + topic._id))
    },

    clearTopic: () => {
         dispatch({
            type: "CLEAR_TOPIC"
         })
        console.log("clearing topics from useEffect hook")
    },



})

export default connect(stpm, dtpm)(TopicPills)