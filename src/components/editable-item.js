import React, {useState} from 'react'
import {Link} from "react-router-dom";

// something helpful in understanding- each one has its own state (that's why all can be in toggle to different mode at the same time)
// this component is an individual
// if we want to the edit state to only be available one at a time, we need to move it to the reducer OR make it part of the
// state up here(in the url) so that everybody can read it. Somewhere a global variable that they can all see it and on check themselves
const EditableItem = (
    {   // these are props passed from module-list/lesson-tabs/topic-pills
        // common default between the three like 'to' and 'item' I put here. Others like deleteItem and updateItem have
        // their own default behaviour in their respective components
        to="/somewhere/to/go",
        deleteItem,
        updateItem,
        item = {title: "Some Title", _id: "ABC"},
        active
    }) => {

    const [editing, setEditing] = useState(false)

    const [cachedItem, setCachedItem] = useState(item)

    return (
        <>

            {
                !editing &&
                <>
                    <Link className={`nav-link ${active?'active':''} d-inline`} to={to}>
                        {item.title}
                        {/*putting it below will make clicking on the edit icon the new active item, which I don't think is correct*/}
                        {/*<i onClick={() => setEditing(true)} className="fas fa-pencil-alt"></i>*/}
                    </Link>
                    <i onClick={() => setEditing(true)} className="fas fa-pencil-alt float-right"></i>
                </>
            }

            {
                editing &&
                <>
                    <input
                        onChange={(e) =>
                            setCachedItem({
                                ...cachedItem,
                                title: e.target.value})}
                        value={cachedItem.title}/>

                    <i onClick={() => {
                        setEditing(false)
                        updateItem(cachedItem)
                    }} className="fas fa-check text-success float-right"></i>
                    <i onClick={() => deleteItem(item)} className="fas fa-times pr-1 text-danger float-right"></i>
                </>
            }

        </>
    )
}


export default EditableItem