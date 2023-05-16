export const DRAWER_WIDTH = 300;

export const ROLES = {
  ADMIN: "admin",
  SUPER_ADMIN: "superAdmin",
  STAFF: "staff",
};

export const STATUS = {
  ACTIVE: "active",
  DISABLED: "disabled",
};

export const ORGANIZATION_TYPE = {
  SCHOOL: "school",
  UNIVERSITY: "university",
};

export const ROLE_OPTIONS = Object.values(ROLES).map((item) => ({ id: item, name: item }));
export const TYPE_OPTIONS = Object.values(ORGANIZATION_TYPE).map((item) => ({
  id: item,
  name: item,
}));
export const STATUS_OPTIONS = Object.values(STATUS).map((item) => ({ id: item, name: item }));
