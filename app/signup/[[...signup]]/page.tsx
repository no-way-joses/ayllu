import { SignUp } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import Image from "next/image";

export default function Signup() {

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <SignUp appearance={{
          baseTheme: neobrutalism,
          variables: {
            colorBackground: "#ffdab5"
          }
        }}/>
    </div>
  );
}