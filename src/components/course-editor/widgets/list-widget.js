import React from 'react'

const ListWidget = ({editing, widget, setWidget}) => {
    return (
        <div>
            {
                editing &&
                <>
                    <select onChange={(e) => setWidget(widget => ({...widget, type: e.target.value}))}
                            defaultValue={widget.type} className="form-control">
                        <option value="HEADING">Heading</option>
                        <option value="PARAGRAPH">Paragraph</option>
                        <option value="LIST">List</option>
                        <option value="IMAGE">Image</option>
                    </select>
                    <br/>

                    <input
                        defaultChecked={widget.ordered}
                        type="checkbox"
                        onChange={(e) => setWidget({...widget, ordered: e.target.checked})}/>
                    Ordered
                    <br/>

                    List items
                    <textarea className="form-control"
                              rows={10}
                              defaultValue={widget.text}
                              placeholder="Enter one list item per line"
                              onChange={(e) => setWidget({...widget, text: e.target.value})}>
                    </textarea>
                </>
            }


            {
                !editing &&
                <>
                    {
                        widget.ordered &&
                        <ol>
                            {
                                widget.text.split("\n").map((item, index) => {
                                    return (
                                        // key cannot be widget.id because the list of item belongs to the same widget
                                        <li key={index}>
                                            {item}
                                        </li>
                                    )
                                })
                            }
                        </ol>
                    }
                    {
                        !widget.ordered &&
                        <ul>
                            {
                                widget.text.split("\n").map((item, index) => {
                                    // key cannot be widget.id because the list of item belongs to the same widget
                                    return (
                                        <li key={index}>
                                            {item}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    }

                </>
            }
        </div>
    )
}

export default ListWidget