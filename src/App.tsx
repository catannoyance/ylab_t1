import { useCallback, useState } from "react"
import { Auth, AuthState } from "./Auth"
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

    const auth = useCallback(async (email: string, password: string) => {
        setState("loading")

        const fetchPromise = fakeFetch("/api/sign-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })

        try {
            const response = await fetchPromise
            if (response.status === 200) {
                console.log("signed in!")
                setState("waiting")
            } else if (response.status === 401) {
                console.log("invalid credentials з:")
                setState("error")
            } else {
                console.log("what")
                setState("error")
            }
        } catch (e) {
            console.error(e)
            setState("error")
        }
    }, [])

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
            />
        </div>
    )
}

export default App
