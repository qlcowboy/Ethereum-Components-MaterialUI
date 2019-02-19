import React from 'react'
import { storiesOf } from '@storybook/react'
import { linkTo } from '@storybook/addon-links'
import Welcome from './Welcome'

import {
  Identicon,
  EthAddress,
  Spinner,
  Pulse,
  Button,
  Checkbox,
  AddressSelect,
  AddressInput,
  Input,
  TextArea,
  Select,
  FileChooser,
  WalletButton
} from '../components'
import Checkmark from '../components/Widgets/AnimatedIcons/Checkmark'
import Cross from '../components/Widgets/AnimatedIcons/Cross'

const dummyWallets = {
  '0x2685F863Ddb456601783A57A1C3E9F8f3ebc6c3B': {
    balance: '3',
    name: 'Account 1',
    addressType: 'wallet'
  },
  '0xabc5F863Ddb456601783A57A1C3E9F8f3ebc6c3B': {
    balance: '0',
    name: 'Account 2',
    addressType: 'wallet'
  },
  '0yyy5F863Ddb456601783A57A1C3E9F8f3ebc6c3B': {
    balance: '0.01',
    name: 'Account 6',
    addressType: 'wallet'
  },
  '0xwww5F863Ddb456601783A57A1C3E9F8f3ebc6c3B': {
    balance: '0.0',
    name: 'Account 7',
    addressType: 'wallet'
  }
}

const dummyContracts = {
  '0xD26B16d9Cf2054fd0B266a03A11C4CC198Eed025': {
    from: '0x672a39c474572338713d8d01024d497d364b2bed',
    status: true,
    to: null,
    'contract-name': 'Contract 1',
    address: '0xD26B16d9Cf2054fd0B266a03A11C4CC198Eed025',
    balance: '0',
    addressType: 'contract'
  },
  '0xabcB16d9Cf2054fd0B266a03A11C4CC198Eed025': {
    from: '0x672a39c474572338713d8d01024d497d364b2bed',
    balance: '2',
    'contract-name': 'Contract 2',
    addressType: 'contract'
  }
}

storiesOf('Welcome', module).add('to Ethereum Components', () => (
  <Welcome showApp={linkTo('Button')} />
))

storiesOf('Widgets/Form/AddressSelect', module)
  .add('wallets and contracts', () => (
    <AddressSelect
      wallets={dummyWallets}
      walletContracts={dummyContracts}
      onChange={() => {}}
    />
  ))
  .add('only wallets', () => (
    <AddressSelect wallets={dummyWallets} onChange={() => {}} />
  ))
  .add('only contracts', () => (
    <AddressSelect walletContracts={dummyContracts} onChange={() => {}} />
  ))
  .add('no addresses provided', () => <AddressSelect onChange={() => {}} />)

storiesOf('Widgets/Identicon', module)
  .add('default', () => <Identicon />)
  .add('anonymous', () => <Identicon anonymous />)
  .add('nano (with address)', () => (
    <Identicon
      address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"
      size="nano"
    />
  ))
  .add('tiny (with address)', () => (
    <Identicon
      address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"
      size="tiny"
    />
  ))
  .add('small (with address)', () => (
    <Identicon
      address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"
      size="small"
    />
  ))
  .add('medium (with address)', () => (
    <Identicon
      address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"
      size="medium"
    />
  ))
  .add('large (with address)', () => (
    <Identicon
      address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"
      size="large"
    />
  ))

storiesOf('Widgets/Animations/Spinner', module)
  .add('default', () => <Spinner />)
  .add('half-size', () => <Spinner scale="0.5" />)

storiesOf('Widgets/WalletButton', module).add('default', () => (
  <WalletButton onClick={() => {}}>Add Wallet Contract</WalletButton>
))

storiesOf('Widgets/Animations/Pulse', module)
  .add('default', () => <Pulse />)
  .add('filled', () => <Pulse fill />)
  .add('multiple', () => <Pulse multiple />)
  .add('multiple filled', () => <Pulse multiple fill />)
  .add('multiple filled green', () => <Pulse multiple fill color="#78c781" />)

storiesOf('Widgets/Animations/Icons', module)
  .add('checkmark', () => <Checkmark />)
  .add('cross', () => <Cross />)

storiesOf('Widgets/Button', module).add('index', () => {
  return (
    <div>
      <Button>click me</Button>
      <br />
      <br />
      <Button disabled>click me</Button>
      <br />
      <br />
      <Button secondary>click me</Button>
      <br />
      <br />
      <Button secondary disabled>
        click me
      </Button>
    </div>
  )
})

storiesOf('Widgets/Form/Input', module).add('default', () => (
  <Input label="Example Label" placeholder="Placeholder text..." />
))

storiesOf('Widgets/Form/AddressInput', module).add('index', () => {
  return (
    <div>
      <AddressInput label="address" />
      <br />
      <br />
      <AddressInput label="address" value="0x0123" />
      <br />
      <br />
      <AddressInput
        label="address"
        value="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"
      />
    </div>
  )
})

storiesOf('Widgets/Form/TextArea', module).add('index', () => (
  <TextArea label="Multiline Input" placeholder="Enter adds a line..." />
))

storiesOf('Widgets/Form/FileChooser', module).add('default', () => (
  <FileChooser />
))

storiesOf('Widgets/Form/Select', module).add('default', () => <Select />)

storiesOf('Widgets/Form/Checkbox', module)
  .add('unchecked', () => (
    <Checkbox id="example" name="example" labelText="Example" />
  ))
  .add('checked', () => (
    <Checkbox id="example" name="example" checked labelText="Example" />
  ))

storiesOf('Widgets/Eth Address', module)
  .add('default', () => (
    <EthAddress address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D" />
  ))
  .add('shortened', () => (
    <EthAddress short address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D" />
  ))
  .add('with callback', () => (
    <EthAddress
      onClick={() => alert('clicked!')}
      address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D"
    />
  ))

storiesOf('Widgets/Eth QR', module)
  .add('default', () => (
    <EthAddress address="0xF5A5d5c30BfAC14bf207b6396861aA471F9A711D" />
  ))
  .add('click -> copy to clipboard', () => <span>placeholder</span>)
