import React from 'react'
import {Link} from "react-router-dom";

const CourseEditor = ({props}) =>
    // 50:12 min in video
    // put the content of whatever I have in the body
    <div>
        <h2>
            {/*// this is hardcoded path, can remove*/}
            {/*<Link to="/courses/table">*/}
            {/*    <i className="fas fa-arrow-left"></i>*/}
            {/*</Link>*/}
            Course Editor
            <i onClick={() => props.history.goBack()}
               className="fas fa-times float-right">
            </i>
        </h2>
    </div>

export default CourseEditor