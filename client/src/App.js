import React, { createRef } from "react";
import { connect } from "react-redux";
import { withRouter, Switch } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";

//Actions
import { getAllConsultants } from "./redux/consultants/consultantsActions";
import { checkUserSession } from "./redux/auth/authActions";

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

  render() {
    return (
      <ScrollReveal
        ref={this.scrollReveal}
        children={() => (
          <Switch>
            <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
            <AppRoute
              exact
              path="/secondary"
              component={Secondary}
              layout={LayoutAlternative}
            />
            <AppRoute
              exact
              path="/login"
              component={Login}
              layout={LayoutSignin}
            />
            <AppRoute
              exact
              path="/signup"
              component={Signup}
              layout={LayoutSignin}
            />
            <AppRoute
              exact
              path="/doctors-counselors"
              component={DoctorsAndCounselors}
              layout={LayoutDefault}
            />

            <AppRoute
              exact
              path="/arena"
              component={Arena}
              layout={LayoutDefault}
            />

            <AppRoute
              exact
              path="/doctors-counselors/:id"
              component={Consultant}
              layout={LayoutDefault}
            />
            <AppRoute
              exact
              path="/faqs"
              component={FrequentQuestions}
              layout={LayoutDefault}
            />

            <AppRoute
              exact
              path="/shop"
              component={Store}
              layout={LayoutDefault}
            />

            <AppRoute
              exact
              path="/blogs"
              component={Blogs}
              layout={LayoutDefault}
            />

            <AppRoute
              exact
              path="/blogs/:id"
              component={SingeBlog}
              layout={LayoutDefault}
            />

            <AppRoute
              // exact
              // path="/faqs"
              component={Error}
              layout={LayoutDefault}
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

const AppConnected = withRouter((props) => <App {...props} />);

export default connect(null, mapActionsToProps)(AppConnected);
