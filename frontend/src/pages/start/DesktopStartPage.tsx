import "./DesktopStartPage.css"
import QrCode from "../../assets/qr-trackmymeal-net.svg"
import QrCodeDemo from "../../assets/qr-trackmymeal-net-demo.svg"
import Phone from "../../assets/phone.jpg"
import DemoPhone from "../../assets/demo-phone.jpg"
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
                <img id={"phone"} src={props.isDemo ? DemoPhone : Phone} alt={""}/>
                <div className={"startpageDesktopText-wrapper"}>
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
                    <p className={"description"}>Einfach den Code mit der Kamera-App des Smartphones scannen und schon geht's los!</p>
                </div>
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