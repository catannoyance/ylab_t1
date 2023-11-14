import clsx from "clsx"
import styles from "./TextInput.module.scss"

type TextInputProps = {
    value: string
    onSetValue: (value: string) => void
    hidden?: boolean
    placeholder?: string
    label?: string
    id: string

    errored: boolean
    errorText?: string
}

export const TextInput = (props: TextInputProps) => {
    return (
        <div className={clsx(styles.main, props.errored && styles.error)}>
            {props.label && <label htmlFor={props.id}>{props.label}</label>}
            <input
                className={styles.input}
                type={props.hidden ? "password" : "text"}
                value={props.value}
                onChange={e => props.onSetValue(e.target.value)}
                placeholder={props.placeholder}
                id={props.id}
                onFocus={props.onFocus}
                aria-errormessage={props.errored ? `${props.id}-error` : undefined}
                aria-invalid={props.errored}
                role="textbox"
            />

            {props.errored && props.errorText && (
                <span id={`${props.id}-error`} aria- className={styles.errorText}>
                    {props.errorText}
                </span>
            )}
        </div>
    )
}
