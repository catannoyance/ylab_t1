import { Auth } from "./Auth"
import { TextInput } from "./TextInput"
import "./index.css"

function App() {
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Auth />
        </div>
    )
}

export default App
