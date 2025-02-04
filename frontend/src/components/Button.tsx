

function Button({label, bgColor, textColor ,  onClick} : any) : any {
  return (
    <div className="flex justify-center mt-auto">
       
        <button className={`${bgColor} w-full  flex justify-center rounded-full border-2 `} onClick={onClick}>
            <p className={`${textColor}  font-semibold p-2`}>{label}</p>
        </button>
  
    </div>
    
    
  )
}

export default Button