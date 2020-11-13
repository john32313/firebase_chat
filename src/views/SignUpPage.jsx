import React from 'react';
import SignIn from '../components/SignIn';

function SignUpPage() {
  return (
    <main className="container mx-auto h-screen flex justify-center items-center">
      <div className="border-solid border-2 border-blue-300 bg-blue-200 rounded p-5">
        <SignIn />
      </div>
    </main>
  );
}

export default SignUpPage;
