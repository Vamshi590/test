
function SubHeading({content} : any) : any{
  return (
    <div className="flex justify-center">
          <div className="pt-2 pb-2 flex-col">
         
              <hr className="bg- gradient-to-main from-black-50 h-px mt-4 bg-main  " />
         
            <div>
              <p className="font-semibold text-center text-base p-2">
                {content}
              </p>
            </div>

            
              <hr className="bg- gradient-to-black from-main h-px mb-3 bg-main " />
           
          </div>
        </div>
  )
}

export default SubHeading