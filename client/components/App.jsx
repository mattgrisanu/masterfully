import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import MainLayout from './main-layout/MainLayout.jsx';
import HomeView from './home-view/HomeView.jsx';
import SetupView from './setup-view/SetupView.jsx'; 
import RecordView from './record-view/RecordView.jsx';
import PracticeView from './practice-view/PracticeView.jsx';
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
          <Route path="record" component={RecordView} />
          <Route path="practices" component={PracticeView}>
            <Route path="sessions" component={SessionsView} />
          </Route>
          <Route path="reports/:sessionId" component={ReportView} />
          <Route path="settings" component={SettingsView} />
        </Route>
      </Router>
    )
  }
}