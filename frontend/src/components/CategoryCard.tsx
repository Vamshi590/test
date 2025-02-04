
function CategoryCard({ title, subtitle, icon, onClick }: any): any {
  return (
    <div className="flex  w-80 md:w-96 h-24 md:h-28 justify-center  mt-5">
      
        <div className="flex border border-main rounded-2xl shadow-lg px-2 py-2.5 hover:shadow-xl cursor-pointer" onClick={onClick}>
          <img src={icon} alt="logo" />
          <div className="flex flex-col justify-center space-y-1 w-2/3">
            <p className="text-sm lg:text-base pl-6 text-gray-800">{title}</p>
            <p className="text-xs lg:text-sm pl-6 text-gray-500 ">{subtitle}</p>
          </div>
        </div>
     
    </div>
  );
}

export default CategoryCard;
