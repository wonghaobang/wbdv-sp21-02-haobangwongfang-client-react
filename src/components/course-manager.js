import React from 'react'
import CourseTable from "./course-table/course-table";
import CourseGrid from "./course-grid/course-grid";
import CourseEditor from "./course-editor/course-editor";
import {Route} from "react-router-dom"
import courseService from "../services/course-service";
import CourseTopRow from "./course-top_row";

// CourseManager has three things- CourseTable, CourseGrid, CourseEditor
class CourseManager extends React.Component {
    // when things change, I put it inside state
    state = {
        courses: [],
        title: ""
    }

    // this part is initialization, we don't care what the list of old courses was. This is the latest and newest list
    // of courses as we know, so we are blindly setting the state to be these courses irrespective of what previous course was
    // so this syntax is appropriate, no need to use the function syntax described in deleteCourse
    componentDidMount = () => {
        courseService.findAllCourses().then(actualCourses => this.setState({
            courses: actualCourses
        }))
    }


    updateCourse = (course) => {
        courseService.updateCourse(course._id, course)
            .then(status => this.setState((prevState) => ({
                ...prevState,
                courses: prevState.courses.map(c => {
                    if (c._id === course._id) {
                        return course
                    } else {
                        return c
                    }
                })
            })))
    }


    getValue = (event) => {
        console.log(event.target.value)
        this.setState({
            title: event.target.value
        })
    }


    addCourse = () => {
        const newCourse = {
            title: this.state.title,
            owner: "me",
            lastModified: "1/1/2021"
        }


        courseService.createCourse(newCourse)
            .then(course => this.setState((prevState) => ({     // below is interpreted as a json object
                ...prevState,
                courses: [
                    ...prevState.courses,
                    course      // appending the course
                ]
            })))

        // reset the state back to empty string ""
        this.setState((prevState) => ({
            ...prevState,
            title: ""
        }))
    }


    deleteCourse = (courseToDelete) => {

        courseService.deleteCourse(courseToDelete._id).then(status => {
            this.setState((prevState) => ({
                ...prevState,
                courses: prevState.courses.filter(course => course !== courseToDelete)
            }))

        })
    }

    render() {
        return (
            <div>

                <Route path="/courses/table" exact={true}>
                    <CourseTopRow
                        addCourse={this.addCourse}
                        getValue={this.getValue}
                        title={this.state.title}/>
                    <CourseTable
                        updateCourse={this.updateCourse}
                        deleteCourse={this.deleteCourse}
                        courses={this.state.courses}/>
                </Route>

                <Route path="/courses/grid" exact={true}>
                    <CourseTopRow
                        addCourse={this.addCourse}
                        getValue={this.getValue}
                        title={this.state.title}/>
                    <CourseGrid
                        updateCourse={this.updateCourse}
                        deleteCourse={this.deleteCourse}
                        courses={this.state.courses}/>
                </Route>

                <Route path=
                       {[
                           "/courses/:layout/edit/:courseId",
                           "/courses/:layout/edit/:courseId/modules/:moduleId",
                           "/courses/:layout/edit/:courseId/modules/:moduleId/lessons/:lessonId",
                           "/courses/:layout/edit/:courseId/modules/:moduleId/lessons/:lessonId/topics/:topicId",
                           "/courses/:layout/edit/:courseId/modules/:moduleId/lessons/:lessonId/topics/:topicId:/widgets/:widgetId"
                       ]}
                       exact={true}
                       render={(props) => <CourseEditor {...props}/>}>
                </Route>

            </div>
        );
    }
}


export default CourseManager