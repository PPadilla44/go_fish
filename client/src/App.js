import './App.css';
import axios from "axios"
import React, { useState } from "react"


function App() {

  const [allPlayers, setAllPlayers] = useState([])
  const [deck, setDeck] = useState([{}])
  const [pairsText, setPairsText] = useState([])

  axios.get("http://localhost:5000/check")
    .then(res => res.data)

    .catch(err => console.log(err))

  const startGame = () => {
    axios.get("http://localhost:5000/start")
      .then(res => res.data)
      .then(data => {
        const { deck, pairs_text } = data
        const { all_players, cards } = deck
        setAllPlayers(all_players);
        setDeck(cards);
        setPairsText(pairs_text);
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <h1>GO FISH</h1>

      <button onClick={startGame} >Start game</button>

      {pairsText.map((t, i) => {
        return (
          <div key={i} >
            {t}
          </div>
        )
      })}

      {allPlayers.map((p, i) => {
        return (
          <div key={i}>
            <h1>{p.name}</h1>
            {p.hand.map((c, i) => {
              return (
                <div key={i}>
                  <p>{c.point_val} {c.suit}</p>

                </div>
              )
            })}
          </div>
        )
      })}

      {deck.map((c, i) => {
        return (
          <div key={i}>
            <p>{c.point_val} {c.suit}</p>
          </div>
        )
      })}


    </div>
  );
}

export default App;
