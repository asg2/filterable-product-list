import React from 'react';

export default class Pagination extends React.Component {

	handleClick(page) {
		this.props.onPageChange(page);
	}

	pagItem(page, alt='', link=true) {
		var text = {__html: (alt ? alt : page).toString()};

		if (link !== true)
			return <span dangerouslySetInnerHTML={text} />;

		if (this.props.page===page)
			return <span className="currentPage" dangerouslySetInnerHTML={text} />;
		else
			return <a href={'#'} dangerouslySetInnerHTML={text}
								onClick={this.handleClick.bind(this, page)}
			/>;
	}

	pagItemList(pF) {
		var items = [];

		var previousPage = Math.max(this.props.page - 1, 1);
		items.push(this.pagItem(previousPage, pF.first));

		items.push(this.pagItem(1));
		if (this.props.page > 1) {
			if (this.props.page > 2) {
				var previous = Math.ceil((this.props.page + 1)/2);
				items.push(this.pagItem(previous, pF.middle.dots, pF.middle.link));
			}
			items.push(this.pagItem(this.props.page));
		}
		if (this.props.numberOfPages > this.props.page) {
			if (this.props.numberOfPages > this.props.page+1) {
				var next = Math.floor((this.props.numberOfPages + this.props.page)/2);
				items.push(this.pagItem(next, pF.middle.dots, pF.middle.link));
			}
			items.push(this.pagItem(this.props.numberOfPages));
		}

		var nextPage = Math.min(this.props.page + 1, this.props.numberOfPages);
		items.push(this.pagItem(nextPage, pF.last));

		return items;
	}

	render() {
		var pagFormat = {
			first: '&lsaquo;',
			last: '&rsaquo;',
			middle: {dots: '...', link: true}
		};

		return (
			<div className="Pagination">
				{this.pagItemList(pagFormat)}
			</div>
		);
	}

}
