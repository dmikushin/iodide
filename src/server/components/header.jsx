import React from "react";
import PropTypes from "prop-types";
import HeaderContainer from "../../shared/components/header/header";

import HeaderMessageContainer from "../../shared/components/header/header-message-container";
import IodideLogo from "../../shared/components/iodide-logo";
import LeftContainer from "../../shared/components/header/left-container";
import RightContainer from "../../shared/components/header/right-container";

export default class Header extends React.Component {
  static propTypes = {
    userInfo: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string
    }),
    headerMessage: PropTypes.string
  };
  render() {
    return (
      <React.Fragment>
        <HeaderContainer>
          <LeftContainer>
            <IodideLogo target="_self" backLink="/" />
          </LeftContainer>
          <RightContainer />
        </HeaderContainer>
        {this.props.headerMessage && (
          <HeaderMessageContainer
            dangerouslySetInnerHTML={{ __html: this.props.headerMessage }}
          />
        )}
      </React.Fragment>
    );
  }
}
