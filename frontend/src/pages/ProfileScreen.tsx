import {ChangeEvent, useEffect, useState} from "react";
import {AppUser} from "../types/AppUser.ts";
import {useParams} from "react-router-dom";
import "./ProfileScreen.css"
import {ErrorState, FormInput} from "./RegistrationScreen.tsx";
import {AppUserCreateDto} from "../types/AppUserCreateDto.ts";
import {getDateToday} from "../Utility.ts";
import * as Yup from "yup";
import {validationSchema} from "../YupValidationSchema.ts";

type ProfileScreenProps = {
    setCurrentRoute : (url:string) => void,
    getAppUser : (id:string | undefined) => void,
    deleteUser : (id: string | undefined) => void,
    updateUser : (id:string | undefined, appUserCreateDto:AppUserCreateDto) => void,
    logout : () => void,
    appUser : AppUser
}
export default function ProfileScreen(props: Readonly<ProfileScreenProps>) {

    const url = window.location.href;
    const params = useParams();
    const initialFormData:FormInput = {
        birthday : props.appUser.birthdate,
        gender : props.appUser.gender,
        height : props.appUser.height,
        weight : props.appUser.weight,
        activityLevel : props.appUser.activityLevel
    }
    const initialErrorState={
        birthday: "",
        gender: "",
        height: "",
        weight: "",
        activityLevel: ""
    }

    const[formData, setFormData] = useState<FormInput>(initialFormData)
    const[isEditable, setIsEditable]=useState<boolean>(false)
    const[errors, setErrors] = useState<ErrorState>(initialErrorState);

    useEffect(() => {
        props.setCurrentRoute(url)
    }, []);

    useEffect(() => {
        props.getAppUser(params.id)
    }, [params.id]);

    function deleteUser(){
        if (window.confirm("Möchtest du dein Profil endgültig löschen?"))
            props.deleteUser(params.id)
    }

    function handleChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>){
        const value = event.target.value;
        const name = event.target.name;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    function update(){
        validationSchema.validate(formData,{abortEarly: false})
            .then(() => {
                const appUserCreateDto: AppUserCreateDto = {
                    birthdate: formData.birthday,
                    gender: formData.gender,
                    height: Number(formData.height),
                    weight: Number(formData.weight),
                    activityLevel: formData.activityLevel
                }
                props.updateUser(params.id, appUserCreateDto)
                setIsEditable(!isEditable)
                setErrors(initialErrorState)
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

    function cancel(){
        setFormData(initialFormData);
        setIsEditable(!isEditable);
        setErrors(initialErrorState);
    }

    function displayActivityLevel(activityLevel : string) : string | undefined{
        switch (activityLevel){
            case "ATHLETE":{
                return "Leistungsportler"
            }
            case "PUMPER":{
                return "Discopumper"
            }
            case "PEDESTRIAN":{
                return "Spaziergänger"
            }
            case "COUCHPOTATO":{
                return "Couchpotato"
            }
        }
    }

    function formattedDate(date: string) : string{
        const year : string = date.substring(0, 4);
        const month : string = date.substring(5,7);
        const day : string = date.substring(8,10);

        return day+"."+month+"."+year
    }

    return (
        <div className={"profilescreen"}>
            <div className={"profilescreen-wrapper"}>
                <div className={"profilescreen-title-wrapper"}>
                    <img src={props.appUser.avatarUrl} className={"profilescreen-avatar"} alt={" "}/>
                    <h1>{props.appUser.name}</h1>
                    <button onClick={props.logout}>Logout</button>
                </div>
                {
                    isEditable
                        ?
                        <div className={"profilescreen-stats-wrapper"}>
                            {errors.weight !== "" && <div className={"profilescreen-stats-item-error-message"}>{errors.weight}</div>}
                            <div className={errors.weight !== "" ? "profilescreen-stats-item-error" :"profilescreen-stats-item"}>
                                <span>Gewicht (in kg)</span>
                                <input name={"weight"} value={formData.weight} onChange={handleChange} type={"number"}/>
                            </div>
                            {errors.height !== "" && <div className={"profilescreen-stats-item-error-message"}>{errors.height}</div>}
                            <div className={errors.height !== "" ? "profilescreen-stats-item-error" :"profilescreen-stats-item"}>
                                <span>Größe (in cm)</span>
                                <input name={"height"} value={formData.height} onChange={handleChange} type={"number"}/>
                            </div>
                            {errors.birthday !== "" && <div className={"profilescreen-stats-item-error-message"}>{errors.birthday}</div>}
                            <div className={errors.birthday !== "" ? "profilescreen-stats-item-error" :"profilescreen-stats-item"}>
                                <span>Geburtstag</span>
                                <input name={"birthday"}
                                       value={formData.birthday}
                                       type={"date"}
                                       onChange={handleChange}
                                       max={getDateToday()}
                                />
                            </div>
                            <div className={"profilescreen-stats-item"}>
                                <span>Aktivitätslevel</span>
                                <select name={"activityLevel"} value={formData.activityLevel} onChange={handleChange}>
                                    <option value={"ATHLETE"}>Leistungssportler</option>
                                    <option value={"PUMPER"}>Discopumper</option>
                                    <option value={"PEDESTRIAN"}>Spaziergänger</option>
                                    <option value={"COUCHPOTATO"}>Couchpotato</option>
                                </select>
                            </div>
                        </div>
                        :
                        <div className={"profilescreen-stats-wrapper"}>
                            <div className={"profilescreen-stats-item"}>
                                <span>Gewicht</span>
                                <span>{formData.weight} kg</span>
                            </div>
                            <div className={"profilescreen-stats-item"}>
                                <span>Größe</span>
                                <span>{formData.height} cm</span>
                            </div>
                            <div className={"profilescreen-stats-item"}>
                                <span>Geburtstag</span>
                                <span>{formattedDate(formData.birthday)}</span>
                            </div>
                            <div className={"profilescreen-stats-item"}>
                                <span>Aktivitätslevel</span>
                                <span>{displayActivityLevel(formData.activityLevel)}</span>
                            </div>
                        </div>
                }
                {isEditable && <button onClick={update} className={"profilescreen-btn-edit"}>Speichern</button>}
                <button onClick={cancel} className={"profilescreen-btn-edit"}>
                    {isEditable ? "Abbrechen" : "Profil bearbeiten"}
                </button>
                {isEditable &&
                    <button onClick={deleteUser} className={"profilescreen-btn-edit"}>Profil löschen</button>}
            </div>

        </div>

    );
}