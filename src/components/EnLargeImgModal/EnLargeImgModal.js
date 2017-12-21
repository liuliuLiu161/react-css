import React, { Component, PropTypes } from 'react';


export class EnLargeImgModal extends Component {

  static propTypes = {
    hideImg: PropTypes.func,
    show: PropTypes.bool,
    curLargeImg: PropTypes.string
  };

  state = {
  };

  componentDidMount() {
  }

  hideImg() {
    this.props.hideImg();
  }

  render() {
    const styles = require('./EnLargeImgModal.scss');
    const {show, curLargeImg} = this.props;
    return (
      <div className={styles.imgModal} style={{display: show ? 'block' : 'none'}}>
        <section>
          <article onClick={this.hideImg.bind(this)}>×</article>
          <section className="flex tb-flex">
            <img src={curLargeImg} onClick={this.hideImg.bind(this)} />
          </section>
        </section>
        <p className="shade"></p>
      </div>
    );
  }
}
