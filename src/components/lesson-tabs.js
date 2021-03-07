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
                        createLesson,
                        deleteLesson = (item) => alert("delete " + item._id),
                        updateLesson = (lesson) => alert("delete " + lesson._id)
                    }) => {
    const {courseId, moduleId, lessonId, layout} = useParams()
    useEffect(() => {
        console.log("LOAD LESSONS FOR MODULE: " + moduleId)
        if (moduleId !== "undefined" && typeof moduleId !== "undefined") {
            console.log("moduleID is not undefined")
            findLessonsForModule(moduleId)
        }
    }, [moduleId])

    return (
        <div>
            <h2>Lessons</h2>
            <ul className="nav nav-tabs">
                {
                    lessons.map(lesson =>
                        <li className="nav-item" key={lesson._id}>
                            <EditableItem
                                active={lesson._id === lessonId}
                                // to={`/courses/editor/${courseId}/${moduleId}/${lesson._id}`}
                                to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lesson._id}`}
                                updateItem={updateLesson}
                                deleteItem={deleteLesson}
                                // key={lesson._id}
                                item={lesson}/>

                        </li>
                    )
                }
                <li>
                    {/*<i onClick={() => createLessonForModule(moduleId)} className="fas fa-plus fa-2x"></i>*/}
                    <i onClick={() => {moduleId === undefined ? alert("pick a module first") : createLesson(moduleId)}}
                       className="fas fa-plus fa-2x text-primary"></i>
                </li>
            </ul>
        </div>)
}



const stpm = (state) => ({
    lessons: state.lessonReducer.lessons
})



const dtpm = (dispatch) => ({
    findLessonsForModule: (moduleId) => {
        // console.log("LOAD LESSONS FOR MODULE")
        // console.log(moduleId)
        lessonService.findLessonsForModule(moduleId)
            .then(theLessons => dispatch({
                type: "FIND_LESSONS_FOR_MODULE",
                lessons: theLessons
                // lessons   (prof just used lessons as shortcut)
            }))
    },

    createLesson: (moduleId) => {
        // console.log("CREATE LESSON FOR MODULE: " + moduleId)
        lessonService.createLesson(moduleId, {title: "New Lesson"})
            .then(theActualLesson => dispatch({
                type: "CREATE_LESSON",
                lesson: theActualLesson
                // lesson   (prof just used lessons as shortcut)
            }))
    },

    updateLesson: (lesson) => {
        lessonService.updateLesson(lesson._id, lesson)
            .then(status => dispatch({
                type: "UPDATE_LESSON",
                lessonToUpdate: lesson      // prof just used module (shortcut of module: module)
                // module
            }))
    },

    deleteLesson: (item) => {
        lessonService.deleteLesson(item._id)
            .then(status => dispatch({
                type: "DELETE_LESSON",
                lessonToDelete: item
            }))
    },



})

export default connect(stpm, dtpm)(LessonTabs)