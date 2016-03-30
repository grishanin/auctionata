import { combineReducers } from 'redux';
import {
  LOGIN,
  SELECT_AUCTION,
  PLACE_BID, RECEIVE_BID,
  REQUEST_AUCTION, RECEIVE_AUCTION,
  RECEIVE_AUCTIONS
} from '../actions';

function user(state = '', action) {
  switch (action.type) {
    case LOGIN:
      return action.user;
    default:
      return state;
  }
}

function selectedAuction(state = '', action) {
  switch (action.type) {
    case SELECT_AUCTION:
      return action.auctionId;
    default:
      return state;
  }
}

function auction(state, action) {
  switch (action.type) {
    case REQUEST_AUCTION:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_AUCTION:
      return Object.assign({}, state, action.auction, {
        isFetching: false
      });
    case PLACE_BID:
      return Object.assign({}, state, {
        bid: action.value,
        // Should wait bid placing confirmation from the server
        isPending: true
      });
    case RECEIVE_BID:
      const { bidder, bid } = action;
      return Object.assign({}, state, {
        bidder,
        bid,
        isPending: false
      });
    default:
      return state;
  }
}

function auctionsById(state = {}, action) {
  switch (action.type) {
    case RECEIVE_AUCTIONS:
      return Object.assign({}, state,
        action.auctions.reduce((obj, auction) => {
          obj[auction.id] = auction;
          return obj;
        }, {})
      );
    default:
      const { auctionId } = action;
      if (auctionId) {
        return Object.assign({}, state, {
          [auctionId]: auction(state[auctionId], action)
        });
      }
      return state;
  }
}

export default combineReducers({
  user,
  auctionsById,
  selectedAuction
});

export function getAuction(state, id) {
  return state.auctionsById[id];
}
