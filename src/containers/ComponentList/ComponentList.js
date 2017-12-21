import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
const styles = require('./ComponentList.scss');
import { Link } from 'react-router';
import Helmet from 'react-helmet';

@connect(
    state => ({...state.home}),
    {pushState: push,
    })
export default class ComponentList extends Component {
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
      const xiangyoujiantou = require('../../images/xiangyoujiantou.png');
        return (
            <div className={styles.componentList}>
                <Helmet title="组件列表" />
                <section>
                    <dl>
                      <Link to='login'>
                        <dt>login or register
                          <img src={xiangyoujiantou}/>
                        </dt>
                      </Link>
                      <Link to='component-button'>
                        <dt>button
                          <img src={xiangyoujiantou}/>
                        </dt>
                      </Link>
                      <Link to='component-filter-card'>
                        <dt>filter card
                          <img src={xiangyoujiantou}/>
                        </dt>
                      </Link>
                      <Link to='/component-filter-cardtwo'>
                        <dt>filter card two
                          <img src={xiangyoujiantou}/>
                        </dt>
                      </Link>
                      <Link to='component-city-select'>
                        <dt>city select
                          <img src={xiangyoujiantou}/>
                        </dt>
                      </Link>
                      <Link to='component-loading'>
                        <dt>loading
                          <img src={xiangyoujiantou}/>
                        </dt>
                      </Link>
                      <Link to='component-diaglog'>
                        <dt>diaglog
                          <img src={xiangyoujiantou}/>
                        </dt>
                      </Link>
                      <Link to='component-modal'>
                        <dt>modal
                          <img src={xiangyoujiantou}/>
                        </dt>
                      </Link>
                      <Link to='component-select-photo'>
                        <dt>select photo
                          <img src={xiangyoujiantou}/>
                        </dt>
                      </Link>
                    </dl>
                </section>
            </div>
        );
    }
}