import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './Card.js';

function Main() {
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
				console.error('ERROR! Please check the pokemon id.');
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
		setErr(false);
		setLoading(true);
		if (!input.current.value) return alert('Please Enter a pokemon id.');
		setSearch(true);
		searchPokemon();
		reset();
	};

	return (
		<section>
			<h1>Search Your Pokemon</h1>
			<div className='search'>
				<label htmlFor='input'>Poke-Id:</label>
				<input
					onChange={onChange}
					type='text'
					placeholder='id'
					id='input'
					ref={input}
					onKeyUp={(e) => {
						if (e.key === 'Enter') search();
					}}
				/>
				<button onClick={search}>Search</button>
			</div>

			{Loading ? (
				<p>Loading...</p>
			) : (
				Search &&
				(Err ? (
					<p>
						ERROR! <br /> sorry man, <br /> you sure got the right pokemon id?
					</p>
				) : (
					<Card Name={Name} Num={Num} />
				))
			)}
		</section>
	);
}

export default Main;
