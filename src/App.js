import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
	const [Id, setId] = useState('');
	const [Name, setName] = useState('');
	const [Img, setImg] = useState('');

	const searchPokemon = async () => {
		let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${Id}`);
		console.log(response);
		setName(response.data.name);
		setImg(response.data.sprites.front_default);
	};

	useEffect(() => {
		searchPokemon();
	}, [Id]);

	return (
		<>
			<h1>search your pokemon</h1>
			<label htmlFor='search'>poke-id:</label>
			<input type='text' placeholder='id' id='search' />
			<button>search pokemon</button>

			<div>
				<h2>#{Id}</h2>
				<img src={Img} alt={Name} />
				<h3>{Name}</h3>
			</div>
		</>
	);
}

export default App;
