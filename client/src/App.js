import {Routes, Route, Link} from 'react-router-dom'
import Main from './components/Main';
import SinglePage from './components/SinglePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/product/:id' element={<SinglePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
