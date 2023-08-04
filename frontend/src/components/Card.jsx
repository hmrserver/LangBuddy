import React, { useState } from "react";

export const Card = ({ title, description, image, clipurl }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (title, description) => {
    console.log(title, description);
    setSelectedCard({ title, description, clipurl });
  };

  if (selectedCard) {
    return (
      <div className="p-4 basis-1/4">
        <h2 className="text-2xl font-bold">{selectedCard.title}</h2>
        <p className="text-gray-700 dark:text-gray-400">
          {selectedCard.description}
        </p>
        <video className="w-full h-auto max-w-full" controls>
          <source src={clipurl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 basis-1/4">
      <a>
        <img className="rounded-t-lg" src={image} alt="" />
      </a>
      <div className="p-5">
        <a>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <a
          onClick={() => handleCardClick(title, description, clipurl)}
          className="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Watch
          <svg
            aria-hidden="true"
            className="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
};
