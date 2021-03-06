import React, {useEffect} from 'react'
import {connect} from "react-redux";
import EditableItem from "../editable-item";
import {useParams} from "react-router-dom";
import lessonService from '../../services/lesson-service'


const LessonTabs = ({
                        lessons = [
                            {_id: "444", title: "Lesson A"},
                            {_id: "555", title: "Lesson B"},
                            {_id: "666", title: "Lesson C"}
                        ],
                        findLessonsForModule = (moduleId) => alert("failed to load lessons with moduleId: " + moduleId),
                        createLesson = () => alert("did not receive createModule from redux, trying to create a new lesson"),
                        deleteLesson = (item) => alert("did not receive deleteLesson from redux, trying to delete: " + item._id),
                        updateLesson = (item) => alert("did not receive updateLesson from redux, trying to update: " + item._id),
                        clearLesson = () => alert("clear lesson did not work")
                    }) => {

    const {courseId, moduleId, lessonId, layout} = useParams()
    useEffect(() => {
        if (moduleId !== "undefined" && typeof moduleId !== "undefined") {
            findLessonsForModule(moduleId)
        }
        return () => {
            clearLesson()
        }
    }, [moduleId])

    return (
        <div>
            <ul className="nav nav-tabs">
                {
                    lessons.map(lesson =>
                        <li className="nav-item" key={lesson._id}>
                            <EditableItem
                                active={lesson._id === lessonId}
                                to={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lesson._id}`}
                                updateItem={updateLesson}
                                deleteItem={deleteLesson}
                                item={lesson}/>
                        </li>
                    )
                }

                <li>
                    <i onClick={() => {moduleId === undefined ? alert("pick a module first") : createLesson(moduleId)}}
                       className="fas fa-plus fa-2x text-primary pl-3"></i>
                </li>

            </ul>
        </div>)
}



const stpm = (state) => ({
    lessons: state.lessonReducer.lessons
})



const dtpm = (dispatch) => ({
    findLessonsForModule: (moduleId) => {
        lessonService.findLessonsForModule(moduleId)
            .then(theLessons => dispatch({
                type: "FIND_LESSONS_FOR_MODULE",
                lessons: theLessons
            }),
                console.log("loaded lessons for moduleId: " + moduleId))
    },

    createLesson: (moduleId) => {
        lessonService.createLesson(moduleId, {title: "New Lesson"})
            .then(theActualLesson => dispatch({
                type: "CREATE_LESSON",
                lessonToCreate: theActualLesson
            }),
                console.log("created lesson for moduleId: " + moduleId))
    },

    updateLesson: (lesson) => {
        lessonService.updateLesson(lesson._id, lesson)
            .then(status => dispatch({
                type: "UPDATE_LESSON",
                lessonToUpdate: lesson
            }),
                console.log("updated lessonId: " + lesson._id))
    },

    deleteLesson: (lesson) => {
        lessonService.deleteLesson(lesson._id)
            .then(status => dispatch({
                type: "DELETE_LESSON",
                lessonToDelete: lesson
            }),
                console.log("deleted lessonId: " + lesson._id),
                dispatch({
                    type: "CLEAR_TOPIC"
                }))
    },

    clearLesson: () => {
        dispatch({
            type: "CLEAR_LESSON"
        })
        console.log("clearing lessons from useEffect hook")
    },



})

export default connect(stpm, dtpm)(LessonTabs)