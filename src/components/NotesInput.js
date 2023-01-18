import React from "react";
import PropTypes from "prop-types";
import { FiCheck } from "react-icons/fi";
import { LocaleConsumer } from "../contexts/LocaleContext";

class NotesInput extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: '',
            body: ''
        }

        this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
        this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onTitleChangeHandler(event){
        this.setState(()=> {
            return {
                title: event.target.value
            }
        })
    }

    onBodyChangeHandler(event){
        this.setState(() => {
            return {
                body: event.target.value
            }
        })
    }

    onSubmitHandler(event){
        event.preventDefault();

        this.props.addNote(this.state);
    }
    
    render(){
        return (
            <LocaleConsumer>
                {
                    ({ locale }) => {
                        return (
                            <form className="add-new-page__input" onSubmit={this.onSubmitHandler}>
                                <input className="add-new-page__input__title " type="text" placeholder={locale === 'id' ? "Masukkan judul" : "Input Note's title"} value={this.state.title} onChange={this.onTitleChangeHandler} />
                                <textarea className="add-new-page__input__body" placeholder={locale === 'id' ? "Masukkan isi catatan disini ...." : "Input the Note's content here ..."} value={this.state.body} onChange={this.onBodyChangeHandler}></textarea>
                                <button type="submit" className="homepage__action"><FiCheck  className="action"/></button>
                            </form>
                        )
                    }
                }
            </LocaleConsumer>
        )
    }
}

NotesInput.propTypes = {
    addNotes: PropTypes.func
}

export default NotesInput;