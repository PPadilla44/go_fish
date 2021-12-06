import './App.css';
import axios from "axios"


function App() {

  axios.get("http://localhost:5000/check")
    .then(res => res.data)
    .then(data => console.log(data))
    .catch(err => console.log(err))

    const startGame = () => {
      axios.get("http://localhost:5000/start")
      .then(res => res.data)
      .then(data => console.log(data))
      .catch(err => console.log(err))
    }

  return (
    <div className="App">
      <h1>GO FISH</h1>

      <button onClick={startGame} >Start game</button>
    </div>
  );
}

export default App;
