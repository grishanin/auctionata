import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchAuction, selectAuction, updateBid } from '../actions';
import Auction from '../components/Auction';
import PlaceBid from '../components/PlaceBid';

class AuctionContainer extends Component {
  static propTypes = {
    selectedAuction: PropTypes.string.isRequired,
    auction: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { dispatch, selectedAuction } = this.props;
    if (!selectedAuction) {
      dispatch(selectAuction(this.props.params.auctionId));
    } else {
      dispatch(fetchAuction(selectedAuction));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedAuction !== this.props.selectedAuction) {
      const { dispatch, selectedAuction } = nextProps;
      dispatch(fetchAuction(selectedAuction));
    }
  }

  render() {
    const { dispatch, user, auction } = this.props;
    return (
      !auction.isFetching
      ?
      <div>
        <Auction auction={auction} />
        {user && <PlaceBid
          currentValue={auction.bid}
          onPlace={value => dispatch(updateBid(auction.id, value))}
          />}
      </div>
      :
      <span>Loading...</span>
    );
  }
}

function mapStateToProps(state) {
  const { user, selectedAuction, auctionsById } = state;

  return {
    user,
    selectedAuction,
    auction: auctionsById[selectedAuction] || {
      isFetching: true
    }
  };
}

/**
 * Smart component connected to Redux
 */
export default connect(mapStateToProps)(AuctionContainer);
