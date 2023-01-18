import React from "react";
import PropTypes from "prop-types";
import { LocaleConsumer } from "../contexts/LocaleContext";

function NotesSearch({keyword, keywordChange}){
    return (
        <LocaleConsumer>
            {
                ({ locale }) => {
                    return (
                        <div className="search-bar">
                            <input type="search" placeholder={locale === 'id' ? "Cari berdasarkan judul ..." : "Search by title ..."} value={keyword} onChange={(event) => keywordChange(event.target.value)}/>
                        </div> 
                    )
                }
            }
        </LocaleConsumer>
    )
}

NotesSearch.propTypes = {
    keyword: PropTypes.string.isRequired,
    keywordChange: PropTypes.func.isRequired
}

export default NotesSearch;