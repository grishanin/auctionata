import expect from 'expect';
import {
  user,
  selectedAuction,
  auction,
  auctionsById
} from '../../client/reducers';
import {
  LOGIN,
  SELECT_AUCTION,
  PLACE_BID, RECEIVE_BID,
  REQUEST_AUCTION, RECEIVE_AUCTION,
  RECEIVE_AUCTIONS
} from '../../client/actions';

describe('reducers', () => {
  describe('login', () => {
    it('should handle LOGIN action', () => {
      const state = user('', {
        type: LOGIN,
        user: 'Leonardo'
      });
      expect(state).toBe('Leonardo');
    });
  });

  describe('selectedAuction', () => {
    it('should handle SELECT_AUCTION action', () => {
      const state = selectedAuction('', {
        type: SELECT_AUCTION,
        auctionId: 4
      });
      expect(state).toBe(4);
    });
  });

  describe('auction', () => {
    it('should handle REQUEST_AUCTION action', () => {
      const state = auction({}, {
        type: REQUEST_AUCTION
      });
      expect(state).toEqual({
        isFetching: true
      });
    });

    it('should handle RECEIVE_AUCTION action', () => {
      const state = auction({}, {
        type: RECEIVE_AUCTION
      });
      expect(state).toEqual({
        isFetching: false
      });
    });

    it('should handle PLACE_BID action', () => {
      const state = auction({}, {
        type: PLACE_BID,
        value: 77
      });
      expect(state).toEqual({
        bid: 77,
        isPending: true
      });
    });

    it('should handle RECEIVE_BID action', () => {
      const state = auction({}, {
        type: RECEIVE_BID,
        bidder: 'Raphael',
        bid: 47
      });
      expect(state).toEqual({
        bidder: 'Raphael',
        bid: 47,
        isPending: false
      });
    });
  });

  describe('auctionsById', () => {
    it('should handle RECEIVE_AUCTIONS action', () => {
      const state = auctionsById({}, {
        type: RECEIVE_AUCTIONS,
        auctions: [
          {id: 10},
          {id: 18},
          {id: 28}
        ]
      });
      expect(state).toEqual({
        10: {id: 10},
        18: {id: 18},
        28: {id: 28}
      });
    });

    it('should handle default', () => {
      const state = auctionsById({4: {id: 4}}, {
        type: REQUEST_AUCTION,
        auctionId: 4
      });
      expect(state).toEqual(
        {4: {id: 4, isFetching: true}
      });
    });
  });
});
