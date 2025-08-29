module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/permissions/user-menus',
      handler: 'permission.getUserMenus',
      config: {
        auth: true
      }
    }
  ]
};
