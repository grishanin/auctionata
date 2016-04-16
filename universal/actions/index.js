import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

export const LOGIN = 'LOGIN';
export const SELECT_AUCTION = 'SELECT_AUCTION';
export const REQUEST_AUCTION = 'REQUEST_AUCTION';
export const RECEIVE_AUCTION = 'RECEIVE_AUCTION';
export const PLACE_BID = 'PLACE_BID';
export const RECEIVE_BID = 'RECEIVE_BID';

const serverUrl = '';
const auctionsUrl = `${serverUrl}/api/v1/auctions`;

export function logIn(user) {
  return {
    type: LOGIN,
    user
  };
}

export function selectAuction(auctionId) {
  return dispatch => {
    dispatch({
      type: SELECT_AUCTION,
      auctionId
    });
    browserHistory.push(`/auctions/${auctionId}`);
  };
}

function requestAction(auctionId) {
  return {
    type: REQUEST_AUCTION,
    auctionId
  };
}

function receiveAuction(auctionId, json) {
  return {
    type: RECEIVE_AUCTION,
    auctionId,
    auction: json
  };
}

export function fetchAuction(auctionId) {
  return dispatch => {
    dispatch(requestAction(auctionId));
    return fetch(`${auctionsUrl}/${auctionId}?_expand=item`)
      .then(response => response.json())
      .then(json => dispatch(receiveAuction(auctionId, json)));
  };
}

function placeBid(auctionId, value) {
  return {
    type: PLACE_BID,
    auctionId,
    value
  };
}

function shouldPlaceBid(state, auctionId, value) {
  const auction = state.auctionsById[auctionId];
  if (auction && value > auction.bid) {
    return true;
  } else {
    return false;
  }
}

export function updateBid(auctionId, value) {
  return (dispatch, getState) => {
    const state = getState();
    if (shouldPlaceBid(state, auctionId, value)) {
      dispatch(placeBid(auctionId, value));
      return fetch(`${auctionsUrl}/${auctionId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bidder: state.user,
          bid: value
        })
      });
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    }
  };
}

export function receiveBid(data) {
  return {
    type: RECEIVE_BID,
    ...data
  };
}
