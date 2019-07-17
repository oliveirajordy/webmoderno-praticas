const INITIAL_STATE = {
    menuNavToggle: false,
    notifications: []
}

export const utilReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'MENU_NAV_TOGGLE_CLICK':
            return {
                ...state,
                menuNavToggle: action.newValue
            }
        case 'NEW_NOTIFICATION':
            const newNotifications = [...state.notifications]
            newNotifications.unshift(action.newValue)
            return {
                ...state,
                notifications: newNotifications
            }
        case 'DELETE_NOTIFICATION':
            const deletedNotifications = [...state.notifications]
            deletedNotifications.splice(deletedNotifications.length - 1, 1)
            return {
                ...state,
                notifications: deletedNotifications
            }
        default:
            return state
    }
}