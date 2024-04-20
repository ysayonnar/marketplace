import {Routes, Route, Link} from 'react-router-dom'
import Main from './components/Main';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>}/>
      </Routes>
    </div>
  );
}

export default App;
