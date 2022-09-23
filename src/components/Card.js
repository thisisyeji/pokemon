function Card({ Num, Name }) {
	return (
		<div className='Card'>
			<h2>
				<span>#{Num}</span>
				{Name}
			</h2>
			<div className='img_box'>
				<img
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${Num}.png`}
					alt={Name}
				/>
			</div>
		</div>
	);
}

export default Card;
