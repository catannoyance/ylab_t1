import { useCallback, useState } from "react"
import { Auth, AuthError, AuthState } from "./Auth"
import "./index.scss"

const fakeFetch: typeof fetch = async (url, options) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    if (url === "/api/sign-in") {
        const { email, password } = JSON.parse((options?.body ?? "{}") as string)

        if (email === "someone@example.com" && password === "password") {
            return new Response("", {
                status: 200,
                statusText: "OK",
            })
        }

        return new Response("", {
            status: 401,
            statusText: "Unauthorized",
        })
    }
    return new Response("", {
        status: 404,
        statusText: "Not Found",
    })
}

function App() {
    const [state, setState] = useState<AuthState>("waiting")
    const [errorType, setErrorType] = useState<AuthError | undefined>(undefined)

    const handleAuth = useCallback(
        async (email: string, password: string, rememberMe: boolean) => {
            setState("loading")

            const fetchPromise = fakeFetch("/api/sign-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, rememberMe }),
            })

            try {
                const response = await fetchPromise
                if (response.status === 200) {
                    alert(
                        "Успешно! На настоящем сайте тут, скорее всего, было бы перенаправление на другую страницу, а пока вот вам алерт.",
                    )
                    setState("waiting")
                } else if (response.status === 401) {
                    setErrorType("invalid-credentials")
                    setState("error")
                } else {
                    setErrorType("unknown")
                    setState("error")
                }
            } catch (e) {
                console.error(e)
                setErrorType("unknown")
                setState("error")
            }
        },
        [],
    )

    const handleSignup = useCallback(() => {
        alert("а кнопка регистрации заданием не предусмотрена :з")
    }, [])

    const handleForgotPassword = useCallback(() => {
        alert("а кнопка сброса пароля заданием не предусмотрена :з")
    }, [])

    return (
        <div
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Auth
                onSignIn={handleAuth}
                onSignUp={handleSignup}
                onForgotPassword={handleForgotPassword}
                state={state}
                error={errorType}
            />

            <span
                style={{ fontSize: "var(--text-xs)", textAlign: "center", opacity: 0.5 }}>
                в целях тестирования: <br />
                someone@example.com / password
            </span>
        </div>
    )
}

export default App
