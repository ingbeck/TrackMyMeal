import {ChangeEvent, useState} from 'react';
import "./FloatingInput.css"

type FloatingNumberInputProps = {
    label: string,
    name: string,
    maxLength : number,
    unit : string | undefined,
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
    error? : string
}
export default function FloatingNumberInput(props: Readonly<FloatingNumberInputProps>) {

    const [value, setValue] = useState('');
    const regex = new RegExp(/^\d*$/)
    const hasError = props.error !== "" && props.error !== undefined

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value

        if (regex.test(value) && !value.startsWith("0")) {
            if (value.length <= props.maxLength) {
                setValue(value);
                props.handleChange(e);
            }
        }else{
            setValue('');
            props.handleChange(e);
        }
    }

    return (
        <div className={hasError ? "input-container-error" : "input-container"}>
            <input type={"number"}
                   value={value}
                   id="input"
                   name={props.name}
                   pattern="\d*"
                   inputMode={"numeric"}
                   onChange={handleChange}
            placeholder={props.error ? props.error : props.label}/>
        </div>
    );
}