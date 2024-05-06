export function Button({onClick,label}){
    return(
        <button type="submit" onClick={onClick} className="w-full text-white bg-secondary hover:bg-green-400    focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{label}</button>
    )
}