function InputWithPlace({type, place, onChange, value ,name } :any) {
  return (
    <div className='w-full max-w-md min-w-[200px] mt-5'>
         <input
              className="w-full bg-transparent text-base placeholder:text-slate-400 text-slate-700  border border-main rounded-lg px-3 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder={place}
              type= {type}
              onChange={onChange}
              value={value}
              name={name}
              
            />
    </div>
  )
}

export default InputWithPlace