
const InputField = ({ label, type = 'text', value, onChange, placeholder, disabled = false, icon: Icon }) => (
     <div className="mb-4">
          <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
          <div className="relative">
               <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full p-3 pl-10 rounded-lg border focus:ring-2 focus:ring-indigo-500 transition duration-150 bg-slate-700 text-white placeholder-slate-500 ${disabled ? 'border-slate-600 cursor-not-allowed opacity-70' : 'border-slate-600 hover:border-indigo-500'
                         }`}
               />
               {Icon && <Icon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />}
          </div>
     </div>
);

export default InputField