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
		this.setData();
		this.setFilter();
		this.setCounters();
		this.filterData();
	}

	setData() {
		this.state.data.forEach(function (product) {
			product.orientation = "landscape";
			product.color = "#61d2fe";
		});
	}

	setFilter() {
		this.state.filter.forEach(function (filter, flt) {
			if (flt === 2) {
				filter.okCondition = (product, filter, item) => Math.round(parseFloat(
					product[filter.name.toLowerCase()])) >= item.value;
				filter.notSelected = (product, filter, item) =>
				  item.checked && !filter.okCondition(product, filter, item);
			} else {
				filter.okCondition = (product, filter, item) =>
				  product[filter.name.toLowerCase()] === item.value;
				filter.notSelected = (product, filter, item) =>
				  !item.checked && filter.okCondition(product, filter, item)
					  || filter.items.map(item => item.value).indexOf(
					  	product[filter.name.toLowerCase()]) < 0;
			}
			filter.counters = !(flt === 0 || flt === 5);
		});
	}

	setCounters() {
		this.state.filter.forEach(function (filter, flt) {
			if (filter.counters)
				this.setOneFilterCounters(flt);
		}.bind(this));
	}

	setOneFilterCounters(flt) {
		var filter = this.state.filter[flt];
		var data = this.filterDataWithAllFiltersWithoutOne(flt);

		data = data.filter(product => product.isSelected);

		filter.items.forEach(item => item.counter = (
			(item.value === "All") ?
				data :
				data.filter(product => filter.okCondition(product, filter, item))
		).length)
	}

	filterDataWithAllFiltersWithoutOne(flt) {
		var data = this.state.data.map(function (product) {
			product.isSelected = true;
			return product;
		});

		this.state.filter.forEach(function (filter, f) {
			if (f === flt || filter.items.every(item => !item.checked))
				return;
			filter.items.forEach(function (item) {
				data.forEach(function (product) {
					if (filter.notSelected(product, filter, item))
						product.isSelected = false;
				});
			});
		});

		return data;
	}

	filterData() {
		this.setState({data: this.filterDataWithAllFiltersWithoutOne()});
	}

	handleDataChange(id) {
		var data = this.state.data;
		//data.findIndex(product => product.id === id); //not working in IE;
		var i = data.map(product => product.id).indexOf(id);
		data[i].favorite = String(Number(!parseInt(data[i].favorite)));
		this.setCounters();
		this.filterData();
	}

	handleFilterChange(flt, i) {
		if (flt === undefined)
			this.filterClearAll();
		else if (i === undefined)
			this.filterResetAll(flt);
		else
			this.filterItemChange(flt, i);

		this.setCounters();
		this.filterData();
	}

	filterSetAll(flt, val=true) {
		this.state.filter[flt].items.forEach(item => item.checked = val);
	}

	filterResetAll(flt) {
		this.filterSetAll(flt, false);
	}

	filterClearAll() {
		this.state.filter.forEach((filter, flt) => this.filterResetAll(flt));
	}

	filterItemChange(flt, i) {
		var filter = this.state.filter[flt];

		if (filter.type === "radio") {
			this.filterResetAll(flt);
			filter.items[i].checked = true;
		}	else if (filter.items[i].value === "All") {
			this.filterSetAll(flt, !filter.items[i].checked);
		} else {
			filter.items[i].checked = !filter.items[i].checked;

			var j;
			if ((j = filter.items.map(item => item.value).indexOf("All")) !== -1)
				filter.items[j].checked = filter.items.reduce(function (all, item, i) {
					return (i === j) ? all : all && item.checked;
				}, true);
		}
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
