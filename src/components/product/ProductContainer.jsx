import React from 'react';
import ProductList from "./ProductList";
import Pagination from "./Pagination";
import ProductItemPerPageSelector	from "./ProductItemPerPageSelector";
import ProductListGridSelector from "./ProductListGridSelector";
import ShowingFiltersList from "./ShowingFiltersList";

export default class ProductContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			grid: 4,
			show: Math.min(5 * 4, this.props.data.length),
			page: 1
		};
	}

	handlePageChange(page) {
		this.setState({page: page});
	}

	handleShowChange(show) {
		var page = Math.floor((this.state.page-1) * this.state.show / show) + 1;

		this.setState({show: show});
		if (page !== this.state.page)
			this.setState({page: page});
	}

	handleGridChange(grid) {
		var show = this.props.data.length;
		if (show !== this.state.show)
			show = Math.min(show, grid * this.state.show / this.state.grid);

		var page = Math.floor((this.state.page-1) * this.state.show / show) + 1;

		this.setState({grid: grid});
		if (show !== this.state.show)
			this.setState({show: show});
		if (page !== this.state.page)
			this.setState({page: page});
	}

	handleListChange(id) {
		this.props.onDataChange(id);
	}

	handleFilterChange(flt, i) {
		this.props.onFilterChange(flt, i);
	}

	numberOfPages(numberOfProducts=this.props.data.length) {
		return Math.max(Math.ceil(numberOfProducts / Math.max(this.state.show, 1)),
			1);
	}

	possibleOptions(first=5*this.state.grid, mul=2, len=4) {
		var values = [];
		for (var v=first; --len; v*=mul)
			values.push(v);

		return values;
	}

	dataOptions(lastLab='All') {
		var options = this.possibleOptions().filter(
			val => val < this.props.data.length).map(
				val => ({value: val, label: val}));
		options.push({value: this.props.data.length, label: lastLab});

		return options;
	}

	dataList() {
		var begin = (this.state.page-1) * this.state.show;
		var count = Math.min(this.state.show, this.props.data.length - begin);

		return this.props.data.slice(begin, begin + count);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.data.length === this.props.data.length)
			return;

		if (nextProps.data.length < this.state.show	||
			this.props.data.length === this.state.show) {
			this.setState({show: nextProps.data.length});
			this.setState({page: 1});
		}

		var lastPage = this.numberOfPages(nextProps.data.length);
		if (lastPage < this.state.page)
			this.setState({page: lastPage});
	}

	render() {

		return (
			<section className="ProductContainer">
				<header>
					<span className="label">Search results:</span>
					{this.props.data.length}
					<ProductListGridSelector
						grid={this.state.grid}
						onGridChange={this.handleGridChange.bind(this)}
					/>
					<ProductItemPerPageSelector
						name="Show:"
						value={this.state.show}
						hideSelectedOption
						options={this.dataOptions()}
						onShowChange={this.handleShowChange.bind(this)}
					/>
					<br />
					<span className="label">Showing filters:</span>
					<ShowingFiltersList
						filter={this.props.filter}
						onFilterChange={this.handleFilterChange.bind(this)}
					/>
				</header>
				<ProductList
					data={this.dataList()}
					grid={this.state.grid}
					onListChange={this.handleListChange.bind(this)}
				/>
				<footer>
					<Pagination
						page={this.state.page}
						numberOfPages={this.numberOfPages()}
						onPageChange={this.handlePageChange.bind(this)}
					/>
					<a href='#'>Back to Top <span>&and;</span></a>
				</footer>
			</section>
		);
	}

}
