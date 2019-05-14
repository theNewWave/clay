import styled, { css, keyframes } from 'styled-components';

import { defaultProps } from '../../default-props';

import {
  backgroundStyle,
  breakpointStyle,
  edgeStyle,
  genericStyles,
  normalizeColor,
  overflowStyle,
} from '../../utils';

const ALIGN_MAP = {
  baseline: 'baseline',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch',
};

const alignStyle = css`
  align-items: ${props => ALIGN_MAP[props.align]};
`;

const ALIGN_CONTENT_MAP = {
  around: 'around',
  between: 'between',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  stretch: 'stretch',
};

const alignContentStyle = css`
  align-content: ${props => ALIGN_CONTENT_MAP[props.alignContent]};
`;

const BASIS_MAP = {
  auto: 'auto',
  full: '100%',
  '1/2': '50%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/3': '33.33%',
  '2/3': '66.66%',
};

const basisStyle = css`
  flex-basis: ${props =>
    BASIS_MAP[props.basis] ||
    props.theme.global.size[props.basis] ||
    props.basis};
`;

// min-width and min-height needed because of this
// https://stackoverflow.com/questions/36247140/why-doesnt-flex-item-shrink-past-content-size
// we assume we are in the context of a Box going the other direction
// TODO: revisit this
const directionStyle = (direction, theme) => {
  const styles = [
    css`
      min-width: 0;
      min-height: 0;
      flex-direction: ${direction === 'row-responsive' ? 'row' : direction};
    `,
  ];
  if (direction === 'row-responsive' && theme.box.responsiveBreakpoint) {
    const breakpoint = theme.global.breakpoints[theme.box.responsiveBreakpoint];
    if (breakpoint) {
      styles.push(
        breakpointStyle(
          breakpoint,
          `
        flex-direction: column;
        flex-basis: auto;
        justify-content: flex-start;
        align-items: stretch;
      `,
        ),
      );
    }
  }
  return styles;
};

const elevationStyle = css`
  box-shadow: ${props =>
    props.theme.global.elevation[
      (props.theme.dark && !props.theme.darkChanged) ||
      (!props.theme.dark && props.theme.darkChanged)
        ? 'dark'
        : 'light'
    ][props.elevationProp]};
`;

const FLEX_MAP = {
  [true]: '1 1',
  [false]: '0 0',
  grow: '1 0',
  shrink: '0 1',
};

const flexGrowShrinkProp = flex => {
  if (typeof flex === 'boolean' || typeof flex === 'string') {
    return FLEX_MAP[flex];
  }

  return `${flex.grow ? flex.grow : 0} ${flex.shrink ? flex.shrink : 0}`;
};

const flexStyle = css`
  flex: ${props =>
    `${flexGrowShrinkProp(props.flex)}${
      props.flex !== true && !props.basis ? ' auto' : ''
    }`};
`;

const fillStyle = fillProp => {
  if (fillProp === 'horizontal') {
    return 'width: 100%;';
  }
  if (fillProp === 'vertical') {
    return 'height: 100%;';
  }
  if (fillProp) {
    return `
      width: 100%;
      height: 100%;
    `;
  }
  return undefined;
};

const JUSTIFY_MAP = {
  around: 'space-around',
  between: 'space-between',
  center: 'center',
  end: 'flex-end',
  evenly: 'space-evenly',
  start: 'flex-start',
};

const justifyStyle = css`
  justify-content: ${props => JUSTIFY_MAP[props.justify]};
`;

const WRAP_MAP = {
  true: 'wrap',
  reverse: 'wrap-reverse',
};

const wrapStyle = css`
  flex-wrap: ${props => WRAP_MAP[props.wrapProp]};
`;

const borderStyle = (data, responsive, theme) => {
  const styles = [];
  const color = normalizeColor(data.color || 'border', theme);
  const borderSize = data.size || 'xsmall';
  const style = data.style || 'solid';
  const side = typeof data === 'string' ? data : data.side || 'all';
  const value = `${style} ${theme.global.borderSize[borderSize] ||
    borderSize} ${color}`;
  const breakpoint =
    theme.box.responsiveBreakpoint &&
    theme.global.breakpoints[theme.box.responsiveBreakpoint];
  const responsiveValue =
    breakpoint &&
    (breakpoint.borderSize[borderSize] || borderSize) &&
    `${style} ${breakpoint.borderSize[borderSize] || borderSize} ${color}`;
  if (
    side === 'top' ||
    side === 'bottom' ||
    side === 'left' ||
    side === 'right'
  ) {
    styles.push(css`border-${side}: ${value};`);
    if (responsiveValue) {
      styles.push(
        breakpointStyle(
          breakpoint,
          `
        border-${side}: ${responsiveValue};
      `,
        ),
      );
    }
  } else if (side === 'vertical') {
    styles.push(css`
      border-left: ${value};
      border-right: ${value};
    `);
    if (responsiveValue) {
      styles.push(
        breakpointStyle(
          breakpoint,
          `
        border-left: ${responsiveValue};
        border-right: ${responsiveValue};
      `,
        ),
      );
    }
  } else if (side === 'horizontal') {
    styles.push(css`
      border-top: ${value};
      border-bottom: ${value};
    `);
    if (responsiveValue) {
      styles.push(
        breakpointStyle(
          breakpoint,
          `
        border-top: ${responsiveValue};
        border-bottom: ${responsiveValue};
      `,
        ),
      );
    }
  } else {
    styles.push(
      css`
        border: ${value};
      `,
    );
    if (responsiveValue) {
      styles.push(breakpointStyle(breakpoint, `border: ${responsiveValue};`));
    }
  }
  return styles;
};

const ROUND_MAP = {
  full: '100%',
};

const roundStyle = (data, responsive, theme) => {
  const breakpoint =
    theme.box.responsiveBreakpoint &&
    theme.global.breakpoints[theme.box.responsiveBreakpoint];
  const styles = [];
  if (typeof data === 'object') {
    const size =
      ROUND_MAP[data.size] ||
      theme.global.edgeSize[data.size || 'medium'] ||
      data.size;
    const responsiveSize =
      breakpoint &&
      breakpoint.edgeSize[data.size] &&
      (breakpoint.edgeSize[data.size] || data.size);
    if (data.corner === 'top') {
      styles.push(css`
        border-top-left-radius: ${size};
        border-top-right-radius: ${size};
      `);
      if (responsiveSize) {
        styles.push(
          breakpointStyle(
            breakpoint,
            `
          border-top-left-radius: ${responsiveSize};
          border-top-right-radius: ${responsiveSize};
        `,
          ),
        );
      }
    } else if (data.corner === 'bottom') {
      styles.push(css`
        border-bottom-left-radius: ${size};
        border-bottom-right-radius: ${size};
      `);
      if (responsiveSize) {
        styles.push(
          breakpointStyle(
            breakpoint,
            `
          border-bottom-left-radius: ${responsiveSize};
          border-bottom-right-radius: ${responsiveSize};
        `,
          ),
        );
      }
    } else if (data.corner === 'left') {
      styles.push(css`
        border-top-left-radius: ${size};
        border-bottom-left-radius: ${size};
      `);
      if (responsiveSize) {
        styles.push(
          breakpointStyle(
            breakpoint,
            `
          border-top-left-radius: ${responsiveSize};
          border-bottom-left-radius: ${responsiveSize};
        `,
          ),
        );
      }
    } else if (data.corner === 'right') {
      styles.push(css`
        border-top-right-radius: ${size};
        border-bottom-right-radius: ${size};
      `);
      if (responsiveSize) {
        styles.push(
          breakpointStyle(
            breakpoint,
            `
          border-top-right-radius: ${responsiveSize};
          border-bottom-right-radius: ${responsiveSize};
        `,
          ),
        );
      }
    } else if (data.corner) {
      styles.push(css`
        border-${data.corner}-radius: ${size};
      `);
      if (responsiveSize) {
        styles.push(
          breakpointStyle(
            breakpoint,
            `
          border-${data.corner}-radius: ${responsiveSize};
        `,
          ),
        );
      }
    } else {
      styles.push(css`
        border-radius: ${size};
      `);
      if (responsiveSize) {
        styles.push(
          breakpointStyle(
            breakpoint,
            `
          border-radius: ${responsiveSize};
        `,
          ),
        );
      }
    }
  } else {
    const size = data === true ? 'medium' : data;
    styles.push(css`
      border-radius: ${ROUND_MAP[size] || theme.global.edgeSize[size] || size};
    `);
    const responsiveSize = breakpoint && breakpoint.edgeSize[size];
    if (responsiveSize) {
      styles.push(
        breakpointStyle(
          breakpoint,
          `
        border-radius: ${responsiveSize};
      `,
        ),
      );
    }
  }
  return styles;
};

const SLIDE_SIZES = {
  xsmall: 1,
  small: 5,
  medium: 10,
  large: 50,
  xlarge: 200,
};

const PULSE_SIZES = {
  xsmall: 1.001,
  small: 1.01,
  medium: 1.1,
  large: 1.5,
  xlarge: 2,
};

const JIGGLE_SIZES = {
  xsmall: 0.1,
  small: 1,
  medium: 5,
  large: 400,
  xlarge: 1000,
};

const ZOOM_SIZES = {
  xsmall: 0.001,
  small: 0.01,
  medium: 0.05,
  large: 0.1,
  xlarge: 0.5,
};

const animationBounds = (type, size = 'medium') => {
  if (type === 'fadeIn') {
    return ['opacity: 0;', 'opacity: 1;'];
  }
  if (type === 'fadeOut') {
    return ['opacity: 1;', 'opacity: 0;'];
  }
  if (type === 'jiggle') {
    const deg = JIGGLE_SIZES[size];
    return [`transform: rotate(-${deg}deg);`, `transform: rotate(${deg}deg);`];
  }
  if (type === 'pulse') {
    return ['transform: scale(1);', `transform: scale(${PULSE_SIZES[size]})`];
  }
  if (type === 'flipIn') {
    return ['transform: rotateY(90deg);', 'transform: rotateY(0);'];
  }
  if (type === 'flipOut') {
    return ['transform: rotateY(0);', 'transform: rotateY(90deg);'];
  }
  if (type === 'slideDown') {
    return [
      `transform: translateY(-${SLIDE_SIZES[size]}%);`,
      'transform: none;',
    ];
  }
  if (type === 'slideLeft') {
    return [
      `transform: translateX(${SLIDE_SIZES[size]}%);`,
      'transform: none;',
    ];
  }
  if (type === 'slideRight') {
    return [
      `transform: translateX(-${SLIDE_SIZES[size]}%);`,
      'transform: none;',
    ];
  }
  if (type === 'slideUp') {
    return [
      `transform: translateY(${SLIDE_SIZES[size]}%);`,
      'transform: none;',
    ];
  }
  if (type === 'zoomIn') {
    return [`transform: scale(${1 - ZOOM_SIZES[size]});`, 'transform: none;'];
  }
  if (type === 'zoomOut') {
    return [`transform: scale(${1 + ZOOM_SIZES[size]});`, 'transform: none;'];
  }
  return [];
};

const normalizeTiming = (time, defaultTiming) =>
  time ? `${time / 1000.0}s` : defaultTiming;

const animationEnding = type => {
  if (type === 'jiggle') {
    return 'alternate infinite';
  }
  if (type === 'pulse') {
    return 'alternate infinite';
  }
  return 'forwards';
};

const animationObjectStyle = (animation, theme) => {
  const bounds = animationBounds(animation.type, animation.size);
  if (bounds) {
    const animationTransition = css`
      from {
        ${bounds[0]};
      }
      to {
        ${bounds[1]};
      }
    `;
    return css`${keyframes`${animationTransition}`}
    ${normalizeTiming(
      animation.duration,
      (theme.global.animation[animation.type]
        ? theme.global.animation[animation.type].duration
        : undefined) || theme.global.animation.duration,
    )}
    ${normalizeTiming(animation.delay, '0s')}
    ${animationEnding(animation.type)}`;
  }
  return '';
};

const animationItemStyle = (item, theme) => {
  if (typeof item === 'string') {
    return animationObjectStyle({ type: item }, theme);
  }
  if (Array.isArray(item)) {
    return item.reduce(
      (style, a, index) =>
        css`${style}${index > 0 ? ',' : ''} ${animationItemStyle(a, theme)}`,
      '',
    );
  }
  if (typeof item === 'object') {
    return animationObjectStyle(item, theme);
  }
  return '';
};

const animationAncilaries = animation => {
  if (animation.type === 'flipIn' || animation.type === 'flipOut') {
    return 'perspective: 1000px; transform-style: preserve-3d;';
  }
  return '';
};

const animationObjectInitialStyle = animation => {
  const bounds = animationBounds(animation.type, animation.size);
  if (bounds) {
    return `${bounds[0]} ${animationAncilaries(animation)}`;
  }
  return '';
};

const animationInitialStyle = item => {
  if (typeof item === 'string') {
    return animationObjectInitialStyle({ type: item });
  }
  if (Array.isArray(item)) {
    return item
      .map(a =>
        typeof a === 'string'
          ? animationObjectInitialStyle({ type: a })
          : animationObjectInitialStyle(a),
      )
      .join('');
  }
  if (typeof item === 'object') {
    return animationObjectInitialStyle(item);
  }
  return '';
};

const animationStyle = css`
  ${props => css`
    ${animationInitialStyle(props.animation)}
    animation: ${animationItemStyle(props.animation, props.theme)};
  `};
`;

// NOTE: basis must be after flex! Otherwise, flex overrides basis
const StyledBox = styled.div`
  display: flex;
  box-sizing: border-box;
  outline: none;
  ${props => !props.basis && 'max-width: 100%;'};

  ${genericStyles}
  ${props =>
    props.heightProp &&
    `height: ${props.theme.global.size[props.heightProp] || props.heightProp};`}
  ${props =>
    props.widthProp &&
    `width: ${props.theme.global.size[props.widthProp] || props.widthProp};`}
  ${props => props.align && alignStyle}
  ${props => props.alignContent && alignContentStyle}
  ${props => props.background && backgroundStyle(props.background, props.theme)}
  ${props =>
    props.border && borderStyle(props.border, props.responsive, props.theme)}
  ${props =>
    props.directionProp && directionStyle(props.directionProp, props.theme)}
  ${props => props.flex !== undefined && flexStyle}
  ${props => props.basis && basisStyle}
  ${props => props.fillProp && fillStyle(props.fillProp)}
  ${props => props.justify && justifyStyle}
  ${props =>
    props.pad &&
    edgeStyle(
      'padding',
      props.pad,
      props.responsive,
      props.theme.box.responsiveBreakpoint,
      props.theme,
    )}
  ${props =>
    props.round && roundStyle(props.round, props.responsive, props.theme)}
  ${props => props.wrapProp && wrapStyle}
  ${props => props.overflowProp && overflowStyle(props.overflowProp)}
  ${props => props.elevationProp && elevationStyle}
  ${props => props.animation && animationStyle}
  ${props => props.theme.box && props.theme.box.extend}
`;

const gapStyle = (directionProp, gap, responsive, theme) => {
  const breakpoint =
    theme.box.responsiveBreakpoint &&
    theme.global.breakpoints[theme.box.responsiveBreakpoint];
  const responsiveSize =
    breakpoint && breakpoint.edgeSize[gap] && breakpoint.edgeSize[gap];
  const styles = [];
  if (directionProp === 'column') {
    styles.push(
      css`
        height: ${theme.global.edgeSize[gap] || gap};
      `,
    );
    if (responsiveSize) {
      styles.push(breakpointStyle(breakpoint, `height: ${responsiveSize};`));
    }
  } else {
    styles.push(`width: ${theme.global.edgeSize[gap] || gap};`);
    if (responsive && directionProp === 'row-responsive') {
      styles.push(
        breakpointStyle(
          breakpoint,
          `
        width: auto;
        height: ${responsiveSize};
      `,
        ),
      );
    }
  }
  return styles;
};

StyledBox.defaultProps = {};
Object.setPrototypeOf(StyledBox.defaultProps, defaultProps);

const StyledBoxGap = styled.div`
  flex: 0 0 auto;
  ${props =>
    props.gap &&
    gapStyle(props.directionProp, props.gap, props.responsive, props.theme)};
`;

StyledBoxGap.defaultProps = {};
Object.setPrototypeOf(StyledBoxGap.defaultProps, defaultProps);

export { StyledBox, StyledBoxGap };
