export const PLANS = {
  BASIC: "basic",
  PRO: "pro",
  ENTERPRISE: "enterprise",
};

export type Plan = (typeof PLANS)[keyof typeof PLANS];
