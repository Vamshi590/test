import React, { useEffect, useState } from 'react'

function DropdownWithSearchAndLabel({ place,  onSelect, dropDownOptions , label } : any) {
    const [options, setOptions] = useState<any[]>(dropDownOptions);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredOptions, setFilteredOptions] = useState<any[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // Control dropdown visibility
  
    const [selectedOption, setSelectedOption] = useState<string>("");
  
   
    
    
  
    // Handle search and filter based on search term
    useEffect(() => {
      if (searchTerm === "") {
        setFilteredOptions([]);
      } else {
        const filtered = options.filter((option) =>
          option
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        setFilteredOptions(filtered);
        setIsDropdownOpen(filtered.length > 0); // Open the dropdown if there are filtered options
      }
    }, [searchTerm, options]);
  
    const handleSelect = (option: string) => {
     
      setSelectedOption(option);
      setSearchTerm(""); // Update the search term to the selected city and state
      onSelect(option); // Send data to parent
      setIsDropdownOpen(false); // Close the dropdown after selection
      console.log(option)
    };
  
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>){
      setSearchTerm(e.target.value)
      setSelectedOption("");
    }
  
  return (
    <div className="my-4">

        <div>
            <p>{label}</p>
        </div>
    <input
      id="stateCity"
      type="text"
      value={selectedOption || searchTerm}
      onChange={handleInputChange}
      onFocus={() => setIsDropdownOpen(!!filteredOptions.length)} // Open dropdown on focus if there are filtered options
      className=" py-2.5 border-b placeholder:text-sm border-b-main border-main  w-full focus:outline-none"
      placeholder={place}
    />

    {/* Dropdown list */}
    {isDropdownOpen && filteredOptions.length > 0 && (
      <ul className="absolute mt-2 w-full max-h-60 overflow-auto bg-white border rounded-lg shadow-md z-10">
        {filteredOptions.map((option, index) => (
          <li
            key={index}
            onClick={() => handleSelect(option)}
            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
          >
            {option}
          </li>
        ))}
      </ul>
    )}

   
  </div>  )
}

export default DropdownWithSearchAndLabel