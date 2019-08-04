export const menuNavToggle = value => ({
    type: 'MENU_NAV_TOGGLE_CLICK',
    newValue: value
})

export const newNotification = value => ({
    type: 'NEW_NOTIFICATION',
    newValue: value
})

export const deleteNotification = value => ({
    type: 'DELETE_NOTIFICATION',
    newValue: value
})

export const setUser = value => ({
    type: 'SET_USER',
    newValue: value
})

export const deleteUser = value => ({
    type: 'LOGOUT',
    newValue: value
})