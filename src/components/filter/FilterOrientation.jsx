import React from 'react';
import Input from "../Input";

export default class FilterOrientation extends React.Component {

	handleResetAll() {
		this.props.onFilterClick();
	}

	handleInputClick(i) {
		this.props.onFilterClick(i);
	}

	render() {
		var inputItems = this.props.filter.items.map(function(input, i) {
			return (
				<Input
					type={this.props.filter.type}
					name={this.props.filter.name}
					value={input.value}
					label={input.label}
					checked={input.checked}
					onInputClick={this.handleInputClick.bind(this, i)}
				/>
			);
		}.bind(this));

		return (
			<div className={"FilterOrientation " + this.props.filter.type}>
				<h3>{this.props.filter.name}</h3>
				<a href="#"
					 className="reset"
					 onClick={this.handleResetAll.bind(this)}
				/>
				{inputItems}
			</div>
		);
	}

}
