import React, {useState} from 'react'

const mc = (uq = {sf: 7}, rr) => {
    switch(rr.type) {
        case "eu":
            return {
                sf: uq.sf + 10
            }
        case "zu":
            return {
                sf: uq.sf - 2
            }
        default:
            return uq
    }
}


export default mc