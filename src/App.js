import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './components/Card.js';

function App() {
	const [Id, setId] = useState('');
	const [Name, setName] = useState('');
	const [Num, setNum] = useState('');
	const [Search, setSearch] = useState(false);
	const [Loading, setLoading] = useState(false);
	const [Err, setErr] = useState(false);
	const input = useRef(null);

	const searchPokemon = async () => {
		await axios
			.get(`https://pokeapi.co/api/v2/pokemon/${Id}`)
			.then((json) => {
				setNum(json.data.id);
				setName(json.data.name);
				setLoading(false);
				setErr(false);
			})
			.catch((error) => {
				setLoading(false);
				setErr(true);
				console.error('ERROR! sorry man, you sure got the right pokemon id?');
			});
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
		setLoading(true);
		if (!input.current.value) return alert('Please Enter a pokemon id.');
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

			{Loading && <p>Loading...</p>}
			{Search &&
				(Err ? (
					<p>ERROR! sorry man, you sure got the right pokemon id?</p>
				) : (
					<Card Name={Name} Num={Num} />
				))}
		</>
	);
}

export default App;
