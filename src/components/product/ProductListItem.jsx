import React from "react";
import CustomerRatingLine from "../CustomerRatingLine";

export default class ProductListItem extends React.Component {

	render() {
		const ratingLineLenght = 5;

		return (
			<div className="ProductListItem">
				<a href='#'>
					<img
						src={"/assets/images/products/" + this.props.img + ".jpg"}
						alt={"Image of " + this.props.name}
						title={this.props.industry + " (" + this.props.style + ")"}
					/>
				</a>
				<CustomerRatingLine
					rating={Math.round(parseFloat(this.props.rating))}
					length={ratingLineLenght} />
				<button
					className=
						{"favorite " + (parseInt(this.props.favorite) ? 'On' : 'Off')}
					onClick={this.props.onItemChange}
				/>
				<a className="title" href='#'>{this.props.name}</a>
				{this.props.size}
			</div>
		);
	}

}
