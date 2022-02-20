import { format, parse } from 'date-fns';
import { useSelector } from 'react-redux';
import Icon from './Icon';
import './PopularGames.scss'
export default function PopularGames(props) {

	const games = useSelector(state => state.games);


	return (
		<div id="popular-games">
			<h1>Popular Games</h1>
			<div className='games'>
				{games.items.map((g) => {
					return (
						<div className='game-item' key={g.name}>
							<div className='picture' style={{ backgroundImage: `url(${g.cover})` }}></div>
							<div className='info'>
								<span className='name'>{g.name}</span>
								<span className='publisher'>{g.publisher}</span>
							</div>
							<div className='platforms'>
								{g.platform.split(',').map((p, n) => {
									return (
										<Icon key={n} name={p}/>
									)
								})}
							</div>
							<div className='date'><Icon name="calendar"/> <span>{format(parse(g.date, 'dd/MM/yyyy', Date.now()), 'dd.MM.yyyy')}</span></div>
						</div>
					)
				})}
			</div>
		</div>
	)
}