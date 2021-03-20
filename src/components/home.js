import React from 'react'
import {Link} from "react-router-dom";
import Exam from "../es6/exam";
import YP from "../es6/exam-store"

export default () =>
    <>

        <h1>Home</h1>

        <div className="list-group">

            <Link to="/courses/table" className="list-group-item">
                Courses Table
            </Link>
            <Link to="/courses/grid" className="list-group-item">
                Courses Grid
            </Link>
            <Link to="/courses/editor" className="list-group-item disabled">
                Course Editor
            </Link>

        </div>

    </>