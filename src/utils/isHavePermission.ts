export const isHavePermission = (
  idRoute: number,
  p: string,
  userProfile?: UserProfile | null
) => {
  if (userProfile?.rol.toLowerCase() === 'admin') return true

  const module = userProfile?.modulesPermissions.find(
    (m) => m.idRoute === idRoute
  );
  if (!module) {
    return false;
  }

  return module.permissions.includes(p);
};
