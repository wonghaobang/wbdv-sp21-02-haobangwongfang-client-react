import React, {useEffect, useState} from 'react'
// import './course-editor.css';
import {Link, useParams} from "react-router-dom";
import moduleReducer from "../reducers/modules-reducer";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import ModuleList from "./module-list";
import LessonTabs from "./lesson-tabs";
import lessonReducer from "../reducers/lesson-reducer";
import courseService from "../../services/course-service";
import topicReducer from "../reducers/topic-reducer";
import TopicPills from "./topic-pills";


const reducer = combineReducers({
    moduleReducer: moduleReducer,
    lessonReducer: lessonReducer,
    topicReducer: topicReducer
})


const store = createStore(reducer)


const CourseEditor = ({history}) => {
    const {courseId, moduleId, lessonId, topicId} = useParams();
    const [currentCourse, setCurrentCourse] = useState("")

    useEffect(() => {
        courseService.findCourseById(courseId).then(data => setCurrentCourse(data.title))
    }, [])

    return (

        <Provider store={store}>
            <div>
                <h2>
                    <Link to="/courses/table">
                        <i onClick={() => console.log(`clicking the red x button! CourseId: ${courseId}, moduleId: ${moduleId}, lessonId: ${lessonId}, topicId: ${topicId}`)} className="fas fa-times text-danger pr-3"></i>
                    </Link>
                    {currentCourse}
                    {/*<i onClick={() => history.goBack()}*/}
                    {/*   className="fas fa-times float-right">*/}
                    {/*</i>*/}
                </h2>

                <h5>courseId: {courseId} -> moduleId: {moduleId} -> lessonId: {lessonId} -> topicId: {topicId}</h5>

                <div className="row">
                    <div className="col-4">
                        <ModuleList/>
                    </div>
                    <div className="col-8">
                        <LessonTabs/>
                        <TopicPills/>
                    </div>
                </div>
            </div>
        </Provider>
    )
}

export default CourseEditor