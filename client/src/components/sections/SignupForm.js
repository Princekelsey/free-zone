import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { SectionProps } from "../../utils/SectionProps";
import { Link } from "react-router-dom";
import SectionHeader from "./partials/SectionHeader";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { signUpUserStart } from "../../redux/auth/authActions";
import { MySwal } from "../../utils/toast";
import { selectLoadingState } from "../../redux/auth/authSelector";
import { createStructuredSelector } from "reselect";
import Loading from "../elements/Loading";

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

class SignupForm extends React.Component {
  state = {
    alias: "",
    password: "",
    confirmPassword: "",
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

    if (!this.state.confirmPassword) {
      isError = true;
    }

    this.setState({ isError: true });
    return isError;
  };

  handleSignUp = (e) => {
    e.preventDefault();
    const isError = this.validate();
    const { alias, password, confirmPassword } = this.state;
    if (!isError) {
      if (password !== confirmPassword) {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password and confrim password must match",
        });
        return;
      }
      this.props.signUpStart({ alias, password });
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
      signUpStart,
      isLoading,
      ...props
    } = this.props;

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
      title: "Welcome. Register with a unique alias.",
    };

    const { alias, password, confirmPassword } = this.state;

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
                  <form onSubmit={this.handleSignUp}>
                    <fieldset>
                      <div className="mb-12">
                        <Input
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
                      <div className="mb-12">
                        <Input
                          type="password"
                          label="Confirm Password"
                          placeholder="Confirm Password"
                          labelHidden
                          required
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="mt-24 mb-32">
                        <Button color="primary" wide>
                          Sign up
                        </Button>
                      </div>
                    </fieldset>
                  </form>
                  <div className="signin-bottom has-top-divider">
                    <div className="pt-32 text-xs center-content text-color-low">
                      Already have an account?{" "}
                      <Link to="/login" className="func-link">
                        Login
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

SignupForm.propTypes = propTypes;
SignupForm.defaultProps = defaultProps;

const mapActionsToProps = {
  signUpStart: signUpUserStart,
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectLoadingState,
});

export default connect(mapStateToProps, mapActionsToProps)(SignupForm);
