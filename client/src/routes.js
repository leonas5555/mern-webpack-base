import App from './components/App.jsx';
import LoginPage from './containers/Login.jsx';
import HomePage from './components/Home.jsx';
import SignUpPage from './containers/Signup.jsx';
import DashboardPage from './containers/Dash.jsx';
import Auth from './modules/Auth';

const routes = {
  component: App,
  childRoutes: [

    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, DashboardPage);
        } else {
          callback(null, HomePage);
        }
      },
    },

    {
      path: '/login',
      component: LoginPage,
    },

    {
      path: '/signup',
      component: SignUpPage,
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();

        // change the current URL to /
        replace('/');
      },
    },

  ],
};

export default routes;
