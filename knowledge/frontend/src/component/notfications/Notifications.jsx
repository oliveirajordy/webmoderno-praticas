import React from 'react'
import './Notifications.css'

import { connect } from 'react-redux'
import { deleteNotification } from '../../store/actions/utilActions'

import Toast from './Toast'

const Notifications = ({ notifications, props, deleteToast }) => {

    const getNotifications = _ => {
        return notifications.map((notification, i) => (
            <Toast key={Math.random()} index={i} remove={deleteToast}
                type={notification.type} msg={notification.msg} />
        ))
    }

    const removeToast = _ => {
        setTimeout(() => {
            deleteToast()
        }, 4000)
    }

    notifications.length > 0 && removeToast()

    return (
        <div className="notifications">
            {getNotifications()}
        </div>
    )

}

const mapStateToProps = (state, ownProps) => {
    return {
        notifications: state.utilState.notifications,
        props: ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteToast: (value) => dispatch(deleteNotification(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)