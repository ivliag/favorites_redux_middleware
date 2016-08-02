import callApi, { createUrl, createTokenData } from 'util/callApi'


export function getFavoriteDeals(user, locale) {
  const token_data = createTokenData(locale, user)
  const url = createUrl(`/v1/users/${user.id}/favorites`, user)

  return callApi(
    url,
    {},
    token_data
  )
}

export function addDealToFavorites(user, locale, dealId) {
  const token_data = createTokenData(locale, user)
  const url = createUrl(`/v1/deals/${dealId}/favorite`, user)

  return callApi(
    url,
    { method: 'POST' },
    token_data
  )
}

export function removeDealFromFavorites(user, locale, dealId) {
  const token_data = createTokenData(locale, user)
  const url = createUrl(`/v1/deals/${dealId}/unfavorite`, user)

  return callApi(
    url,
    { method: 'POST' },
    token_data
  )
}
