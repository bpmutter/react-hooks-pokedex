import React, {useState} from 'react';
import App from './App.js'
import PokemonContext from './PokemonContext';
import {baseUrl} from './config.js'
import {BrowserRouter} from 'react-router-dom';

const AppWithContext = props => {

    const [pokemon, setPokemon] = useState([]);
    const [singlePokemon, setSinglePokemon] = useState(null);
    const [authToken, setAuthToken] = useState(localStorage.getItem('state-pokedex-token'));
    const [needLogin, setNeedLogin] = useState(!!authToken);
    const login = token => {
        localStorage.setItem("state-pokedex-token", token)
        setAuthToken(token);
    };
    const logout = ()  => {
        localStorage.setItem("state-pokedex-token", "")
        setAuthToken(null);
    };
    const loadPokemon = async () =>{
        const response = await fetch(`${baseUrl}/pokemon`, {
            headers: { Authorization: `Bearer ${authToken}`}
        });
        if (response.ok) {
            setPokemon(await response.json());
            setNeedLogin(false);
        } else setNeedLogin(true);
    };
    const getOnePokemon = async (id) =>{
        const response = await fetch(`${baseUrl}/pokemon/${id}`, {
            headers: { Authorization: `Bearer ${authToken}`}
        });
        if (response.ok) {
            setSinglePokemon(await response.json());
            setNeedLogin(false);
        } else setNeedLogin(true);
    };
    
    const context = {
        pokemon,
        singlePokemon,
        authToken,
        needLogin,
        login,
        loadPokemon,
        getOnePokemon
    }



    return (
        <PokemonContext.Provider value={context}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </PokemonContext.Provider>
    )
}

export default AppWithContext;
