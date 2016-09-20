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
		var items = this.props.filter.items.map(function(item, i) {
			return (
				<Input
					type={this.props.filter.type}
					name={this.props.filter.name}
					value={item.value}
					label={item.label}
					checked={item.checked}
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
				{items}
			</div>
		);
	}

}
