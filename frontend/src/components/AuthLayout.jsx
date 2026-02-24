import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-full md:w-1/2 overflow-y-auto">
        <div className="min-h-full flex flex-col px-12 pt-8 pb-12">
          <div className="flex-grow flex items-center justify-center">
            {children}
          </div>
        </div>
      </div>

      <div className="hidden md:block w-1/2">
        <img
          src="https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Login background"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
