import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Diary} from "../types/Diary.ts";
import "./HomeScreen.css"
import {AppUser} from "../types/AppUser.ts";

type HomeScreenProps = {
    setCurrentRoute : (url:string) => void,
    getAppUser : (id:string | undefined) => void,
    appUser : AppUser,
    diary : Diary
}
export default function HomeScreen(props: Readonly<HomeScreenProps>) {

        const url = window.location.href;
        const params = useParams();
        const[progress, setProgress] = useState<number>(0)

        useEffect(() => {
                props.setCurrentRoute(url)
        }, [props, url]);

    useEffect(() => {
        props.getAppUser(params.id)
        calculateProgress(props.appUser.bmrWithActivity, 800)
    }, [params.id]);

    function calculateProgress(whole:number, part:number ){
        setProgress( part/whole)
    }


    return (
        <div className={"homescreen"}>
            <h1>Heute</h1>
            <div className={"homescreen-dailyProgress"}>
                <h2>Ziel</h2>
                <div id={"progress"} className={"progressbar"}>
                    <div className={progress > 1 ? "progressbar-fill-overflow" : "progressbar-fill"} style={{flex:progress}}>
                        {progress > 0.25 && <label>800 kcal</label>}
                    </div>
                    {progress < 0.25 && <label>800 kcal</label>}
                </div>
                <h3>{props.appUser.bmrWithActivity} kcal</h3>
            </div>
        </div>
    );
}