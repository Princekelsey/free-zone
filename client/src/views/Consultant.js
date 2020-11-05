import React, { Component } from "react";
import Server from "../api/Server";
import ConsultantDetails from "../components/sections/ConsultantDetails";

class Consultant extends Component {
  state = {
    consultant: null,
  };

  componentDidMount() {
    this.getDetails();
  }

  async getDetails() {
    try {
      const response = await Server.getSingleConsultant(
        this.props.match.params.id
      );
      this.setState({ consultant: response.data.data });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { consultant } = this.state;
    return (
      <React.Fragment>
        {consultant && (
          <ConsultantDetails invertMobile imageFill consultant={consultant} />
        )}
      </React.Fragment>
    );
  }
}

export default Consultant;
