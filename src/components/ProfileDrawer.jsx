import { useState } from "react";
import Icon from "./Icon";
import './ProfileDrawer.scss'
import StreamerItem from "./StreamerItem";

export default function ProfileDrawer(props) {

	let [open, setOpen] = useState(false);
	let [search, setSearch] = useState('');

	function handleSearch(e) {
		setSearch(e.target.value);
	}

	let profile = {
		name: 'Luke Skywalker',
		email: 'luke@rebel-alliance.org',
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8rFLQPpkdbOv6dinRk4otXQVMl6iOUDdw7A&usqp=CAU'
	}

	let team = {
		name: "Rebel Alliance",
		description: "Star Wars: Squadrons",
		members: [
			{
				name: "Han Solo",
				image: "https://images3.alphacoders.com/865/thumb-350-86515.jpg"
			},
			{
				name: "Chewbacca",
				image: "https://st3.depositphotos.com/3977247/32000/i/600/depositphotos_320001514-stock-photo-bruxelles-belgium-2018-chewbacca-star.jpg"
			},
			{
				name: "C3P0",
				image: "https://p.kindpng.com/picc/s/90-908037_transparent-c3po-png-star-wars-space-punch-c3po.png"
			},
		],
		onlineCount: 5
	}

	let streamers = [
		{
			name: "Darth Vader",
			followers: Math.trunc((Math.random() * 100000)),
			image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0b/Darth_Vader_in_The_Empire_Strikes_Back.jpg/220px-Darth_Vader_in_The_Empire_Strikes_Back.jpg"
		},
		{
			name: "Padmé Amidala",
			followers: Math.trunc((Math.random() * 100000)),
			image: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Amidala.png/220px-Amidala.png"
		},
		{
			name: "Obi-Wan Kenobi",
			followers: Math.trunc((Math.random() * 100000)),
			image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Ben_Kenobi.png/220px-Ben_Kenobi.png"
		},
		{
			name: "Lando Calrissian",
			followers: Math.trunc((Math.random() * 100000)),
			image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/Lando6-2.jpg/220px-Lando6-2.jpg"
		},
	]

	function toggleOpen() {
		setOpen(!open);
	}

	return (
		<div id="profile-drawer" className={`${open ? 'open' : ''}`}>
			<div className="handle" onClick={toggleOpen}><Icon name="chevron-left" /></div>
			<div className="content">
				<div className="profile">
					<div className="picture" style={{backgroundImage: `url(${profile.image})`}}></div>
					<div className="info">
						<div className="name">{profile.name}</div>
						<div className="email">{profile.email}</div>
					</div>
					<Icon name="bell" />
				</div>

				<div className="search">
					<Icon name="search" />
					<input type="text" placeholder="Search for a game or streamer" value={search} onChange={handleSearch}/>
				</div>

				<div className="favourites">
					<div className="title">Favourite streamers</div>
					<div className="favourites-list">
						{streamers.filter((s) => {
							if (search) return s.name.toLowerCase().indexOf(search.toLowerCase()) > -1
							return true
						}).map((s, n) => (
							<StreamerItem key={n} streamer={s}/>
						))}
					</div>
				</div>

				<div className="my-team">
					<div className="heading">
						<span>My Team</span>
						<div className="members">
							<div className="member">+{team.members.length - 2}</div>
							{team.members.slice(0, 2).map((t, n) => (
								<div className="member" key={n} style={{backgroundImage: `url(${t.image})`}}></div>
							))}
						</div>
					</div>
					<div className="info">
						<div className="thumbnail">{team.name[0]}</div>
						<div className="details">
							<div className="name">{team.name}</div>
							<div className="description">{team.description}</div>
						</div>
						<div className="online">
							<div className="user-count">
								<Icon name="user" />
								<span className="count">{team.onlineCount}</span>
							</div>
							<span className="online-count"></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)

}