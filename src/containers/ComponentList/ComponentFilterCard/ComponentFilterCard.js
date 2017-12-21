import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
const styles = require('./ComponentFilterCard.scss');
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { Loading, FilterCard, FilterHead, FilterHeadItem, FilterBody } from '../../../components';


@connect(
  state => ({...state.home}),
  {pushState: push,
  })
export default class ComponentFilterCard extends Component {
  static propTypes = {
    pushState: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      filterStateOne: false, // 第一个筛选内容，展开 收起
      filterStateTwo: false, // 第二个筛选内容，展开 收起
    };
  }

  componentDidMount() {

  }

  // 点击第一个展开筛选
  clickFilterOneItem() {
    const prevState = this.state.filterStateOne;
    this.setState({
      filterStateOne: !prevState,
      filterStateTwo: false
    });
  }

  // 点击第二个展开筛选
  clickFilterTwoItem() {
    const prevState = this.state.filterStateTwo;
    this.setState({
      filterStateOne: false,
      filterStateTwo: !prevState
    });
  }

  // 点击第一个筛选内容
  clickFilterListOne(index) {
    this.clickFilterOneItem();

  }

  // 点击第二个筛选内容
  clickFilterListTwo(index) {
    this.clickFilterTwoItem();
  }

  render() {
    const newfilterBodyOneList = [{OrgName:'机构1'}, {OrgName:'机构2'}, {OrgName:'机构3'}];
    const newfilterBodyTwoList = [{value:'分类1'}, {value:'分类2'}];
    return (
      <div className={styles.componentFilterCard}>
        <Helmet title="FilterCard" />
        <FilterCard>
          <FilterHead>
            <FilterHeadItem
              showListState = {this.state.filterStateOne}
              clickFilteritem = {this.clickFilterOneItem.bind(this)}>
              机构
            </FilterHeadItem>
            <FilterHeadItem
              showListState = {this.state.filterStateTwo}
              clickFilteritem = {this.clickFilterTwoItem.bind(this)}>
              分类
            </FilterHeadItem>
          </FilterHead>
          {
            this.state.filterStateOne ?
              <FilterBody
                filterBodyLists = {newfilterBodyOneList}
                showValueName = "OrgName"
                clickFilterList = {this.clickFilterListOne.bind(this)} />
              : <strong></strong>
          }
          {
            this.state.filterStateTwo ?
              <FilterBody
                filterBodyLists = {newfilterBodyTwoList}
                showValueName = "value"
                clickFilterList = {this.clickFilterListTwo.bind(this)} />
              : <strong></strong>
          }
        </FilterCard>
      </div>
    );
  }
}