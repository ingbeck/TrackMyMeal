
import {AppUser} from "../types/AppUser.ts";
import {useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import "./RegistrationScreen.css"
import {AppUserCreateDto} from "../types/AppUserCreateDto.ts";
import FloatingNumberInput from "../components/registration/FloatingNumberInput.tsx";
import FloatingDatePicker from "../components/registration/FloatingDatePicker.tsx";
import * as Yup from 'yup';
import CustomRadioGroup from "../components/registration/CustomRadioGroup.tsx";
import {validationSchema} from "../YupValidationSchema.ts";

type RegistrationScreenProps = {
    getUser : (id:string | undefined) => void,
    createUser : (id:string | undefined, appUserCreateDto:AppUserCreateDto) => void,
    createDiary : (id:string | undefined) => void,
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

export type ErrorState = {
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
                props.createDiary(params.id)
                navigate("/home/" + params.id)
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
            })
    }

    // @ts-ignore
    return (
        <div className={"regscreen"}>
            <div className={"regscreen-form-wrapper"}>
                <div className={"regscreen-caption-wrapper"}>
                    <h1>Hallo {props.appUser.name.split(" ", 1)}!</h1>
                    <p>Damit du loslegen kannst, brauchen wir noch ein paar Angaben von dir:</p>
                </div>
                <form>
                    <span>Allgemein</span>
                    <FloatingDatePicker label={"Geburtsdatum"} name={"birthday"} handleChange={handleChange}
                                        error={errors.birthday}/>
                    <FloatingNumberInput label={"Körpergröße (cm)"} name={"height"} maxLength={3}
                                         handleChange={handleChange} unit={"cm"} error={errors.height}/>
                    <FloatingNumberInput label={"Gewicht (kg)"} name={"weight"} maxLength={3}
                                         handleChange={handleChange} unit={"kg"} error={errors.weight}/>
                    <div className={"optiongroup-wrapper"}>
                        <CustomRadioGroup label={"Wie aktiv bist du?"} name={"activityLevel"}
                                          choices={choicesActivityLevel} handleChange={handleChange}
                                          error={errors.activityLevel}/>
                        <CustomRadioGroup label={"Körperbau"} name={"gender"} choices={optionsGender}
                                          handleChange={handleChange} error={errors.gender}/>
                    </div>
                </form>
            </div>
            <button onClick={handleOnSubmit}>Los gehts!</button>
        </div>
    );
}
