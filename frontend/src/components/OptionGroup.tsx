import  {useState} from "react";
import "./OptionGroup.css"

type OptionGroupProps = {
    options: { id: number, label: string, value: string }[],
    handleOption: (value: string) => void,
    error? : string
}

export default function OptionGroup(props: Readonly<OptionGroupProps>) {
    const [activeButton, setActiveButton] = useState(null)
    const hasError = props.error !== "" && props.error !== undefined


    // @ts-ignore
    function chooseOption(event){
        setActiveButton(event.target.id)
        props.handleOption(event.target.value)
    }

    return (
        <>
            <div className={hasError ? "optiongroup-error" : "optiongroup"}>
                {props.options.map((option) => <button
                    key={option.id}
                    id={option.label}
                    value={option.value}
                    type={"button"}
                    className={activeButton === option.label ? "optiongroup-button-active" : "optiongroup-button"}
                    onClick={chooseOption}>{option.label}</button>)}
            </div>
            {hasError && <label className={"optiongroup-label"}>{props.error}</label>}
        </>
    );
}