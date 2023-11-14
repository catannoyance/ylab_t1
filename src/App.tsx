import { Auth } from "./Auth"
import "./index.scss"

function App() {
    return (
        <div
            style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Auth />
        </div>
    )
}

export default App
