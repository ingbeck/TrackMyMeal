import "./StartScreenDesktop.css"
import QrCode from "../assets/qr-trackmymeal-net.svg"
import Logo from "../assets/logo.png"
import {useState} from "react";
import {Modal} from "@mui/material";

export default function StartScreenDesktop() {
    const [qrCodeOpen, setQrCodeOpen] = useState<boolean>(false)
    const [mouseEnter, setMouseEnter] = useState<boolean>(false)

    return (
        <div className={"startpageDesktop_container"}>
            <div className={"startpageDesktop"}>
                <div className={"iphone"}>
                    <div className={"startpage-hero-wrapper"}>
                        <div className={"image-hero"}></div>
                        <div className={"logo-wrapper"}>
                            <img src={Logo} className={"image-logo"}
                                 alt={"Logo der App"}/>
                        </div>
                    </div>
                    <div className={"headline-wrapper"}>
                        <h1 className={"startpage-wrapper-text"}>Track My Meal</h1>
                        <p>Dein mobiles Kalorientagebuch für eine&nbsp;ausgewogene Ernährung</p>
                    </div>
                    <button
                        onClick={() => setQrCodeOpen(!qrCodeOpen)}
                        onMouseEnter={() => setMouseEnter(!mouseEnter)}
                        onMouseLeave={() => setMouseEnter(!mouseEnter)}>
                        <img src={QrCode} alt={"QRCode"} style={{maxWidth: 250, maxHeight: 250, alignSelf: "center"}}/>
                    </button>
                </div>
                <p className={"description"}>Scanne den QR-Code mit deinem Handy und los geht's!</p>
                <Modal open={qrCodeOpen} onClose={() => setQrCodeOpen(false)}
                       style={{display: 'flex', placeContent: 'center'}}>
                    <img src={QrCode} alt={"QRCode"} style={{height: 500, width: 500, alignSelf: "center"}}/>
                </Modal>
            </div>
        </div>

    );
}