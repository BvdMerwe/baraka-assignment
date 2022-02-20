import './Nav.scss';
import Icon from './Icon'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchChatCount } from '../features/chat/chatSlice';

export default function Nav() {
	const chat = useSelector(state => state.chat);

	const dispatch = useDispatch();
	let [chatCount, setChatCount] = useState(0);

	useEffect(() => {
		if (chat.status === 'idle') {
			dispatch(fetchChatCount());
		} else if (chat.status === 'succeeded') {
			setChatCount(
				<div className='chat-bubble'>{chat.count}</div>
			);
		}
	}, [chat, dispatch])

	return (
		<div id="nav">
			<div className='logo-holder'>
				<span className='logo'>gam<span className='accent'>é</span>r</span>
			</div>

			<ul>
				<li><span className='nav-link'><Icon name="apps"/>Home</span></li>
				<li><span className='nav-link'><Icon name="controller"/>My games</span></li>
				<li><span className='nav-link'><Icon name="star"/>Favourite</span></li>
				<li><span className='nav-link'><Icon name="chat"/>Team Chat{chatCount}</span></li>
				<li><span className='nav-link'><Icon name="calendar"/>Calendar</span></li>
				<li><span className='nav-link'><Icon name="cog"/>Settings</span></li>
			</ul>

			<span className='nav-link'><Icon name="sign-out"/>log out</span>
		</div>
	);
}