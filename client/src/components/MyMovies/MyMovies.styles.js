import tw, { styled } from "twin.macro";


export const MoviesContainer = styled.div`
  ${tw`
    flex
    my-8
  `}
`;

export const MoviesTitle = styled.h2`
  ${tw`
      text-2xl
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
      p-4
    `}

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MoviesPoster = styled.img`
  ${tw`
    m-2
    w-40
  `}

  // Scale the movie img when the user hovers on it.
  transition: all 0.2s;
  &:hover {
    transform: scale(1.09);
  }
`;

export const MoviePosterContainer = styled.div`
.buttonsContainer {
  display: flex;
  flex-direction: row;

}
${tw`
  relative
  m-2
  w-40
`}
`;

export const RemoveMovieButton = styled.button`
${tw`

`}
`;

