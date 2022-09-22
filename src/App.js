import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function App() {
	const [Id, setId] = useState('');
	const [Name, setName] = useState('');
	const [Num, setNum] = useState('');
	const input = useRef(null);

	const searchPokemon = async () => {
		let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${Id}`);
		console.log(response);
		setNum(response.data.id);
		setName(response.data.name);
	};

	const reset = () => {
		input.current.value = '';
	};

	useEffect(() => {
		if (!Id === '') searchPokemon();
	}, []);

	const onChange = (e) => {
		setId(e.target.value);
	};

	const search = () => {
		searchPokemon();
		reset();
	};

	return (
		<>
			<h1>search your pokemon</h1>
			<label htmlFor='search'>poke-id:</label>
			<input
				onChange={onChange}
				type='text'
				placeholder='id'
				id='search'
				ref={input}
				onKeyUp={(e) => {
					if (e.key === 'Enter') search();
				}}
			/>
			<button onClick={search}>search pokemon</button>

			<div>
				<h2>#{Num}</h2>
				<img
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${Id}.png`}
					alt={Name}
					style={{ width: 300, height: 300 }}
				/>
				<h3>{Name}</h3>
			</div>
		</>
	);
}

export default App;
