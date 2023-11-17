import clsx from "clsx"
import styles from "./TextInput.module.scss"
import { forwardRef, useId } from "react"

type TextInputProps = {
    value: string
    onSetValue: (value: string) => void
    placeholder?: string
    label?: string
    errored: boolean
    errorText?: string
    hidden?: boolean
    disabled?: boolean
    required?: boolean
    autocomplete?: HTMLInputElement["autocomplete"]
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    (props: TextInputProps, ref) => {
        const inputId = useId()
        const errorId = useId()
        return (
            <div
                className={clsx(
                    styles.textInput,
                    props.errored && styles.error,
                    props.disabled && styles.disabled,
                )}>
                {props.label && <label htmlFor={inputId}>{props.label}</label>}
                <input
                    ref={ref}
                    className={styles.input}
                    type={props.hidden ? "password" : "text"}
                    value={props.value}
                    onChange={e => props.onSetValue(e.target.value)}
                    placeholder={props.placeholder}
                    id={inputId}
                    aria-errormessage={props.errored ? errorId : undefined}
                    aria-describedby={props.errored ? errorId : undefined}
                    aria-invalid={props.errored}
                    role="textbox"
                    disabled={props.disabled}
                    required={props.required}
                    autoComplete={props.autocomplete}
                />

                {props.errored && props.errorText && (
                    <span id={errorId} className={styles.errorText} aria-live="polite">
                        {props.errorText}
                    </span>
                )}
            </div>
        )
    },
)
