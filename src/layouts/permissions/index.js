import { UserData } from "@/@core/jwt/index";

export const check = (role) => {
    if (!role) return
    const userData = UserData();

    if (userData && userData.is_superuser) return true;

    const roles = userData?.role?.map((role) => role);

    if (Array.isArray(role)) {
        return role.some((item) => roles?.includes(item));
    }
    return roles?.includes(role);
};
