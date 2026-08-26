import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../constants/types'

export const userListSlice = createSlice({
    name: 'userList',
    initialState: {
        users: [] as User[]
    },
    reducers: {
        saveUserList: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload
        },
    },
})

export const { saveUserList } = userListSlice.actions
export default userListSlice.reducer