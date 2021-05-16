import React, { Component } from "react";
import Server from "../api/Server";
import ChatRoom from "../components/sections/chat/private/ChatRoom";
import { Toast } from "../utils/toast";
import Loading from "../components/elements/Loading";
import GenericSection from "../components/sections/GenericSection";

class PrivateChatPage extends Component {
  state = {
    consultant: null,
    isLoading: false,
  };
  componentDidMount() {
    this.getDetails();
    this.props.setCurrentLocation(this.props.location.pathname);
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
    return (
      <div className="private-chat">
        {this.state.consultant && (
          <ChatRoom consultant={this.state.consultant} />
        )}
        {this.state.isLoading && (
          <GenericSection>
            <div className="chatApp__room">
              <Loading />
            </div>
          </GenericSection>
        )}
      </div>
    );
  }
}

export default PrivateChatPage;
