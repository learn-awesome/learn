import React from "react"
import PropTypes from "prop-types"
class WhatsNewItem extends React.Component {
  render () {
    return (
      <React.Fragment>
        {this.props.message}
      </React.Fragment>
    );
  }
}

WhatsNewItem.propTypes = {
  message: PropTypes.string
};
export default WhatsNewItem
