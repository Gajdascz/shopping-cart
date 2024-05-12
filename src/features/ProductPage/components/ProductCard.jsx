import PropTypes from 'prop-types';
import { useState } from 'react';
import ProductRating from './ProductRating';
import Action from '../../../components/Action/Action';
import QuantityInput from '../../QuantityInput/QuantityInput';
import styled from 'styled-components';
import { useCartContext } from '../../../contexts/CartContext';
const Card = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: var(--color-on-surface);
  box-shadow: var(--surface-4-shadow);
  border: var(--border);
  border-radius: var(--border-radius);
  overflow: hidden;
  height: 100%;
`;

const ImageWrapper = styled.div`
  flex: 1;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  overflow: hidden;
  min-width: 125px;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ProductBodyContainer = styled.div`
  padding: var(--space-small);
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-small);
  min-height: 0;
`;
const ProductBodyHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-small);
`;

const ProductTitle = styled.h2`
  font-size: 1.25rem;
`;
const ProductPrice = styled.p`
  font-size: 1.5rem;
  font-style: italic;
  font-weight: bold;
`;
const ProductDescription = styled.p`
  flex-grow: 1;
  text-align: center;
  display: flex;
  align-items: center;
`;

const QuantityAddToCartWrapper = styled.div`
  display: flex;
  gap: var(--space-medium);
  flex-wrap: wrap;
`;
const CardQuantityInput = styled(QuantityInput)`
  width: 30%;
`;

const AddToCartButton = styled(Action)`
  background-color: var(--surface-4-color);
  box-shadow: var(--surface-4-shadow);
  font-weight: bold;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: var(--border-radius);
  padding: var(--space-small);
  min-width: fit-content;
  flex: 1;
  &:hover,
  &:focus {
    border-color: 2px solid var(--color-secondary);
    background-color: var(--color-on-secondary);
    color: var(--color-secondary);
    box-shadow: var(--surface-5-shadow);
  }
`;

ProductCard.propTypes = {
  productData: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    rating: PropTypes.shape({
      rate: PropTypes.number,
      count: PropTypes.number,
    }),
    description: PropTypes.string,
  }),
  onAddToCart: PropTypes.func,
};
export default function ProductCard({ productData }) {
  const [quantity, setQuantity] = useState(1);
  const { id, image, title, price, rating, description } = productData;
  const { addToCart } = useCartContext();
  const handleAddToCart = () =>
    addToCart({ id, image, title, price, quantity });

  return (
    <Card>
      <ImageWrapper>
        <img src={image} />
      </ImageWrapper>

      <ProductBodyContainer>
        <ProductBodyHeader>
          <ProductTitle>{title}</ProductTitle>
          <ProductRating rate={rating.rate} count={rating.count} />
          <ProductPrice>${price.toFixed(2)}</ProductPrice>
        </ProductBodyHeader>
        <ProductDescription>{description}</ProductDescription>
        <QuantityAddToCartWrapper>
          <CardQuantityInput
            quantity={quantity}
            setQuantity={setQuantity}
            min={1}
          />

          <AddToCartButton onClick={handleAddToCart}>
            Add To Cart
          </AddToCartButton>
        </QuantityAddToCartWrapper>
      </ProductBodyContainer>
    </Card>
  );
}