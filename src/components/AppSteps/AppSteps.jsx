import React from "react";
import { useState } from "react";

import AppForm from "../AppForm/AppForm";

const AppSteps = () => {

    const initialState = {
        editMessageId: undefined,
        allInputsValid: undefined,
        rows: [],
    };

    const [appState, setAppState] = useState(initialState);


    return (
        <React.Fragment>
        <div className="training-form-wrap">
            <div className="training-form-inputs-row">
               <AppForm state = {appState} setState = {setAppState}></AppForm>
            </div>
            <div className="training-form-result-column-wrap">
                {appState.rows ? appState.rows.map((row, i) => {
                    return (
                        <React.Fragment key={i}>
                            {row}
                        </React.Fragment>
                    )
                }) : null}
            </div>
        </div>
        </React.Fragment>
    );
}

export default AppSteps;