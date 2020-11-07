import React, { Component } from "react";
import Server from "../api/Server";
import Loading from "../components/elements/Loading";
import ConsultantDetails from "../components/sections/ConsultantDetails";
import GenericSection from "../components/sections/GenericSection";
import { Toast } from "../utils/toast";

class Consultant extends Component {
  state = {
    consultant: null,
    isLoading: false,
  };

  componentDidMount() {
    this.getDetails();
  }

  async getDetails() {
    this.setState({ isLoading: true });
    try {
      const response = await Server.getSingleConsultant(
        this.props.match.params.id
      );
      this.setState({ consultant: response.data.data, isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false });
      const {
        response: { data },
      } = error;
      if (data) {
        Toast.fire({
          type: "error",
          title: data.error,
          icon: "error",
        });
      } else {
        Toast.fire({
          type: "error",
          title: "Error getting consultant details. Please try again",
          icon: "error",
        });
      }
    }
  }

  render() {
    const { consultant, isLoading } = this.state;
    return (
      <React.Fragment>
        {consultant && (
          <ConsultantDetails invertMobile imageFill consultant={consultant} />
        )}
        {isLoading && (
          <GenericSection>
            <div className="center-content">
              <Loading />
            </div>
          </GenericSection>
        )}
      </React.Fragment>
    );
  }
}

export default Consultant;
