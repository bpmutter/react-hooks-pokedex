import React, { useEffect, useState, useContext } from 'react';
import { imageUrl, baseUrl } from './config';
import PokemonContext from './PokemonContext';

const PokemonDetail = (props) => {
  
  const { singlePokemon, getOnePokemon } = useContext(PokemonContext);
  const [oldId, setOldId] = useState(null);

  const newId = Number.parseInt(props.match.params.id, 10);

  useEffect( ()=>{
    debugger;
    if(oldId === newId) return;
    setOldId(newId);
    getOnePokemon(newId);
  }, [newId]) 
  
  if (!singlePokemon) {
    return null;
  }
  return (
    <div className="pokemon-detail">
      <h1 className="bigger">{singlePokemon.name}</h1>
      <div className="pokemon-detail-image-background">
        <div className="pokemon-detail-image"
          style={{ backgroundImage: `url('${imageUrl}${singlePokemon.imageUrl}')` }}>
        </div>
      </div>
      <div className="pokemon-detail-lists">
        <h2>Information</h2>
        <ul>
          <li><b>Type</b> {singlePokemon.type}</li>
          <li><b>Attack</b> {singlePokemon.attack}</li>
          <li><b>Defense</b> {singlePokemon.defense}</li>
          <li>
            <b>Moves</b>
            <ul>
              {singlePokemon.moves.map(move =>
                <li key={move}>{move}</li>
              )}
            </ul>
          </li>
        </ul>
        <h2>Items</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Happiness</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {singlePokemon.items.map(item =>
              <tr key={item.name}>
                <td>
                  <img className="item-image" alt={item.imageUrl} src={`${imageUrl}${item.imageUrl}`} />
                </td>
                <td>{item.name}</td>
                <td className="centered">{item.happiness}</td>
                <td className="centered">${item.price}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PokemonDetail;

// class PokemonDetail extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   async componentDidMount() {
//     await this.loadPokemon();
//   }

//   async componentDidUpdate(oldProps) {
//     const oldId = Number.parseInt(oldProps.match.params.id, 10);
//     const newId = Number.parseInt(this.props.match.params.id, 10);
//     if (oldId === newId) {
//       return;
//     }
//     await this.loadPokemon();
//   }

//   async loadPokemon() {
//     const id = this.props.match.params.id;
//     const response = await fetch(`${baseUrl}/pokemon/${id}`, {
//       headers: { Authorization: `Bearer ${this.props.token}`}
//     });
//     if (response.ok) {
//       const pokemon = await response.json();
//       this.setState({ pokemon });
//     }
//   }

//   render() {
//     const pokemon = this.state.pokemon;
//     if (!pokemon) {
//       return null;
//     }
//     return (
//       <div className="pokemon-detail">
//         <h1 className="bigger">{pokemon.name}</h1>
//         <div className="pokemon-detail-image-background">
//           <div className="pokemon-detail-image"
//               style={{backgroundImage: `url('${imageUrl}${pokemon.imageUrl}')`}}>
//           </div>
//         </div>
//         <div className="pokemon-detail-lists">
//           <h2>Information</h2>
//           <ul>
//             <li><b>Type</b> {pokemon.type}</li>
//             <li><b>Attack</b> {pokemon.attack}</li>
//             <li><b>Defense</b> {pokemon.defense}</li>
//             <li>
//               <b>Moves</b>
//               <ul>
//                 {pokemon.moves.map(move =>
//                   <li key={move}>{move}</li>
//                 )}
//               </ul>
//             </li>
//           </ul>
//           <h2>Items</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th></th>
//                 <th>Name</th>
//                 <th>Happiness</th>
//                 <th>Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {pokemon.items.map(item =>
//                 <tr key={item.name}>
//                   <td>
//                     <img className="item-image" alt={item.imageUrl} src={`${imageUrl}${item.imageUrl}`} />
//                   </td>
//                   <td>{item.name}</td>
//                   <td className="centered">{item.happiness}</td>
//                   <td className="centered">${item.price}</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     )
//   }
// }

// export default PokemonDetail;
