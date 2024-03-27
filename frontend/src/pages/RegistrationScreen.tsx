
import {AppUser} from "../types/AppUser.ts";
import {useParams} from "react-router-dom";
import {
    Button,
    FormControl,
    FormControlLabel, FormLabel, InputAdornment,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select, SelectChangeEvent, TextField,
} from "@mui/material";
import {ChangeEvent, useEffect, useState} from "react";
import "./RegistrationScreen.css"
import {AppUserCreateDto} from "../types/AppUserCreateDto.ts";

type RegistrationScreenProps = {
    getUser : (id:string | undefined) => void,
    createUser : (id:string | undefined, appUserCreateDto:AppUserCreateDto) => void,
    appUser : AppUser
}

type FormInput = {
    birthdateDay:number,
    birthdateMonth:number,
    birthdateYear:number,
    gender : string,
    height : number,
    weight : number,
    activityLevel : string
}

export default function RegistrationScreen(props: Readonly<RegistrationScreenProps>) {

    const params = useParams()
    const initialFormData:FormInput = {
        birthdateDay:0,
        birthdateMonth:0,
        birthdateYear:0,
        gender:"",
        height: 0,
        weight: 0,
        activityLevel: ""
    }
    const[formData, setFormData] = useState<FormInput>(initialFormData)


    useEffect(() => {
        props.getUser(params.id)
    }, [params.id]);

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        const value = event.target.value;
        const name = event.target.name;

        setFormData({
            ...formData,
            [name]: value
        })
        console.log(formData);
    }

    function handleSelectChange(event: SelectChangeEvent<HTMLSelectElement>){
        const value = event.target.value;
        const name = event.target.name;

        setFormData({
            ...formData,
            [name]: value
        })
        console.log(formData)
    }

    // @ts-ignore
    function handleOnSubmit(e){
        const appUserCreateDto:AppUserCreateDto = {
            birthdate : formData.birthdateDay+"."+formData.birthdateMonth+"."+formData.birthdateYear,
            gender : formData.gender,
            height : Number(formData.height),
            weight : Number(formData.weight),
            activityLevel : formData.activityLevel
        }
        props.createUser(params.id, appUserCreateDto)
        e.preventDefault()
    }


    return (
        <div>
            <div className={"regscreen-caption-wrapper"}>
                <h1>Willkommen {props.appUser.name}!</h1>
                <p>Bevor du loslegen kannst, benötigen wir noch ein paar Information über dich:</p>
            </div>
            <form className={"regscreen-form"} onSubmit={handleOnSubmit}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Geschlecht</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Geschlecht"
                        name={"gender"}
                        onChange={handleSelectChange}
                    >
                        <MenuItem value={"MALE"}>männlich</MenuItem>
                        <MenuItem value={"FEMALE"}>weiblich</MenuItem>
                    </Select>
                </FormControl>
                <div className={"regscreen-form-date-wrapper"}>
                    <TextField
                        id="filled-number"
                        label="Tag"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        name={"birthdateDay"}
                        onChange={handleChange}
                    />
                    <TextField
                        id="filled-number"
                        label="Monat"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        name={"birthdateMonth"}
                        onChange={handleChange}
                    />
                    <TextField
                        id="filled-number"
                        label="Jahr"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        name={"birthdateYear"}
                        onChange={handleChange}
                    />
                </div>
                <FormControl fullWidth>
                <TextField
                    id="filled-number"
                    label="Größe"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">cm</InputAdornment>
                    }}
                    variant="outlined"
                    name={"height"}
                    onChange={handleChange}
                />
                </FormControl>
                <FormControl fullWidth>
                <TextField
                    id="filled-number"
                    label="Gewicht"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">kg</InputAdornment>
                    }}
                    variant="outlined"
                    name={"weight"}
                    onChange={handleChange}
                />
                </FormControl>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Wie aktiv bist du?</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="activityLevel"
                    onChange={handleChange}
                >
                    <FormControlLabel value="ATHLETE" control={<Radio />} label="Leistungssportler" />
                    <FormControlLabel value="PUMPER" control={<Radio />} label="Discopumper" />
                    <FormControlLabel value="PEDESTRIAN" control={<Radio />} label="Spaziergänger" />
                    <FormControlLabel value="COUCHPOTATO" control={<Radio />} label="Couchpotato" />
                </RadioGroup>
                </FormControl>
                <Button variant={"contained"} type={"submit"}>Los gehts!</Button>
            </form>
        </div>
    );
}
