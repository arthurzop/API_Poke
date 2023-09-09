//importando tudo
import './App.css';
import { useState } from 'react';
import Axios from "axios";

function App() {
  // estado para o nome do Pokémon
  const [nome, setPokeNome] = useState("");

  // converte o nome para letras minúsculas (para nao dar erro na API)
  const pokeNome = nome.toLowerCase();

  // estado para verificar se um Pokémon foi escolhido
  const [pokeChosen, setPokemonChosen] = useState(false);

  // estado para o segundo tipo do Pokémon
  const [type2, setType2] = useState(null);

  // const para as informações do Pokémon
  const [pokemon, setPokemon] = useState({
    name: "",
    img: "",
    id: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  // função para buscar informações do Pokémon com axios
  const procuraPoke = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeNome}`)
      .then((response) => {
        if (response.status === 404) {
          console.log("Erro 404");
          alert("Erro ao buscar dados");
          window.location.href = "/";
          setPokemonChosen(false);
        } else {

          // define o primeiro tipo
          const primaryType = response.data.types[0].type.name;

          // verifica se o Pokémon tem um segundo tipo
          const secondaryType = response.data.types.length > 1 ? response.data.types[1].type.name : null;
          setType2(secondaryType);

          // pega todos os dados do pokemon
          setPokemon({
            name: pokeNome,
            img: response.data.sprites.front_default,
            id: response.data.id,
            hp: response.data.stats[0].base_stat,
            attack: response.data.stats[1].base_stat,
            defense: response.data.stats[2].base_stat,
            type: primaryType,
          });

          // define a verificação do pokemon como true, confirma essa verificação
          setPokemonChosen(true);
        }
      })
      .catch((error) => {
        console.error("Erro na solicitação", error);
      });
  };

  return (
    <div className="App">
      <div className='TitleSection'>
        <h1>Pokémon DataBase</h1>
        <input
          type="text"
          id='input'
          onChange={(event) => { setPokeNome(event.target.value) }}
        />
        <button onClick={procuraPoke}>Procurar Pokémon</button>
      </div>
      <div className='DisplayPoke'>
        {!pokeChosen ? (
          <h2>Escolha um Pokémon!</h2>
        ) : (
          <>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.img} alt={`Imagem de ${pokemon.name}`} />
            <h3>
              Tipo:{" "}
              <span className={pokemon.type}>
                {pokemon.type}
              </span>
              {type2 && (
                <span className={type2}>
                  {capitalizeFirstLetter(type2)}
                </span>
              )}
            </h3>
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

// mini função para capitalizar a primeira letra do segundo tipo
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default App;
