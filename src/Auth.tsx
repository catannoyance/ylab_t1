import { TextInput } from "./TextInput"
import styles from "./Auth.module.css"
import { useState } from "react"
import { Button } from "./Button"

type AuthProps = Record<string, never>

export const Auth = (props: AuthProps) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <form className={styles.auth}>
            <div className={styles.fields}>
                <TextInput
                    label="Email"
                    value={email}
                    onSetValue={setEmail}
                    id="login"
                    placeholder="someone@example.com"
                />
                <div>
                    <TextInput
                        label="Пароль"
                        value={password}
                        onSetValue={setPassword}
                        hidden
                        id="password"
                        placeholder="••••••••••••"
                    />
                    <a href="#" className={styles.forgotPasswordLink}>
                        Забыли пароль?
                    </a>
                </div>
            </div>

            <div className={styles.buttonContainer}>
                <Button label="Войти" style="primary" />
                <Button label="Регистрация" style="secondary" />
            </div>
        </form>
    )
}
