import React from 'react';
import styled from 'styled-components';


const CardContainer = styled.div`
	display: grid;
	margin: 25px 0;
	grid-template-columns: [first]1fr;
	grid-template-rows: [first]1fr [second]1fr;
	grid-template-areas: "image"
	"text";

	@media (min-width: 900px) {
		grid-template-columns: [first]1fr [second]2fr;
		grid-template-rows: [first]1fr [second]1fr [third]1fr;
		grid-template-areas: "image text text"
		"image text text"
		"image text text";
	}
`

const ImgContainer = styled.div`
	grid-area: image;
	padding: 15px;
	border: 1px solid #cac9c9;
`

const TextContainer = styled.div`
	grid-area: text;
`

const Heading = styled.div`
	background: #f8f8f8;
	border: 1px solid #cac9c9;
	padding: 15px 25px;

	> div {
		display: block;
	}

	h1 {
		font-size: 20px;
		display: inline-block;
		margin: 0 15px 10px 0;
	}

	h3 {
		display: inline-block;
		font-weight: 400;
		margin: 0;
	}
`

const Details = styled.div`
	display: flex;
	justify-content: space-between;
	direction: row;
	font-size: 15px;

	@media (min-width: 1000px) {
		font-size: 18px;
	}

	> span {
		padding: 25px;
		border-left: 0.5px solid #cac9c9;
		border-right: 0.5px solid #cac9c9;
		flex-basis: 200px;
		text-align: center;
	}
`

const Number = styled.span`
	font-weight: 800;
	display: block;
	font-size: 20px;
`

const Price = styled.div`
	background: #f8f8f8;
	border: 1px solid #cac9c9;
	padding: 15px;

	h2 {
		font-size: 18px;
		margin: 18px 10px;
	}
`

const Card = ({ card }) => {
	return (
		<CardContainer>
			<ImgContainer>
				<img alt='boat-img' src={card.imageUrl} />
			</ImgContainer>
			<TextContainer>
				<Heading>
					<div>
						<h1>{card.name} {card.type.toLowerCase()}</h1>
						<h3>{card.year}</h3>
					</div>
					<span>{card.locality}, {card.country}</span>
				</Heading>
				<Details>
					<span><Number>{card.length}m</Number>length</span>
					<span><Number>{card.cabins}</Number>cabins</span>
					<span><Number>{card.guests}</Number>guests</span>
					<span><Number>{card.reviews.total}</Number>reviews</span>
				</Details>
				<Price>
					<h2>from €{card.price} weekly</h2>
				</Price>
			</TextContainer>
		</CardContainer>
	)
}

export default Card;