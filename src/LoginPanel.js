import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { baseUrl } from './config';
import PokemonContext from './PokemonContext';

const LoginPanel = () => {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');

  const {authToken, login} = useContext(PokemonContext);

  //TODO: refactor to put in one method
  const updateEmail = e => {
    setEmail(e.target.value);
  }
  const updatePassword = e => {
    setPassword(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${baseUrl}/session`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      login(token);
    }
  }
  //render stuff
  
  if (authToken) {
    return <Redirect to="/" />;
  }

  return (
    <main className="centered middled">
      <form onSubmit={handleSubmit}>
        <input type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail} />
        <input type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword} />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}


export default LoginPanel;


// class LoginPanel extends React.Component {
//   // constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     email: 'demo@example.com',
//   //     password: 'password',
//   //   };
//   // }

//   handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch(`${baseUrl}/session`, {
//       method: 'put',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(this.state),
//     });

//     if (response.ok) {
//       const { token } = await response.json();
//       this.props.updateToken(token);
//       this.setState({ token });
//     }
//   }

//   // updateEmail = e => {
//   //   this.setState({ email: e.target.value });
//   // }

//   // updatePassword = e => {
//   //   this.setState({ password: e.target.value });
//   // }

//   // render() {
//   //   const { token, email, password } = this.state;

//   //   if (token) {
//   //     return <Redirect to="/" />;
//   //   }
    
//   //   return (
//   //     <main className="centered middled">
//   //       <form onSubmit={this.handleSubmit}>
//   //         <input type="text"
//   //               placeholder="Email"
//   //               value={email}
//   //               onChange={this.updateEmail} />
//   //         <input type="password"
//   //               placeholder="Password"
//   //               value={password}
//   //               onChange={this.updatePassword} />
//   //         <button type="submit">Login</button>
//   //       </form>
//   //     </main>
//   //   );
//   // }
// }


