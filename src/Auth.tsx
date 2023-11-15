import { TextInput } from "./TextInput"
import styles from "./Auth.module.scss"
import { useCallback, useId, useRef, useState } from "react"
import { Button } from "./Button"

type AuthProps = {
    onSignIn: (email: string, password: string) => void
    onSignUp: () => void
    onForgotPassword: () => void

    state: "waiting" | "loading" | "error"
}

export const Auth = (props: AuthProps) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [emailErrored, setEmailErrored] = useState(false)
    const [passwordErrored, setPasswordErrored] = useState(false)

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const validateEmail = useCallback((email: string) => {
        return email.includes("@")
    }, [])

    const validatePassword = useCallback((password: string) => {
        return password.length >= 8
    }, [])

    const handleEmailEdit = useCallback((email: string) => {
        setEmail(email)
        setEmailErrored(false)
    }, [])

    const handlePasswordEdit = useCallback((password: string) => {
        setPassword(password)
        setPasswordErrored(false)
    }, [])

    const handleSubmit = useCallback(() => {
        const passwordErrored = !validatePassword(password)
        const emailErrored = !validateEmail(email)

        setPasswordErrored(passwordErrored)
        if (passwordErrored && passwordRef.current) {
            passwordRef.current.focus()
        }

        setEmailErrored(emailErrored)
        if (emailErrored && emailRef.current) {
            emailRef.current.focus()
        }

        if (emailErrored || passwordErrored) return

        props.onSignIn(email, password)
    }, [validateEmail, email, validatePassword, password, props])

    const emailFieldId = useId()
    const passwordFieldId = useId()

    return (
        <form className={styles.auth}>
            <h1 className={styles.header}>Вход</h1>

            <div className={styles.fieldContainer}>
                <TextInput
                    ref={emailRef}
                    label="Email"
                    value={email}
                    onSetValue={handleEmailEdit}
                    id={emailFieldId}
                    placeholder="someone@example.com"
                    errored={emailErrored}
                    errorText="Неверный формат email"
                    disabled={props.state === "loading"}
                    required
                />
                <TextInput
                    ref={passwordRef}
                    label="Пароль"
                    value={password}
                    onSetValue={handlePasswordEdit}
                    hidden
                    id={passwordFieldId}
                    placeholder="••••••••••••"
                    errored={passwordErrored}
                    errorText="Пароль должен быть не менее 8 символов"
                    disabled={props.state === "loading"}
                    required
                />
            </div>

            <div className={styles.buttonContainer}>
                <Button
                    style="primary"
                    onClick={handleSubmit}
                    disabled={props.state === "loading"}>
                    Войти
                </Button>
                <Button style="secondary" disabled={props.state === "loading"}>
                    Регистрация
                </Button>
                <Button style="tertiary" disabled={props.state === "loading"}>
                    Забыли пароль?
                </Button>
            </div>
        </form>
    )
}
