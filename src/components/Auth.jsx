import { SignIn, SignUp } from "@clerk/clerk-react";

export default function Auth() {
  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <SignIn path="/sign-in" routing="path" />
      <SignUp path="/sign-up" routing="path" />
    </div>
  );
}
