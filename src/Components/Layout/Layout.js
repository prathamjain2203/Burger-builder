import React, { Component } from "react";
import Aux from "../../hoc/Auxilliary/auxilliary";
import { connect } from "react-redux";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  toggleSideDrawerHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar 
        isAuth = {this.props.isAuth}
        toggleSideDrawer={this.toggleSideDrawerHandler} />
        <SideDrawer
                isAuth = {this.props.isAuth}

          open={this.state.showSideDrawer}
          closed={this.sideDrawerHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuth : state.auth.token !==null
  }
}

export default connect(mapStateToProps)(Layout);
