function Card({ Num, Name }) {
	return (
		<div>
			<h2>#{Num}</h2>
			<img
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${Num}.png`}
				alt={Name}
				style={{ width: 300, height: 300 }}
			/>
			<h3>{Name}</h3>
		</div>
	);
}

export default Card;
