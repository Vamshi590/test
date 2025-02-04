import { useEffect, useRef, useState } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

function Dropdown2({ label, onSelect , options }: any) {
  const [isOpen, setIsOpen] = useState(false); // State to toggle dropdown
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null); // To handle click outside

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false); // Close dropdown after selection
    onSelect(option);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close dropdown if click is outside
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative inline-block text-left w-full" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className="flex flex-row items-center justify-between w-full border border-main p-3 rounded-lg"
      >
        <div>
          <button className="w-full text-slate-400">
            {selectedOption || label}
          </button>
        </div>

        <div className="hover:cursor-pointer">
          {isOpen ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
        </div>
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md max-h-60 overflow-auto shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {options.length > 0 ? (
              options.map((option : string, index : number) : any=> (
                <button
                  key={index}
                  onClick={() => handleSelect(option)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  {option}
                </button>
              ))
            ) : (
              <p className="px-4 py-2 text-sm text-gray-500">Loading...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown2;
