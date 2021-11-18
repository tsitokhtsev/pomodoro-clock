import React from 'react'

const Timer = ({ currentInterval, time }) => {
	return (
		<div>
			<h2 id="timer-label">{currentInterval}</h2>
			<h1 id="time-left">{time}</h1>
		</div>
	)
}

export default Timer