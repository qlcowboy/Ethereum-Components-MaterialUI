import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ethUtils from 'ethereumjs-util'
import styled from 'styled-components'
import i18n from '../../../i18n'
import { Identicon } from '../..'
import * as util from '../../../lib/util'

import DeployContract from './TxDescription/DeployContract'
import TokenTransfer from './TxDescription/TokenTransfer'
import FunctionExecution from './TxDescription/FunctionExecution'
import SendEther from './TxDescription/SendEther'

import { Button } from '../../..'

const { BN } = ethUtils

export default class TxDescription extends Component {
  static propTypes = {
    network: PropTypes.oneOf(['main', 'ropsten', 'rinkeby', 'kovan']),
    value: PropTypes.string,
    etherPriceUSD: PropTypes.string,
    isNewContract: PropTypes.bool,
    toIsContract: PropTypes.bool,
    executionFunction: PropTypes.bool,
    gasError: PropTypes.func,
    token: PropTypes.object,
    params: PropTypes.array,
    data: PropTypes.object,
    gasPrice: PropTypes.string,
    estimatedGas: PropTypes.string
  }

  static defaultProps = {}

  state = {
    showDetails: false
  }

  handleDetailsClick = () => {
    const { showDetails } = this.state
    this.setState({ showDetails: !showDetails })
  }

  txType = () => {
    const { isNewContract, toIsContract, executionFunction } = this.props

    if (isNewContract) {
      return 'newContract'
    }
    if (toIsContract) {
      if (executionFunction === 'transfer(address,uint256)') {
        return 'tokenTransfer'
      }

      return 'genericFunctionExecution'
    }

    return 'etherTransfer'
  }

  renderDescription = () => {
    const {
      etherPriceUSD,
      executionFunction,
      data,
      params,
      network,
      token,
      value
    } = this.props

    switch (this.txType()) {
      case 'newContract':
        return <DeployContract data={data} />
      case 'tokenTransfer':
        return <TokenTransfer params={params} token={token} />
      case 'genericFunctionExecution':
        return <FunctionExecution executionFunction={executionFunction} />
      default:
        return (
          <SendEther
            network={network}
            value={util.weiToEther(value)}
            valueInUSD={util.toUsd(util.weiToEther(value), etherPriceUSD)}
          />
        )
    }
  }

  parseTokenDisplayName = () => {
    const { executionFunction, token } = this.props

    const isTokenTransfer = executionFunction === 'transfer(address,uint256)'

    if (!isTokenTransfer) {
      return null
    }

    if (token.name && token.name !== token.symbol) {
      return `${token.name} (${token.symbol})`
    }

    if (token.name) {
      return token.name
    }

    if (token.symbol) {
      return token.symbol
    }

    return 'tokens'
  }

  renderMoreDetails() {
    const {
      estimatedGas,
      executionFunction,
      gasError,
      gasPrice,
      isNewContract,
      params,
      token,
      value
    } = this.props
    const { showDetails } = this.state

    const isTokenTransfer = executionFunction === 'transfer(address,uint256)'

    const showTxExecutingFunction =
      executionFunction && !isNewContract && !isTokenTransfer

    const tokenDisplayName = this.parseTokenDisplayName()

    if (!showDetails) {
      return (
        <StyledButton flat secondary onClick={this.handleDetailsClick}>
          {i18n.t('mist.sendTx.showDetails')}
        </StyledButton>
      )
    }

    const paramsRows = params.map(param => {
      return (
        <StyledExecutionContextParam key={Math.random()}>
          <StyledExecutionContextParamValue>
            <StyledExecutionContextParamUnicode>
              {'\u2192'}
            </StyledExecutionContextParamUnicode>
            {param.type === 'address' ? (
              <StyledExecutionContextParamIdenticon>
                <Identicon address={param.value} size="small" />
              </StyledExecutionContextParamIdenticon>
            ) : null}
            {param.value}
          </StyledExecutionContextParamValue>
          <StyledExeuctionContextParamType>
            {param.type}
          </StyledExeuctionContextParamType>
        </StyledExecutionContextParam>
      )
    })

    const gasPriceGwei = new BN(gasPrice).div(new BN('1000000000'))

    return (
      <StyledExecutionContextDetails>
        {gasError && (
          <StyledExecutionContextRow>
            <StyledExecutionContextTitle>
              {i18n.t('mist.sendTx.errorMessage')}
            </StyledExecutionContextTitle>
            <StyledExecutionContextDetailsValue>
              {gasError}
            </StyledExecutionContextDetailsValue>
          </StyledExecutionContextRow>
        )}

        {showTxExecutingFunction && (
          <StyledExecutionContextRow>
            <StyledExecutionContextDetailsTitle>
              {i18n.t('mist.sendTx.transactionExecutingFunction')}
            </StyledExecutionContextDetailsTitle>
            <StyledExecutionContextExecutionFunction>
              {executionFunction.slice(0, executionFunction.indexOf('('))}
            </StyledExecutionContextExecutionFunction>
          </StyledExecutionContextRow>
        )}

        <StyledExecutionContextRow>
          <StyledExecutionContextTitle>
            {i18n.t('mist.sendTx.etherAmount')}
          </StyledExecutionContextTitle>
          <StyledExecutionContextDetailsValue>
            {util.weiToEther(value).toString()}
          </StyledExecutionContextDetailsValue>
        </StyledExecutionContextRow>

        <StyledExecutionContextRow>
          <StyledExecutionContextTitle>
            {i18n.t('mist.sendTx.gasPrice')}
          </StyledExecutionContextTitle>
          <StyledExecutionContextDetailsValue>{`${gasPriceGwei} gwei`}</StyledExecutionContextDetailsValue>
        </StyledExecutionContextRow>

        <StyledExecutionContextRow>
          <StyledExecutionContextTitle>
            {i18n.t('mist.sendTx.gasEstimate')}
          </StyledExecutionContextTitle>
          <StyledExecutionContextDetailsValue>
            {`${new BN(estimatedGas).toString()} gas`}
          </StyledExecutionContextDetailsValue>
        </StyledExecutionContextRow>

        {isTokenTransfer && (
          <div>
            {tokenDisplayName && tokenDisplayName !== 'tokens' && (
              <StyledExecutionContextRow>
                <StyledExecutionContextTitle>
                  {i18n.t('mist.sendTx.tokenName')}
                </StyledExecutionContextTitle>
                <StyledExecutionContextDetailsValue>
                  {tokenDisplayName}
                </StyledExecutionContextDetailsValue>
              </StyledExecutionContextRow>
            )}
            {token && token.address && (
              <StyledExecutionContextRow>
                <StyledExecutionContextTitle>
                  {i18n.t('mist.sendTx.tokenAddress')}
                </StyledExecutionContextTitle>
                <StyledExecutionContextParamIdenticon>
                  <Identicon address={token.address} size="small" />
                </StyledExecutionContextParamIdenticon>
                <StyledExecutionContextDetailsValue>
                  {token.address}
                </StyledExecutionContextDetailsValue>
              </StyledExecutionContextRow>
            )}
          </div>
        )}

        {params.length > 0 && (
          <div>
            <StyledExecutionContextParamsTitle>
              {i18n.t('mist.sendTx.parameters')}
            </StyledExecutionContextParamsTitle>
            <StyledExecutionContextParamsTable>
              {paramsRows}
            </StyledExecutionContextParamsTable>
          </div>
        )}

        <StyledButton flat secondary onClick={this.handleDetailsClick}>
          {i18n.t('mist.sendTx.hideDetails')}
        </StyledButton>
      </StyledExecutionContextDetails>
    )
  }

  render() {
    const { gasError } = this.props

    return (
      <StyledExecutionContext>
        <StyledContextDescription>
          {this.renderDescription()}
          {!!gasError && (
            <div className="context-description__error">
              Warning: this transaction is likely going to fail and burn your
              fees.
            </div>
          )}
        </StyledContextDescription>
        {this.renderMoreDetails()}
      </StyledExecutionContext>
    )
  }
}

const StyledExecutionContext = styled.div``

const StyledExecutionContextRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`

const StyledExecutionContextDetails = styled.div`
  margin: 18px 0 0;
  font-size: 14px;
  text-align: left;
  -webkit-app-region: drag;
`

const StyledExecutionContextTitle = styled.span`
  width: 100px;
`

const StyledExecutionContextParamsTitle = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 6px;
`

const StyledExecutionContextParamsTable = styled.div``

const StyledButton = styled(Button)`
  margin-left: -20px;
`

const StyledContextDescription = styled.div``

const StyledExecutionContextDetailsTitle = styled.span`
  margin-right: 5px;
`

const StyledExecutionContextDetailsValue = styled.span`
  display: flex;
  align-items: center;
  font-weight: bold;
`

const StyledExecutionContextParam = styled.span`
  user-select: all;
  display: flex;
  justify-content: space-between;
  height: 36px;
`

const StyledExecutionContextParamUnicode = styled.span`
  font-size: 24px;
  margin-right: 12px;
`

const StyledExecutionContextParamIdenticon = styled.span`
  display: flex;
  align-items: center;
  margin-right: 6px;
  vertical-align: middle;
  display: inline-block;
`

const StyledExecutionContextExecutionFunction = styled.span`
  font-weight: 500;
`

const StyledExeuctionContextParamType = styled.span`
  display: flex;
  align-items: center;
`

const StyledExecutionContextParamValue = styled.span``
