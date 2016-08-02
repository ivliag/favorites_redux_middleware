import Cookies from 'cookies-js'

export function getFavoriteDeals(user) {
  let currFav = normalizeCookies(Cookies.get('daitel_favorites'))
  currFav = numberizeCookieArr(currFav)

  return new Promise(resolve => {
    resolve({
      response: { favorite_deal_ids: currFav }
    })
  })
}

export function addDealToFavorites(user, dealId) {
  let currFav = normalizeCookies(Cookies.get('daitel_favorites'))
  let newFav

  dealId = +dealId
  currFav = numberizeCookieArr(currFav)

  if (currFav) {
    const favArr = currFav

    if (!favArr.includes(dealId)) {
      newFav = favArr
      newFav.push(dealId)

    } else {
      newFav = currFav
    }

  } else {
    newFav = [dealId]
  }

  Cookies.set('daitel_favorites', newFav.join(','), { expires: Infinity }) //@TODO {secure: true} for ssl

  return new Promise(resolve => {
    resolve({
      response: { favorite_deal_ids: newFav }
    })
  })
}

export function removeDealFromFavorites(user, dealId) {
  let currFav = normalizeCookies(Cookies.get('daitel_favorites'))
  let newFav

  dealId = +dealId
  currFav = numberizeCookieArr(currFav)

  if (currFav) {
    const indexOfDealId = currFav.indexOf(dealId)

    if (indexOfDealId > -1) {
      currFav.splice(indexOfDealId, 1)
      newFav = currFav


    } else {
      newFav = currFav
    }

  } else {
    newFav = []
  }

  Cookies.set('daitel_favorites', newFav.join(','), { expires: Infinity }) //@TODO {secure: true} for ssl

  return new Promise(resolve => {
    resolve({
      response: { favorite_deal_ids: newFav }
    })
  })
}

function normalizeCookies(cookieString) {
  if (!cookieString) return []

  try {
    return (
      cookieString
        .split(',')
        .filter(item => !isNaN(+item))
    )
  }

  catch(e) {
    return []
  }
}

function numberizeCookieArr(cookieArr) {
  if (cookieArr.length === 0) return []
  return cookieArr.map(item => +item)
}
