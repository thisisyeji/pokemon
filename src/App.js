import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './components/Card.js';

function App() {
	const [Id, setId] = useState('');
	const [Name, setName] = useState('');
	const [Num, setNum] = useState('');
	const [Search, setSearch] = useState(false);
	const [Loading, setLoading] = useState(true);
	const input = useRef(null);

	const searchPokemon = async () => {
		let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${Id}`);
		// console.log(response);
		setNum(response.data.id);
		setName(response.data.name);
		setLoading(false);
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
		setSearch(true);
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

			{Search && (Loading ? <p>Loading...</p> : <Card Name={Name} Num={Num} />)}
		</>
	);
}

export default App;
