import React from 'react'

const ParagraphWidget = ({widget, setWidget, editing}) => {
    return (
        <div>

            {
                editing &&
                <>
                    <select onChange={(e) => setWidget(widget => ({...widget, type: e.target.value}))}
                            defaultValue={widget.type} className="form-control">
                        <option value="HEADING">Heading</option>
                        <option value="PARAGRAPH">Paragraph</option>
                    </select>

                    <textarea
                        onChange={(e) => setWidget({...widget, text: e.target.value})}
                        defaultValue={widget.text}
                        className="form-control">
                </textarea>
                </>
            }

            {
                !editing &&
                <p>
                    {widget.text}
                </p>
            }
        </div>
    )
}

export default ParagraphWidget