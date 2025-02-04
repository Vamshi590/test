import { IoMdSearch } from "react-icons/io";


function Search() {
  return (

    <div className="flex px-4 py-2 rounded-full border-2 border-main overflow-hidden max-w-md w-full mx-auto font-[sans-serif]">

    <IoMdSearch className="w-5 h-5 fill-gray-600 mr-3" />
        
          <input type="email" placeholder="Search Something..." className="w-full outline-none bg-transparent text-gray-600 text-sm" />
        </div>
              )
}

export default Search