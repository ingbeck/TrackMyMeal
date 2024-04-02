import "./CustomRadioGroup.css"
import {ChangeEvent} from "react";

type CustomRadioGroupProps = {
    label : string,
    choices : { id: number, label: string, value: string }[],
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
    error? : string
}
export default function CustomRadioGroup(props: Readonly<CustomRadioGroupProps>) {

    const hasError = props.error !== "" && props.error !== undefined

    return (
        <>
            <div className={hasError ? "container-error" : "container"}>
                <div className={"radio-container"}>
                    <label className={"radio-container-label"}>{props.label}</label>
                    {
                        props.choices.map((choice) =>
                            <div className={"radio-container-choice"} key={choice.id}>
                                <input type={"radio"}
                                       id={choice.label}
                                       name={"activityLevel"}
                                       value={choice.value}
                                       onChange={props.handleChange}
                                />
                                <label htmlFor={choice.label}>{choice.label}</label>
                            </div>
                        )
                    }
                </div>
            </div>
            {hasError && <label className={"radio-container-label-error"}>{props.error}</label>}
        </>


    );
}
