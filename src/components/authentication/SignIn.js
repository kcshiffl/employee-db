import React, { useState, useEffect } from 'react';
import { AmplifySignIn } from '@aws-amplify/ui-react';

const signInFields=[
          {
            type: "username",
            label: "Username",
            placeholder: "Enter your username",
            required: true,
          },
          {
            type: "password",
            label: "Password",
            placeholder: "Enter your password",
            required: true,
          },
        ];


function SignIn() {
  return (
    <div align='center'>
      <h1>Login Page</h1>
      <AmplifySignIn headerText="Welcome back!" formFields={signInFields}/>
    </div>
  );
}
export default SignIn;
