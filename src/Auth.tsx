import { TextInput } from "./TextInput"
import styles from "./Auth.module.scss"
import { useState } from "react"
import { Button } from "./Button"

type AuthProps = Record<string, never>

export const Auth = (props: AuthProps) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <form className={styles.auth}>
            <h1 className={styles.header}>Вход</h1>

            <div className={styles.fieldContainer}>
                <TextInput
                    label="Email"
                    value={email}
                    onSetValue={setEmail}
                    id="login"
                    placeholder="someone@example.com"
                />
                <TextInput
                    label="Пароль"
                    value={password}
                    onSetValue={setPassword}
                    hidden
                    id="password"
                    placeholder="••••••••••••"
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
