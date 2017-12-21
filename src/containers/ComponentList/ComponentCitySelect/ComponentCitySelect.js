import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
const styles = require('./ComponentCitySelect.scss');
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import {CitySelect} from '../../../components/CitySelect/CitySelect'

@connect(
  state => ({...state.home}),
  {pushState: push,
  })
export default class ComponentCitySelect extends Component {
  static propTypes = {
    pushState: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      provinceName: null,
      cityName: null,
      areaName: null
    };
  }

  componentDidMount() {

  }

  provinceSelectValue(event) {
    this.setState({
      provinceName: event,
    })
  }

  citySelectValue(event) {
    this.setState({
      cityName: event,
    })
  }

  areaSelectValue(event) {
    this.setState({
      areaName: event,
    })
  }

  render() {

    return (
      <div className={styles.componentCitySelect}>
        <Helmet title="我的" />
        <section>
          <CitySelect
            provinceChange={this.provinceSelectValue.bind(this)}
            cityChange={this.citySelectValue.bind(this)}
            areaChange={this.areaSelectValue.bind(this)}
          />
          <dl>
            <p>{this.state.provinceName}</p>
            <p>{this.state.cityName}</p>
            <p>{this.state.areaName}</p>
          </dl>
        </section>
      </div>
    );
  }
}