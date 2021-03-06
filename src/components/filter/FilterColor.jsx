import React from 'react';
import Input from "../Input";

export default class FilterColor extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showAll: this.props.filter.items.length <= this.props.filter.show
		};
	}

	handleClick() {
		this.setState({showAll: !this.state.showAll});
	}

	handleResetAll() {
		this.props.onFilterClick();
	}

	handleInputClick(i) {
		this.props.onFilterClick(i);
	}

	render() {
		var end = this.state.showAll ?
			this.props.filter.items.length : this.props.filter.show;
		var items = this.props.filter.items.slice(0, end).map(
			function(item, i) {
				return (
					<Input
						type={this.props.filter.type}
						name={this.props.filter.name}
						value={item.value}
						checked={item.checked}
						onInputClick={this.handleInputClick.bind(this, i)}
					/>
				);
			}.bind(this));

		if (this.props.filter.items.length > this.props.filter.show)
			items.push(
				<button className="show-more"
								onClick={this.handleClick.bind(this)}>
					<div className="horizontal-bar" />
					{this.state.showAll ? null : <div className="vertical-bar" />}
				</button> //{this.state.showAll ? "－" : "＋"}
			);

		return (
			<div className={"FilterColor " + this.props.filter.type
			                + " " + (this.state.showAll ? "less" : "more")}>
				<h3>{this.props.filter.name}</h3>
				<a href="#"
					 className="reset"
					 onClick={this.handleResetAll.bind(this)}
				/>
				<span className="label">{this.props.filter.label}</span>
				{items}
				<br />or<br />
				<span className="label">Use color from your logo</span>
				<Input type="file" name="upload" label="Upload logo" />
			</div>
		);
	}

}
