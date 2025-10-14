import Entrypage from "@/components/Entry";
import { FaXTwitter } from "react-icons/fa6";

export default function Home() {
  return (
    <section className="container flex-wrap mx-auto p-4">
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <Entrypage />
        <div className="flex w-full items-end cursor-pointer justify-end  text-right mt-[3%] ">
          <a
            href="https://x.com/haakimii__"
            className="rounded-2xl py-4 px-5  bg-gradient-to-r text-white  from-[#a66cff] to-[#3E3170] font-bold text-[16px] flex items-center gap-2"
          >
            <FaXTwitter className="text-xl" />
            Hakimi
          </a>
        </div>
      </div>
      
    </section>
  );
}
