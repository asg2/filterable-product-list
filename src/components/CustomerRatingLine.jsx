import React from "react";

export default class CustomerRatingLine extends React.Component {

	ratingItem(r) {
		return <div
			className={"ratingItem " + ((r < this.props.rating) ? 'On' : 'Off')}
		/>;
	}

	render() {
		for (var items=[], r=0; r<this.props.length; r++)
			items.push(this.ratingItem(r));

		return <div className="CustomerRatingLine">{items}</div>;
	}
}
