import React, {useEffect} from 'react'
import {connect} from "react-redux";
import EditableItem from "../editable-item";
import {useParams} from "react-router-dom";
import moduleService from "../../services/module-service"

// good idea to initialize it to some default just in case it did not map well
// all these are from reducer, these are not props
const ModuleList = (
    {
        myModules = [
            {_id: "111", title: "module A"},
            {_id: "222", title: "module B"},
            {_id: "333", title: "module C"}
        ],
        findModulesForCourse = (courseId) => alert("failed to load modules with courseId: " + courseId),
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
                        // unlike lesson-tabs and topic-pills, which are nav elements. This is a list-group, to make it active
                        // I need to put active in the li tag. Passing it down to the editable-item would not work because the
                        // element is a nav-link down there (which works for nav elements)
                        <li key={module._id} className={`list-group-item ${module._id === moduleId ? 'active' : ''}`}>
                            <EditableItem
                                to={`/courses/${layout}/edit/${courseId}/modules/${module._id}`}
                                updateItem={updateModule}
                                deleteItem={deleteModule}
                                active={true}      // still passing this as true to make sure everything works fine in editable-item
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
                }),
                    console.log("loaded modules for courseId: " + courseId))
        },

        createModule: (courseId) => {
            moduleService.createModule(courseId, {title: "New Module"})
                .then(theActualModule => dispatch({
                    type: "CREATE_MODULE",
                    moduleToCreate: theActualModule
                }),
                    console.log("created module for courseId: " + courseId))
        },

        updateModule: (module) => {
            moduleService.updateModule(module._id, module)
                .then(status => dispatch({
                    type: "UPDATE_MODULE",
                    moduleToUpdate: module      // prof just used module (shortcut of module: module)
                }),
                    console.log("updated moduleId: " + module._id))
        },

        deleteModule: (module) => {
            moduleService.deleteModule(module._id)
                .then(status => dispatch({
                    type: "DELETE_MODULE",
                    moduleToDelete: module        // prof just used module (shortcut of module: module)
                }),
                    console.log("deleted moduleId: " + module._id))
        },
    }
}


export default connect(stpm, dtpm)
        (ModuleList)