import React, { PropTypes } from 'react';
import AuctionItem from '../components/AuctionItem';

export default function Auction({auction}) {
  return (
    <div className="auction">
      <h2>
        Auction room #{auction.id}
        {' '}<span className="auction__status">{auction.status}</span>
      </h2>
      <div className="auction__item">
        <AuctionItem item={auction.item} />
      </div>
      <div className="auction__estimate-price">
          Starting price: {auction.openingBid}
        </div>
      <div className="auction__estimate-price">
        Estimate: {auction.estimatePrice}
      </div>
      <hr />
      <div className="auction__highest">
        <div className="auction__highest-bidder">
          Highest bidder: {auction.bidder}
        </div>
        <div className="auction__highest-bid">
          Highest bid: {auction.bid}
        </div>
      </div>
    </div>
  );
}

Auction.propTypes = {
  auction: PropTypes.shape({
    openingBid: PropTypes.number.isRequired,
    estimatePrice: PropTypes.number.isRequired,
    bid: PropTypes.number.isRequired,
    bidder: PropTypes.string.isRequired,
    itemId: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired
  }).isRequired
};
