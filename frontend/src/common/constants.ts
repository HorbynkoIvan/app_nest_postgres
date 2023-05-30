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

export const ORG_STATUS = {
  ACTIVE: "active",
  LIMITED: "limited",
  HIDDEN: "hidden",
};

export const ORG_STATUS_OPTIONS = Object.entries(ORG_STATUS).map(([key, value]) => ({
  id: key as string,
  name: value as string,
}));

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

export const ENT_TYPES = {
  SYSTEM: "system",
  STATE: "state",
  DISTRICT: "district",
  SCHOOL: "school",
  COHORT: "cohort",
  OTHER: "other",
};

export const ENT_TYPES_OPTIONS = Object.entries(ENT_TYPES).map(([key, value]) => ({
  id: key as string,
  name: value as string,
}));
