import clsx from "clsx"
import styles from "./Button.module.scss"

type ButtonProps = {
    children: React.JSX.Element | string
    style: "primary" | "secondary" | "tertiary"
    onClick?: () => void
}

export const Button = (props: ButtonProps) => {
    return (
        <button
            className={clsx(styles.button, styles[props.style])}
            onClick={props.onClick}
            type="button">
            {props.children}
        </button>
    )
}
