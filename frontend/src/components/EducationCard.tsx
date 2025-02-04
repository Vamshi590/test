
function EducationCard({jobimage , title , organisation , timeline} : any) {
  return (
    <div className="flex flex-row border border-main shadow-md rounded-2xl p-2 mt-3">

            

    <div>
      <img className="rounded-full pt-1" src= {jobimage} alt="job" />
    </div>

    <div className="flex flex-col px-3">
      <p className="text-sm font-semibold px-1">{title}</p>
      <p className="text-xs px-1">{organisation}</p>
      <p className="text-xs px-1">{timeline}</p>

    </div>

  </div>
  )
}

export default EducationCard