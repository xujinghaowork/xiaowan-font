import {
  AccountLogin
} from '@api/sys.login'

// 菜单 侧边栏
let asideMenu = {};
asideMenu.list = [];

// 公共菜单
let publicMenu = [{
  path: '/index',
  title: '首页',
  icon: 'home'
}];

// 住户菜单
let userMenu = [
  //普通用户租户
  {
    path: '/user/info',
    title: '个人信息',
    icon: 'user'
  },
  {
    path: '/user/pay',
    title: '生活缴费',
    icon: 'money'
  },
  {
    path: '/user/complaint',
    title: '投诉',
    icon: 'thumbs-down'
  },
  {
    path: '/user/repair',
    title: '物品报修',
    icon: 'wrench'
  }
];

// 物业菜单
let manageMenu = [
  //物业管理
  {
    path: '/manage/user',
    title: '用户管理',
    icon: 'users'
  },
  {
    path: '/manage/role',
    title: '角色管理',
    icon: 'user-secret'
  },
  {
    path: '/manage/pay',
    title: '缴费管理',
    icon: 'rmb'
  },
  {
    path: '/manage/complaint',
    title: '投诉管理',
    icon: 'thumbs-down'
  },
  {
    path: '/manage/repair',
    title: '报修管理',
    icon: 'wrench'
  },
  {
    path: '/manage/announcement',
    title: '公告管理',
    icon: 'bullhorn'
  }
];

// 获取菜单
asideMenu.getList = async function (vm, name) {
  let userInfo = await vm.$store.dispatch('d2admin/db/get', {
    dbName: 'sys',
    path: 'user.info',
    user: true
  }, {
    root: true
  });
  let username = userInfo.username;
  if (!username) {
    username = name;
  }
  let res;
  try {
    res = await AccountLogin({
      username: username,
      password: username
    });
  } catch (error) {}
  if (res) {
    asideMenu.list = matchAuthorityToList(res);
  }
  return asideMenu.list;
}
//根据后台传的权限列表对应侧边栏数组
function matchAuthorityToList(res) {
  let matchList = [];
  if (res.role == 'user') {
    matchList = [...publicMenu, ...userMenu];
  } else if (res.role == 'manage') {
    if (res.menuList.length == 0) {
      matchList = [...publicMenu, ...manageMenu];
    } else {
      for (let i = 0; i < res.menuList.length; i++) {
        for (let j = 0; j < manageMenu.length; j++) {
          if (manageMenu[j].title == res.menuList[i]) {
            matchList.push(manageMenu[j]);
          }
        }
      }
      matchList = [...publicMenu, ...matchList];
    }
  }
  return matchList;
}

export default asideMenu;