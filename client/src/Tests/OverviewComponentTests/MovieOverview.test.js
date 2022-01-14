/**
 * @jest-environment jsdom
 */

// dependencies
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils';
import 'regenerator-runtime/runtime'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

//component
import MovieOverview from '../../components/MovieOverview/movieoverview.js';

let apiDetailData = {
  "title": "Tomb Raider",
  "ratings": [
      {
          "Source": "Internet Movie Database",
          "Value": "6.3/10"
      },
      {
          "Source": "Rotten Tomatoes",
          "Value": "52%"
      },
      {
          "Source": "Metacritic",
          "Value": "48/100"
      }
  ],
  "run_time": "119 min",
  "director": "Roar Uthaug",
  "synopsis": "Lara Croft (Alicia Vikander) is the fiercely independent daughter of eccentric adventurer Lord Richard Croft (Dominic West), who vanished when she was scarcely a teen. Now a young woman of twenty-one without any real focus or purpose, Lara navigates the chaotic streets of trendy East London as a bike courier, barely making the rent, and takes college courses, rarely making it to class. Determined to forge her own path, she refuses to take the reins of her father's global empire just as staunchly as she rejects the idea that he's truly gone. Advised to face the facts and move forward after seven years without him, even Lara can't understand what drives her to finally solve the puzzle of his mysterious death. Going explicitly against his final wishes, she leaves everything she knows behind in search of her dad's last-known destination: a fabled tomb on a mythical island that might be somewhere off the coast of Japan. But her mission will not be an easy one; just reaching the island will be extremely treacherous. Suddenly, the stakes couldn't be higher for Lara, who, against the odds and armed with only her sharp mind, blind faith, and inherently stubborn spirit, must learn to push herself beyond her limits as she journeys into the unknown. If she survives this perilous adventure, it could be the making of her, earning her the name \"tomb raider\".",
  "type": "movie",
  "tmdb_id": "338970",
  "parental_rating": "PG-13",
  "release_date": "16 Mar 2018",
  "saved_by_user": false,
  "poster_path": "https://image.tmdb.org/t/p/w500/ePyN2nX9t8SOl70eRW47Q29zUFO.jpg"
};


const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe ('Overview Component Test',  () => {
  let handleLogout = () => {};

  server.use(
    rest.get('/api/titleDetails', (req, res, ctx) => {
      return res(ctx.json(apiDetailData))
    })
  )

  test('Should be on the DOM', async function () { //check if component renders
    // render (<MovieOverview />)
    await act (async () => {
      render(<MovieOverview handleLogout = {handleLogout}/>)
    });
    expect(screen.getByText('Where to Watch')).toBeInTheDocument();
  })

  test('Director Details should be in DOM', async function () { //check if component renders
    // render (<MovieOverview />)
    await act (async () => {
      render(<MovieOverview handleLogout = {handleLogout}/>)
    });
    expect(screen.getByText('Director:', {exact: false})).toBeInTheDocument();
  })

  test('Title Synopsis section should be in DOM', async function () { //check if component renders
    // render (<MovieOverview />)
    await act (async () => {
      render(<MovieOverview handleLogout = {handleLogout}/>)
    });
    expect(screen.getByText('Title Synopsis', {exact: false})).toBeInTheDocument();
  })
  test('Release Date should be in DOM', async function () { //check if component renders
    // render (<MovieOverview />)
    await act (async () => {
      render(<MovieOverview handleLogout = {handleLogout}/>)
    });
    expect(screen.getByText('Release:', {exact: false})).toBeInTheDocument();
  })
  test('IMDB rating should be in DOM', async function () { //check if component renders
    // render (<MovieOverview />)
    await act (async () => {
      render(<MovieOverview handleLogout = {handleLogout}/>)
    });
    expect(screen.getByText('imdb', {exact: false})).toBeInTheDocument();
  })
  test('Run Time should be in DOM', async function () { //check if component renders
    // render (<MovieOverview />)
    await act (async () => {
      render(<MovieOverview handleLogout = {handleLogout}/>)
    });
    expect(screen.getByText('Run Time:', {exact: false})).toBeInTheDocument();
  })
})