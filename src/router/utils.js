export const isUserLoggedIn = () => !!(localStorage.getItem('UserData') && localStorage.getItem('access'))
