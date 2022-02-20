import "./StreamerItem.scss"

export default function StreamerItem(props) {

	function formatFollowerCount() {
		switch (true) {
			case props.streamer.followers > 1000000:
				return Math.round(props.streamer.followers / 1000000) + 'M'
			case props.streamer.followers > 10000:
				return Math.round(props.streamer.followers / 1000) + 'K'
			default: 
				return props.streamer.followers
		}
	}

	return (
		<div className="streamer">
			<div className="picture" style={{ backgroundImage: `url(${props.streamer.image})` }}></div>
			<div className="info">
				<span className="name">{props.streamer.name}</span>
				<span className="followers">Followers {formatFollowerCount()}</span>
			</div>
		</div>
	)
}