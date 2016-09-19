import React from 'react';
import FilterInputGroup from "./FilterInputGroup"
import FilterOrientation from "./FilterOrientation";
import FilterCustomerRating from "./FilterCustomerRating";
import FilterColor from "./FilterColor";

export default class FilterContainer extends React.Component {

	handleFilterClick(flt, i) {
		this.props.onFilterChange(flt, i);
	}

	handleClearAll() {
		this.props.onFilterChange();
	}

	render() {

		return (
			<section className="FilterContainer">
				<h2>Narrow results</h2>

				<FilterOrientation
					filter={this.props.filter[0]}
					onFilterClick={this.handleFilterClick.bind(this, 0)}
				/>
				<FilterInputGroup
					filter={this.props.filter[1]}
					onFilterClick={this.handleFilterClick.bind(this, 1)}
				/>
				<FilterCustomerRating
					filter={this.props.filter[2]}
					onFilterClick={this.handleFilterClick.bind(this, 2)}
				/>
				<FilterInputGroup
					filter={this.props.filter[3]}
					onFilterClick={this.handleFilterClick.bind(this, 3)}
				/>
				<FilterInputGroup
					filter={this.props.filter[4]}
					show={7}
					onFilterClick={this.handleFilterClick.bind(this, 4)}
				/>
				<FilterColor
					label="Choose color(s)"
					filter={this.props.filter[5]}
					show={9}
					onFilterClick={this.handleFilterClick.bind(this, 5)}
				/>
				<FilterInputGroup
					filter={this.props.filter[6]}
					show={9}
					onFilterClick={this.handleFilterClick.bind(this, 6)}
				/>

				<a href="#" className="clear" onClick={this.handleClearAll.bind(this)}>
					Clear all filters
				</a>
			</section>
		);
	}

}
