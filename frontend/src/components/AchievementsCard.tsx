
function AchievementsCard({jobimage , title , date} : any) {
  return (
    <div className="flex flex-col border border-main rounded-2xl shadow-md px-3 py-2 mt-3 ">
    <div className="flex flex-row items-center">
      <div className=" flex items-center">
        <img
          className="rounded-full w-12"
          src={jobimage}
          alt="society image"
        />
      </div>

      <div className="flex flex-col px-3  justify-start">
        <div>
          <p className="text-xs font-semibold">
           {title}
          </p>
        </div>

        <div>
          <p className="text-xs">Issued on {date}</p>
        </div>

        <div className="py-1">
          <button className="text-xs border border-main rounded-full py-1 px-1.5">
            View Award
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AchievementsCard