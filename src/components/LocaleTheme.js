import { LocaleConsumer } from "../contexts/LocaleContext";


function LocaleTheme(){
    return (
        <LocaleConsumer>
            {({locale, toggleLocale}) => {
                return <button className="toggleTheme" onClick={toggleLocale}>{locale === "id" ? "en" : "id" }</button>
            }}

        </LocaleConsumer>
    )
}

export default LocaleTheme;