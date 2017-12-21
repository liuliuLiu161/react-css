import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

const styles = require('./FilterCard.scss');

export class FilterCard extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string
    ]),
    className: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {className} = this.props;
    return (
      <div className={cx(styles.filterCard + ' list', className)}>
        {this.props.children}
      </div>
    );
  }
}

/**
 * component: FilterCard header
 */
export class FilterHead extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string
    ]),
  }

  render() {
    return (
      <header className="flex tb-flex">
        {this.props.children}
      </header>
    );
  }
}

/**
 * component: Filter header item
 */
export class FilterHeadItem extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string
    ]),
    showListState: PropTypes.bool,
    clickFilteritem: PropTypes.func
  }

  clickFilteritem() {
    this.props.clickFilteritem();
  }

  render() {
    return (
      <p onClick={this.clickFilteritem.bind(this)}>
        {this.props.children}
        <i className={this.props.showListState ? styles.filterItemIconCur : styles.filterItemIcon}></i>
      </p>
    );
  }
}

/**
 * component: Filter body
 */
export class FilterBody extends Component {
  static propTypes = {
    filterBodyLists: PropTypes.array,
    clickFilterList: PropTypes.func,
    showValueName: PropTypes.string, // 显示内容，对应的字段
  }

  clickFilterList(index) {
    this.props.clickFilterList(index);
  }

  render() {
    const {filterBodyLists, showValueName} = this.props;
    return (
      <div>
        <section>
          <ul>
            {
              filterBodyLists && filterBodyLists.map((filterBodyList, index) => {
                return (
                  <li className="list" key={index} onClick={() => this.clickFilterList(filterBodyList)}>{filterBodyList[showValueName]}</li>
                );
              })
            }
          </ul>
          <p className={'shade ' + styles.filterShade}></p>
        </section>
      </div>
    );
  }
}
