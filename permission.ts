/**
 * 用户认证信息接口 - 存储用户登录后的核心身份与令牌信息
 */
interface UserAuth {
  /** 用户唯一标识（支持字符串/数字类型ID） */
  userId: string | number;
  /** 登录用户名（账号） */
  username: string;
  /** 真实姓名（可选） */
  realName?: string;
  /** 访问令牌（接口请求授权用） */
  accessToken: string;
  /** 刷新令牌（用于刷新accessToken，可选） */
  refreshToken?: string;
  /** 令牌过期时间（时间戳，单位：毫秒） */
  expireTime: number;
  /** 租户ID（多租户场景下的租户标识，可选） */
  tenantId?: string | number;
  /** 账号状态：0-禁用，1-正常 */
  status: 0 | 1;
  /** 用户头像URL（可选） */
  avatar?: string;
  /** 扩展信息（可选）- 存储部门、岗位等关联信息 */
  extInfo?: {
    /** 部门ID */
    deptId: string | number;
    /** 岗位ID（可选） */
    postId?: string | number;
  };
}

/**
 * 角色信息接口 - 定义用户所属角色的配置
 */
interface Role {
  /** 角色唯一标识（支持字符串/数字类型ID） */
  roleId: string | number;
  /** 角色名称（如：管理员、普通用户） */
  roleName: string;
  /** 角色描述（可选） */
  description?: string;
  /** 角色状态：0-禁用，1-正常 */
  status: 0 | 1;
  /** 角色关联的权限ID列表 */
  permissionIds: (string | number)[];
  /** 排序权重（可选，数值越小排序越靠前） */
  sort?: number;
  /** 父角色ID（用于角色层级关系，可选） */
  parentRoleId?: string | number;
}

/**
 * 权限信息接口 - 定义系统资源的权限控制配置
 */
interface Permission {
  /** 权限唯一标识（字符串编码，如：sys:user:list） */
  permissionKey: string;
  /** 权限ID（支持字符串/数字类型） */
  permissionId: string | number;
  /** 权限名称（如：用户列表查看） */
  permissionName: string;
  /** 权限类型：menu-菜单权限，button-按钮权限，api-接口权限，data-数据权限 */
  type: "menu" | "button" | "api" | "data";
  /** 资源关联配置 - 不同权限类型对应不同资源信息 */
  resource: {
    /** 资源路径（菜单路由路径/接口请求路径） */
    path: string;
    /** 请求方法（仅api类型权限有效，可选：GET/POST/PUT/DELETE/*） */
    method?: "GET" | "POST" | "PUT" | "DELETE" | "*";
    /** 组件路径（仅menu类型权限有效，可选，对应前端组件地址） */
    component?: string;
  };
  /** 父权限ID（用于权限层级关系，如：菜单权限下的按钮权限） */
  parentId: string | number;
  /** 权限状态：0-禁用，1-正常 */
  status: 0 | 1;
  /** 排序权重（可选，数值越小排序越靠前） */
  sort?: number;
  /** 权限描述（可选） */
  description?: string;
}

/**
 * 菜单信息接口 - 定义系统菜单/路由配置（支持多级嵌套）
 */
interface Menu {
  /** 菜单唯一标识（支持字符串/数字类型ID） */
  menuId: string | number;
  /** 菜单名称（前端显示用） */
  menuName: string;
  /** 父菜单ID（顶级菜单父ID通常为0或空字符串） */
  parentId: string | number;
  /** 菜单路由路径（与前端路由配置对应） */
  path: string;
  /** 路由重定向地址（可选，如：访问菜单路径时重定向到子菜单） */
  redirect?: string;
  /** 菜单对应组件路径（可选，前端组件地址） */
  component?: string;
  /** 菜单图标（可选，前端显示用图标编码/URL） */
  icon?: string;
  /** 菜单类型：dir-目录（仅用于菜单分组），menu-菜单（可跳转路由），button-按钮（菜单下的操作按钮） */
  menuType: "dir" | "menu" | "button";
  /** 关联的权限标识（可选，与Permission.permissionKey对应，控制菜单显示权限） */
  permissionKey?: string;
  /** 菜单可见状态：0-隐藏，1-显示 */
  visible: 0 | 1;
  /** 是否缓存路由组件（前端路由缓存配置） */
  keepAlive: boolean;
  /** 排序权重（数值越小排序越靠前） */
  sort: number;
  /** 子菜单列表（可选，支持多级嵌套） */
  children?: Menu[];
}

/**
 * 数据权限接口 - 定义用户数据访问范围的控制规则
 */
interface DataPermission {
  /** 数据权限唯一标识（支持字符串/数字类型ID） */
  dataPermission: string | number;
  /** 数据权限名称（如：本人数据、部门数据） */
  dataPermName: string;
  /** 数据访问范围：
   * self-仅本人数据，
   * dept-本部门数据，
   * deptAndSub-本部门及子部门数据，
   * all-全部数据，
   * custom-自定义数据范围
   */
  scope: "self" | "dept" | "deptAndSub" | "all" | "custom";
  /** 自定义范围ID列表（仅scope为custom时有效，可选，如：指定部门ID集合） */
  customIds?: (string | number)[];
  /** 数据过滤条件（可选，自定义查询条件，键值对格式） */
  filterCondition?: Record<string, any>;
}

/**
 * 用户权限集合接口 - 整合用户的所有权限相关信息（登录后返回的核心权限数据结构）
 */
interface UserPermissionSet {
  /** 用户认证信息 */
  userAuth: UserAuth;
  /** 用户所属角色列表 */
  roles: Role[];
  /** 用户拥有的权限列表 */
  permissions: Permission[];
  /** 用户可访问的菜单列表（含路由配置） */
  menus: Menu[];
  /** 用户的数据权限配置 */
  dataPermission: DataPermission;
  /** 扩展配置（可选，存储个性化/业务自定义配置，键值对格式） */
  extConfig?: Record<string, any>;
}

export type {
  UserAuth,
  Role,
  Permission,
  Menu,
  DataPermission,
  UserPermissionSet,
};
