import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';

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
    <div align='center' >
      <AmplifyAuthenticator>
        <AmplifySignIn slot="sign-in" headerText="Log in to Pseunotes!" formFields={signInFields} />
          loggedin
        <AmplifySignOut />
      </AmplifyAuthenticator>
    </div>
  );
}
export default SignIn;
