import React from 'react';
import ReactDOM from 'react-dom';
import ProductContainer from "./components/product/ProductContainer";
import FilterContainer from "./components/filter/FilterContainer";

export class App extends React.Component {

	constructor() {
		super();
		this.state = {
			data: require('json!../products.json'),
			filter: require('json!../filters.json')
		};
		this.setTestData();
		this.setFilterFunctions();
		this.setFilterCounters();
		this.filterData();
	}

	setTestData() {
		var data = this.state.data;
		for (var p=0; p<data.length; p++) {
			data[p].orientation = "landscape";
			data[p].color = "#61d2fe";
		}
	}

	setFilterFunctions() {
		var filter = this.state.filter;
		for (var f=0; f<filter.length; f++) {
			filter[f].okCondition = (p, f) => p === f;
			filter[f].notSelected = (p, f, sel, u) => !sel && p === f || u;
		}
		filter[2].okCondition = (p, f) => Math.round(parseFloat(p)) >= f;
		filter[2].notSelected = (p, f, sel) => sel && !filter[2].okCondition(p, f);
	}

	setFilterCounters() {
		for (var flt=0; flt<this.state.filter.length; flt++) {
			if (flt === 0 || flt === 5)
				continue;
			this.setOneFilterCounters(flt);
		}
	}

	setOneFilterCounters(flt) {
		var filter = this.state.filter;
		var data = this.filterDataWithAllFiltersWithoutOne(flt);

		data = data.filter(product => product.isSelected);

		for (var i=0; i<filter[flt].items.length; i++)
			if (filter[flt].items[i].value === "All")
				filter[flt].items[i].counter = data.length;
			else
				filter[flt].items[i].counter = data.filter(function(product) {
					return filter[flt].okCondition(
						product[filter[flt].name.toLowerCase()],
						filter[flt].items[i].value);
				}).length;
	}

	filterDataWithAllFiltersWithoutOne(flt) {
		var filter = this.state.filter;
		var data = this.state.data.map(function (product) {
			product.isSelected = true;
			return product;
		});

		for (var f=0; f<filter.length; f++) {
			if (f === flt)
				continue;
			var any = false;
			for (var i=0; i<filter[f].items.length && !any; i++)
				any = any || filter[f].items[i].checked;
			if (!any)
				continue;
			var values = filter[f].items.map(item => item.value);
			for (i=0; i<filter[f].items.length; i++)
				data = data.map(function (product) {
					if (filter[f].notSelected(product[filter[f].name.toLowerCase()],
							filter[f].items[i].value,
							filter[f].items[i].checked,
							values.indexOf(product[filter[f].name.toLowerCase()])<0))
						product.isSelected = false;
					return product;
				});
		}

		return data;
	}

	filterData() {
		this.setState({data: this.filterDataWithAllFiltersWithoutOne()});
	}

	handleDataChange(id) {
		var data = this.state.data;
		//var i = data.findIndex(product => product.id === id); //in IE not working
		for (var i=0; i<data.length; i++)
			if (data[i].id === id)
				break;
		data[i].favorite = String(Number(!parseInt(data[i].favorite)));
		this.setFilterCounters();
		this.filterData();
	}

	handleFilterChange(flt, i) {
		var filter = this.state.filter;
		if (flt === undefined)
			filter = this.filterClearAll();
		else if (i === undefined)
			filter = this.filterResetAll(flt);
		else
			filter = this.filterItemChange(flt, i);

		this.setState({filter: filter});
		this.setFilterCounters();
		this.filterData();
	}

	filterSetAll(flt, val=true) {
		var filter = this.state.filter;
		for (var i=0; i<filter[flt].items.length; i++)
			filter[flt].items[i].checked = val;
		return filter;
	}

	filterResetAll(flt) {
		return this.filterSetAll(flt, false);
	}

	filterClearAll() {
		var filter = this.state.filter;
		for (var flt=0; flt<filter.length; flt++)
			for (var i=0; i<filter[flt].items.length; i++)
				filter[flt].items[i].checked = false;
		return filter;
	}

	filterItemChange(flt, i) {
		var filter = this.state.filter;

		if (filter[flt].type === "radio") {
			filter = this.filterResetAll(flt);
			filter[flt].items[i].checked = true;
		}	else if (filter[flt].items[i].value === "All") {
			filter = this.filterSetAll(flt, !filter[flt].items[i].checked);
		} else {
			filter[flt].items[i].checked = !filter[flt].items[i].checked;

			for (var j=0; j<filter[flt].items.length; j++)
				if (filter[flt].items[j].value === "All")
					break;

			if (j < filter[flt].items.length) {
				var all = filter[flt].items[i].checked;
				for (i=0; i<filter[flt].items.length && all; i++)
					if (i !== j)
						all = all && filter[flt].items[i].checked;
				filter[flt].items[j].checked = all;
			}
		}

		return filter;
	}

	render() {

		return (
			<div>
				<header>
					header
				</header>
				<FilterContainer
					filter={this.state.filter}
					onFilterChange={this.handleFilterChange.bind(this)}
				/>
				<ProductContainer
					data={this.state.data.filter(product => product.isSelected)}
					filter={this.state.filter}
					onDataChange={this.handleDataChange.bind(this)}
					onFilterChange={this.handleFilterChange.bind(this)}
				/>
				<footer>
					footer
				</footer>
			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.querySelector("#app")
);
