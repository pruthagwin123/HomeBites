function requireAuth(req, res, next) {
  // TODO: verify JWT and attach user context
  next();
}

function allowRoles(..._roles) {
  return (req, res, next) => {
    // TODO: enforce role-based access control
    next();
  };
}

module.exports = { requireAuth, allowRoles };
