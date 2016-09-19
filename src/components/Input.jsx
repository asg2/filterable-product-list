import React from "react";

export default class Input extends React.Component {

	render() {
		var id = this.props.name + '-' + this.props.value;

		return (
			<div className="Input">
				<input type={this.props.type}
							 name={this.props.name}
							 value={this.props.value}
							 id={id}
							 checked={this.props.checked}
							 onClick={this.props.onInputClick}
				/>
				<label htmlFor={id}>
					<div />{this.props.label}<span />
				</label>
			</div>
		);
	}
}
