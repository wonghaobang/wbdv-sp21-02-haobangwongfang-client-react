import React from 'react'
// import './course-editor.css';
import {Link, useParams} from "react-router-dom";
import moduleReducer from "../reducers/modules-reducer";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import ModuleList from "../module-list";
import LessonTabs from "../lesson-tabs";
import lessonReducer from "../reducers/lesson-reducer";

const reducer = combineReducers({
    moduleReducer: moduleReducer,
    lessonReducer: lessonReducer
})


const store = createStore(reducer)


const CourseEditor = ({history}) => {
    const {courseID, moduleID} = useParams();

    return (

        <Provider store={store}>
            <div>
                <h2>
                    <Link to="/courses/table">
                        <i className="fas fa-arrow-left"></i>
                    </Link>
                    Course Editor {courseID} {moduleID}
                    <i onClick={() => history.goBack()}
                       className="fas fa-times float-right">
                    </i>
                </h2>

                <div className="row">
                    <div className="col-4">
                        <ModuleList/>
                    </div>
                    <div className="col-8">
                        <LessonTabs/>
                    </div>
                </div>
            </div>
        </Provider>
    )
}

export default CourseEditor