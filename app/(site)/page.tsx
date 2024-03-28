import Image from "next/image";
import Authform from "./components/AuthForm";

export default function Home() {
    return (
      <div
        className="
            flex
            min-h-full
            flex-col
            justify-center
            py-12
            sm:px-6
            lg:px-8
            bg-[#FFE5D8]
        ">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Image
                    alt="Logo"
                    height="300"
                    width="300"
                    className="mx-auto w-auto"
                    src="/images/logo.png"
                />
            </div>
            <Authform/>
      </div>
    );
  }
  