import React from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";


function RegisterInput({register}){
    const [name, onNameChange] = useInput('');
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');

    const onSubmitHandler = (e) => {
        e.preventDefault();

        register({
            name: name,
            email: email,
            password: password
        });

    }

    return (
        <form className="input-register" onSubmit={e => {onSubmitHandler(e)}}>
            <label htmlFor="name">Name</label>
            <input htmlFor="name" type="text" value={name} onChange={onNameChange}/>
            <label htmlFor="email">Email</label>
            <input htmlFor="email" type="email" value={email} onChange={onEmailChange} />
            <label htmlFor="password">Password</label>
            <input htmlFor="password" type="password" autoComplete="current-password" value={password} onChange={onPasswordChange} />
            <button type="submit">Register</button>
        </form>
    )
}

RegisterInput.propTypes = {
    register: PropTypes.func.isRequired
}

export default RegisterInput;