import { TextInput } from "./TextInput"
import styles from "./Auth.module.scss"
import { useCallback, useState } from "react"
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
        setEmailErrored(!validateEmail(email))
        setPasswordErrored(!validatePassword(password))

        if (emailErrored || passwordErrored) return

        props.onSignIn(email, password)
    }, [
        validateEmail,
        email,
        validatePassword,
        password,
        emailErrored,
        passwordErrored,
        props,
    ])

    return (
        <form className={styles.auth}>
            <h1 className={styles.header}>Вход</h1>

            <div className={styles.fieldContainer}>
                <TextInput
                    label="Email"
                    value={email}
                    onSetValue={handleEmailEdit}
                    id="login"
                    placeholder="someone@example.com"
                    errored={emailErrored}
                    errorText="Неверный формат email"
                />
                <TextInput
                    label="Пароль"
                    value={password}
                    onSetValue={handlePasswordEdit}
                    hidden
                    id="password"
                    placeholder="••••••••••••"
                    errored={passwordErrored}
                    errorText="Пароль должен быть не менее 8 символов"
                />
            </div>

            <div className={styles.buttonContainer}>
                <Button style="primary" onClick={handleSubmit}>
                    Войти
                </Button>
                <Button style="secondary">Регистрация</Button>
                <Button style="tertiary">Забыли пароль?</Button>
            </div>
        </form>
    )
}
