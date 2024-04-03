
import {AppUser} from "../types/AppUser.ts";
import {useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import "./RegistrationScreen.css"
import {AppUserCreateDto} from "../types/AppUserCreateDto.ts";
import FloatingNumberInput from "../components/registration/FloatingNumberInput.tsx";
import OptionGroup from "../components/registration/OptionGroup.tsx";
import {Button} from "@mui/material";
import FloatingDatePicker from "../components/registration/FloatingDatePicker.tsx";
import * as Yup from 'yup';
import CustomRadioGroup from "../components/registration/CustomRadioGroup.tsx";

type RegistrationScreenProps = {
    getUser : (id:string | undefined) => void,
    createUser : (id:string | undefined, appUserCreateDto:AppUserCreateDto) => void,
    setCurrentRoute : (url:string) => void,
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
    const url = window.location.href;
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
            .typeError("Bitte Geburtsdatum angeben")
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
    const optionsGender:{id:number, label:string, value:string}[] = [
        {id: 1, label:"männlich", value:"MALE"},
        {id: 2, label: "weiblich", value: "FEMALE"}
    ];

    const choicesActivityLevel:{id:number, label:string, value:string}[] = [
        {id: 1, label:"Leistungssportler", value:"ATHLETE"},
        {id: 2, label: "Discopumper", value: "PUMPER"},
        {id: 3, label: "Spaziergänger", value: "PEDESTRIAN"},
        {id: 4, label: "Couchpotato", value: "COUCHPOTATO"}
    ];



    useEffect(() => {
        props.setCurrentRoute(url)
    }, []);

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
                <OptionGroup options={optionsGender} handleOption={handleGenderOption} error={errors.gender}/>
                <FloatingDatePicker label={"Geburtsdatum"} name={"birthday"} handleChange={handleChange} error={errors.birthday}/>
                <FloatingNumberInput label={"Größe"} name={"height"} maxLength={3} handleChange={handleChange} unit={"cm"} error={errors.height}/>
                <FloatingNumberInput label={"Gewicht"} name={"weight"} maxLength={3} handleChange={handleChange} unit={"kg"} error={errors.weight}/>
                <CustomRadioGroup label={"Wie aktiv bist du?"} choices={choicesActivityLevel} handleChange={handleChange} error={errors.activityLevel}/>
                <Button fullWidth variant={"contained"} type={"submit"}>Fertig</Button>
            </form>
        </div>
    );
}
