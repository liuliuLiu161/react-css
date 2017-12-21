import React from 'react';
import {IndexRoute, Route} from 'react-router';
// import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Home,
    Login,
    Register,
    PerfectInformation,
    ComponentList,
    ComponentButton,
    ComponentFilterCard,
    ComponentCitySelect,
    ComponentFilterCardTwo,
    ComponentLoading,
    ComponentDiaglog,
    ComponentSelectPhoto,
    ComponentModal,
    NotFound,
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const uid = localStorage.getItem('uid');
      // const { auth: { user }} = store.getState();
      if (!uid || uid == '') {
        // oops, not logged in, so can't be here!
        replace('login');
      }
      cb();
    }
      checkAuth();


    // if (!isAuthLoaded(store.getState())) {
    //   store.dispatch(loadAuth()).then(checkAuth);
    // } else {
    //   checkAuth();
    // }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route>
      <Route path="login" component={Login}/>
      <Route path="register" component={Register}/>
      <Route path="perfect-information/:phone/:password" component={PerfectInformation}/>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/component-list" component={ComponentList} />
        <Route path="/component-button" component={ComponentButton} />
        <Route path="/component-filter-card" component={ComponentFilterCard} />
        <Route path="/component-filter-cardtwo" component={ComponentFilterCardTwo} />
        <Route path="/component-city-select" component={ComponentCitySelect} />
        <Route path="/component-loading" component={ComponentLoading} />
        <Route path="/component-diaglog" component={ComponentDiaglog} />
        <Route path="/component-select-photo" component={ComponentSelectPhoto} />
        <Route path="/component-modal" component={ComponentModal} />
      </Route>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
