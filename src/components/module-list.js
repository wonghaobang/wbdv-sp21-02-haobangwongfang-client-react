import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import EditableItem from "./editable-item";
import {useParams} from "react-router-dom";
import moduleService from "../services/module-service"
import courseService from "../services/course-service";


// good idea to initialize it to some default just in case it did not map well
// myModules, createModule is from reducer, these are not props
const ModuleList = (
    {
        myModules = [],
        createModule = () => alert("Create Module 234"),
        deleteModule = (item) => alert("delete " + item._id),
        updateModule,
        findModulesForCourse = (courseId) => console.log(courseId)
    }) => {

    const {courseId, moduleId, layout} = useParams();
    useEffect(() => {
        findModulesForCourse((courseId))
    }, [])

    return (
        <div>
            <h2>Modules</h2>
            <ul className="list-group">
                {
                    myModules.map(module =>
                        <li key={module._id} className={`list-group-item ${module._id === moduleId ? 'active' : ''}`}>
                            <EditableItem
                                // to={`/courses/editor/${courseId}/${module._id}`}
                                to={`/courses/${layout}/edit/${courseId}/modules/${module._id}`}
                                updateItem={updateModule}
                                deleteItem={deleteModule}
                                // key={module._id}
                                active={true}
                                item={module}/>
                        </li>
                    )
                }
                <li className="list-group-item text-center">
                    <i onClick={() => createModule(courseId)} className="fas fa-plus fa-2x text-primary"></i>
                </li>
            </ul>
        </div>)
}


const stpm = (state) => {
    return {
        myModules: state.moduleReducer.modules
    }
}


const dtpm = (dispatch) => {
    return {
        createModule: (courseId) => {
            moduleService.createModule(courseId, {title: "New Module"})
                .then(theActualModule => dispatch({
                    type: "CREATE_MODULE",
                    module: theActualModule
                }))
        },
        deleteModule: (item) =>
            moduleService.deleteModule(item._id)
                .then(status => dispatch({
                    type: "DELETE_MODULE",
                    moduleToDelete: item
                })),
        updateModule: (module) =>
            moduleService.updateModule(module._id, module)
                .then(status => dispatch({
                    type: "UPDATE_MODULE",
                    moduleToUpdate: module      // prof just used module (shortcut of module: module)
                    // module
                })),
        findModulesForCourse: (courseId) => {
            moduleService.findModulesForCourse(courseId)
                .then(theModules => dispatch({
                    type: "FIND_MODULES_FOR_COURSE",
                    modules: theModules
                }))
        }
    }
}


export default connect(stpm, dtpm)
        (ModuleList)