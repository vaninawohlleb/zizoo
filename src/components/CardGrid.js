import React from 'react';
import Card from './Card';
import styled from 'styled-components';

const Grid = styled.div`
	display: flex;
	flex-direction: column;
	padding: 15px 0;
	color: #363e40;
	justify-content: center;
`

const CardGrid = ({ items, filters }) => {
	const filteredByAge = () => {
		if (filters.age === 'old') { return items.filter(item => item.year < 2010)} 
		else if (filters.age === 'fresh') { return items.filter(item => item.year >= 2010)}
		else return items
	}

	const filteredByLength = () => {
		if (filters.length === 'short') { return items.filter(item => item.length < 15)}
		else if (filters.length === 'long') { return items.filter(item => item.length >= 15)}
		else return items
	}

	return (
			<Grid>
				{Object.values(filters).every(e => e === null) &&
					items.map(card => <Card key={card.id} card={card}/>)
				}
				{filters.age === 'old' &&
					filteredByLength().filter(item => item.year < 2010).map(card => <Card key={card.id} card={card}/>)
				}
				{filters.age === 'fresh' &&
					filteredByLength().filter(item => item.year >= 2010).map(card => <Card key={card.id} card={card}/>)
				}
				{filters.length === 'short' &&
					filteredByAge().filter(item => item.length < 15).map(card => <Card key={card.id} card={card}/>)
				}
				{filters.length === 'long' &&
					filteredByAge().filter(item => item.length >= 15).map(card => <Card key={card.id} card={card}/>)
				}
			</Grid>
		)
	}

	export default CardGrid;