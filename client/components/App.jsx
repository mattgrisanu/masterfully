import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import MainLayout from './main-layout/MainLayout.jsx';
import HomeView from './home-view/HomeView.jsx';
import SetupView from './setup-view/SetupView.jsx'; 
import RecordView from './record-view/RecordView.jsx';
import PracticesView from './practice-view/PracticesView.jsx';
import SessionsView from './sessions-view/SessionsView.jsx';
import ReportView from './report-view/ReportView.jsx';
import SettingsView from './settings-view/SettingsView.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={MainLayout}>
          <IndexRoute component={HomeView} />
          <Route path="setup" component={SetupView} />
          <Route path="record/:practiceId" component={RecordView} />
          <Route path="practices" component={PracticesView}>
            <Route path="sessions/:practiceId" component={SessionsView} />
          </Route>
          <Route path="reports/:sessionId" component={ReportView} />
          <Route path="settings" component={SettingsView} />
        </Route>
      </Router>
    )
  }
}