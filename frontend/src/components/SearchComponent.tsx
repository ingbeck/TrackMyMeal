import {ChangeEvent} from "react";

type SearchComponentProps = {
    handleSearchText: (searchText: string) => void,
}

export default function SearchComponent(props: Readonly<SearchComponentProps>) {


    function handleInputOnChange(event:ChangeEvent<HTMLInputElement>){
        props.handleSearchText(event.target.value);
    }

    return (
        <>
            <input onChange={handleInputOnChange}/>
        </>
    )
}
