import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  getBodyChildElements,
  makeNodeFocusable,
  makeNodeUnfocusable,
} from '../utils';

const isNotAncestorOf = child => parent => !parent.contains(child);

export class FocusedContainer extends Component {
  static defaultProps = {
    hidden: false,
    restrictScroll: false,
  };

  static propTypes = {
    hidden: PropTypes.bool,
    restrictScroll: PropTypes.bool,
  };

  ref = React.createRef();

  componentDidMount() {
    const { hidden } = this.props;
    // making sure trap focus always execute
    // after removeTrap for the case where two drops
    // are open at the same time
    setTimeout(() => {
      if (!hidden) {
        this.trapFocus();
      }
    }, 0);
  }

  componentWillUnmount() {
    this.removeTrap();
  }

  removeTrap = () => {
    const { restrictScroll } = this.props;
    const child = this.ref.current;
    getBodyChildElements()
      .filter(isNotAncestorOf(child))
      .forEach(makeNodeFocusable);
    if (restrictScroll) {
      document.body.style.overflow = this.bodyOverflowStyle;
    }
  };

  trapFocus = () => {
    const { restrictScroll } = this.props;
    const child = this.ref.current;
    getBodyChildElements()
      .filter(isNotAncestorOf(child))
      .forEach(makeNodeUnfocusable);

    if (restrictScroll) {
      this.bodyOverflowStyle = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
  };

  render() {
    const { children, hidden, ...rest } = this.props;
    delete rest.restrictScroll;
    return (
      <div ref={this.ref} aria-hidden={hidden} {...rest}>
        {children}
      </div>
    );
  }
}
