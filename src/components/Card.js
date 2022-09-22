function Card({ Num, Name }) {
	return (
		<div className='Card'>
			<h2>
				<span>#{Num}</span>
				{Name}
			</h2>
			<img
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${Num}.png`}
				alt={Name}
			/>
		</div>
	);
}

export default Card;
