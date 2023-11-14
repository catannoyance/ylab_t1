import styles from "./Button.module.css"

type ButtonProps = {
    label: string
    style: "primary" | "secondary" | "tertiary"
    onClick?: () => void
}

export const Button = (props: ButtonProps) => {
    const style = styles[props.style]

    return (
        <button className={`${styles.button} ${style}`} onClick={props.onClick} type="button">
            {props.label}
        </button>
    )
}
