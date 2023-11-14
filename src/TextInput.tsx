import styles from "./TextInput.module.scss"

type TextInputProps = {
    value: string
    onSetValue: (value: string) => void
    hidden?: boolean
    placeholder?: string
    label?: string
    id: string
}

export const TextInput = (props: TextInputProps) => {
    return (
        <div className={styles.main}>
            {props.label && <label htmlFor={props.id}>{props.label}</label>}
            <input
                className={styles.input}
                type={props.hidden ? "password" : "text"}
                value={props.value}
                onChange={e => props.onSetValue(e.target.value)}
                placeholder={props.placeholder}
                id={props.id}
            />
        </div>
    )
}
