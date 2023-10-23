//Componentes:
import {Button} from "./components/Button"
import { Card } from "./components/Card";
//Estilos:
import'./sass/App.scss'
//Iconos:
import { TiArrowLeftThick } from "react-icons/ti";
import { TiArrowRightThick } from "react-icons/ti";
//Hooks:
import { useState,useEffect } from "react";


const App = () =>{
    
    const [pokemonId, setPokemonId] = useState(1);
    const [pokemonEvolutions,setPokemonEvolutions]=useState([]);

    useEffect(()=>{
        getEvolutions(pokemonId);
    }, [pokemonId])

    async function getEvolutions (id){
        const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
        const data = await response.json()

        let pokemonEvoArray = []

        let pokemonv1 = data.chain.species.name
        let pokemonlv1Img = await getPokemonImgs(pokemonv1)
        pokemonEvoArray.push([pokemonv1,pokemonlv1Img])

        if(data.chain.evolves_to.length !==0){
            let pokemonv2 = data.chain.evolves_to[0].species.name;
            let pokemonlv2Img = await getPokemonImgs(pokemonv2)
            pokemonEvoArray.push([pokemonv2,pokemonlv2Img])
            

            if(data.chain.evolves_to[0].evolves_to.length !==0){
                let pokemonv3= data.chain.evolves_to[0].evolves_to[0].species.name
                let pokemonlv3Img =await getPokemonImgs(pokemonv3)
                pokemonEvoArray.push([pokemonv3,pokemonlv3Img])
                
            }
        }
        setPokemonEvolutions (pokemonEvoArray)
    }

    async function getPokemonImgs(name){
        const response=await fetch (`https://pokeapi.co/api/v2/pokemon/${name}/`)
        const data =await response.json()
        return data.sprites.other['official-artwork'].front_default
    }

    function prevClick(){
        (pokemonId === 1)?
            setPokemonId(1):
            setPokemonId(pokemonId -1)    
    }

    function nextClick(){
        setPokemonId(pokemonId +1)
    }

    return(
        <div className="app">  
            <div className={`card-container card${pokemonEvolutions.length}`}>
                {pokemonEvolutions.map(pokemon => 
                <Card 
                    key={pokemon[0]}
                    name={pokemon[0]}
                    img={pokemon[1]}
                />
                )}
            </div>
            
            <div className="buttons-container">
                <Button 
                    icon={<TiArrowLeftThick />} 
                    handleClick={prevClick}
                />
                
                <Button 
                    icon={<TiArrowRightThick/>}
                    handleClick={nextClick}
                />
            </div>
        </div>
        )
}

export{App}