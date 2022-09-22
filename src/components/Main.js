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

	const path = process.env.PUBLIC_URL;

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
			<h1>
				Search Your
				<img src={path + '/img/logo.png'} alt='logo' className='title' />
			</h1>
			<div className='search'>
				<label htmlFor='input'>Poke-Id:</label>
				<input
					onChange={onChange}
					type='text'
					placeholder='Please enter a pokemon id.'
					id='input'
					ref={input}
					onKeyUp={(e) => {
						if (e.key === 'Enter') search();
					}}
				/>
				<button onClick={search}>Search</button>
			</div>

			{Loading ? (
				<div className='loading'>
					<img src={path + '/img/ball.png'} alt='ball' className='ball' />
					<p>Loading...</p>
				</div>
			) : (
				Search &&
				(Err ? (
					<p className='error'>
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
