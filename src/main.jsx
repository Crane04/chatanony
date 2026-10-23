import React from 'react'
import ReactDOM from 'react-dom/client'

import {createBrowserRouter, RouterProvider, Route,} from "react-router-dom"
import Home from './pages/Home.jsx'
import CreateChat from './pages/CreateChat.jsx'
import Chat from './pages/Chat.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "new",
    element: <CreateChat/>
  },
  {
    // The group name only lives in the link; chatanony rooms have no name of their own
    path: "chat/:chat_name/:group_name?",
    element: <Chat/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router = {router}/>
)
