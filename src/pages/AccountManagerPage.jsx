import React from 'react'
import AccountManagerContainer from '../containers/admin/AccountManagerContainer'
import { useEffect } from 'react'

const AccountManagerPage = () => {
    useEffect(() => {
        document.title = "Admin | Gym Manager"
    })

    return (
        <AccountManagerContainer />
    )
}

export default AccountManagerPage