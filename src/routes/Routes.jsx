import { createBrowserRouter } from 'react-router-dom';
import Test from '../test/Test';
import React from 'react';
import CardList from '../card/CardList'; // Import the CardList component

const router = createBrowserRouter(

  [

    {
      path: 'test',

      element: <Test />,
    },

     {
      path: '/',

      element: <Test />,
    },

    {
      path: '/cards',

      element: <CardList />,
    },
    {
      path: '/cards', // New path to display all 1000 cards
      element: <CardList />,
    },
   
   



  ]);

export default router;