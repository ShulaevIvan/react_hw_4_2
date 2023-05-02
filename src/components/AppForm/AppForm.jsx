import React from "react";
import { useState } from "react";
import { useRef } from "react";
import Data from "../Data/Data";


const AppForm = (props) => {
    const mainAppState = props.state;
    const setMainAppState = props.setState;

    const initialDateState = {
        inputDateRef: useRef(null),
        inputDateResult: undefined,
        inputDateValid: false,
    }
    
    const initialRangeState = {
        inputRangeRef: useRef(null),
        inputRangeValid: false,
    }

    const [dateInputState, setDateInputState] = useState(initialDateState);
    const [rangeInputState, setRangeInputState] = useState(initialRangeState);

    const inputDateHandler = () => {
        const datePattern = /^\d{2}\.\d{2}\.\d{4}$/;
        if (datePattern.test(dateInputState.inputDateRef.current.value)) {
            const day = dateInputState.inputDateRef.current.value.substr(0,2);
            const month = dateInputState.inputDateRef.current.value.substr(2,3).replace('.', '');
            const year = dateInputState.inputDateRef.current.value.substr(6);
            const validDate = `${year}-${month}-${day}`;

            if (day > 31 || month > 12 || year.split('').length > 4) return;
            
            setDateInputState(prevState => ({
                ...prevState,
                inputDateValid: true,
                inputDateResult: validDate
            }));
            
            setMainAppState(prevState => ({
                ...prevState,
                allInputsValid: dateInputState.inputDateValid && 
                rangeInputState.inputRangeValid ? 
                prevState.allInputsValid = true : prevState.allInputsValid = false,
            }));

            return;
        }

        setDateInputState(prevState => ({
            ...prevState,
            inputDateValid: false,
            inputDateResult: undefined,
        }));

        setMainAppState(prevState => ({
            ...prevState,
            allInputsValid: false,
        }));
    }

    const inputRangeHandler = () => {

        if (rangeInputState.inputRangeRef.current.value.trim() !== '' && !isNaN(rangeInputState.inputRangeRef.current.value)) {
            setRangeInputState(prevState => ({
                ...prevState,
                inputRangeValid: true,
            }));

            setMainAppState(prevState => ({
                ...prevState,
                allInputsValid: dateInputState.inputDateValid && 
                rangeInputState.inputRangeValid ? 
                prevState.allInputsValid = true : prevState.allInputsValid = false,
            }));
            return
        }

        setRangeInputState(prevState => ({
            ...prevState,
            inputRangeValid: false,
            inputDateResult: undefined,
        }));

        setMainAppState(prevState => ({
                ...prevState,
                allInputsValid: false,
        }));
    }

    const okBtnHandler = () => {
        if (mainAppState.allInputsValid || (dateInputState.inputDateValid && rangeInputState.inputRangeValid)) {
            const id = Math.random().toString(36).substr(2, 9);
            const date = dateInputState.inputDateRef.current.value;
            const range = rangeInputState.inputRangeRef.current.value;

            let row = <Data 
                id = {mainAppState.editMessageId ? mainAppState.editMessageId : id}
                date={date}
                range={range}
                setMainAppState = {setMainAppState}
                rangeInputState = {rangeInputState}
                dateInputState = {dateInputState}
                >
                </Data>
            
            if (mainAppState.editMessageId) {
                setMainAppState(prevState => ({
                    ...prevState,
                    allInputsValid: false,
                    editMessageId: null,
                    rows : [...prevState.rows].filter((item) => item.props.id !== mainAppState.editMessageId)
                    .sort((a,b) => new Date(a.props.dateInputState.inputDateResult) - new Date(b.props.dateInputState.inputDateResult)).reverse(),
                }));
            }
            
            setMainAppState(prevState => ({
                ...prevState,
                allInputsValid: false,
                rows: [...prevState.rows, row]
                .sort((a,b) => new Date(a.props.dateInputState.inputDateResult) - new Date(b.props.dateInputState.inputDateResult)).reverse()
            }));
            
            dateInputState.inputDateRef.current.value = ''
            rangeInputState.inputRangeRef.current.value = ''
            
        }
    }

    return (
        <React.Fragment>
            <div className="training-form-input-date-wrap">
                <label htmlFor="date-input">Дата (ДД.ММ.ГГ)</label>
                <input autoComplete="off" ref={dateInputState.inputDateRef} onInput={inputDateHandler} id="date-input" type="text"></input>
            </div>
            <div className="training-form-input-range-wrap">
                <label htmlFor="range-input">Пройдено км</label>
                <input autoComplete="off" ref={rangeInputState.inputRangeRef} onInput={inputRangeHandler} id="range-input" type="text"></input>
            </div>
            <div className="training-form-ok-btn">
                <label></label>
                <button onClick={okBtnHandler}>ok</button>
            </div>

        </React.Fragment>
    )
}

export default AppForm;