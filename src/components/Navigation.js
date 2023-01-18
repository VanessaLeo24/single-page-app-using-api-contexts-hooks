import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import ToggleTheme from "./ToggleTheme";
import { LocaleConsumer } from "../contexts/LocaleContext";

function Navigation({ logout, name }){
    return (
        <LocaleConsumer>
            {
                ({ locale, toggleLocale }) => {
                    return (
                        <nav className="navigation">
                            <ul>
                                <li><Link to="/archives">{locale === 'id' ? 'Terarsip' : 'Archived'}</Link></li>
                                <li><button onClick={toggleLocale}>{locale === 'id' ? 'en' : 'id'}</button></li>
                                <li><ToggleTheme /></li>
                                <li><button onClick={logout}> <FiLogOut /> {name} </button></li>
                            </ul>
                        </nav>
                    ) 
                }
            }

        </LocaleConsumer>

    )
}

Navigation.propTypes = {
    logout: PropTypes.func,
    name: PropTypes.string
}

export default Navigation;