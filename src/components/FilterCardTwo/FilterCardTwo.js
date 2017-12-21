import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

const styles = require('./FilterCardTwo.scss');

export class FilterCardTwo extends Component {
  static propTypes = {
    leftBtn: PropTypes.string,
    rightBtn: PropTypes.string,
    onChange: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      yibao: '1'
    };
  }

  onChange() {
    return this.state.yibao;
  }

  changeFree(num) {
    if (num == '0') {
      this.setState({
        yibao: '0',
      });
    } else {
      this.setState({
        yibao: '1',
      });
    }
  }

  render() {
    return (
      <div className={styles.filterCardTwo}>
        <footer className={styles.selectFree}>
          <button className={this.state.yibao == '0' ? styles.leftbuttonbule : styles.leftbuttongray} onClick={() => this.changeFree('0')}>{this.props.leftBtn}</button>
          <button className={this.state.yibao == '0' ? styles.rightbuttongray : styles.rightbuttonbule} onClick={() => this.changeFree('1')}>{this.props.rightBtn}</button>
        </footer>
      </div>
    );
  }
}
