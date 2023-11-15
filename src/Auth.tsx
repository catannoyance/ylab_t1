import { TextInput } from "./TextInput"
import styles from "./Auth.module.scss"
import { useCallback, useEffect, useId, useRef, useState } from "react"
import { Button } from "./Button"
import { Checkbox } from "./Checkbox"

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

        props.onSignIn(email, password, rememberMe)
    }, [validatePassword, password, validateEmail, email, props, rememberMe])

    const emailFieldId = useId()
    const passwordFieldId = useId()

    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // this should not trigger when trying to press "sign up" or "forgot password"
            const isAnyInputActive = document.activeElement?.tagName === "INPUT"

            if (event.key === "Enter" && isAnyInputActive) {
                handleSubmit()
            }
        }

        const form = formRef.current
        form?.addEventListener("keydown", handleKeyDown)
        return () => {
            form?.removeEventListener("keydown", handleKeyDown)
        }
    }, [handleSubmit, formRef])

    return (
        <form className={styles.auth} ref={formRef}>
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
                    onClick={handleSubmit}
                    disabled={props.state === "loading"}>
                    Войти
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
