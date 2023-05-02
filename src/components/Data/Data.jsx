import React from "react";


const Data = (props) => {
    const setMainAppState = props.setMainAppState;

    const deleteRowHandler = (id) => {

        setMainAppState(prevState => ({
            ...prevState,
            rows: [...prevState.rows].filter((row) => row.props.id !== id)
        }));
    }

    const editRowHandler = () => {
        props.rangeInputState.inputRangeRef.current.value = props.range;
        props.dateInputState.inputDateRef.current.value = props.date;
        setMainAppState(prevState => ({
            ...prevState,
            editMessageId: props.id,
        }))
    }

    return (
        <React.Fragment>
            <div data-id={props.id} className="training-form-result-item-row">
                <div className="training-form-result-date">{props.date}</div>
                <div className="training-form-result-range">{props.range} км.</div>
                    <div className="training-form-result-controls-wrap">
                        <span onClick={() => editRowHandler(props.id)} className="edit-btn"></span>
                        <span onClick={() => deleteRowHandler(props.id)} className="rm-btn"></span>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Data;