import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
const styles = require('./CitySelect.scss');
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { Location } from './Location'

@connect(
  state => ({}),
  {pushState: push
  })
export class CitySelect extends Component {
  static propTypes = {
    pushState: PropTypes.func,
    onChange: PropTypes.func,
    provinceChange: PropTypes.func,
    cityChange: PropTypes.func,
    areaChange: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      province: null,
      city: null,
      area: null,
    };
  }

  componentDidMount() {
    audiojs.events.ready(function() {
      var as = audiojs.createAll();
    });

    this.setState({
      province: Location(),
    });
  }

  selectProvince(event) {
    this.setState({
      city: this.state.province && this.state.province[event.target.value] && this.state.province[event.target.value].city,
      area: null,
    })
    this.props.provinceChange(this.state.province[event.target.value] && this.state.province[event.target.value].name || null);
  }

  selectCity(event) {
    this.setState({
      area: this.state.province && this.state.city && this.state.city[event.target.value] && this.state.city[event.target.value].districtAndCounty,
    })
    this.props.cityChange(this.state.city[event.target.value] && this.state.city[event.target.value].name || null);
  }

  selectArea(event) {
    this.props.areaChange(this.state.area[event.target.value]);
  }
  render() {
    return (
      <div className={styles.citySelect}>
        <Helmet title="CitySelect" />
        <audio src="./wodehuabanxie.mp3" preload="auto" />
        <section>
          <select onChange={this.selectProvince.bind(this)}>
            <option>选择省</option>
            {
              this.state.province && this.state.province.length > 0 && this.state.province.map((pro, index) =>{
                return (
                  <option value={index}>{pro.name}</option>
                )
              })
            }
          </select>
          <select onChange={this.selectCity.bind(this)}>
            <option>选择市</option>
            {
              this.state.city && this.state.city.length > 0 && this.state.city.map((cit, index) =>{
                return (
                  <option value={index}>{cit.name}</option>
                )
              })
            }
          </select>
          <select onChange={this.selectArea.bind(this)}>
            <option>选择区</option>
            {
              this.state.area && this.state.area.length > 0 && this.state.area.map((are, index) =>{
                return (
                  <option value={index}>{are}</option>
                )
              })
            }
          </select>
        </section>
      </div>
    );
  }
}