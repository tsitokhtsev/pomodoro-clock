import React from 'react'

const Controller = ({ title, time, handleLengthChange, intervalType }) => {
	return (
		<div className="controller">
			<h2 id={`${intervalType}-label`}>{title}</h2>
			<div>
				<button id={`${intervalType}-increment`} onClick={() => handleLengthChange(intervalType, 'increment')}>+</button>
				<h1 id={`${intervalType}-length`}>{time}</h1>
				<button id={`${intervalType}-decrement`} onClick={() => handleLengthChange(intervalType, 'decrement')}>-</button>
			</div>
		</div>
	)
}

export default Controller