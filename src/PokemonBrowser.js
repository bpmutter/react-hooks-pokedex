import React, { useEffect, useState, useContext } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { imageUrl } from './config';
import PokemonDetail from './PokemonDetail';
import PokemonContext from './PokemonContext';

const PokemonBrowser = () => {
  const { pokemon, loadPokemon, authToken } = useContext(PokemonContext);

  useEffect( () => { 
    debugger; 
    if(!pokemon.length) loadPokemon()

  }, [pokemon.length]);

  if (!pokemon)  return <p>bad!</p>;
  return (
    <main>
      <nav>
        {pokemon.map(pokemon => {
          return (
            <NavLink key={pokemon.name} to={`/pokemon/${pokemon.id}`}>
              <div className="nav-entry">
                <div className="nav-entry-image"
                  style={{ backgroundImage: `url('${imageUrl}${pokemon.imageUrl}')` }}>
                </div>
                <h1>{pokemon.name}</h1>
              </div>
            </NavLink>
          );
        })}
      </nav>
      <Route path="/pokemon/:id" render={props => <PokemonDetail {...props} />} />
    </main>
  );
}
export default PokemonBrowser;


// class PokemonBrowser extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

  // render() {
  //   if (!this.props.pokemon) {
  //     return null;
  //   }
  //   return (
  //     <main>
  //       <nav>
  //         {this.props.pokemon.map(pokemon => {
  //           return (
  //             <NavLink key={pokemon.name} to={`/pokemon/${pokemon.id}`}>
  //               <div className="nav-entry">
  //                 <div className="nav-entry-image"
  //                      style={{backgroundImage: `url('${imageUrl}${pokemon.imageUrl}')`}}>
  //                 </div>
  //                 <h1>{pokemon.name}</h1>
  //               </div>
  //             </NavLink>
  //           );
  //         })}
  //       </nav>
  //       <Route path="/pokemon/:id" render={props => <PokemonDetail {...props} token={this.props.token} />} />
  //     </main>
  //   );
  // }
// }

