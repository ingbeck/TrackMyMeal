import {ChangeEvent, useState} from 'react';
import "./FloatingInput.css"
import {getDateToday} from "../../Utility/DateTime.ts";
// @ts-ignore
import InputMask from "react-input-mask";

type FloatingDatePickerProps = {
    label: string,
    name: string,
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
    error? : string
}
export default function FloatingDatePicker(props: Readonly<FloatingDatePickerProps>) {

    const [value, setValue] = useState('');
    const hasError = props.error !== "" && props.error !== undefined

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        setValue(value);
        props.handleChange(e);
    }


    return (
       <div className={hasError ? "input-container-error" : "input-container"}>
           <InputMask className={"input-container-datepicker"}
                  value={value}
                  name={props.name}
                      mask="99.99.9999"
                  max={getDateToday()}
                  onChange={handleChange}
                  placeholder={props.label}/>
           <span className={"err"}>{props.error}</span>
       </div>
    );
}