import "./DesktopStartPage.css"
import QrCode from "../../assets/qr-trackmymeal-net.svg"
import QrCodeDemo from "../../assets/qr-trackmymeal-net-demo.svg"
import Logo from "../../assets/logo.png"
import Lens from "../../assets/lens.svg"
import {useState} from "react";
import {Modal} from "@mui/material";

type DesktopStartPageProps = {
    isDemo: boolean
}

export default function DesktopStartPage(props: Readonly<DesktopStartPageProps>) {
    const [qrCodeOpen, setQrCodeOpen] = useState<boolean>(false)
    const [mouseEnter, setMouseEnter] = useState<boolean>(false)

    function isDemoQrCode(isDemo: boolean){
        if(isDemo){
            return QrCodeDemo
        }else{
            return QrCode
        }
    }

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
                        <img src={isDemoQrCode(props.isDemo)}
                             alt={"QRCode"}
                             className={mouseEnter ? "qrcode hover" : "qrcode"}/>
                        <img src={Lens}
                             alt={"Lens"}
                             className={mouseEnter ? "lens lens-hover" : "lens"}/>
                    </button>
                </div>
                <p className={"description"}>Scanne den QR-Code mit deinem Handy und los geht's!</p>
                <Modal open={qrCodeOpen} onClose={() => setQrCodeOpen(false)}
                       style={{display: 'flex', placeContent: 'center'}}>
                    <img src={isDemoQrCode(props.isDemo)}
                         alt={"QRCode"}
                         style={{height: 500, width: 500, alignSelf: "center"}}/>
                </Modal>
            </div>
        </div>

    );
}