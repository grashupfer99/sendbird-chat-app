'use strict';
import Element from './element';

class Users extends Element {
  constructor(parent) {
    super();
    this.setClass('app-users');

    let usrLi = new Element();
    usrLi.setClass('top');
    usrLi.val('User List');
    parent.appendElement(this.appendElement(usrLi));
  }
}

export { Users as default };
