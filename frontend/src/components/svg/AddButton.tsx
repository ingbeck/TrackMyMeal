type AddButtonProps = {
    width : number,
    height : number
}
export default function AddButton(props: Readonly<AddButtonProps>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 40 40" fill="none">
            <rect width="32" height="32" rx="16" fill="url(#paint0_linear_74_3052)"/>
            <path d="M15.0552 23V9H16.9448V23H15.0552ZM9 16.94V15.06H23V16.94H9Z" fill="white"/>
            <defs>
                <linearGradient id="paint0_linear_74_3052" x1="0" y1="16" x2="32" y2="16"
                                gradientUnits="userSpaceOnUse">
                    <stop stopColor="#562AFF"/>
                    <stop offset="1" stopColor="#841CFE"/>
                </linearGradient>
            </defs>
        </svg>
    );
}

