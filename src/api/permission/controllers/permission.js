const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::permission.permission', ({ strapi }) => ({
  async getUserMenus(ctx) {
    const userId = ctx.state.user.id;
    const userGroups = await strapi.entityService.findMany('api::user-group.user-group', {
      filters: { user: userId },
      populate: {
        group: {
          populate: {
            group_menus: {
              populate: {
                menu: {
                  populate: {
                    subMenus: true
                  }
                }
              }
            }
          }
        }
      }
    });

    let menus = [];
    userGroups.forEach(userGroup => {
      userGroup.group.group_menus.forEach(gm => {
        if (gm.isread && gm.menu) {
          menus.push(gm.menu);
        }
      });
    });

    // Hilangkan duplikat
    const uniqueMenus = Array.from(new Map(menus.map(m => [m.id, m])).values());

    // Filter hanya parent menus
    const parentMenus = uniqueMenus.filter(m => !m.parent);
    
    // Urutkan parent menus
    parentMenus.sort((a, b) => a.order - b.order);

    // Susun subMenus untuk setiap parent
    const buildMenuTree = (menu) => {
      return {
        id: menu.id,
        name: menu.menuname,
        code: menu.menucode,
        icon: menu.menuicon,
        path: menu.menuurl,
        order: menu.sortorder,
        subMenus: menu.subMenus
          .filter(sm => sm.recordstatus)
          .sort((a, b) => a.order - b.order)
          .map(buildMenuTree)
      };
    };

    const menuTree = parentMenus.map(buildMenuTree);

    ctx.body = menuTree;
  }
}));
