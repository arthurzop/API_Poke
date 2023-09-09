// Importando
import './App.css';
import { useState } from 'react';
import Axios from "axios"

//Funcão Principal
function App() {
  //Declarando o nome do Pokemon como variável
  const [nome, setPokeNome] = useState("")
  const pokeNome = nome.toLowerCase()
  const [pokeChosen, setPokemonChosen] = useState(false)
  const [pokemon, setPokemon] = useState({
    name: "", 
    img: "",
    id: "", 
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });
  //Puxando com o Axios o pokemon com a URL da API
  const procuraPoke = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeNome}`).then((response) => {
      //Pegando todas as informações de um pokemon
      setPokemon({
        name: pokeNome, 
        img: response.data.sprites.front_default, 
        id: response.data.id,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        type: response.data.types[0].type.name,
      });
      setPokemonChosen(true)
    }
  );
};

 //O que vai aparecer na página:
  return (
    <div className="App">
      <div className='TitleSection'>
          <h1>Pokémon DataBase</h1>
          <input  type="text" 
                  onChange={(event)=>{setPokeNome(event.target.value)}}
          />
          <button onClick={procuraPoke}>Procurar Pokémon</button>
      </div>
      <div className='DisplayPoke'>
        {!pokeChosen ? (
        <h1>Escolha um Pokémon!</h1>
        ) : (
          <>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.img}/>
            <h3>Tipo: <span className={pokemon.type}>{pokemon.type}</span></h3>
            <h3>Nº Pokedex: {pokemon.id}</h3>
            <h4>Hp: {pokemon.hp}</h4>
            <h4>Ataque: {pokemon.attack}</h4>
            <h4>Defesa: {pokemon.defense}</h4>
          </>
        )}
      </div>
    </div>
  );
}



//Exportando
export default App;
