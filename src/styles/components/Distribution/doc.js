import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

export const doc = Distribution => {
  const DocumentedDistribution = describe(Distribution)
    .availableAt(getAvailableAtBadge('Distribution'))
    .description(
      `Proportionally sized grid of boxes. The proportions are approximate. The
      area given to each box isn't mathematically precise according to the
      ratio to the total values. Instead, the boxes are laid out in a
      manner that makes them more visually easy to scan. For example,
      two values of 48 and 52 will actually each get 50% of the area.`,
    )
    .usage("import { Distribution } from 'grommet';\n<Distribution />")
    .intrinsicElement('div');

  DocumentedDistribution.propTypes = {
    ...genericProps,
    children: PropTypes.func.description(
      'Function that will be called when each value is rendered.',
    ),
    fill: PropTypes.bool
      .description(
        'Whether the distribution expands to fill all of the available width and height.',
      )
      .defaultValue(false),
    gap: PropTypes.oneOfType([
      PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
      PropTypes.string,
    ])
      .description('The amount of spacing between child elements.')
      .defaultValue('xsmall'),
    values: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number.isRequired,
      }),
    ).description(
      `Array of objects containing a value. The array should already be
      sorted from largest to smallest value. The caller can put other
      properties in the object. The children function will be called to
      render the contents of each value.`,
    ).isRequired,
  };

  return DocumentedDistribution;
};
