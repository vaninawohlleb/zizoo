import React, { Component } from 'react';
import Card from './Card';
import styled from 'styled-components';

const Grid = styled.div`
	display: flex;
	flex-direction: column;
	padding: 15px 0;
	color: #363e40;
	justify-content: center;
`

class CardGrid extends Component {
	constructor(props){
		super(props)
		this.state= {
			filteredItems: this.props.items
		}
	}

	componentWillUpdate(prevProps, prevState) {
		if(this.props !== prevProps) {
			this.setState({
				filteredItems: this.filteredItems(prevProps, prevState)
			})
		}
	}

	filteredItems(prevProps, prevState) {
		const filters = prevProps.filters,
			items = prevState.filteredItems,
			lengthItems = this.filteredByLength(filters, items),
			ageItems = this.filteredByAge(filters, items);
		let allFilteredItems = filters.age === null ? lengthItems : ageItems
		
		if (Object.values(filters).every((filter) => filter !== null)) {
			allFilteredItems = this.filteredByLength(filters, ageItems)
		}

		return allFilteredItems;
	}

	filteredByLength(filters, items) {
		let lengthItems;
		if(filters.age === null) items = this.props.items

		if (filters.length === 'short') {
			lengthItems = items.filter(item => item.length < 15)
		} else if (filters.length === 'long') {
			lengthItems = items.filter(item => item.length >= 15)
		} else lengthItems = items

		return lengthItems;
	}

	filteredByAge(filters, items) {
		let	ageItems;
		if (filters.length === null || filters.age !== null) items = this.props.items

		if (filters.age === 'old') {
			ageItems = items.filter(item => item.year < 2010)
		} else if (filters.age === 'fresh') {
			ageItems = items.filter(item => item.year >= 2010)
		} else ageItems = items
		
		return ageItems
	}

	render() {
		console.log(this.state.filteredItems)
		return (
			<Grid>
				{this.state.filteredItems.map(card => <Card key={card.id} card={card}/>)}
			</Grid>
		)
	}
}

export default CardGrid;