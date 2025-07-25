export type Currency ={
  id: number,
  rank: number,
  name: string,
  symbol: string,
  slug: string,
  is_active: number,
  first_historical_data: string,
  last_historical_data: string,
  platform: {
    id: 1027,
    name: string,
    symbol:string,
    slug:string,
    token_address: string
  }|null
};