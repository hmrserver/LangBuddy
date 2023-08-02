
import { Card } from "./Card";
import { SkeletonCard } from "./SkeletonCard";

export const Content = ({ data, isLoading }) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-3 gap-4 p-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      );
    }
  
    return (
      <div className="grid grid-cols-3 gap-4 p-4">
        {(data.clips &&
          data.clips.map((item) => (
            <Card
              key={item.id}
              image={item.thumbnailURL}
              title={item.movieName}
              description={item.transcript}
              clipurl={item.clipURL}
            />
          ))) || "Meet LangBuddy's Word Wizard! 🧙‍♂️✨ He's like a magical detective, helping you decode word mysteries in a snap! With a flick of his movie wand, he shows you fun movie clips where the word is used, along with the transcript. Imagine finding the meaning of \"epic\" while watching Frodo's journey in \"The Lord of the Rings\"! It's that easy! No more boring dictionaries; just lights, camera, language fun! LangBuddy's Word Wizard makes learning words as delightful as a box of jellybeans from Willy Wonka! 🍿🎥🍬 Let's embark on a word-tastic adventure together! 🚀📚🔍"}
      </div>
    );
  };