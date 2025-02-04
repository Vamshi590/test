import noimagepost from "../assets/post_moti_logo.jpg"

function ActivityCard({activitycardimg = {noimagepost} , title} : any) {
  return (

    <div className="grid col-span-6 border border-main rounded-xl shadow-md cursor-pointer">
    <div className="flex flex-col w-full">
      <div className="flex justify-center items-center h-full">
        <img
          className="w-full rounded-xl"
          src={activitycardimg}
          alt="activity card image"
        />
      </div>
  
      <div className="flex items-end">
        <p className="text-xs lg:text-base font-medium px-3 py-2">
          {title}
        </p>
      </div>
    </div>
  </div>
  )
}

export default ActivityCard