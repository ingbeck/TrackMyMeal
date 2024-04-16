type DinnerButtonProps = {
    width : number,
    height : number,
    isFull? : boolean
}
export default function DinnerButton(props: Readonly<DinnerButtonProps>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="20" fill={props.isFull ? "#666" : "#C009FC"}/>
            <path
                d="M31.1429 25.3636H30.2857V22.9091V22.0909C30.2857 16.9364 26.0857 12.7636 20.8571 12.3545V10.6364H21.7143C22.2286 10.6364 22.5714 10.3091 22.5714 9.81818C22.5714 9.32727 22.2286 9 21.7143 9H18.2857C17.7714 9 17.4286 9.32727 17.4286 9.81818C17.4286 10.3091 17.7714 10.6364 18.2857 10.6364H19.1429V12.3545C13.9143 12.7636 9.71429 16.9364 9.71429 22.0909V22.9091V25.3636H8.85714C8.34286 25.3636 8 25.6909 8 26.1818C8 26.6727 8.34286 27 8.85714 27H10.5714H29.4286H31.1429C31.6571 27 32 26.6727 32 26.1818C32 25.6909 31.6571 25.3636 31.1429 25.3636ZM20 13.9091C24.7143 13.9091 28.5714 17.5909 28.5714 22.0909H11.4286C11.4286 17.5909 15.2857 13.9091 20 13.9091ZM11.4286 25.3636V23.7273H28.5714V25.3636H11.4286Z"
                fill="white"/>
        </svg>
    );
}
