import React from 'react';

export default class ShowingFiltersList extends React.Component {

	handleFilterResetAll(flt) {
		this.props.onFilterChange(flt);
	}

	handleFilterReset(flt, i) {
		this.props.onFilterChange(flt, i);
	}

	filterListItem(label, handleClick) {
		return (
			<div className="showingFilterItem">
				{label}	<a href="#" className="reset" onClick={handleClick}	/>
			</div>
		);
	}

	render() {
		var filterItems = this.props.filter.map(function (flt, f) {
			if (flt.items.every(item => !item.checked))
				return null;
			else if (flt.type === "radio" || flt.items.every(item => !item.label))
				return this.filterListItem(flt.name,
					this.handleFilterResetAll.bind(this, f));
			else
				return flt.items.map(function (item, i) {
					if (item.checked && item.value !== 'All' && item.label)
						return this.filterListItem(item.label,
							this.handleFilterReset.bind(this, f, i));
				}.bind(this));
		}.bind(this));

		return (
			<span className="ShowingFiltersList">
				{filterItems}
			</span>
		);
	}

}
