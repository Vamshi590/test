import { useState } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

export default function Dropdown({ label }: any) {
  const [isOpen, setIsopen] = useState(false);
  return (
    <div>
      <label htmlFor="email" className="font-medium text-slate-600">
        {label}
      </label>
      <div className="flex justify-center w-full border border-main rounded-lg">
        <div className="flex justify-between w-full">
          <button
            onClick={() => setIsopen((e: any) => !e)}
            className=" text-left w-full  rounded-lg p-2"
          ></button>
          {!isOpen ? (
            <div className="flex flex-col justify-center items-center pr-2">
              <AiOutlineCaretDown className="h-10 " />
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center pr-2">
              <AiOutlineCaretUp className="h-10" />
            </div>
          )}
          {isOpen}
        </div>
      </div>
    </div>
  );
}
