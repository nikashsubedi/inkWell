import { createBrowserRouter } from 'react-router-dom';
import Test from '../test/Test';
import React from 'react';

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
   
   



  ]);

export default router;