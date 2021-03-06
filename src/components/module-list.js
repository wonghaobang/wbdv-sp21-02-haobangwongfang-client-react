import React, {useEffect} from 'react'
import {connect} from "react-redux";
import EditableItem from "./editable-item";
import {useParams} from "react-router-dom";
import moduleService from "../services/module-service"

// good idea to initialize it to some default just in case it did not map well
// myModules, createModule is from reducer, these are not props
const ModuleList = (
    {
        myModules = [],
        createModule = () => alert("Create Module 234"),
        deleteModule = (item) => alert("delete " + item._id),
        updateModule,
        findModulesForCourse = (courseID) => console.log(courseID)
    }) => {

    const {courseID, moduleID} = useParams();
    useEffect(() => {
        findModulesForCourse((courseID))
    }, [])

    return (
        <div>
            <h2>Modules</h2>
            <ul className="list-group">
                {
                    myModules.map(module =>
                        <li className={`list-group-item ${module._id === moduleID ? 'active' : ''}`}>
                            <EditableItem
                                to={`/courses/editor/${courseID}/${module._id}`}
                                updateItem={updateModule}
                                deleteItem={deleteModule}
                                key={module._id}
                                active={true}
                                item={module}/>
                        </li>
                    )
                }
                <li className="list-group-item">
                    <i onClick={() => createModule(courseID)} className="fas fa-plus fa-2x"></i>
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
        createModule: (courseID) => {
            moduleService.createModuleForCourse(courseID, {title: "New Module"})
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
        findModulesForCourse: (courseID) => {
            moduleService.findModulesForCourse(courseID)
                .then(theModules => dispatch({
                    type: "FIND_MODULES_FOR_COURSE",
                    modules: theModules
                }))
        }
    }
}


export default connect(stpm, dtpm)
        (ModuleList)