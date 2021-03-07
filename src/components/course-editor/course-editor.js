import React, {useEffect, useState} from 'react'
// import './course-editor.css';
import {Link, useParams} from "react-router-dom";
import moduleReducer from "../reducers/modules-reducer";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import ModuleList from "../module-list";
import LessonTabs from "../lesson-tabs";
import lessonReducer from "../reducers/lesson-reducer";
import courseService from "../../services/course-service";
import topicReducer from "../reducers/topic-reducer";
import TopicPills from "../topic-pills";


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
                        <i onClick={() => console.log("Hao says moduleID: " + moduleId + ", courseID: " + courseId)} className="fas fa-arrow-left"></i>
                    </Link>
                    Course Editor {courseId} {moduleId} {lessonId} {topicId}
                    <i onClick={() => history.goBack()}
                       className="fas fa-times float-right">
                    </i>
                </h2>
                <h2>{currentCourse}</h2>

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