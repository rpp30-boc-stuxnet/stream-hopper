/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import '@testing-library/jest-dom';
 import { render, screen } from '@testing-library/react';
 import { BrowserRouter } from 'react-router-dom';
 import SourceReview from '../../components/MovieOverview/SourceReview.js';
 import { rest } from 'msw'
 import 'regenerator-runtime/runtime'
 import { setupServer } from 'msw/node'
 import { act } from 'react-dom/test-utils';


 describe('SourceReview component', function () {
   test('should render SourceReview component', function () {



     let handleToggle = () => { }
     const app = render(<SourceReview
       handleToggle={handleToggle}
       quality={"SD"}
       companyId={349}
       titleName={"Jurassic Park"}
       companyName={"iTunes"}
       streamType={"rent"} />)

     expect(app.getByText("Audio Quality:")).toBeInTheDocument();
   })
 })