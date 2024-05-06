export function Bottomwarning({title,label,link}){
    return(
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      {title} <a href={link} className="font-medium text-primary-600 hover:underline dark:text-primary-500">{label}</a>
                  </p>
    )
}