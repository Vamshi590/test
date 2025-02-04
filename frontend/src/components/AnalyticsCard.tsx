
function AnalyticsCard({value , label , analytics} : any) {
  return (
    <div className="grid col-span-6 items-center">
      <div className="border border-main p-3 flex flex-col rounded-2xl shadow-md">
        <p className="text-base font-semibold">{value}</p>
        <p className="text-sm  py-1">{label}</p>

        <p className="text-xs">{analytics}</p>
      </div>
    </div>
  );
}

export default AnalyticsCard;
