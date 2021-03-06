import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Logo from "./partials/Logo";
import { selectCurrentUser } from "../../redux/auth/authSelector";
import { FiUser, FiChevronDown } from "react-icons/fi";
import { MySwal } from "../../utils/toast";
import { logoutUser } from "../../redux/auth/authActions";

const links = [
  { title: "Arena", target: "/arena" },
  { title: "Doctors/Counsellors", target: "/doctors-counselors" },
  { title: "Blog", target: "/blogs" },
  { title: "Shop", target: "/shop" },
];

const propTypes = {
  active: PropTypes.bool,
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool,
};

const defaultProps = {
  active: false,
  navPosition: "",
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false,
};

class Header extends React.Component {
  state = {
    isActive: false,
  };

  nav = React.createRef();
  hamburger = React.createRef();

  componentDidMount() {
    this.props.active && this.openMenu();
    document.addEventListener("keydown", this.keyPress);
    document.addEventListener("click", this.clickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyPress);
    document.addEventListener("click", this.clickOutside);
    this.closeMenu();
  }

  openModal = () => {
    const { currentUser, logoutUser, history } = this.props;
    MySwal.fire({
      title: `Hey!! ${currentUser ? currentUser.alias.toUpperCase() : ""}`,
      text: "Do you want to logout ?",
      confirmButtonColor: "#2174EA",
      confirmButtonText: "Yes Logout",
      showCloseButton: true,
    }).then((result) => {
      if (result.value) {
        logoutUser();
        history.push("/");
      }
    });
  };

  openMenu = () => {
    document.body.classList.add("off-nav-is-active");
    this.nav.current.style.maxHeight = this.nav.current.scrollHeight + "px";
    this.setState({ isActive: true });
  };

  closeMenu = () => {
    document.body.classList.remove("off-nav-is-active");
    this.nav.current && (this.nav.current.style.maxHeight = null);
    this.setState({ isActive: false });
  };

  keyPress = (e) => {
    this.state.isActive && e.keyCode === 27 && this.closeMenu();
  };

  clickOutside = (e) => {
    if (!this.nav.current) return;
    if (
      !this.state.isActive ||
      this.nav.current.contains(e.target) ||
      e.target === this.hamburger.current
    )
      return;
    this.closeMenu();
  };

  render() {
    const {
      className,
      active,
      navPosition,
      hideNav,
      hideSignin,
      bottomOuterDivider,
      bottomDivider,
      currentUser,
      history,
      logoutUser,
      ...props
    } = this.props;

    const classes = classNames(
      "site-header",
      bottomOuterDivider && "has-bottom-divider",
      className
    );

    return (
      <header {...props} className={classes}>
        <div className="container">
          <div
            className={classNames(
              "site-header-inner",
              bottomDivider && "has-bottom-divider"
            )}
          >
            <Logo />
            {!hideNav && (
              <React.Fragment>
                <button
                  ref={this.hamburger}
                  className="header-nav-toggle"
                  onClick={this.state.isActive ? this.closeMenu : this.openMenu}
                >
                  <span className="screen-reader">Menu</span>
                  <span className="hamburger">
                    <span className="hamburger-inner"></span>
                  </span>
                </button>
                <nav
                  ref={this.nav}
                  className={classNames(
                    "header-nav",
                    this.state.isActive && "is-active"
                  )}
                >
                  <div className="header-nav-inner">
                    <ul
                      className={classNames(
                        "list-reset text-xs",
                        navPosition && `header-nav-${navPosition}`
                      )}
                    >
                      {links.map((link, index) => (
                        <li key={index}>
                          <Link to={link.target} onClick={this.closeMenu}>
                            {link.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {!hideSignin && currentUser ? (
                      <ul
                        className="list-reset header-nav-right"
                        style={{ cursor: "pointer" }}
                        onClick={this.openModal}
                      >
                        <li>
                          <FiUser className="mr-8 text-color-primary" />
                        </li>
                        <li
                          className="tt-c fw-600"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          {currentUser.alias} <FiChevronDown />
                        </li>
                      </ul>
                    ) : (
                      <ul className="list-reset header-nav-right">
                        <li>
                          <Link
                            to="/login"
                            className="button button-primary button-wide-mobile button-sm"
                            onClick={this.closeMenu}
                          >
                            Login
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                </nav>
              </React.Fragment>
            )}
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapActionsToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Header);
