import React, {useEffect} from 'react'
import {connect} from "react-redux";
import EditableItem from "./editable-item";
import {useParams} from "react-router-dom";
import lessonService from '../services/lesson-service'

const LessonTabs = ({
                        lessons = [
                            {_id: "123", title: "Lesson A"},
                            {_id: "234", title: "Lesson B"},
                            {_id: "345", title: "Lesson C"}
                        ],
                        findLessonsForModule,
                        createLessonForModule
                    }) => {
    const {courseID, moduleID, lessonID} = useParams()
    useEffect(() => {
        console.log("LOAD LESSONS FOR MODULE: " + moduleID)
        if (moduleID !== "undefined" && typeof moduleID !== "undefined") {
            findLessonsForModule(moduleID)
        }
    }, [moduleID])
    return (
        <div>
            <h2>Lessons</h2>
            <ul className="nav nav-tabs">
                {
                    lessons.map(lesson =>
                        <li className="nav-item">
                            <EditableItem
                                active={lesson._id === lessonID}
                                to={`/courses/editor/${courseID}/${moduleID}/${lesson._id}`}
                                item={lesson}/>
                        </li>
                    )
                }
                <li>
                    <i onClick={() => createLessonForModule(moduleID)} className="fas fa-plus"></i>
                </li>
            </ul>
        </div>)
}

const stpm = (state) => ({
    lessons: state.lessonReducer.lessons
})

const dtpm = (dispatch) => ({
    findLessonsForModule: (moduleID) => {
        console.log("LOAD LESSONS FOR MODULE")
        console.log(moduleID)
        lessonService.findLessonsForModule(moduleID)
            .then(lessons => dispatch({
                type: "FIND_LESSONS",
                // lessons: lessons        // prof just used lessons as shortcut
                lessons
            }))
    },
    createLessonForModule: (moduleID) => {
        console.log("CREATE LESSON FOR MODULE: " + moduleID)
        lessonService.createLessonForModule(moduleID, {title: "New Lesson"})
            .then(lesson => dispatch({
                type: "CREATE_LESSON",
                // lesson: lesson
                lesson
            }))
    }
})

export default connect(stpm, dtpm)(LessonTabs)