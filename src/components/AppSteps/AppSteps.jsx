import React from "react";
import { useState } from "react";
import { useRef } from "react";


import AppForm from "../AppForm/AppForm";

const AppSteps = () => {

    const initialState = {
        inputDate: useRef(null),
        dateInputValid: false,
        rangeInputValid: false,
        rows: [],
        resultDate: undefined,
    };

    const [appState, setAppState] = useState(initialState);

    const inputDateHandler = () => {
        const datePattern = /^\d{2}\.\d{2}\.\d{4}$/;
        if (datePattern.test(appState.inputDate.current.value)) {
            const day = appState.inputDate.current.value.substr(0,2);
            const month = appState.inputDate.current.value.substr(2,3).replace('.', '');
            const year = appState.inputDate.current.value.substr(6);
            const validDate = `${year}-${month}-${day}`;

            setAppState(prevState => ({
                ...prevState,
                dateInputValid: true,
                resultDate: validDate
            }));
        }
    }


    return (
        <React.Fragment>
        <div className="training-form-wrap">
            <div className="training-form-inputs-row">
               <AppForm dateRef={appState.inputDate} inputDateEvent = {inputDateHandler}></AppForm>
            </div>
            <div className="training-form-result-column-wrap">
                <div className="training-form-result-item-row">
                    <div className="training-form-result-date">date</div>
                    <div className="training-form-result-range">range</div>
                        <div className="training-form-result-controls-wrap">
                            <span className="edit-btn"></span>
                            <span className="rm-btn"></span>
                    </div>
                </div>  
            </div>
        </div>
        </React.Fragment>
    );
}

export default AppSteps;