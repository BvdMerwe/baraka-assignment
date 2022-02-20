import './GameCards.scss';
import { format, parse, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchGames } from '../features/games/gamesSlice';
import GameCard from './GameCard';

export default function GameCards(props) {
	const calendar = useSelector(state => state.calendar);
	const games = useSelector(state => state.games);

	const dispatch = useDispatch();
	let [cards, setCards] = useState([]);
	let [shouldTrack, setShouldTrack] = useState(false);
	let [scrollPosition, setScrollPosition] = useState(false);

	function resetTracking(e) {
		setShouldTrack(false);
		setScrollPosition(0)
	}

	function trackMouse(e) {
		let card = e.target;
		let translateAmount = card.offsetLeft;
		setScrollPosition(translateAmount);
	}

	useEffect(() => {
		let currentDate = new Date(calendar.currentDate);
		if (games.status === 'idle') {
			dispatch(fetchGames());
		} else if (games.status === 'succeeded') {
			setCards(games.items.filter((g) => {
				// return true
				let gameDate = parse(g.date, 'dd/MM/yyyy', currentDate);
				return format(currentDate, 'dd/MM/yyyy') === format(gameDate, 'dd/MM/yyyy')
			}))
		}
		
	}, [games, dispatch, calendar])

	let cardElements = [];

	if (cards.length > 0) {
		cardElements = cards.map((c, n) => {
			return(
				<GameCard game={c} key={n} onMouseEnter={trackMouse} />
			)
		})
	} else {
		cardElements.push(
			<GameCard game={'empty'} key={1} />
		)
	}

	return (
		<div id="game-cards" className={`n-${cards.length}`}>
			<div className='card-list' style={{transform: `translateX(${-scrollPosition}px)`}} onMouseLeave={resetTracking}>
				{cardElements}
				<div className='game-card hidden'></div>
			</div>
		</div>
	)
}