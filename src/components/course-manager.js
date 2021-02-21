import React from 'react'
import CourseTable from "./course-table";
import CourseGrid from "./course-grid";
import CourseEditor from "./course-editor";
import {Route} from "react-router-dom"
import courseService, {findAllCourses, deleteCourse} from "../services/course-service";

// CourseManager has three things- CourseTable, CourseGrid, CourseEditor
class CourseManager extends React.Component {
    // when things change, I put it inside state?
    state = {
        courses: []
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

    addCourse = () => {
        const newCourse = {
            title: "New Course",
            owner: "me",
            lastModified: "1/1/2021"
        }

        // this is a nono, you can see below two line is calculating new state based on old state
        // this.state.courses.push(newCourse)
        // this.setState(this.state)

        courseService.createCourse(newCourse)
            .then(course => this.setState((prevState) => ({     // below is interpreted as a json object
                ...prevState,
                courses: [
                    ...prevState.courses,
                    course      // appending the course
                ]
            })))
    }


    deleteCourse = (courseToDelete) => {

        courseService.deleteCourse(courseToDelete._id).then(status => {
            // whenever you set a state based on a previous state, the below is not good practice
            // const newCourses = this.state.courses.filter(course => course !== courseToDelete)
            // this.setState({
            //     courses: newCourses
            // })

            // whenever next state is based on a previous state, always follow this syntax of a function...prevState => {
            // this way guarantees the synchronicity of the operations/events. There might be multiple things happening at the same time
            // this make sure that things occur in the order that they were meant to happen
            // this.setState((prevState) => {
            //     // copy over everything that was in the previous state first before I go on and change courses
            //     // If I only do nextState = {} and modify the course state, then I will lose all the other states
            //     let nextState = {...prevState}
            //     nextState.courses = prevState.courses.filter(course => course !== courseToDelete)
            //     return nextState
            // })


            // another syntax
            this.setState((prevState) => ({
                ...prevState,
                courses: prevState.courses.filter(course => course !== courseToDelete)
            }))

        })
    }


    render() {
        return (
            <div>
                {/*<h1>Course Manager</h1>*/}
                <div className="row p-1 mb-2">
                    <div className="col-1">
                        <i className="fas fa-bars fa-2x"></i>
                    </div>
                    <div className="col-2 d-none d-xl-block" style={{"font-size": "25px"}}>
                        Course Manager
                    </div>
                    <div className="col-8">
                        <input className="form-control"
                               placeholder="New Course Title"/>
                    </div>
                    <div onClick={this.addCourse} className="col-1 fa-stack fa-lg" style={{"color": "red", "position": "absolute", "top": "2px", "right": "10px", "cursor": "pointer"}}>
                        <i className="fas fa-circle fa-stack-2x"></i>
                        <i className="fas fa-plus fa-stack-1x fa-inverse"></i>
                    </div>
                </div>

                {/*<button onClick={this.addCourse}>Add Course</button>*/}

                <Route path="/courses/table">
                    <CourseTable
                        updateCourse={this.updateCourse}
                        deleteCourse={this.deleteCourse}
                        courses={this.state.courses}/>
                </Route>
                <Route path="/courses/grid">
                    <CourseGrid
                        updateCourse={this.updateCourse}
                        deleteCourse={this.deleteCourse}
                        courses={this.state.courses}/>
                </Route>
                <Route path="/courses/editor"
                       render={(props) => <CourseEditor props={props}/>}>
                </Route>

                <span onClick={this.addCourse} className="fa-stack fa-2x" style={{"color": "red", "position": "fixed", "bottom": "10px", "right": "10px", "cursor": "pointer"}}>
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fas fa-plus fa-stack-1x fa-inverse"></i>
                </span>

            </div>
        );
    }
}


export default CourseManager