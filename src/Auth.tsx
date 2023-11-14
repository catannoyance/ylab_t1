import { TextInput } from "./TextInput"
import styles from "./Auth.module.css"
import { useState } from "react"

type AuthProps = Record<string, never>

export const Auth = (props: AuthProps) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className={styles.main}>
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
    )
}
