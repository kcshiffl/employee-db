import React, { useState, useEffect } from 'react';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

function SignIn() {
  return (
    <div>
      <h1>Login Page</h1>
      <AmplifyAuthenticator >
      </AmplifyAuthenticator>
    </div>
  );
}

//export default withAuthenticator(SignIn);
export default SignIn;
