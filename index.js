import 'isomorphic-fetch'
import { CHANGE_FAVORITE_DEALS_LIST } from 'constants/deals'

import * as fetchAdapter from 'middlewares/favorites/fetchAdapter'
import * as cookieAdapter from 'middlewares/favorites/cookieAdapter'

export const HANDLE_FAVORITES = "HANDLE_FAVORITES"

export default store => next => action => {

  if (action.type !== HANDLE_FAVORITES || !action.direction) {
    return next(action)
  }

  const state = store.getState()
  const adapter = state.auth.user ? fetchAdapter : cookieAdapter

  if (action.direction === 'get') {
    return (
      adapter
        .getFavoriteDeals(state.auth.user, state.locale)
        .then(data => {
          next({
            type: CHANGE_FAVORITE_DEALS_LIST,
            favorites: data.response.favorite_deal_ids
          })
        })
    )
  }

  if (action.direction === 'add') {
    return (
      adapter
        .addDealToFavorites(state.auth.user, state.locale, action.dealId)
        .then(data => {
          next({
            type: CHANGE_FAVORITE_DEALS_LIST,
            favorites: data.response.favorite_deal_ids
          })
        })
    )
  }

  if (action.direction === 'remove') {
    return (
      adapter
        .removeDealFromFavorites(state.auth.user, state.locale, action.dealId)
        .then(data => {
          next({
            type: CHANGE_FAVORITE_DEALS_LIST,
            favorites: data.response.favorite_deal_ids
          })
        })
    )
  }
}
