import React from 'react';
import Input from "../Input";

export default class FilterCustomerRating extends React.Component {

	handleResetAll() {
		this.props.onFilterClick();
	}

	handleInputClick(i) {
		this.props.onFilterClick(i);
	}

	render() {
		var inputItems = this.props.filter.items.map(function(input, i) {
			return ([
				<Input
					type={this.props.filter.type}
					name={this.props.filter.name}
					value={input.value}
					checked={input.checked}
					onInputClick={this.handleInputClick.bind(this, i)}
				/>, input.counter, <br />
			]);
		}.bind(this));
		var last = inputItems.pop();
		last.pop();
		inputItems.push(last);

		return (
			<div className={"FilterCustomerRating " + this.props.filter.type}>
				<h3>{this.props.filter.name}</h3>
				<a href="#"
					 className="reset"
					 onClick={this.handleResetAll.bind(this)}
				/>
				<span className="label">{this.props.filter.label}</span>
				{inputItems}
			</div>
		);
	}

}
