function MembershipCard({ title, position, image }: any) {
  return (
    <div className="flex flex-row border border-main rounded-2xl shadow-md px-3 py-2 mt-3 items-center">

        <div className=" flex items-center">
            <img  className="rounded-full w-12" src={image} alt="society image" />
        </div>


      <div className="flex flex-col px-3  justify-start">
        <div>
          <p className="text-sm font-semibold">{title}</p>
        </div>

        <div>
          <p className="text-xs">{position}</p>
        </div>
      </div>
    </div>
  );
}

export default MembershipCard;
