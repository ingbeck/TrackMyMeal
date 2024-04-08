import {ChangeEvent, useEffect, useState} from "react";
import {AppUser} from "../types/AppUser.ts";
import {useParams} from "react-router-dom";
import "./ProfileScreen.css"
import {FormInput} from "./RegistrationScreen.tsx";
import {AppUserCreateDto} from "../types/AppUserCreateDto.ts";

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
    const[formData, setFormData] = useState<FormInput>({
        birthday : props.appUser.birthdate,
        gender : props.appUser.gender,
        height : props.appUser.height,
        weight : props.appUser.weight,
        activityLevel : props.appUser.activityLevel
    })
    const[isEditable, setIsEditable]=useState<boolean>(false)

    useEffect(() => {
        props.setCurrentRoute(url)
    }, [props, url]);

    useEffect(() => {
        props.getAppUser(params.id)
    }, [props, params.id]);

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
        const appUserCreateDto: AppUserCreateDto = {
            birthdate: formData.birthday,
            gender: formData.gender,
            height: Number(formData.height),
            weight: Number(formData.weight),
            activityLevel: formData.activityLevel
        }
        props.updateUser(params.id, appUserCreateDto)
        setIsEditable(!isEditable)
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
                            <div className={"profilescreen-stats-item"}>
                                <span>Gewicht (in kg)</span>
                                <input name={"weight"} value={formData.weight} onChange={handleChange} type={"number"}/>
                            </div>
                            <div className={"profilescreen-stats-item"}>
                            <span>Größe (in cm)</span>
                                <input name={"height"} value={formData.height} onChange={handleChange} type={"number"}/>
                            </div>
                            <div className={"profilescreen-stats-item"}>
                                <span>Geburtstag</span>
                                <input name={"birthday"} value={formData.birthday} type={"date"} onChange={handleChange}/>
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
                {isEditable && <button onClick={update} className={"profilescreen-btn-edit"}>Save</button>}
                <button onClick={() => setIsEditable(!isEditable)} className={"profilescreen-btn-edit"}>Profil
                    bearbeiten
                </button>
                <button onClick={deleteUser} className={"profilescreen-btn-edit"}>Profil löschen</button>
            </div>

        </div>

    );
}