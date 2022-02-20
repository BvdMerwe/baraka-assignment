import './assets/scss/Styles.scss';

import store from './app/store'
import { Provider } from 'react-redux'

import Nav from './components/Nav'
import Calendar from './components/Calendar'
import IconSymbol from './components/IconSymbols';
import GameCards from './components/GameCards';
import PopularGames from './components/PopularGames';
import ProfileDrawer from './components/ProfileDrawer';

function App() {

	return (
		<Provider store={store}>
			<div className="App">
				<Nav />
				<div className='content no-scrollbars'>
					<Calendar />
					<GameCards/>
					<PopularGames/>
				</div>
				<ProfileDrawer />
				<IconSymbol />
			</div>
		</Provider>
	);
}

export default App;
