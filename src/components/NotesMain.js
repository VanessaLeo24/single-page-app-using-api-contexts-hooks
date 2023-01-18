import React from "react";
import NotesSearch from "./NotesSearch.js";
import PropTypes from "prop-types";
import { LocaleConsumer } from "../contexts/LocaleContext.js";

function NotesMain({keyword, keywordChange}){
    return (
        <LocaleConsumer>
            {
                ({ locale }) => {
                    return (
                        <div>
                            <h2>{locale === 'id' ? 'Fitur Pencarian' : 'Search Feature'}</h2>
                            <NotesSearch keyword={keyword} keywordChange={keywordChange} />
                        </div>
                    )
                }
            }
        </LocaleConsumer>
    )
}

NotesMain.propTypes = {
    keyword: PropTypes.string.isRequired,
    keywordChange: PropTypes.func.isRequired
}
export default NotesMain;