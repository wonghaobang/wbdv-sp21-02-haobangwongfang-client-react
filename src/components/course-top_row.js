import React from 'react'


const CourseTopRow = ({addCourse, getValue}) =>
    <div className="row p-1 mb-2">
        <div className="col-1">
            <i className="fas fa-bars fa-2x"></i>
        </div>
        <div className="col-2 d-none d-xl-block" style={{"fontSize": "25px"}}>
            Course Manager
        </div>
        <div className="col-8">
            <input type="text" className="form-control" placeholder="New Course Title" onChange={getValue}/>
        </div>
        <div onClick={addCourse} className="col-1 fa-stack fa-lg" style={{"color": "red", "position": "absolute", "top": "2px", "right": "10px", "cursor": "pointer"}}>
            <i className="fas fa-circle fa-stack-2x"></i>
            <i className="fas fa-plus fa-stack-1x fa-inverse"></i>
        </div>
    </div>


export default CourseTopRow