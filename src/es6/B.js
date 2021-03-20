import React, {useState} from 'react'
import {useParams} from "react-router-dom";

const B = () => {
    const {c, d} = useParams()
    return(
        <span>{c - d}</span>
    )
}


export default B