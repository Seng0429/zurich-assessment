import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserListInfo } from  '../../constants/types'

export const userListSlice = createSlice({
  name: 'userList',
  initialState: {
      listInfo: null as UserListInfo | null
  },
  reducers: {
      saveUserList: (state, action: PayloadAction<UserListInfo>) => {
          state.listInfo = action.payload
      },
  },
})

export const { saveUserList } = userListSlice.actions
export default userListSlice.reducer