import React, { useState } from 'react'
import PT from 'prop-types'


const initialFormValues = {
  username: '',
  password: '',
}
export default function LoginForm(props) {
  const [values, setValues] = useState(initialFormValues)
  // ✨ where are my props? Destructure them here



  
  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    props.login({ username: values.username, password: values.password });
    // ✨ implement
  }

  const isDisabled = () => {
    // ✨ implement
    // Trimmed username must be >= 3, and
    const trimmedUsername = values.username.trim();
    const isValidUsername = trimmedUsername.length >= 3;
    // trimmed password must be >= 8 for
    const trimmedPassword = values.password.trim();
    const isValidPassword = trimmedPassword.length >= 8;

    return !(isValidUsername && isValidPassword);
    // the button to become enabled
  }


  return (
    <form id="loginForm" onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
      />
      <input
        maxLength={20}
        value={values.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
      />
      <button disabled={isDisabled()} id="submitCredentials">Submit credentials</button>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}
