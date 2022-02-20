import './GameCard.scss';
import Icon from './Icon';
export default function GameCard(props) {
	
	let cardBg = props.game.cover ? {
		backgroundImage: `url(${props.game.cover})`,
	} : {};
	
	if (props.game !== 'empty') {
		return (
			<div className='game-card' style={cardBg} onMouseEnter={props.onMouseEnter}>
				<div className="info">
					<span className="title">{props.game.name}</span>
					<span className="description">{props.game.description}</span>
					<span className="play"><span>Watch trailer</span> <Icon name="play"/></span>
				</div>
			</div>
		)
	}
	return (
		<div className='game-card empty'>
			<span className="title">No game launches on this day</span>
		</div>
	)
}