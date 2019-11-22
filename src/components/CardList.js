import React, { Component } from 'react';
import CardGrid from './CardGrid';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

const CARD_QUERY = gql`
	query($active: Boolean) {
		getBoats(input: {active: $active}) {
			id
			name
			type
			year
			length
			marina
			locality
			country
			skipper
			cabins
			guests
			price
			imageUrl
			reviews {
				total
				score
			}
		}
	}
`

const CardPage = styled.div`
	position: relative;
	padding: 10px;
	margin: 0 auto;
	max-width: 1180px;
	overflow: hidden;

	@media (min-width: 800px) {
		padding: 25px;
	}
`

const Filters = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	color: #094856;
	margin: 25px 0;
	border-bottom: 1px solid #47c2d2;
	flex-direction: column;


	@media (min-width: 800px) {
		flex-direction: row;
	}
	> div {
		padding: 15px;
	}
`

const FilterText = styled.div`
	h1 {
		text-transform: uppercase;
		text-align: center;
	}
`

const FilterButtons = styled.div`
	display: flex;

	> input[type="radio"] {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		display: inline-block;
		position: relative;
		background-color: #f1f1f1;
		height: 30px;
		width: 30px;
		border: 0;
		cursor: pointer;     
		margin-right: 7px;
		outline: none;

		&:checked {
			background: #47c2d2;
		}
	}

	> label {
		padding: 10px;
	}
`

class CardList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedFilters: {age: null, length: null},
		}
	}


	// arrow function, so we dont need bind
	handleChange = (e) => {
		this.setState({
			selectedFilters: e.target.name === 'age' ? {age: e.target.value, length: this.state.selectedFilters.length} : 
				{age: this.state.selectedFilters.age, length: e.target.value},
		})
	}
	
	_getQueryVariables = () => {
		const active = true;
		return { active };
	}

	render() {
		return (
			<Query query={CARD_QUERY} variables={this._getQueryVariables()}>
				{({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
					
			return (
				<CardPage>
					<Filters>
						<FilterText><h1>Filter Active Boats</h1></FilterText>
						<FilterButtons className='age-filters' onChange={this.handleChange}>
							<label htmlFor='ageFilter'>Old</label>
							<input type='radio' name='age' value='old' />
							<label htmlFor='ageFilter'>New</label>
							<input type='radio' name='age' value='fresh'/>
						</FilterButtons>
						<FilterButtons className='length-filters' onChange={this.handleChange}>
							<label htmlFor='lengthFilter'>Short</label>
							<input type='radio' name='length' value='short'/>
							<label htmlFor='lengthFilter'>Long</label>
							<input type='radio' name='length' value='long'/>
						</FilterButtons>
					</Filters>
					{/* pass in the function that calculates the filter upstairs */}
						<CardGrid items={data.getBoats} filters={this.state.selectedFilters} />
				</CardPage>
				)
			}}	
		</Query>
		)
	}
}

export default CardList;