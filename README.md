[![CircleCI](https://circleci.com/gh/ethereum/ethereum-react-components.svg?style=shield)](https://circleci.com/gh/ethereum/ethereum-react-components)

# Ethereum React Components

A library of frequently used Ethereum components.

This project leverages [material-ui](https://material-ui.com/) and is intended for use within apps that also use material-ui.

All available components can be found in the the project [storybook](https://ethereum.github.io/ethereum-react-components). The bleeding edge (`dev` branch) gets published [here](https://ethereum-react-components-dev.netlify.com/).

WARNING: this lib is not production ready. All component APIs are in exploratory phases and strict semantic versioning is not yet enforced.

## Installation

```
yarn add ethereum-react-components
```

## Usage

```
import { Identicon } from 'ethereum-react-components';

<div>
  <Identicon address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D" />
</div>
```

See the project [storybook](https://ethereum.github.io/ethereum-react-components?selectedKind=Widgets%2FIdenticon) for detailed documentation.

Note that this storybook uses the [Source Sans Pro](https://fonts.google.com/specimen/Source+Sans+Pro?selection.family=Source+Sans+Pro:300,400,600,700) font. You'll need to import and apply this font (or another font of your choosing) in your own project.

## Contributing

There are many ways to get involved with this project. Get started [here](/CONTRIBUTING.md).

## Development

### Clone & Storybook

```
git clone https://github.com/ethereum/ethereum-react-components.git
cd ethereum-react-components
yarn
yarn storybook
```

### Workflow

- Mind the [component style checklist](CHECKLIST.md).
- Use eslint in your editor or via command line: `yarn lint:watch`.
- Make [conventional commits](https://www.conventionalcommits.org/).

### Local Testing

While in development, [yarn link](https://yarnpkg.com/lang/en/docs/cli/link/) allows for testing this library on another local project without publishing to npm.

```
cd ethereum-react-components
yarn link
cd my/project/with/ethereum/components
yarn link ethereum-react-components
```
