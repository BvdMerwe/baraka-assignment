import { format, getUnixTime } from 'date-fns';
import './DateButton.scss'

export default function DateButton(props) {

	function selectDay() {
		props.clicked(props.day);
	}
	
	return (
		<span className={`date-button ${props.currentDate.getDate() === props.day.getDate() ? 'current' : ''}`} key={getUnixTime(props.day)} onClick={selectDay}>
			<span>{format(props.day, 'EEE')}</span>
			<span>{props.day.getDate()}</span>
		</span>
	);
}