import Image from "next/image";
import { Button } from "./ui/button";
import { useUsersPreferences } from "@/hooks/useUsersPreferences";
import { useState } from "react";


export function MoviesSuggestions() {
    const [currMovieIdx, setCurrMovieIdx] = useState(0)
    const {reset, moviesSuggestions} = useUsersPreferences()
    const isLast = currMovieIdx === moviesSuggestions.length - 1

    const handleButtonClick = () => {
        if(isLast ){
            reset()
            return
        }
        setCurrMovieIdx(currMovieIdx + 1)
    }
  return (
    <article className="flex flex-col items-center justify-center space-y-2 mb-4">
      <h2 className="text-2xl font-bold text-center">{moviesSuggestions[currMovieIdx].title}</h2>
      <Image src={moviesSuggestions[currMovieIdx].imageUrl} alt={moviesSuggestions[currMovieIdx].title} width={342} height={400} />
      <p className="text-sm text-gray-500 text-center">{moviesSuggestions[currMovieIdx].whyThisMovie}</p>
      <Button onClick={handleButtonClick} className="text-lg w-full">
        {isLast ? 'Start Again' : 'Next Movie'}
      </Button>
    </article>
  )
} 