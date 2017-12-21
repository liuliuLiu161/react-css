import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
const styles = require('./ComponentButton.scss');
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { NotClickBtn, CanClickBtn, PositionBtn, AllSelectBtn } from '../../../components/Button/Button';

@connect(
  state => ({}),
  {pushState: push,
  })
export default class ComponentButton extends Component {
  static propTypes = {
    pushState: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {

  }

  render() {

    return (
      <div className={styles.componentButton}>
        <div className={styles.backgroundview}></div>
        <Helmet title="button" />
        <section>
          <NotClickBtn title = '不可点击' />
        </section>
        <section>
          <CanClickBtn title = '可点击' />
        </section>
        <section>
          <PositionBtn title = '定位于bottom' />
        </section>
        <section>
          <AllSelectBtn title = '多选' />
        </section>
      </div>
    );
  }
}