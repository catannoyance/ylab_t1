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

    const auth = useCallback(
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
                        "Успешно! На настоящей странице тут было бы перенаправление на другую страницу, а пока вот вам алерт.",
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

    return (
        <div
            style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Auth
                onSignIn={auth}
                onForgotPassword={() => {}}
                onSignUp={() => {}}
                state={state}
                error={errorType}
            />
        </div>
    )
}

export default App
