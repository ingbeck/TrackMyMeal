type CheckButtonProps = {
    width : number,
    height : number
}
export default function CheckButton(props: Readonly<CheckButtonProps>) {
    return (
        <svg width={props.width} height={props.height} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="20" fill="url(#paint0_linear_63_17)"/>
            <path
                d="M28.4395 13L27.6592 13.7391C23.9584 17.2525 20.5867 20.7229 16.965 24.1957L12.2375 20.6195L11.3769 19.9674L10 21.5978L10.8606 22.25L16.3683 26.4239L17.1371 27L17.8371 26.3369C21.7763 22.5973 25.3258 18.9032 29.2197 15.2065L30 14.4674L28.4395 13Z"
                fill="white"/>
            <defs>
                <linearGradient id="paint0_linear_63_17" x1="0" y1="20" x2="40" y2="20" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#1FB212"/>
                    <stop offset="1" stopColor="#1FB212"/>
                </linearGradient>
            </defs>
        </svg>


    );
}

