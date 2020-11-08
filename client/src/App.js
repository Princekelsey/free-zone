import React, { createRef } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter, Switch, Redirect, Route } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";

//Actions
import { getAllConsultants } from "./redux/consultants/consultantsActions";
import { checkUserSession } from "./redux/auth/authActions";

//State selectors
import { selectCurrentUser } from "./redux/auth/authSelector";

// Layouts
import LayoutDefault from "./layouts/LayoutDefault";
import LayoutAlternative from "./layouts/LayoutAlternative";
import LayoutSignin from "./layouts/LayoutSignin";

// Views
import Home from "./views/Home";
import Secondary from "./views/Secondary";
import Login from "./views/Login";
import Signup from "./views/Signup";
import DoctorsAndCounselors from "./views/DoctorsAndCounselors";
import FrequentQuestions from "./views/FrequentQuestions";
import Error from "./views/Error";
import Blogs from "./views/Blogs";
import SingeBlog from "./views/SingleBlog";
import Store from "./views/Store";
import Consultant from "./views/Consultant";
import Arena from "./views/Arena";

class App extends React.Component {
  scrollReveal = createRef();
  state = {
    currentLocation: "/",
  };

  componentDidMount() {
    document.body.classList.add("is-loaded");
    this.scrollReveal.current.init();
    this.props.getAllConsultants();
    this.props.checkUserSession();
  }

  // Route change
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.scrollReveal.current.init();
    }
  }

  setCurrentLocation = (location) => {
    this.setState({ currentLocation: location });
  };

  render() {
    const { currentUser } = this.props;

    return (
      <ScrollReveal
        ref={this.scrollReveal}
        children={() => (
          <Switch>
            <AppRoute
              exact
              path="/"
              component={Home}
              layout={LayoutDefault}
              setCurrentLocation={this.setCurrentLocation}
            />
            <AppRoute
              exact
              path="/secondary"
              component={Secondary}
              layout={LayoutAlternative}
              setCurrentLocation={this.setCurrentLocation}
            />
            <Route
              exact
              path="/login"
              render={(props) =>
                currentUser ? (
                  <Redirect to={this.state.currentLocation} />
                ) : (
                  <LayoutSignin>
                    <Login {...props} />
                  </LayoutSignin>
                )
              }
            />
            <Route
              exact
              path="/signup"
              render={(props) =>
                currentUser ? (
                  <Redirect to={this.state.currentLocation} />
                ) : (
                  <LayoutSignin>
                    <Signup {...props} />
                  </LayoutSignin>
                )
              }
            />

            <AppRoute
              exact
              path="/doctors-counselors"
              component={DoctorsAndCounselors}
              layout={LayoutDefault}
              setCurrentLocation={this.setCurrentLocation}
            />

            <AppRoute
              exact
              path="/arena"
              component={Arena}
              layout={LayoutDefault}
              setCurrentLocation={this.setCurrentLocation}
            />

            <AppRoute
              exact
              path="/doctors-counselors/:id"
              component={Consultant}
              layout={LayoutDefault}
              setCurrentLocation={this.setCurrentLocation}
            />
            <AppRoute
              exact
              path="/faqs"
              component={FrequentQuestions}
              layout={LayoutDefault}
              setCurrentLocation={this.setCurrentLocation}
            />

            <AppRoute
              exact
              path="/shop"
              component={Store}
              layout={LayoutDefault}
              setCurrentLocation={this.setCurrentLocation}
            />

            <AppRoute
              exact
              path="/blogs"
              component={Blogs}
              layout={LayoutDefault}
              setCurrentLocation={this.setCurrentLocation}
            />

            <AppRoute
              exact
              path="/blogs/:id"
              component={SingeBlog}
              layout={LayoutDefault}
              setCurrentLocation={this.setCurrentLocation}
            />

            <AppRoute
              // exact
              // path="/faqs"
              component={Error}
              layout={LayoutDefault}
              setCurrentLocation={this.setCurrentLocation}
            />
          </Switch>
        )}
      />
    );
  }
}

const mapActionsToProps = {
  getAllConsultants,
  checkUserSession,
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const AppConnected = withRouter((props) => <App {...props} />);

export default connect(mapStateToProps, mapActionsToProps)(AppConnected);
