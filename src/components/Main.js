import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './Card.js';

function Main() {
	const [Id, setId] = useState('');
	const [Name, setName] = useState('');
	const [Num, setNum] = useState('');
	const [Input, setInput] = useState('');
	const [Search, setSearch] = useState(false);
	const [Loading, setLoading] = useState(false);
	const [Err, setErr] = useState(false);
	const inputBox = useRef(null);

	const path = process.env.PUBLIC_URL;

	const searchPokemon = async () => {
		try {
			const response = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/${Id}`
			);
			setNum(response.data.id);
			setName(response.data.name);
			setErr(false);
		} catch (error) {
			setErr(true);
			console.error(error.message);
		} finally {
			setLoading(false);
			reset();
		}
	};

	const reset = () => {
		inputBox.current.value = '';
	};

	useEffect(() => {
		searchPokemon();
	}, [Input]);

	const onChange = (e) => {
		setId(e.target.value);
	};

	const search = () => {
		setErr(false);
		setLoading(true);
		if (!inputBox.current.value) return alert('Please Enter a pokemon id.');
		setSearch(true);
		setInput(Id);
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
					value={Id}
					onChange={onChange}
					type='text'
					placeholder='Please enter a pokemon id.'
					id='input'
					ref={inputBox}
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
