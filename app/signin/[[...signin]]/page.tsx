import { SignIn } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import Image from "next/image";

export default function Signin() {

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <SignIn appearance={{
          baseTheme: neobrutalism,
          variables: {
            colorBackground: "#ffdab5"
          }
        }}/>
    </div>
  );
}
