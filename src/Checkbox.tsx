import clsx from "clsx"
import styles from "./Checkbox.module.scss"

import { ChangeEvent, useCallback, useId } from "react"

type CheckboxProps = {
    label: string
    checked: boolean
    onChange: (checked: boolean) => void
    disabled?: boolean
}

export const Checkbox = (props: CheckboxProps) => {
    const id = useId()
    const handleChange = useCallback(
        (ev: ChangeEvent) => {
            props.onChange((ev.target as HTMLInputElement).checked)
        },
        [props],
    )

    return (
        <div className={clsx(styles.checkbox, props.disabled && styles.disabled)}>
            <input
                id={id}
                type="checkbox"
                checked={props.checked}
                onChange={handleChange}
                disabled={props.disabled}
            />
            <label htmlFor={id}>{props.label}</label>
        </div>
    )
}
