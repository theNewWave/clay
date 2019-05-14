import React, { Component } from 'react';
import { compose } from 'recompose';

import { withTheme } from 'styled-components';

import { defaultProps } from '../../default-props';

import { Box } from '../Box';
import { Button } from '../Button';
import { Text } from '../Text';
import { withForwardRef } from '../hocs';
import { normalizeColor } from '../../utils';

import { StyledTab } from './StyledTab';

class Tab extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { active } = nextProps;
    const { over } = prevState;
    if (active && over) {
      return { over: undefined };
    }
    return null;
  }

  state = {};

  onMouseOver = event => {
    const { onMouseOver } = this.props;
    this.setState({ over: true });
    if (onMouseOver) {
      onMouseOver(event);
    }
  };

  onMouseOut = event => {
    const { onMouseOut } = this.props;
    this.setState({ over: undefined });
    if (onMouseOut) {
      onMouseOut(event);
    }
  };

  onClickTab = event => {
    const { onActivate } = this.props;
    if (event) {
      event.preventDefault();
    }
    onActivate();
  };

  render() {
    const {
      active,
      forwardRef,
      plain,
      title,
      onMouseOver,
      onMouseOut,
      theme,
      ...rest
    } = this.props;
    const { over } = this.state;

    delete rest.onActivate;

    let normalizedTitle = title;
    const tabStyles = {};

    if (!plain) {
      if (typeof title !== 'string') {
        normalizedTitle = title;
      } else if (active) {
        normalizedTitle = <Text {...theme.tab.active}>{title}</Text>;
      } else {
        normalizedTitle = (
          <Text color={over ? theme.tab.hover.color : theme.tab.color}>
            {title}
          </Text>
        );
      }

      if (theme.tab.border) {
        let borderColor =
          theme.tab.border.color || theme.global.control.border.color;
        if (active) {
          borderColor = theme.tab.border.active.color || borderColor;
        } else if (over) {
          borderColor = theme.tab.border.hover.color || borderColor;
        }
        borderColor = normalizeColor(borderColor, theme);

        tabStyles.border = {
          side: theme.tab.border.side,
          size: theme.tab.border.size,
          color: borderColor,
        };
      }

      tabStyles.background = active
        ? theme.tab.active.background || theme.tab.background
        : theme.tab.background;
      tabStyles.pad = theme.tab.pad;
      tabStyles.margin = theme.tab.margin;
    }

    return (
      <Button
        ref={forwardRef}
        plain
        role="tab"
        aria-selected={active}
        aria-expanded={active}
        {...rest}
        onClick={this.onClickTab}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onFocus={this.onMouseOver}
        onBlur={this.onMouseOut}
      >
        <StyledTab as={Box} plain={plain} {...tabStyles}>
          {normalizedTitle}
        </StyledTab>
      </Button>
    );
  }
}

Tab.defaultProps = {};
Object.setPrototypeOf(Tab.defaultProps, defaultProps);

let TabDoc;
if (process.env.NODE_ENV !== 'production') {
  TabDoc = require('./doc').doc(Tab); // eslint-disable-line global-require
}
const TabWrapper = compose(
  withTheme,
  withForwardRef,
)(TabDoc || Tab);

export { TabWrapper as Tab };
