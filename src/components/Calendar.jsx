import { useEffect, useState } from 'react';
import './Calendar.scss';
import Icon from './Icon';
import { format, addMonths, subMonths, addDays, startOfDay, eachDayOfInterval } from 'date-fns'
import DateButton from './DateButton';
import { subDays } from 'date-fns/esm';
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentDate as updateDateStore } from '../features/calendar/calendarSlice'
// import { useSelector } from 'react-redux';

export default function Calendar() {
	// const calendar = useSelector(state => state.calendar)
	const [currentDate, setCurrentDate] = useState(startOfDay(Date.now()));
	const [calendarDates, setCalendarDates] = useState(getCalendarDates(currentDate));
	const dispatch = useDispatch();
	
	const games = useSelector(state => state.games);
	
	useEffect(() => {
		let date = currentDate.toDateString();
		dispatch(
			updateDateStore(date)
		)
	})
	
	function getFormattedDate() {
		return format(currentDate, 'MMMM yyyy')
	}

	function getCalendarDates(day) {
		let start = subDays(day, 10);
		let end = addDays(day, 10);
		
		let arr = eachDayOfInterval({ start, end }, { step: 1 });
		
		return arr;
	}

	function nextMonth() {
		let nextMonth = addMonths(currentDate, 1);
		setCurrentDate(nextMonth);
		setCalendarDates(getCalendarDates(nextMonth));
	}
	
	function previousMonth() {
		let prevMonth = subMonths(currentDate, 1);
		setCurrentDate(prevMonth);
		setCalendarDates(getCalendarDates(prevMonth));
	}

	function selectDay(day) {
		setCurrentDate(day);
		setCalendarDates(getCalendarDates(day));
	}

	return (
		<div id="calendar">
			<div className='controls'>
				<div className='current-month'>{getFormattedDate()}</div>
				<div className='next-month' onClick={previousMonth}><Icon name="chevron-left" /></div>
				<div className='prev-month' onClick={nextMonth}><Icon name="chevron-right" /></div>
			</div>
			<div className={`dates n-${calendarDates.length} s-${currentDate.getDate()}`}>
				{
					calendarDates.map(d => {
						return <DateButton day={d} key={d} clicked={selectDay} currentDate={currentDate} />
					})
				}
			</div>
		</div>
	);
}