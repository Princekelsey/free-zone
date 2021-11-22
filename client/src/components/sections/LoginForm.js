import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import { Link } from "react-router-dom";
import SectionHeader from "./partials/SectionHeader";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { loginStart } from "../../redux/auth/authActions";
import Loading from "../elements/Loading";
import { selectLoadingState } from "../../redux/auth/authSelector";
import { createStructuredSelector } from "reselect";

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

class LoginForm extends React.Component {
  state = {
    alias: "",
    password: "",
    error: false,
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  validate = () => {
    let isError = false;
    if (!this.state.password) {
      isError = true;
    }

    if (!this.state.alias) {
      isError = true;
    }

    this.setState({ isError: true });
    return isError;
  };

  handleSignIn = (e) => {
    e.preventDefault();
    const isError = this.validate();
    const { alias, password } = this.state;
    if (!isError) {
      this.props.loginStart({ alias, password });
    }
  };

  render() {
    const {
      className,
      topOuterDivider,
      bottomOuterDivider,
      topDivider,
      bottomDivider,
      hasBgColor,
      invertColor,
      loginStart,
      isLoading,
      ...props
    } = this.props;

    const { alias, password } = this.state;

    const outerClasses = classNames(
      "signin section",
      topOuterDivider && "has-top-divider",
      bottomOuterDivider && "has-bottom-divider",
      hasBgColor && "has-bg-color",
      invertColor && "invert-color",
      className
    );

    const innerClasses = classNames(
      "signin-inner section-inner",
      topDivider && "has-top-divider",
      bottomDivider && "has-bottom-divider"
    );

    const sectionHeader = {
      title: "Welcome back",
    };

    return (
      <section {...props} className={outerClasses}>
        {isLoading && (
          <div className="center-content">
            <Loading />
          </div>
        )}
        <div className="container">
          <div className={innerClasses}>
            <SectionHeader
              tag="h1"
              data={sectionHeader}
              className="center-content"
            />
            <div className="tiles-wrap">
              <div className="tiles-item">
                <div className="tiles-item-inner">
                  <form onSubmit={this.handleSignIn}>
                    <fieldset>
                      <div className="mb-12">
                        <Input
                          type="text"
                          label="Alias"
                          placeholder="Alias"
                          labelHidden
                          required
                          name="alias"
                          value={alias}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="mb-12">
                        <Input
                          type="password"
                          label="Password"
                          placeholder="Password"
                          labelHidden
                          required
                          name="password"
                          value={password}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="mt-24 mb-32">
                        <Button color="primary" wide>
                          Sign in
                        </Button>
                      </div>
                    </fieldset>
                  </form>
                  <div className="signin-bottom has-top-divider">
                    <div className="pt-32 text-xs center-content text-color-low">
                      Don't you have an account?{" "}
                      <Link to="/signup" className="func-link">
                        Sign up
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

const mapActionsToProps = {
  loginStart,
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectLoadingState,
});

export default connect(mapStateToProps, mapActionsToProps)(LoginForm);
