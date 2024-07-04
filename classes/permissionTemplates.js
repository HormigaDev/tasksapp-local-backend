class permissionTemplates {
  constructor(userType){
    this.__user = [
      'CREATE_TASKS',
      'CREATE_CATEGORIES',
      'CREATE_AFFAIRS',
      'GET_TASKS',
      'GET_CONFIGS',
      'GET_AFFAIRS',
      'GET_SCHEDULES',
      'GET_NOTIFICATIONS',
      'GET_CATEGORIES',
      'GET_USERINFO',
      'UPDATE_TASKS',
      'UPDATE_CONFIGS',
      'UPDATE_AFFAIRS',
      'UPDATE_SCHEDULES',
      'UPDATE_CATEGORIES',
      'UPDATE_USERINFO',
      'DELETE_TASKS',
      'DELETE_AFFAIRS',
      'DELETE_CATEGORIES',
      'DELETE_USERINFO'
    ]
    this.__admin = [
      ...this.__user,
      'MANAGE_DATABASE',
      'MANAGE_PERMISSIONS',
      'READ_LOGS',
      'CREATE_USERS',
      'UPDATE_USERS',
      'GET_USERS',
      'DELETE_USERS',
    ];
    this.__permissions = userType.toLowerCase() === 'admin' ? this.__admin : this.__user;
  }
  mount(){
    return this.__permissions;
  }
}

module.exports = permissionTemplates;