import React from 'react'

const ImageWidget = ({widget, editing, setWidget}) =>
    <div>
        {
            !editing &&
            <img src={widget.src} width={widget.width} height={widget.height}/>
        }

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

                Image URL
                <input
                    className="form-control"
                    defaultValue={widget.src}
                    placeholder="Image URL"
                    onChange={(e) => setWidget({...widget, src: e.target.value})}/>
                <br/>

                Image width
                <input
                    className="form-control"
                    defaultValue={widget.width}
                    onChange={(e) => setWidget({...widget, width: parseInt(e.target.value)})}/>
                <br/>

                Image height
                <input
                    className="form-control"
                    defaultValue={widget.height}
                    onChange={(e) => setWidget({...widget, height: parseInt(e.target.value)})}/>
            </>
        }
    </div>


export default ImageWidget