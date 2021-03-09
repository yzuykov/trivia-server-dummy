const randomToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

const player = {
  authResponse: () => {
    return {'player': {'id': 123, 'token': randomToken()}}
  },
  authGuestResponse: (name: string) => {
    return {'player': {'id': 123, 'name': name, 'token': randomToken()}}
  },
  getGuestListResponse: () => {
    return {'players': [{'id': 1, 'name': 'Рабинович'},{'id': 2, 'name': 'Вассерман'},{'id': 3, 'name': 'Бурда'}]}
  }
}

export default player;