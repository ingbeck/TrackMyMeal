import {ChangeEvent, useState} from 'react';
import "./FloatingInput.css"
import {getDateToday} from "../../Utility.ts";

type FloatingDatePickerProps = {
    label: string,
    name: string,
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
    error? : string
}
export default function FloatingDatePicker(props: Readonly<FloatingDatePickerProps>) {

    const [value, setValue] = useState('');
    const [isClicked, setIsClicked] = useState<boolean>(false)
    const hasError = props.error !== "" && props.error !== undefined
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        setValue(value);
        props.handleChange(e);
    }


    return (
       <div className={hasError ? "input-container-error" : "input-container"}>
           <input className={"input-container-datepicker"}
                  type={isClicked || isIOS ? "date" : "text"}
                  value={value}
                  id="dateInput"
                  name={props.name}
                  max={getDateToday()}
                  onClick={() => setIsClicked(true)}
                  onBlur={() => {
                      if(value === ''){
                          setIsClicked(false)
                  }}}
                  onChange={handleChange}/>
           <label className={value && 'filled'} htmlFor={"input"}>
               {hasError ? props.error : props.label}
           </label>
       </div>
    );
}