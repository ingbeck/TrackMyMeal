import {ChangeEvent, useState} from 'react';
import "./FloatingInput.css"

type FloatingDatePickerProps = {
    label: string,
    name: string,
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}
export default function FloatingDatePicker(props: Readonly<FloatingDatePickerProps>) {

    const [value, setValue] = useState('');

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        setValue(value);
        props.handleChange(e);
    }

    return (
        <div className="input-container">
            <input type={"date"} value={value} id="input" name={props.name} onChange={handleChange} className={"input-container-datepicker"}/>
            <label className={value && 'filled'} htmlFor={"input"}>
                {props.label}
            </label>
        </div>
    );
}