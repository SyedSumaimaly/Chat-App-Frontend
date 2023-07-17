import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Join from "./component/join/join";
import Chat from "./component/chat/chat"


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Join />} />
          <Route path="/chat" element={<Chat />} />  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
