import React from 'react'
import './course-editor.css';

const CourseEditor = ({props}) =>
    // 50:12 min in video
    // put the content of whatever I have in the body
    <div>

        <div className="container-fluid wbdv-bg-lessdark-grey">

            <div className="row">
                <div className="col-1">
                    {/*<a className="nav-link text-white" href="#">*/}
                    {/*    <i className="fas fa-times fa-2x text-muted"></i>*/}
                    {/*</a>*/}
                    <i onClick={() => props.history.goBack()}
                       className="fas fa-times fa-2x text-muted">
                    </i>
                </div>
                <div className="col-3 h3 pt-1 text-white">
                    CS5610 - WebDev
                </div>

                <div className="col-8">
                    <ul className="nav nav-tabs">
                        <li className="nav-item mx-4">
                            <a href="#" className="nav-link">Build</a>
                        </li>
                        <li className="nav-item mx-4">
                            <a className="nav-link active bg-dark text-white" aria-current="page"
                               href="#">Pages</a>
                        </li>
                        <li className="nav-item mx-4">
                            <a className="nav-link" href="#">Theme</a>
                        </li>
                        <li className="nav-item mx-4">
                            <a className="nav-link" href="#">Store</a>
                        </li>
                        <li className="nav-item mx-4">
                            <a className="nav-link" href="#">Apps</a>
                        </li>
                        <li className="nav-item mx-4">
                            <a className="nav-link" href="#">Settings</a>
                        </li>
                        <li className="nav-item mx-4">
                            <a className="nav-link text-white" href="#">
                                <i className="fa fa-plus fa-2x"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

        </div>


        <div className="row no-gutters">

            <div className="col-4 leftside p-3">

                <ul className="list-group text-white">
                    <li className="list-group-item wbdv-bg-lessdark-grey">
                        Module 1 - jQuery
                        <i className="fa fa-trash float-right"></i>
                    </li>
                    <br/>
                    <li className="list-group-item wbdv-bg-lessdark-grey active">
                        Module 2 - React
                        <i className="fa fa-trash float-right"></i>
                    </li>
                    <br/>
                    <li className="list-group-item wbdv-bg-lessdark-grey">
                        Module 3 - Redux
                        <i className="fa fa-trash float-right"></i>
                    </li>
                    <br/>
                    <li className="list-group-item wbdv-bg-lessdark-grey">
                        Module 4 - Native
                        <i className="fa fa-trash float-right"></i>
                    </li>
                    <br/>
                    <li className="list-group-item wbdv-bg-lessdark-grey">
                        Module 5 - Angular
                        <i className="fa fa-trash float-right"></i>
                    </li>
                    <br/>
                    <li className="list-group-item wbdv-bg-lessdark-grey">
                        Module 6 - Node
                        <i className="fa fa-trash float-right"></i>
                    </li>
                    <br/>
                    <li className="list-group-item wbdv-bg-lessdark-grey">
                        Module 7 - Mongo
                        <i className="fa fa-trash float-right"></i>
                    </li>
                    <br/>
                    <li className="list-group-item bg-dark">
                        <i className="fa fa-plus float-right"></i>
                    </li>
                </ul>
            </div>

            <div className="col-8 rightside p-3">
                <ul className="nav nav-pills">
                    <li className="nav-item bg-secondary mx-4">
                        <a className="nav-link text-white" href="#">Topic 1</a>
                    </li>
                    <li className="nav-item bg-secondary mx-4">
                        <a className="nav-link active bg-dark text-white" aria-current="page" href="#">Topic
                            2</a>
                    </li>
                    <li className="nav-item bg-secondary mx-4">
                        <a className="nav-link text-white" href="#">Topic 3</a>
                    </li>
                    <li className="nav-item bg-secondary mx-4">
                        <a className="nav-link text-white" href="#">Topic 4</a>
                    </li>
                    <li className="nav-item bg-secondary mx-4">
                        <a className="nav-link text-white" href="#">
                            <i className="fa fa-plus"></i>
                        </a>
                    </li>
                </ul>
            </div>

        </div>


    </div>

export default CourseEditor