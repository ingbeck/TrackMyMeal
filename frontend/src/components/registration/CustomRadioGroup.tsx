import "./CustomRadioGroup.css"
import {ChangeEvent} from "react";

type CustomRadioGroupProps = {
    label : string,
    name: string,
    choices : { id: number, label: string, value: string }[],
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
    error? : string
}
export default function CustomRadioGroup(props: Readonly<CustomRadioGroupProps>) {

    const hasError = props.error !== "" && props.error !== undefined

    return (
        <>
            <div className={"container"}>
                <div className={hasError ? "radio-container-error" : "radio-container"}>
                    <label id={"radio-label"}>{props.label}</label>
                    {
                        props.choices.map((choice) =>
                            <div className={"radio-container-choice"} key={choice.id}>
                                <input type={"radio"}
                                       id={choice.label}
                                       name={props.name}
                                       value={choice.value}
                                       onChange={props.handleChange}
                                />
                                <label htmlFor={choice.label}>{choice.label}</label>
                            </div>
                        )
                    }
                </div>
            </div>
        </>


    );
}
