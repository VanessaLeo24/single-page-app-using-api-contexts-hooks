import { ThemeConsumer } from "../contexts/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

function ToggleTheme(){
    return (
        <ThemeConsumer>
            {
                ({theme, toggleTheme}) => {
                    return <button className="toggleTheme" onClick={toggleTheme}>{theme === "dark" ? <FaSun /> : <FaMoon />}</button>
                }
            }
        </ThemeConsumer>
    )
}

export default ToggleTheme;