import { describe, PropTypes } from 'react-desc';

import { getAvailableAtBadge } from '../../utils';

export const doc = Grommet => {
  const DocumentedGrommet = describe(Grommet)
    .availableAt(getAvailableAtBadge('Grommet'))
    .description('The top level Grommet container.')
    .usage(
      `import { Grommet } from 'grommet';
<Grommet>...</Grommet>`,
    )
    .intrinsicElement('div');

  DocumentedGrommet.propTypes = {
    full: PropTypes.bool
      .description('Whether to take the whole viewport.')
      .defaultValue(false),
    plain: PropTypes.bool
      .description(
        'Whether or not Grommet should apply a global font-family, font-size, and line-height.',
      )
      .defaultValue(false),
    cssVars: PropTypes.bool
      .description('Whether to expose the css variables.')
      .defaultValue(false),
    theme: PropTypes.object.description(
      'Custom styles for Grommet app component.',
    ),
    userAgent: PropTypes.string.description(
      'User agent used to detect the device width for setting the initial breakpoint.',
    ),
  };

  return DocumentedGrommet;
};

export const themeDoc = {
  'grommet.extend': {
    description: 'Any additional style for Grommet.',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
  'global.font.face': {
    description: 'Custom font face declaration',
    type: 'string | (props) => {}',
    defaultValue: undefined,
  },
};
