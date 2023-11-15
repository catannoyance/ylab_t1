import clsx from "clsx"
import styles from "./TextInput.module.scss"

type TextInputProps = {
    value: string
    onSetValue: (value: string) => void
    placeholder?: string
    label?: string
    id: string
    errored: boolean
    errorText?: string
    hidden?: boolean
    disabled?: boolean
    required?: boolean
}

export const TextInput = (props: TextInputProps) => {
    return (
        <div
            className={clsx(
                styles.main,
                props.errored && styles.error,
                props.disabled && styles.disabled,
            )}>
            {props.label && <label htmlFor={props.id}>{props.label}</label>}
            <input
                className={styles.input}
                type={props.hidden ? "password" : "text"}
                value={props.value}
                onChange={e => props.onSetValue(e.target.value)}
                placeholder={props.placeholder}
                id={props.id}
                aria-errormessage={props.errored ? `${props.id}-error` : undefined}
                aria-describedby={props.errored ? `${props.id}-error` : undefined}
                aria-invalid={props.errored}
                role="textbox"
                disabled={props.disabled}
                required={props.required}
            />

            {props.errored && props.errorText && (
                <span
                    id={`${props.id}-error`}
                    className={styles.errorText}
                    aria-live="polite">
                    {props.errorText}
                </span>
            )}
        </div>
    )
}
