import { ChainId, CurrencyAmount, JSBI, Token, TokenAmount, Pair } from '@uniswap/sdk'
import { useMemo } from 'react'
import {
  UNI,
  LIQD,

  USDC,
  FTM,
  FUSDT,
  wETH,
  DAI
} from '../../constants'
import { STAKING_REWARDS_INTERFACE, VAULT_INTERFACE } from '../../constants/abis/staking-rewards'
import { useActiveWeb3React } from '../../hooks'
import { NEVER_RELOAD, useMultipleContractSingleData } from '../multicall/hooks'
import { tryParseAmount } from '../swap/hooks'

export const STAKING_GENESIS = 1614531600;

export const REWARDS_DURATION_DAYS = 7;

// TODO add staking rewards addresses here
export const STAKING_REWARDS_INFO: {
  [chainId in ChainId]?: {
    tokens: [Token, Token]
    stakingRewardAddress: string
    ended: boolean
    name: string
    lp: string
    baseToken: [Token]
    isTokenOnly?: boolean
    isNftToken?: boolean
  }[]
} = {
  [ChainId.FTM]: [//TODO: FTM

        {
      tokens: [USDC,FTM],
      stakingRewardAddress: '0xf53a04D4A06860f01391B71FC575aBa5d249E9a1',
      ended: false,

      name: 'USDC-FTM',
      lp: '0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c',
      baseToken: [FTM]
      //STAKINGREWARDSFACTORY- 0x5D490e48417Dd2F6165CEB3b2c04352675278998
    },
    {
      tokens: [FTM,LIQD],
      stakingRewardAddress: '0xaAac25EAEc5DFf54cE720A6019EB3EE8BB93Da8F',
      ended: false,

      name: 'FTM-LIQD',
      lp: '0x0550a63b10982cf23aa4ead45abeba6270b71cf1',
      baseToken: [LIQD]
      //STAKINGREWARDSFACTORY- 0x5D490e48417Dd2F6165CEB3b2c04352675278998
    },

    {
      tokens: [FUSDT,FTM],
      stakingRewardAddress: '0xc73dF9AF68F7d749ff446A7640A2d93e20BFB1d4',
      ended: false,

      name: 'FUSDT-FTM',
      lp: '0x5965e53aa80a0bcf1cd6dbdd72e6a9b2aa047410',
      baseToken: [FTM]
    },
    {
      tokens: [FTM,wETH],
      stakingRewardAddress: '0x913D966B0087dEe1d260009a4Df4A3C79a04FD6F',
      ended: false,

      name: 'FTM-WETH',
      lp: '0xf0702249f4d3a25cd3ded7859a165693685ab577',
      baseToken: [wETH]
    },
    {
      tokens: [FTM,DAI],
      stakingRewardAddress: '0x3Ea7B7F4fe826819fbB60C7ccE7941D8ceb58F54',
      ended: false,

      name: 'FTM-DAI',
      lp: '0xe120ffbda0d14f3bb6d6053e90e63c572a66a428',
      baseToken: [DAI]
    },
    // {
    //   tokens: [FUSDT,FTM],
    //   stakingRewardAddress: '',
    //   ended: false,

    //   name: 'FUSDT-FTM',
    //   lp: '',
    //   baseToken: [LIQD]
    // },
    // {
    //   tokens: [FUSDT,FTM],
    //   stakingRewardAddress: '',
    //   ended: false,

    //   name: 'FUSDT-FTM',
    //   lp: '',
    //   baseToken: [LIQD]
    // },
    // {
    //   tokens: [USDC,FTM],
    //   stakingRewardAddress: '0xf53a04D4A06860f01391B71FC575aBa5d249E9a1',  //0x0BA25dFFB326e89E83fDbc1995C1a12E7F929D6f
    //   ended: false,

    //   name: 'USDC-FTM',
    //   lp: '0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c',
    //   baseToken: [FTM]
    //   //STAKINGREWARDSFACTORY- 0x5D490e48417Dd2F6165CEB3b2c04352675278998
    // },
    
    // {
    //   tokens: [WELT, FTM],
    //   stakingRewardAddress: '0xf9809c1C302AC583E904056b3b9268bE829d4741',  //0x0BA25dFFB326e89E83fDbc1995C1a12E7F929D6f
    //   ended: false,

    //   name: 'WELT-USDC',
    //   lp: '0x55e49f32fbba12aa360eec55200dafd1ac47aaed',
    //   baseToken: [USDC]
    //   //STAKINGREWARDSFACTORY- 0x5D490e48417Dd2F6165CEB3b2c04352675278998
    // },

    // {
    //   tokens: [WELT, WMATIC],
    //   stakingRewardAddress: '0xBD445F98736389F6Df6fCEfAb92c29272B17bF35',  //0x0BA25dFFB326e89E83fDbc1995C1a12E7F929D6f
    //   ended: false,

    //   name: 'WELT-DAI',
    //   lp: '0xaac32d2ac5647776c4896da319697d0b6e6012c0',
    //   baseToken: [DAI]
    //   //STAKINGREWARDSFACTORY- 0x5D490e48417Dd2F6165CEB3b2c04352675278998
    // },





    // {
    //   tokens: [WELT, WMATIC],
    //   stakingRewardAddress: '0x39fC297695209A5EBB26eC1abaE52858f4CA2D03',
    //   ended: false,
    //   isTokenOnly:true,

    //   name: 'WELT',
    //   lp: '0x23e8b6a3f6891254988b84da3738d2bfe5e703b9',
    //   baseToken: [WELT]
    //   //STAKINGREWARDSFACTORY- 0x5D490e48417Dd2F6165CEB3b2c04352675278998
    // },
    // {
    //   tokens: [WELT, WMATIC],
    //   stakingRewardAddress: '0x92A9d2054dc8cBc915498912E9cE724EfDe20A65',
    //   ended: false,
    //   isTokenOnly:true,

    //   name: 'vault',
    //   lp: '0x23e8b6a3f6891254988b84da3738d2bfe5e703b9',
    //   baseToken: [WELT]
    //   //STAKINGREWARDSFACTORY- 0x5D490e48417Dd2F6165CEB3b2c04352675278998
    // }
  ]
}

export interface StakingInfo {
  // the address of the reward contract
  stakingRewardAddress: string
  // the tokens involved in this pair
  tokens: [Token, Token]
  // the amount of token currently staked, or undefined if no account
  stakedAmount: TokenAmount
  // the amount of reward token earned by the active account, or undefined if no account
  earnedAmount: TokenAmount
  // the total amount of token staked in the contract
  totalStakedAmount: TokenAmount
  // the amount of token distributed per second to all LPs, constant
  totalRewardRate: TokenAmount
  // the current amount of token distributed to the active account per second.
  // equivalent to percent of total supply * reward rate
  rewardRate: TokenAmount
  // when the period ends
  periodFinish: Date | undefined

  baseToken : [Token]

  ended: boolean

  name: string

  lp: string
  isTokenOnly?: boolean

  isNftToken ?:boolean
  harvestCallFee?: any
  // calculates a hypothetical amount of token distributed to the active account per second.
  getHypotheticalRewardRate: (
    stakedAmount: TokenAmount,
    totalStakedAmount: TokenAmount,
    totalRewardRate: TokenAmount
  ) => TokenAmount
}

// gets the staking info from the network for the active chain id
export function useStakingInfo(pairToFilterBy?: Pair | null): StakingInfo[] {
  const { chainId, account } = useActiveWeb3React() 

  const info = useMemo(
    () =>
      chainId
        ? STAKING_REWARDS_INFO[chainId]?.filter(stakingRewardInfo =>
          pairToFilterBy === undefined
            ? true
            : pairToFilterBy === null
              ? false
              : pairToFilterBy.involvesToken(stakingRewardInfo.tokens[0]) &&
              pairToFilterBy.involvesToken(stakingRewardInfo.tokens[1])
        ) ?? []
        : [],
    [chainId, pairToFilterBy]
  )

  

  const uni = chainId ? UNI[chainId] : undefined

  const rewardsAddresses = useMemo(() => info.map(({ stakingRewardAddress }) => stakingRewardAddress), [info])

  const vaultAddresses = useMemo(() => info.filter((e) => e.name === 'vault').map(({ stakingRewardAddress }) => stakingRewardAddress), [info])

  const accountArg = useMemo(() => [account ?? undefined], [account])

  // get all the info from the staking rewards contracts
  const balances = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'balanceOf', accountArg)
  const earnedAmounts = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'earned', accountArg)
  const totalSupplies = useMultipleContractSingleData(rewardsAddresses, STAKING_REWARDS_INTERFACE, 'totalSupply')


  
  // tokens per second, constants
  const rewardRates = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'rewardRate',
    undefined,
    NEVER_RELOAD
  )
  const periodFinishes = useMultipleContractSingleData(
    rewardsAddresses,
    STAKING_REWARDS_INTERFACE,
    'periodFinish',
    undefined,
    NEVER_RELOAD
  )
  console.log('STAKING_REWARDS_INTERFACE',STAKING_REWARDS_INTERFACE);
  console.log('balances',balances);

  const harvestCallFee = useMultipleContractSingleData(vaultAddresses, VAULT_INTERFACE, 'calculateHarvestWeltRewards')

  console.log('harvestCallFee',harvestCallFee)
  return useMemo(() => {
    if (!chainId || !uni) return []

    return rewardsAddresses.reduce<StakingInfo[]>((memo, rewardsAddress, index) => {
      // these two are dependent on account
      const balanceState = balances[index]
      const earnedAmountState = earnedAmounts[index]

      // these get fetched regardless of account
      const totalSupplyState = totalSupplies[index]
      const rewardRateState = rewardRates[index]
      const periodFinishState = periodFinishes[index]

      const harvestCallFeeState = harvestCallFee[0]

      if (
        // these may be undefined if not logged in
        !balanceState?.loading &&
        !earnedAmountState?.loading &&
        // always need these
        totalSupplyState &&
        !totalSupplyState.loading &&
        rewardRateState &&
        !rewardRateState.loading &&
        periodFinishState &&
        !periodFinishState.loading 
        // &&
        // harvestCallFeeState &&
        // !harvestCallFeeState.loading
      ) {
        if (
          balanceState?.error ||
          earnedAmountState?.error ||
          totalSupplyState.error ||
          rewardRateState.error ||
          periodFinishState.error
        ) {
          console.log("addy", balanceState?.error,
            earnedAmountState?.error,
            totalSupplyState.error,
            rewardRateState.error,
            periodFinishState.error)
          console.error('Failed to load staking rewards info')
          return memo
        }


        // check for account, if no account set to 0
        const lp = info[index].lp;

        const tokens = info[index].tokens
        const dummyPair = new Pair(new TokenAmount(tokens[0], '0'), new TokenAmount(tokens[1], '0'))

        
        const stakedAmount = new TokenAmount(
        lp && lp !== '' ? 
        info[index].isTokenOnly ? 
        info[index].tokens[0] 
        : new Token(250, lp, 18, "SLP", "Staked LP") 
        : dummyPair.liquidityToken, JSBI.BigInt(balanceState?.result?.[0] ?? 0))
        const totalStakedAmount = new TokenAmount(lp && lp !== '' ? info[index].isTokenOnly ? info[index].tokens[0] : new Token(250, lp, 18, "SLP", "Staked LP") : dummyPair.liquidityToken, JSBI.BigInt(totalSupplyState.result?.[0]))

        const totalRewardRate = new TokenAmount(uni, JSBI.BigInt(rewardRateState.result?.[0]))

        const getHypotheticalRewardRate = (
          stakedAmount: TokenAmount,
          totalStakedAmount: TokenAmount,
          totalRewardRate: TokenAmount
        ): TokenAmount => {
          return new TokenAmount(
            uni,
            JSBI.greaterThan(totalStakedAmount.raw, JSBI.BigInt(0))
              ? JSBI.divide(JSBI.multiply(totalRewardRate.raw, stakedAmount.raw), totalStakedAmount.raw)
              : JSBI.BigInt(0)
          )
        }

        const individualRewardRate = getHypotheticalRewardRate(stakedAmount, totalStakedAmount, totalRewardRate)

        const periodFinishMs = periodFinishState.result?.[0]?.mul(1000)?.toNumber()

        memo.push({
          stakingRewardAddress: rewardsAddress,
          tokens: info[index].tokens,
          ended: info[index].ended,
          name: info[index].name,
          lp: info[index].lp,
          periodFinish: periodFinishMs > 0 ? new Date(periodFinishMs) : undefined,
          earnedAmount: new TokenAmount(uni, JSBI.BigInt(earnedAmountState?.result?.[0] ?? 0)),
          rewardRate: individualRewardRate,
          totalRewardRate: totalRewardRate,
          stakedAmount: stakedAmount,
          totalStakedAmount: totalStakedAmount,
          isTokenOnly: info[index].isTokenOnly,
          isNftToken: info[index].isNftToken,
          harvestCallFee: harvestCallFeeState?.result?.[0],
          baseToken : info[index].baseToken,
          getHypotheticalRewardRate
        })
      }
      return memo
    }, [])
  }, [balances, chainId, earnedAmounts, info,  periodFinishes, rewardRates, rewardsAddresses, totalSupplies, uni])
}

export function useTotalUniEarned(): TokenAmount | undefined {
  const { chainId } = useActiveWeb3React()
  const uni = chainId ? UNI[chainId] : undefined
  const stakingInfos = useStakingInfo()

  return useMemo(() => {
    if (!uni) return undefined
    return (
      stakingInfos?.reduce(
        (accumulator, stakingInfo) => accumulator.add(stakingInfo.earnedAmount),
        new TokenAmount(uni, '0')
      ) ?? new TokenAmount(uni, '0')
    )
  }, [stakingInfos, uni])
}

// based on typed value
export function useDerivedStakeInfo(
  typedValue: string,
  stakingToken: Token,
  userLiquidityUnstaked: TokenAmount | undefined
): {
  parsedAmount?: CurrencyAmount
  error?: string
} {
  const { account } = useActiveWeb3React()

  const parsedInput: CurrencyAmount | undefined = tryParseAmount(typedValue, stakingToken)

  const parsedAmount =
    parsedInput && userLiquidityUnstaked && JSBI.lessThanOrEqual(parsedInput.raw, userLiquidityUnstaked.raw)
      ? parsedInput
      : undefined

  let error: string | undefined
  if (!account) {
    error = 'Connect Wallet'
  }
  if (!parsedAmount) {
    error = error ?? 'Enter an amount'
  }

  return {
    parsedAmount,
    error
  }
}

// based on typed value
export function useDerivedUnstakeInfo(
  typedValue: string,
  stakingAmount: TokenAmount
): {
  parsedAmount?: CurrencyAmount
  error?: string
} {
  const { account } = useActiveWeb3React()

  const parsedInput: CurrencyAmount | undefined = tryParseAmount(typedValue, stakingAmount.token)

  const parsedAmount = parsedInput && JSBI.lessThanOrEqual(parsedInput.raw, stakingAmount.raw) ? parsedInput : undefined

  let error: string | undefined
  if (!account) {
    error = 'Connect Wallet'
  }
  if (!parsedAmount) {
    error = error ?? 'Enter an amount'
  }

  return {
    parsedAmount,
    error
  }
}

