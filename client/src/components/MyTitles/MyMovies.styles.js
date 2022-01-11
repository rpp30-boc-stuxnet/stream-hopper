import tw, { styled } from "twin.macro";


export const MoviesContainer = styled.div`
  ${tw`
    flex
    h-1/4
    mb-8
    px-4
    w-full
    z-10
  `}
`;

export const MoviesTitle = styled.h2`
  ${tw`
    text-2xl
    text-[#F4F1BB]
    font-bold
    uppercase
    mx-8
  `}
`;

export const MoviesRow = styled.div`
  ${tw`
      flex
      overflow-x-hidden
      mt-4
      mx-3
      w-11/12
    `}

    &::-webkit-scrollbar {
      display: none;
    }
`;

export const MoviesPoster = styled.img`
  ${tw`
    mx-2
    h-72
    w-auto
  `}

  // Scale the movie img when the user hovers on it.
  transition: all 0.2s;
  &:hover {
    transform: scale(1.09);
    box-shadow: 0 3px 4px 2px rgba(255,255,255,0.4);
  }
`;

export const MoviePosterContainer = styled.div`
  ${tw`
    flex
    flex-col
    relative
    mx-2
    h-full
  `}
`;

export const AddRemoveMovieButton = styled.button`
  ${tw`
    w-24
    bg-[#64113F]
    text-[#F4F1BB]
    text-lg
    px-2
    mx-1
    rounded-lg
    hover:bg-[#368F88]
  `}
`;

