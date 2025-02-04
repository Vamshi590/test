import { useState } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
function DropWithPlace({place} : any) {
    const [isOpen, setIsopen] = useState(false);

  return (
 
      
      <div className="flex mt-4 justify-center bg-transparent px-1  text-slate-400 text-sm border border-main rounded-lg  transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow ">
        <div className="flex justify-between w-full">
          <button
            onClick={() => setIsopen((e: any) => !e)}
            className=" text-left w-full  rounded-lg p-2"
          >{place}</button>
          {!isOpen ? (
            <div className="flex flex-col justify-center items-center pr-2">
              <AiOutlineCaretDown className="h-12 " />
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center pr-2">
              <AiOutlineCaretUp className="h-12" />
            </div>
          )}
          {isOpen}
        </div>
      </div>
 
    )
}

export default DropWithPlace