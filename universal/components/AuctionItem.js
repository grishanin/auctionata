import React, { PropTypes } from 'react';

export default function AuctionItem({item}) {
  const {description, image} = item;

  return (
    <div className="auction-item">
      <div className="auction-item__description">
        {description}
      </div>
      <img className="auction-item__img" width="200" src={image} />
    </div>
  );
}

AuctionItem.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired
};
