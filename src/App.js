import PageNotFound from './pages/PageNotFound';

import { Route, Routes, useLocation } from 'react-router-dom';

import ConfigureQuery from './components/ConfigureQuery';

import NavBar from './components/NavBar';

import IndexPage from './pages/IndexPage';


const App = () => {

  const location = useLocation()

  return (

    <div className="App">

      <ConfigureQuery />

      <NavBar />

      <Routes location={location} key={location.pathname}>

        <Route path='/' element={<IndexPage />} />

        <Route path='*' element={<PageNotFound />} />

      </Routes>

    </div>

  )

}

export default App;
