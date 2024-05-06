import React from 'react';

export const Usericon = ({firstname}) => {
  const name = firstname[0]; // Replace "ChatGPT" with your name

  // Define colors for each letter
  const colors = ['#FF5733', '#33FF57', '#337AFF', '#FF33F9', '#FFFF33', '#33FFFF'];

  return (
    <div className="flex flex-row justify-center items-center my-4 mx-8 ">
    {name.split('').map((letter, index) => (
      <span key={index} className={`text-4xl mx-2 py-2 rounded-full px-4 bg-yellow-300 border-2 border-gray-700`} style={{ color: colors[index % colors.length],background:"yellow" }}>
        {letter}
      </span>
    ))}
  </div>
  );
}


