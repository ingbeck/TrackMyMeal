import  {useState} from "react";
import "./OptionGroup.css"

type OptionGroupProps = {
    options: { id: number, label: string, value: string }[],
    handleOption: (value: string) => void
}

export default function OptionGroup(props: Readonly<OptionGroupProps>) {
    const [activeButton, setActiveButton] = useState(null)


    function chooseOption(event){
        setActiveButton(event.target.id)
        props.handleOption(event.target.value)
    }

    return (
        <div className={"optiongroup"}>
            {props.options.map((option) => <button
                key={option.id}
                id={option.label}
                value={option.value}
                type={"button"}
                className={activeButton === option.label ? "optiongroup-button-active" : "optiongroup-button"}
                onClick={chooseOption}>{option.label}</button>)}
        </div>
    );
}