import React, {useEffect} from 'react'
import {connect} from "react-redux";
import EditableItem from "./editable-item";
import {useParams} from "react-router-dom";
import moduleService from "../services/module-service"

// good idea to initialize it to some default just in case it did not map well
// all these are from reducer, these are not props
const ModuleList = (
    {
        myModules = [
            {_id: "111", title: "module A"},
            {_id: "222", title: "module B"},
            {_id: "333", title: "module C"}
        ],
        findModulesForCourse = (courseId) => console.log(courseId),
        createModule = () => alert("did not receive createModule from redux, trying to create a new module"),
        deleteModule = (item) => alert("did not receive deleteModule from redux, trying to delete: " + item._id),
        updateModule = (item) => alert("did not receive updateModule from redux, trying to update: " + item._id),
    }) => {

    const {courseId, moduleId, layout} = useParams();
    useEffect(() => {
        findModulesForCourse((courseId))
    }, [])


    return (
        <div>
            <ul className="list-group">
                {
                    myModules.map(module =>
                        <li key={module._id} className={`list-group-item ${module._id === moduleId ? 'active' : ''}`}>
                            <EditableItem
                                to={`/courses/${layout}/edit/${courseId}/modules/${module._id}`}
                                updateItem={updateModule}
                                deleteItem={deleteModule}
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
        findModulesForCourse: (courseId) => {
            moduleService.findModulesForCourse(courseId)
                .then(theModules => dispatch({
                    type: "FIND_MODULES_FOR_COURSE",
                    modules: theModules
                }))
        },

        createModule: (courseId) => {
            moduleService.createModule(courseId, {title: "New Module"})
                .then(theActualModule => dispatch({
                    type: "CREATE_MODULE",
                    module: theActualModule
                }))
        },

        updateModule: (module) => {
            moduleService.updateModule(module._id, module)
                .then(status => dispatch({
                    type: "UPDATE_MODULE",
                    moduleToUpdate: module      // prof just used module (shortcut of module: module)

                }))
        },

        deleteModule: (item) => {
            moduleService.deleteModule(item._id)
                .then(status => dispatch({
                    type: "DELETE_MODULE",
                    moduleToDelete: item        // prof just used module (shortcut of module: module)
                }))
        },
    }
}


export default connect(stpm, dtpm)
        (ModuleList)