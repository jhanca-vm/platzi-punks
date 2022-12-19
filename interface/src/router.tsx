import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './routes/Home'
import Punks from './routes/Punks'
import Punk from './routes/Punk'
import Error from './routes/Error'

export default createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'punks', element: <Punks /> },
      { path: 'punks/:index', element: <Punk /> }
    ],
    errorElement: <Error />
  }
])
