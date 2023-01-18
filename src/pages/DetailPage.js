import React from "react";
import { useParams } from "react-router-dom";
import NotesDetail from "../components/NotesDetail.js";
import { getNote } from "../utils/api.js";
import PropTypes from "prop-types";
import NotFoundPage from "./NotFoundPage.js";


function DetailPageWrapper(){
    const {id} = useParams();

    return <DetailPage id={id} />;
}

class DetailPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            notes : null,
        }
    }

    async componentDidMount(){
        const note = await getNote(this.props.id);
    
            this.setState(() => {
                    return {
                        notes: note.data
                    }
                }
            )
    }

    render(){
        if(this.state.notes === null){
            return <NotFoundPage />
        }

        return (
            <section>
                <NotesDetail {...this.state.notes} />
            </section>

        )
    }
}

DetailPage.propTypes = {
    id: PropTypes.string.isRequired
}

export default DetailPageWrapper;