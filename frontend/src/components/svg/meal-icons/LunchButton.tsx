type LunchButtonProps = {
    width : number,
    height : number,
    isFull? : boolean
}
export default function LunchButton(props: Readonly<LunchButtonProps>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="20" fill={props.isFull ? "#666" :"#9018FE"}/>
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M16.875 11C15.0478 11 13.4347 12.1633 12.7998 13.8248L12.7875 13.8247C12.66 13.7791 12.4612 13.8931 12.3425 14.0134C11.1306 15.2542 10.9333 17.1459 11.7522 18.6H10.625C10.28 18.6 10 18.8837 10 19.2333C10 23.1106 12.4937 26.5965 16.25 28.0405V29.3667C16.25 29.7163 16.53 30 16.875 30H23.125C23.47 30 23.75 29.7163 23.75 29.3667V28.0405C27.5075 26.5965 30 23.1119 30 19.2333C30 18.8837 29.72 18.6 29.375 18.6H28.5348C28.6758 18.1953 28.75 17.7657 28.75 17.3333C28.75 15.3421 27.2313 13.7043 25.3062 13.546C24.5925 12.729 23.585 12.2667 22.5 12.2667C21.415 12.2667 20.4075 12.729 19.6938 13.546C18.8546 13.615 18.0926 13.9652 17.5 14.5033V11.6333C17.5 11.2837 17.22 11 16.875 11ZM28.725 19.8667C28.46 23.084 26.1975 25.8985 22.93 26.9917C22.6737 27.0778 22.5 27.3197 22.5 27.5933V28.7333H17.5V27.5933C17.5 27.3197 17.3263 27.0765 17.0712 26.9917C13.8025 25.8985 11.54 23.084 11.2763 19.8667H13.0979C13.1155 19.8674 13.1331 19.8674 13.1507 19.8667H28.725ZM23.125 17.9667V16.7C23.125 16.3504 22.845 16.0667 22.5 16.0667C22.155 16.0667 21.875 16.3504 21.875 16.7V17.9667L20.375 16.8267C20.0988 16.6177 19.7075 16.6721 19.5 16.9533C19.2925 17.2333 19.3488 17.6297 19.625 17.84L20.625 18.6H17.8347C17.6176 18.2196 17.5 17.7798 17.5 17.3333C17.5 15.9362 18.6213 14.8 20 14.8C20.1962 14.8 20.3812 14.7063 20.5 14.5479C21.4587 13.2572 23.5413 13.2572 24.5012 14.5479C24.6187 14.7063 24.8038 14.8 25 14.8C26.3787 14.8 27.5 15.9362 27.5 17.3333C27.5 17.7786 27.3825 18.2187 27.165 18.6H24.3737L25.3738 17.84C25.65 17.6297 25.7063 17.2332 25.5 16.9533C25.2925 16.6708 24.9 16.6176 24.625 16.8266L23.125 17.9667ZM16.25 17.0699V12.3313C15.0892 12.5719 14.1411 13.4717 13.8525 14.6404L16.25 17.0699ZM13.3433 18.6C13.3056 18.5676 13.2681 18.5335 13.2312 18.4961C12.4162 17.6614 12.2887 16.3859 12.8462 15.4131L15.9901 18.6H13.3433Z"
                  fill="white"/>
        </svg>

    );
}
