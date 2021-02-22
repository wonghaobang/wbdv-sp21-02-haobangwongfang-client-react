import React, {useState} from 'react'
import {Link} from "react-router-dom";
import './course-card.css';


const CourseCard = ({course, deleteCourse, updateCourse}) => {
    const [editing, setEditing] = useState(false)
    const [newTitle, setNewTitle] = useState(course.title)
    const saveTitle = () => {
        setEditing(false)
        const newCourse = {
            ...course,
            title: newTitle
        }
        updateCourse(newCourse)
    }


    return (<div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
        <div className="card">
            <img src="https://www.valuecoders.com/blog/wp-content/uploads/2016/08/react.png" className="card-img-top" alt="..."/>
            <div className="card-body">

                {
                    !editing && <h5 className="card-title">{course.title}</h5>
                }

                {
                    editing &&
                    <input onChange={(event) => setNewTitle(event.target.value)}
                           value={newTitle}
                           className="form-control"/>
                }

                <p className="card-text">
                    Some quick example text to build on the card title and make up
                    the bulk of the card's content.
                </p>

                <Link to="/courses/editor" className="btn btn-primary">
                    {course.title}
                </Link>

                {editing && <i onClick={() => deleteCourse(course)} className="fas fa-times float-right wbdv-delete-icon"></i>}
                {editing && <i onClick={() => saveTitle()} className="fas fa-check float-right wbdv-check-icon"></i>}
                {!editing && <i onClick={() => setEditing(true)} className="fas fa-edit float-right wbdv-edit-icon"></i>}
            </div>
        </div>
    </div>)


}

export default CourseCard