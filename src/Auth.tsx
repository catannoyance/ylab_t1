import { TextInput } from "./TextInput"
import styles from "./Auth.module.scss"
import { FormEvent, useCallback, useEffect, useRef, useState } from "react"
import { Button } from "./Button"
import { Checkbox } from "./Checkbox"
import { LoadingSpinner } from "./LoadingSpinner"

export type AuthState = "waiting" | "loading" | "error"
export type AuthError = "invalid-credentials" | "unknown"

type AuthProps = {
    onSignIn: (email: string, password: string, rememberMe: boolean) => void
    onSignUp: () => void
    onForgotPassword: () => void

    state: AuthState
    error?: AuthError
}

export const Auth = (props: AuthProps) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(true)

    const [emailErrored, setEmailErrored] = useState(false)
    const [passwordErrored, setPasswordErrored] = useState(false)

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

    const validateEmail = useCallback((email: string) => {
        return email.match(/^[^@]+@[^@]+$/)
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

    const handleSubmit = useCallback(
        (ev: FormEvent<HTMLFormElement>) => {
            ev.preventDefault()

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

            if (!emailErrored && !passwordErrored)
                props.onSignIn(email, password, rememberMe)

            return false
        },
        [validatePassword, password, validateEmail, email, props, rememberMe],
    )

    return (
        <form className={styles.auth} ref={formRef} onSubmit={handleSubmit}>
            <h1 className={styles.header}>Вход</h1>

            <div className={styles.fieldContainer}>
                {props.state == "error" && (
                    <div className={styles.errorContainer}>
                        <span role="alert">
                            {props.error === "invalid-credentials"
                                ? "Неверный адрес почты или пароль."
                                : "Неизвестная ошибка. Попробуйте обновить страницу."}
                        </span>
                    </div>
                )}

                <TextInput
                    ref={emailRef}
                    label="Email"
                    value={email}
                    onSetValue={handleEmailEdit}
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
                    placeholder="••••••••••••"
                    errored={passwordErrored}
                    errorText="Пароль должен содержать не менее 8 символов"
                    disabled={props.state === "loading"}
                    required
                />

                <Checkbox
                    label="Запомнить меня"
                    checked={rememberMe}
                    onChange={setRememberMe}
                    disabled={props.state === "loading"}
                />
            </div>

            <div className={styles.buttonContainer}>
                <Button
                    style="primary"
                    disabled={props.state === "loading"}
                    type="submit">
                    {props.state === "loading" ? <LoadingSpinner /> : "Войти"}
                </Button>
                <Button
                    style="secondary"
                    onClick={props.onSignUp}
                    disabled={props.state === "loading"}>
                    Регистрация
                </Button>
                <Button
                    style="tertiary"
                    onClick={props.onForgotPassword}
                    disabled={props.state === "loading"}>
                    Забыли пароль?
                </Button>
            </div>
        </form>
    )
}
