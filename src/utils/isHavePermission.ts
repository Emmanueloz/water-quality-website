export const isHavePermission = (
  idRoute: number,
  p: string,
  userProfile?: UserProfile | null
) => {
  const module = userProfile?.modulesPermissions.find(
    (m) => m.idRoute === idRoute
  );
  if (!module) {
    return false;
  }

  return module.permissions.includes(p);
};
