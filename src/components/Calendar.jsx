import { useEffect, useState } from 'react';
import './Calendar.scss';
import Icon from './Icon';
import { format, addMonths, subMonths, addDays, startOfDay, eachDayOfInterval, startOfMonth, endOfMonth, parse } from 'date-fns'
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
		//update datestore
		let date = currentDate.toDateString();
		dispatch(updateDateStore(date))

		//check games
		if (games.items.length > 0 && !calendarDates.some(d => d.hasLaunches)) {
			let newDates = calendarDates.map(a => {
				a.hasLaunches = games.items.find(g => g.date === format(a.date, 'dd/MM/yyyy'))
				console.log('yeet')
				return a;
			})
			setCalendarDates(newDates);
		}
	},[games, currentDate])
	
	function getFormattedDate() {
		return format(currentDate, 'MMMM yyyy')
	}

	function getCalendarDates(day) {
		let start = startOfMonth(day);
		let end = endOfMonth(day);
		
		let arr = eachDayOfInterval({ start, end }, { step: 1 }).map(d => {
			return {
				date: d,
				hasLaunches: false,
			}
		});
		
		return arr;
	}

	function nextMonth() {
		let nextMonth = addMonths(startOfMonth(currentDate), 1);
		setCurrentDate(nextMonth);
		setCalendarDates(getCalendarDates(nextMonth));
	}
	
	function previousMonth() {
		let prevMonth = subMonths(startOfMonth(currentDate), 1);
		setCurrentDate(prevMonth);
		setCalendarDates(getCalendarDates(prevMonth));
	}

	function selectDay(day) {
		setCurrentDate(day);
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
						return <DateButton day={d.date} key={d.date} hasLaunches={d.hasLaunches} clicked={selectDay} currentDate={currentDate} />
					})
				}
			</div>
		</div>
	);
}