
export function InputComponent({ id, type="text", label, placeholder,onChange,value,step}) {

    
    return (

        <div>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-primary dark:text-primary">{label + ":"}</label>
            <input type={type} value={value} name={id} id={id} onChange={onChange} step={step} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
    )
}