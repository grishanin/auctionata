import React, { PropTypes, Component } from 'react';

export class PlaceBid extends Component {

  static propTypes = {
    currentValue: PropTypes.number,
    onPlace: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const value = parseInt(this.refs.input.value, 10);
    if (value > this.props.currentValue) {
      this.props.onPlace(value);
      this.refs.input.value = '';
    }
  }

  render() {
    return (
      <div className="place-bid">
        <input ref="input"
          type="text"
          className="place-bid__input" />{' '}
        <button
          onClick={this.handleClick}
          className="place-bid__button">
          Place bid
        </button>
      </div>
    );
  }
}

export default PlaceBid;
