import React from 'react';

export default class ProductListGridSelector extends React.Component {

	handleClick(grid) {
		this.props.onGridChange(grid);
	}

	gridButton(grid) {
		var items = "<table>";
		for (var i=0; i<grid; i++) {
			items += "<tr>";
			for (var j=0; j<grid; j++)
				items += "<td></td>";
			items += "</tr>";
		}
		items += "</table>";

		var ret = {__html: items.toString()};

		if (this.props.grid===grid)
			return <span dangerouslySetInnerHTML={ret} />;
		else
			return <a href={'#'} dangerouslySetInnerHTML={ret}
								onClick={this.handleClick.bind(this, grid)}
			/>;
	}

	gridButtons() {
		var items = [];
		for (var g=4; g>1; g--)
			items.push(this.gridButton(g));
		return items;
	}

	render () {

		return (
			<div className="ProductListGridSelector">
				{this.gridButtons()}
			</div>
		);
	}
}
