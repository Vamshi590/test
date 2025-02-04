function ProfileCard({
  profilepic,
  name,
  details,
  activeloction,
  questions,
  published,
  followers,
  following,
  currentWorkPlace,
}: any) {
  return (
    <div className="flex flex-col border border-main rounded-2xl shadow-md mt-6">
      <div className=" flex flex-row ">
        <div className="py-3 flex flex-row justify-between px-2">
          <div className="w-24 rounded-full">
            <img
              src={profilepic}
              className="w-24  rounded-full"
              alt="profile picture"
            />
          </div>

          <div className="flex flex-col justify-center px-6">

            <p className="text-lg font-medium">{name}</p>

            <p className="text-sm font-normal">{details}</p>
            <div className="pt-2">
               <p className="text-xs">{currentWorkPlace}</p>
            <p className="text-xs">{activeloction}</p>
            </div>
           

          </div>



         
        </div>
      </div>
      <hr />
      <div className="flex flex-row justify-between px-3 py-2">
        <div className="flex flex-col items-center">
          <p>{questions}</p>
          <p className="text-xs">Questions</p>
        </div>

        <div className="flex flex-col items-center">
          <p>{published}</p>
          <p className="text-xs">Published</p>
        </div>

        <div className="flex flex-col items-center">
          <p>{followers}</p>
          <p className="text-xs">Followers</p>
        </div>

        <div className="flex flex-col items-center">
          <p>{following}</p>
          <p className="text-xs">Following</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
