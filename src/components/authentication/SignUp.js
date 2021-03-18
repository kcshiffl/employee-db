import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';

const signUpFields=[
          {
            type: "username",
            label: "Username*",
            placeholder: "Please enter a username",
            required: true,
          },
          {
            type: "email",
            label: "Email*",
            placeholder: "example@email.com",
            required: true,
          },
          {
            type: "password",
            label: "Password*",
            placeholder: "*****",
            required: true,
          },
        ];

function SignUp() {
  return (
    <div align='center'>
      <h1></h1>
      <AmplifySignUp slot="sign-up" headerText="Sign up for your account!" formFields={signUpFields} />
    </div>
  );
}
export default SignUp;
