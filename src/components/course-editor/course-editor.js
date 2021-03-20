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
import WidgetList from "./widgets/widget-list";
import widgetReducer from "../reducers/widget-reducer";


const reducer = combineReducers({
    moduleReducer: moduleReducer,
    lessonReducer: lessonReducer,
    topicReducer: topicReducer,
    widgetReducer: widgetReducer,
})


const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


const CourseEditor = ({history}) => {
    const {courseId, moduleId, lessonId, topicId, layout} = useParams();
    const [currentCourse, setCurrentCourse] = useState("")

    useEffect(() => {
        courseService.findCourseById(courseId).then(data => setCurrentCourse(data.title))
    }, [])

    return (

        <Provider store={store}>
            <div>
                {console.log("course editor render")}
                <h2>
                    <Link to={`/courses/${layout}`}>
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
                        <br/>
                        <WidgetList/>
                    </div>
                </div>
            </div>
        </Provider>
    )
}

export default CourseEditor