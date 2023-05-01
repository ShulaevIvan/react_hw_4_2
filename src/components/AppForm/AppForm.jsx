import React from "react";


const AppForm = (props) => {
    return (
        <React.Fragment>
            <div className="training-form-input-date-wrap">
                <label htmlFor="date-input">Дата (ДД.ММ.ГГ)</label>
                <input ref={props.dateRef} onChange={props.inputDateEvent} id="date-input" type="text"></input>
            </div>
            <div className="training-form-input-range-wrap">
                <label htmlFor="range-input">Пройдено км</label>
                <input id="range-input" type="text"></input>
            </div>
            <div className="training-form-ok-btn">
                <label></label>
                <button>ok</button>
            </div>

        </React.Fragment>
    )
}

export default AppForm;