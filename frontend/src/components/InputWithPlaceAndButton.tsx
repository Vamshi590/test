
function InputWithPlaceAndButton({place, type, onChange, value , onClick} : any) {
  return (
    <div className='flex w-full max-w-sm min-w-[200px] border border-t-main border-r-main border-l-main rounded-2xl  transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'>
    <input
         className="w-full bg-transparent  placeholder:text-slate-400 text-slate-700 text-sm focus:outline-none px-3 py-3"
         placeholder={place}
         type= {type}
         onChange={onChange}
         value={value}
         
       />

       <button className='justify-end px-2 text-base font-semibold' onClick={onClick}>Add</button>
</div>
  )
}

export default InputWithPlaceAndButton