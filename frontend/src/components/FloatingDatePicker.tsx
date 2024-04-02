import {ChangeEvent, useState} from 'react';
import "./FloatingInput.css"

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
           <input className={"input-container-datepicker"}
                  type={"date"}
                  value={value}
                  id="input"
                  name={props.name}
                  onChange={handleChange}/>
           <label className={value && 'filled'} htmlFor={"input"}>
               {hasError ? props.error : props.label}
           </label>
       </div>
    );
}