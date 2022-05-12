import Link from "next/link";

type ButtonTypes = {
    tag: 'button' | 'a';
    href?: string;
    value: string;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
    id?: string;
}


const Button = (props: ButtonTypes) => {
    return (
        <>
            {props.href === undefined ?
                <button disabled={props.disabled ? true : false} id={props.id} className={props.className ? props.className : 'btnBack'}>{props.value}</button>
                :
                <Link href={props.href}>
                    <a id={props.id} className={props.className ? props.className : 'btnBack'} >{props.value}</a>
                </Link>
            }
        </>
    )
}

export default Button;