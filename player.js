const randomToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

module.exports = {
  authResponse: () => {
    return {'player': {'id': 123, 'token': randomToken()}}
  },
  authGuestResponse: (name) => {
    return {'player': {'id': 123, 'name': name, 'token': randomToken()}}
  },
  getGuestListResponse: () => {
    return {'players': [{'id': 1, 'name': 'Рабинович'},{'id': 2, 'name': 'Вассерман'},{'id': 3, 'name': 'Бурда'}]}
  }
}