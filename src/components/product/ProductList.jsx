import React from 'react';
import ProductListItem from "./ProductListItem";

export default class ProductList extends React.Component {

	handleItemChange(i) {
		this.props.onListChange(i);
	}

	render() {
		var productItems = this.props.data.map(function(product) {
			return (
				<ProductListItem
					name={product.name}
					img={product.img}
					size={product.size}
					rating={product["customer rating"]}
					favorite={product.favorite}
					industry={product.industry}
					style={product.style}
					onItemChange={this.handleItemChange.bind(this, product.id)}
				/>
			);
		}.bind(this));

		return (
			<div className={"ProductList grid-" + this.props.grid}>
				{productItems}
			</div>
		);
	}

}
