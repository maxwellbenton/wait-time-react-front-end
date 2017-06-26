const baseUrl = 'http://localhost:3000/api/v1'

export default class AuthAdapter {
  static login(loginParams){
    return fetch(`${baseUrl}/auth`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json() )
  }

  static currentUser(){
    return fetch(`${baseUrl}/current_user`, {
      headers: headers()
    }).then(res => res.json() )
  }
}

export class WaitTimesAdapter  {
  static all(){
    return fetch(`${baseUrl}/wait_times`, {
      headers: headers()
    })
      .then( res => res.json() )
  }

  static create(wait_time){
    return fetch(`${baseUrl}/wait_times`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        wait_time: {
            wait_time: wait_time.time,
            store_id: wait_time.store_id,
            user_id: wait_time.user_id
    }
      })
    }).then(response => response.json() )
  }

  
}

export class StoresAdapter  {
  static create(lat, lng){
    return fetch(`${baseUrl}/searchStores`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        location: {
            latitude: lat,
            longitude: lng
        }
      })
    })
      .then(response => response.json() )
  }

  static wideSearch(lat, lng){
    return fetch(`${baseUrl}/wideSearchStores`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        location: {
            latitude: lat,
            longitude: lng
        }
      })
    })
      .then(response => response.json() )
  }

  static createStore(storeName, address, company){
    return fetch(`${baseUrl}/createStore`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        store: {
            name: storeName,
            address: address,
            company: company
        }
      })
    })
      .then(response => response.json() )
  }
}

function headers(){
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
  }
}