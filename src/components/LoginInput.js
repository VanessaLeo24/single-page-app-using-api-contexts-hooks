import React from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

function LoginInput({login}){
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');
   
    const onSubmitHandler = (e) => {
        e.preventDefault();

        login({
            email: email,
            password: password
        });

    }

    return (
        <form className="input-login" onSubmit={e => {onSubmitHandler(e)}}>
            <label htmlFor="email">Email</label>
            <input htmlFor="email" type="email" value={email} onChange={onEmailChange}  />
            <label htmlFor="password">Password</label>
            <input htmlFor="password" type="password" value={password} onChange={onPasswordChange} />
            <button type="submit">Login</button>
        </form>
    )
}

LoginInput.propTypes = {
    login: PropTypes.func.isRequired
}


export default LoginInput;