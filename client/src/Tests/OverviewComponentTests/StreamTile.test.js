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
import StreamTile from '../../components/MovieOverview/StreamTile.js';


let deetz = {
    "rent": [
        {
            "companyInfo": {
                "source_id": 24,
                "name": "Amazon",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/amazon_100px.png"
            },
            "price": 3.99,
            "quality": "SD",
            "webUrl": "https://watch.amazon.com/detail?gti=amzn1.dv.gti.3cb10e0b-98a4-eac8-32f5-ad59462a2d4c",
            "type": "rent"
        },
        {
            "companyInfo": {
                "source_id": 24,
                "name": "Amazon",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/amazon_100px.png"
            },
            "price": 3.99,
            "quality": "HD",
            "webUrl": "https://watch.amazon.com/detail?gti=amzn1.dv.gti.3cb10e0b-98a4-eac8-32f5-ad59462a2d4c",
            "type": "rent"
        },
        {
            "companyInfo": {
                "source_id": 344,
                "name": "YouTube",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/youtube_100px.png"
            },
            "price": 3.99,
            "quality": "4K",
            "webUrl": "https://www.youtube.com/watch?v=lK8m6B7m3Fg",
            "type": "rent"
        },
        {
            "companyInfo": {
                "source_id": 140,
                "name": "Google Play",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/googlePlay_100px.png"
            },
            "price": 3.99,
            "quality": "4K",
            "webUrl": "https://play.google.com/store/movies/details/Ready_Player_One?gl=US&hl=en&id=EycW6nwmyvQ.P",
            "type": "rent"
        },
        {
            "companyInfo": {
                "source_id": 307,
                "name": "VUDU",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/vudu_100px.png"
            },
            "price": 3.99,
            "quality": "HD",
            "webUrl": "https://www.vudu.com/content/movies/details/Ready-Player-One/918326",
            "type": "rent"
        },
        {
            "companyInfo": {
                "source_id": 307,
                "name": "VUDU",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/vudu_100px.png"
            },
            "price": 3.99,
            "quality": "SD",
            "webUrl": "https://www.vudu.com/content/movies/details/Ready-Player-One/918326",
            "type": "rent"
        },
        {
            "companyInfo": {
                "source_id": 307,
                "name": "VUDU",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/vudu_100px.png"
            },
            "price": 3.99,
            "quality": "4K",
            "webUrl": "https://www.vudu.com/content/movies/details/Ready-Player-One/918326",
            "type": "rent"
        },
        {
            "companyInfo": {
                "source_id": 398,
                "name": "Microsoft Store",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/398_autogenerated.png"
            },
            "price": 3.99,
            "quality": "SD",
            "webUrl": "https://www.microsoft.com/en-us/p/ready-player-one/8d6kgwxp5mjh",
            "type": "rent"
        },
        {
            "companyInfo": {
                "source_id": 398,
                "name": "Microsoft Store",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/398_autogenerated.png"
            },
            "price": 3.99,
            "quality": "4K",
            "webUrl": "https://www.microsoft.com/en-us/p/ready-player-one/8d6kgwxp5mjh",
            "type": "rent"
        },
        {
            "companyInfo": {
                "source_id": 398,
                "name": "Microsoft Store",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/398_autogenerated.png"
            },
            "price": 3.99,
            "quality": "HD",
            "webUrl": "https://www.microsoft.com/en-us/p/ready-player-one/8d6kgwxp5mjh",
            "type": "rent"
        },
        {
            "companyInfo": {
                "source_id": 442,
                "name": "DirecTV On Demand",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/442_autogenerated.png"
            },
            "price": 3.99,
            "quality": "HD",
            "webUrl": "https://www.directv.com/movies/Ready-Player-One-N24xMDYxUjc5d21KMi85UGplMjRQQT09",
            "type": "rent"
        },
        {
            "companyInfo": {
                "source_id": 442,
                "name": "DirecTV On Demand",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/442_autogenerated.png"
            },
            "price": 3.99,
            "quality": "4K",
            "webUrl": "https://www.directv.com/movies/Ready-Player-One-N24xMDYxUjc5d21KMi85UGplMjRQQT09",
            "type": "rent"
        },
        {
            "companyInfo": {
                "source_id": 349,
                "name": "iTunes",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/apple_100px.png"
            },
            "price": 3.99,
            "quality": "HD",
            "webUrl": "https://tv.apple.com/us/movie/ready-player-one/umc.cmc.295lpojxtonf6dqc4za2i97lr?playableId=tvs.sbd.9001%3A1354248992",
            "type": "rent"
        },
        {
            "companyInfo": {
                "source_id": 349,
                "name": "iTunes",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/apple_100px.png"
            },
            "price": 3.99,
            "quality": "SD",
            "webUrl": "https://tv.apple.com/us/movie/ready-player-one/umc.cmc.295lpojxtonf6dqc4za2i97lr?playableId=tvs.sbd.9001%3A1354248992",
            "type": "rent"
        },
        {
            "companyInfo": {
                "source_id": 349,
                "name": "iTunes",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/apple_100px.png"
            },
            "price": 3.99,
            "quality": "4K",
            "webUrl": "https://tv.apple.com/us/movie/ready-player-one/umc.cmc.295lpojxtonf6dqc4za2i97lr?playableId=tvs.sbd.9001%3A1354248992",
            "type": "rent"
        },
        {
            "companyInfo": {
                "source_id": 443,
                "name": "Spectrum On Demand",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/443_autogenerated.png"
            },
            "price": 3.99,
            "quality": "HD",
            "webUrl": "https://ondemand.spectrum.net/movies/12806300/ready-player-one/",
            "type": "rent"
        },
        {
            "companyInfo": {
                "source_id": 443,
                "name": "Spectrum On Demand",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/443_autogenerated.png"
            },
            "price": 3.99,
            "quality": "SD",
            "webUrl": "https://ondemand.spectrum.net/movies/12806300/ready-player-one/",
            "type": "rent"
        }
    ],
    "buy": [
        {
            "companyInfo": {
                "source_id": 24,
                "name": "Amazon",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/amazon_100px.png"
            },
            "price": 14.99,
            "quality": "SD",
            "webUrl": "https://watch.amazon.com/detail?gti=amzn1.dv.gti.3cb10e0b-98a4-eac8-32f5-ad59462a2d4c",
            "type": "buy"
        },
        {
            "companyInfo": {
                "source_id": 24,
                "name": "Amazon",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/amazon_100px.png"
            },
            "price": 14.99,
            "quality": "HD",
            "webUrl": "https://watch.amazon.com/detail?gti=amzn1.dv.gti.3cb10e0b-98a4-eac8-32f5-ad59462a2d4c",
            "type": "buy"
        },
        {
            "companyInfo": {
                "source_id": 344,
                "name": "YouTube",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/youtube_100px.png"
            },
            "price": 14.99,
            "quality": "4K",
            "webUrl": "https://www.youtube.com/watch?v=lK8m6B7m3Fg",
            "type": "buy"
        },
        {
            "companyInfo": {
                "source_id": 344,
                "name": "YouTube",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/youtube_100px.png"
            },
            "price": 9.99,
            "quality": "HD",
            "webUrl": "https://www.youtube.com/watch?v=lK8m6B7m3Fg",
            "type": "buy"
        },
        {
            "companyInfo": {
                "source_id": 344,
                "name": "YouTube",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/youtube_100px.png"
            },
            "price": 9.99,
            "quality": "SD",
            "webUrl": "https://www.youtube.com/watch?v=lK8m6B7m3Fg",
            "type": "buy"
        },
        {
            "companyInfo": {
                "source_id": 140,
                "name": "Google Play",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/googlePlay_100px.png"
            },
            "price": 14.99,
            "quality": "4K",
            "webUrl": "https://play.google.com/store/movies/details/Ready_Player_One?gl=US&hl=en&id=EycW6nwmyvQ.P",
            "type": "buy"
        },
        {
            "companyInfo": {
                "source_id": 140,
                "name": "Google Play",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/googlePlay_100px.png"
            },
            "price": 9.99,
            "quality": "HD",
            "webUrl": "https://play.google.com/store/movies/details/Ready_Player_One?gl=US&hl=en&id=EycW6nwmyvQ.P",
            "type": "buy"
        },
        {
            "companyInfo": {
                "source_id": 140,
                "name": "Google Play",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/googlePlay_100px.png"
            },
            "price": 9.99,
            "quality": "SD",
            "webUrl": "https://play.google.com/store/movies/details/Ready_Player_One?gl=US&hl=en&id=EycW6nwmyvQ.P",
            "type": "buy"
        },
        {
            "companyInfo": {
                "source_id": 307,
                "name": "VUDU",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/vudu_100px.png"
            },
            "price": 14.99,
            "quality": "SD",
            "webUrl": "https://www.vudu.com/content/movies/details/Ready-Player-One/918326",
            "type": "buy"
        },
        {
            "companyInfo": {
                "source_id": 307,
                "name": "VUDU",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/vudu_100px.png"
            },
            "price": 14.99,
            "quality": "4K",
            "webUrl": "https://www.vudu.com/content/movies/details/Ready-Player-One/918326",
            "type": "buy"
        },
        {
            "companyInfo": {
                "source_id": 307,
                "name": "VUDU",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/vudu_100px.png"
            },
            "price": 14.99,
            "quality": "HD",
            "webUrl": "https://www.vudu.com/content/movies/details/Ready-Player-One/918326",
            "type": "buy"
        },
        {
            "companyInfo": {
                "source_id": 398,
                "name": "Microsoft Store",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/398_autogenerated.png"
            },
            "price": 14.99,
            "quality": "4K",
            "webUrl": "https://www.microsoft.com/en-us/p/ready-player-one/8d6kgwxp5mjh",
            "type": "buy"
        },
        {
            "companyInfo": {
                "source_id": 398,
                "name": "Microsoft Store",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/398_autogenerated.png"
            },
            "price": 14.99,
            "quality": "HD",
            "webUrl": "https://www.microsoft.com/en-us/p/ready-player-one/8d6kgwxp5mjh",
            "type": "buy"
        },
        {
            "companyInfo": {
                "source_id": 398,
                "name": "Microsoft Store",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/398_autogenerated.png"
            },
            "price": 14.99,
            "quality": "SD",
            "webUrl": "https://www.microsoft.com/en-us/p/ready-player-one/8d6kgwxp5mjh",
            "type": "buy"
        },
        {
            "companyInfo": {
                "source_id": 442,
                "name": "DirecTV On Demand",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/442_autogenerated.png"
            },
            "price": 14.99,
            "quality": "HD",
            "webUrl": "https://www.directv.com/movies/Ready-Player-One-N24xMDYxUjc5d21KMi85UGplMjRQQT09",
            "type": "buy"
        },
        {
            "companyInfo": {
                "source_id": 442,
                "name": "DirecTV On Demand",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/442_autogenerated.png"
            },
            "price": 14.99,
            "quality": "4K",
            "webUrl": "https://www.directv.com/movies/Ready-Player-One-N24xMDYxUjc5d21KMi85UGplMjRQQT09",
            "type": "buy"
        },
        {
            "companyInfo": {
                "source_id": 349,
                "name": "iTunes",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/apple_100px.png"
            },
            "price": 14.99,
            "quality": "HD",
            "webUrl": "https://tv.apple.com/us/movie/ready-player-one/umc.cmc.295lpojxtonf6dqc4za2i97lr?playableId=tvs.sbd.9001%3A1354248992",
            "type": "buy"
        },
        {
            "companyInfo": {
                "source_id": 349,
                "name": "iTunes",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/apple_100px.png"
            },
            "price": 14.99,
            "quality": "SD",
            "webUrl": "https://tv.apple.com/us/movie/ready-player-one/umc.cmc.295lpojxtonf6dqc4za2i97lr?playableId=tvs.sbd.9001%3A1354248992",
            "type": "buy"
        },
        {
            "companyInfo": {
                "source_id": 349,
                "name": "iTunes",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/apple_100px.png"
            },
            "price": 14.99,
            "quality": "4K",
            "webUrl": "https://tv.apple.com/us/movie/ready-player-one/umc.cmc.295lpojxtonf6dqc4za2i97lr?playableId=tvs.sbd.9001%3A1354248992",
            "type": "buy"
        }
    ],
    "sub": [
        {
            "companyInfo": {
                "source_id": 387,
                "name": "HBO MAX",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/hbomax_100px.png"
            },
            "price": null,
            "quality": null,
            "webUrl": "https://play.hbomax.com/feature/urn:hbo:feature:GX9q5dgf0LMILwgEAAAF0",
            "type": "sub"
        },
        {
            "companyInfo": {
                "source_id": 443,
                "name": "Spectrum On Demand",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/443_autogenerated.png"
            },
            "price": null,
            "quality": null,
            "webUrl": "https://ondemand.spectrum.net/movies/12806300/ready-player-one/",
            "type": "sub"
        },
        {
            "companyInfo": {
                "source_id": 272,
                "name": "TBS",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/tbs_100px.png"
            },
            "price": null,
            "quality": null,
            "webUrl": "https://www.tbs.com/movies/ready-player-one-theatrical",
            "type": "sub"
        },
        {
            "companyInfo": {
                "source_id": 353,
                "name": "truTV",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/trutv_100px.png"
            },
            "price": null,
            "quality": null,
            "webUrl": "https://www.trutv.com/movies/ready-player-one-theatrical",
            "type": "sub"
        },
        {
            "companyInfo": {
                "source_id": 276,
                "name": "TNT",
                "logo_100px": "https://cdn.watchmode.com/provider_logos/tnt_100px.png"
            },
            "price": null,
            "quality": null,
            "webUrl": "https://www.tntdrama.com/movies/ready-player-one-theatrical",
            "type": "sub"
        }
    ]
}


// const server = setupServer()

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())

describe ('StreamTile Component Test',  () => {



  test('Should be on the DOM', async function () { //check if component renders

    render(<StreamTile type = {"rent"} details = {deetz["rent"]} titleName = {"Ready Player One"}/>);
    // render (<MovieOverview />)
    expect(screen.getByText('Rent', {exact: false})).toBeInTheDocument();
  })


})
