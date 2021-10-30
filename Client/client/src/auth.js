class Auth {
  constructor() {
    this.authenticated = false;
    this.user = null;
  }

  login(user, cb) {
    console.log("isauthenticated");
    this.authenticated = true;
    this.user = user;
    return cb();
  }

  logout(cb) {
    this.authenticated = false;
    this.user = null;
    cb();
  }

  isAutenticated() {
    return this.authenticated;
  }

  getUser() {
    return this.user;
  }
}

export default new Auth();
