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

	filterList() {
		return this.props.filter.map(function (flt, i) {
			var hdl = this.handleFilterClick.bind(this, i);
			switch (i) {
				case 0:
					return <FilterOrientation
						filter={flt}
						onFilterClick={hdl} />;
				case 2:
					return <FilterCustomerRating
						filter={flt}
						onFilterClick={hdl} />;
				case 5:
					return <FilterColor
						filter={flt}
						onFilterClick={hdl} />;
				default:
					return <FilterInputGroup
						filter={flt}
						onFilterClick={hdl} />
			}
		}.bind(this));
	}

	render() {

		return (
			<section className="FilterContainer">
				<h2>Narrow results</h2>

				{this.filterList()}

				<a href="#" className="clear" onClick={this.handleClearAll.bind(this)}>
					Clear all filters
				</a>
			</section>
		);
	}

}
