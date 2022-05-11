import Link from "next/link";

type ButtonTypes = {
    tag: 'button' | 'a';
    href: string;
    value: string;
    disabled?: Boolean;
    className?: string;
    onClick?: () => void;

}


const Button = (props: ButtonTypes) => {
    return (
        <>
            {props.href === undefined ?
                <button {...props.disabled ? 'disabled' : ''} className={props.className ? props.className : 'btnBack'}>{props.value}</button>
                :
                <Link href={props.href}>{props.value}</Link>
            }
        </>
    )
}

export default Button;