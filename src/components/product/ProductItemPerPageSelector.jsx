import React from 'react';

export default class ProductItemPerPageSelector extends React.Component {

	handleChange(event) {
		this.props.onShowChange(event.target.value);
	}

	isOptionHidden (o) {
		return this.props.hideSelectedOption && this.props.value==o.value;
	}

	isSelectDisabled() {
		return this.props.options.length === 1;
	}

	optionItem(o) {
		return (
			<option
				value={o.value}
				hidden={!this.isSelectDisabled() && this.isOptionHidden(o)}
			>{o.label}</option>);
	}

	render () {

		return (

			<div className="ProductItemPerPageSelector">
				<span className="label">{this.props.name}</span>
				<select
					onChange={this.handleChange.bind(this)}
					value={this.props.value}
					disabled={this.isSelectDisabled()}
				>{this.props.name} {this.props.options.map(this.optionItem.bind(this))}</select>
				<div className="select-arrow">▼</div>
			</div>
		);
	}
}
