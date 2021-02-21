import React, {useState} from 'react'
import {Link} from "react-router-dom";
// import {updateCourse} from "../services/course-service";

const CourseRow = ({deleteCourse, updateCourse, course, lastModified, title, owner}) => {
    const [editing, setEditing] = useState(false)
    const [newTitle, setNewTitle] = useState(title)
    const saveTitle = () => {
        setEditing(false)
        const newCourse = {
            ...course,
            title: newTitle
        }
        updateCourse(newCourse)
    }

    return (<tr>
        <td>
            {
                !editing &&
                <Link to="/courses/editor" style={{"color": "black"}}>
                    <i className="fas fa-file pr-2 text-primary"></i>
                    {title}
                </Link>
            }
            {
                editing &&
                <input onChange={(event) => setNewTitle(event.target.value)}
                       value={newTitle}
                       className="form-control"/>
            }
        </td>
        <td className="d-none d-sm-table-cell">{owner}</td>
        <td className="d-none d-md-table-cell">{lastModified}</td>
        <td></td>
        <td>
            { editing && <i onClick={() => saveTitle()} className="fas fa-check" style={{"color": "green"}}></i> }
            { editing && <i onClick={() => deleteCourse(course)} className="fas fa-times" style={{"color": "red"}}></i> }
            { !editing && <i onClick={() => setEditing(true)} className="fas fa-edit" style={{"color": "blue"}}></i> }
        </td>
    </tr>)
}

export default CourseRow