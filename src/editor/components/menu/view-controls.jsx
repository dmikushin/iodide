import React from "react";
import { connect } from "react-redux";
import styled from "@emotion/styled";

import HelpOutline from "@material-ui/icons/HelpOutline";

import ViewModeToggleButton from "./view-mode-toggle-button";
import NotebookTaskButton from "./notebook-task-button";
import KernelState from "./kernel-state";
import { login, logout } from "../../actions/server-session-actions";
import { connectionModeIsServer } from "../../tools/server-tools";

// FIXME there is NO REASON to use "tasks" here.
// we should use map dispatch to props and regular actions like
// we do in every other component
import tasks from "../../user-tasks/task-definitions";

const ViewControlsContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: end;
`;

export class ViewControlsUnconnected extends React.Component {
  render() {
    return (
      <ViewControlsContainer>
        <KernelState />
        <NotebookTaskButton task={tasks.toggleHelpModal}>
          <HelpOutline />
        </NotebookTaskButton>

        <ViewModeToggleButton />
      </ViewControlsContainer>
    );
  }
}

export function mapStateToProps(state) {
  const isAuthenticated = Boolean(state.userData.name);
  return {
    isAuthenticated,
    name: state.userData.name,
    avatar: state.userData.avatar,
    isServer: connectionModeIsServer(state)
  };
}

const mapDispatchToProps = {
  login,
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewControlsUnconnected);
