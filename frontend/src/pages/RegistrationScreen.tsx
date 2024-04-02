
import {AppUser} from "../types/AppUser.ts";
import {useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import "./RegistrationScreen.css"
import {AppUserCreateDto} from "../types/AppUserCreateDto.ts";
import FloatingNumberInput from "../components/FloatingNumberInput.tsx";
import OptionGroup from "../components/OptionGroup.tsx";
import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import FloatingDatePicker from "../components/FloatingDatePicker.tsx";
import * as Yup from 'yup';

type RegistrationScreenProps = {
    getUser : (id:string | undefined) => void,
    createUser : (id:string | undefined, appUserCreateDto:AppUserCreateDto) => void,
    appUser : AppUser
}

export type FormInput = {
    birthday : string,
    gender : string,
    height : number,
    weight : number,
    activityLevel : string
}

type ErrorState = {
    birthday : string,
    gender : string,
    height : string,
    weight : string,
    activityLevel : string
}

export default function RegistrationScreen(props: Readonly<RegistrationScreenProps>) {

    const params = useParams()
    const navigate = useNavigate()
    const initialFormData:FormInput = {
        birthday:"",
        gender:"",
        height: 0,
        weight: 0,
        activityLevel: ""
    }
    const validationSchema = Yup.object().shape({
        birthday: Yup.date()
            .typeError("Bitte Datum angeben")
            .max(new Date(Date.now() - 567648000000), "Du musst mindestens 18 Jahre alt sein")
            .required("Required"),
        gender: Yup.mixed()
            .oneOf(["MALE", "FEMALE"], "Bitte Geschlecht auswählen")
            .required(),
        height: Yup.number()
            .positive("Bitte Größe angeben")
            .typeError("Bitte Größe angeben")
            .required(),
        weight: Yup.number()
            .positive("Bitte Gewicht angeben")
            .typeError("Bitte Gewicht angeben")
            .required(),
        activityLevel: Yup.mixed()
            .oneOf(["ATHLETE", "PUMPER", "PEDESTRIAN", "COUCHPOTATO"], "Bitte Aktivitätslevel auswählen")
            .required()
    });

    const[formData, setFormData] = useState<FormInput>(initialFormData)
    const[errors, setErrors] = useState<ErrorState>({
        birthday: "",
        gender: "",
        height: "",
        weight: "",
        activityLevel: ""
    });
    const optionsGender:{id:number, label:string, value:string}[] = [{id: 1, label:"männlich", value:"MALE"},
        {id: 2, label: "weiblich", value: "FEMALE"}];

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
    }

    function handleGenderOption(value:string){
        setFormData({
            ...formData,
            gender: value
        })
    }

    function handleOnSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault()
        validationSchema.validate(formData,{abortEarly: false})
            .then(() => {
                const appUserCreateDto: AppUserCreateDto = {
                    birthdate: formData.birthday,
                    gender: formData.gender,
                    height: Number(formData.height),
                    weight: Number(formData.weight),
                    activityLevel: formData.activityLevel
                }
                props.createUser(params.id, appUserCreateDto)
                navigate("/home")
            })
            .catch((error: Yup.ValidationError) => {
                const newErrors: ErrorState = {
                    birthday: "",
                    gender: "",
                    height: "",
                    weight: "",
                    activityLevel: ""
                }
                //@ts-ignore
                error.inner.forEach((currentError) =>
                    // @ts-ignore
                    newErrors[currentError.path] = currentError.message
                )
                setErrors(newErrors)
                console.log(errors)
            })
    }

    // @ts-ignore
    return (
        <div>
            <div className={"regscreen-caption-wrapper"}>
                <h1>Willkommen {props.appUser.name}!</h1>
                <p>Bevor du loslegen kannst, benötigen wir noch ein paar Information über dich:</p>
            </div>
            <form onSubmit={handleOnSubmit}>
                <OptionGroup options={optionsGender} handleOption={handleGenderOption}/>
                <FloatingDatePicker label={"Geburtsdatum"} name={"birthday"} handleChange={handleChange}/>
                <FloatingNumberInput label={"Größe"} name={"height"} maxLength={3} handleChange={handleChange} unit={"cm"}/>
                <FloatingNumberInput label={"Gewicht"} name={"weight"} maxLength={3} handleChange={handleChange} unit={"kg"}/>
                <FormControl fullWidth>
                    <FormLabel>Wie aktiv bist du?</FormLabel>
                    <RadioGroup
                        aria-labelledby="group-label"
                        defaultValue="female"
                        name="activityLevel"
                        onChange={handleChange}
                    >
                        <FormControlLabel value="ATHLETE" control={<Radio/>} label="Leistungssportler"/>
                        <FormControlLabel value="PUMPER" control={<Radio/>} label="Discopumper"/>
                        <FormControlLabel value="PEDESTRIAN" control={<Radio/>} label="Spaziergänger"/>
                        <FormControlLabel value="COUCHPOTATO" control={<Radio/>} label="Couchpotato"/>
                    </RadioGroup>
                </FormControl>
                <Button fullWidth variant={"contained"} type={"submit"}>Fertig</Button>
            </form>
        </div>
    );
}
