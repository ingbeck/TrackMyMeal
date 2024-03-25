import {Avatar} from "@mui/material";
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';
import "./StartScreen.css"

export default function StartScreen() {

    return (
        <GoogleOAuthProvider clientId={"912133900656-llv5gkrj9mp9qbke1lmkr989dbhp3fhf.apps.googleusercontent.com"}>
            <div className={"startpage"}>
                <div className={"startpage-wrapper"}>
                    <Avatar className={"startpage-wrapper-logo"}/>
                    <h1 className={"startpage-wrapper-text"}>Track My Meal</h1>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </div>
            </div>
        </GoogleOAuthProvider>

    );
}
