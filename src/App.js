import React from 'react'
import Controller from './components/Controller'
import Timer from './components/Timer'

const beep = document.getElementById('beep')

class App extends React.Component {
	constructor() {
		super()

		this.state = {
			sessionLength: 25,
			breakLength: 5,
			currentInterval: 'session',
			timerIsOn: false,
			time: 25 * 60,
			interval: undefined
		}
	}

	formatTime = time => {
		let minutes = Math.floor(time / 60)
		let seconds = time % 60
		return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
	}

	handleLengthChange = (intervalType, changeType) => {
		if (!this.state.timerIsOn) {
			if (intervalType === this.state.currentInterval) {
				if (changeType === 'increment' && this.state[intervalType + 'Length'] < 60) {
					this.setState({
						[intervalType + 'Length']: this.state[intervalType + 'Length'] + 1,
						time: (this.state[intervalType + 'Length'] + 1) * 60
					})
				} else if (changeType === 'decrement' && this.state[intervalType + 'Length'] > 1) {
					this.setState({
						[intervalType + 'Length']: this.state[intervalType + 'Length'] - 1,
						time: (this.state[intervalType + 'Length'] - 1) * 60
					})
				}
			} else {
				if (changeType === 'increment' && this.state[intervalType + 'Length'] < 60) {
					this.setState({
						[intervalType + 'Length']: this.state[intervalType + 'Length'] + 1,
					})
				} else if (changeType === 'decrement' && this.state[intervalType + 'Length'] > 1) {
					this.setState({
						[intervalType + 'Length']: this.state[intervalType + 'Length'] - 1,
					})
				}
			}
		}
	}

	handlePlayPause = () => {
		if (this.state.timerIsOn) {
			clearInterval(this.state.interval)
			this.setState({ timerIsOn: false })
		} else {
			this.setState({
				interval: setInterval(() => {
					if (this.state.time === 0) {
						this.setState({
							currentInterval: this.state.currentInterval === 'session' ? 'break' : 'session',
							time: (this.state.currentInterval === 'session' ? this.state.breakLength : this.state.sessionLength) * 60
						})

						beep.play()
					} else {
						this.setState({ time: this.state.time - 1 })
					}
				}, 1000),
				timerIsOn: true
			})
		}
	}

	handleReset = () => {
		this.setState({
			sessionLength: 25,
			breakLength: 5,
			currentInterval: 'session',
			timerIsOn: false,
			time: 25 * 60,
			interval: undefined
		})

		clearInterval(this.state.interval)
		beep.pause()
		beep.currentTime = 0
	}

	componentWillUnmount() {
		clearInterval(this.state.interval)
	}

	render() {
		return (
			<React.Fragment>
				<h1>Pomodoro Clock</h1>

				<Timer
					currentInterval={this.state.currentInterval}
					time={this.formatTime(this.state.time)}
				/>

				<div id="buttons">
					<button
						id="start_stop"
						onClick={this.handlePlayPause}
					>
						{this.state.timerIsOn ? ('Stop') : ('Play')}
					</button>

					<button
						id="reset"
						onClick={this.handleReset}
					>
						Reset
					</button>
				</div>

				<div id="controllers">
					<Controller
						title="Session Length"
						time={this.state.sessionLength}
						handleLengthChange={this.handleLengthChange}
						intervalType="session"
					/>

					<Controller
						title="Break Length"
						time={this.state.breakLength}
						handleLengthChange={this.handleLengthChange}
						intervalType="break"
					/>
				</div>
			</React.Fragment>
		)
	}
}

export default App