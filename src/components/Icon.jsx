import "./Icon.scss"

export default function Icon(props) {
	return (
		<svg className='icon'>
			<use href={"#icon-" + props.name}/>
		</svg>
	)
}