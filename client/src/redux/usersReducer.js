import { usersAPI } from "../api/api"

let initialState = {
    usersDate: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: false,
    isFollowing: []
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FOLLOWING':
            {
                let usersData = [...state.usersDate]
                usersData.map(d => { if (d.id == action.id) d.followed = !d.followed })
                return {...state, usersDate: usersData }
            }
        case 'SET-USERS':
            {
                return {...state, usersDate: [...action.usersDate] }
            }
        case 'SET-PAGE':
            {
                return {...state, currentPage: action.currentPage }
            }
        case 'SET-TOTAL-COUNT':
            {
                return {...state, totalUsersCount: action.totalCount }
            }
        case 'TOGGLE-LOADING':
            {
                return {...state, isLoading: action.isLoading }
            }
        case 'TOGGLE-FOLLOWING':
            {
                return {
                    ...state,
                    isFollowing: action.isFollowing
                    ? [...state.isFollowing, action.userID]
                    : state.isFollowing.filter(id => id != action.userID)
                }
            }
        default:
            return state
    }
}

export const follow = (id, follow) => {
    return { type: 'FOLLOWING', id: id, follow: follow }
}

export let setUsers = (users) => {
    return { type: 'SET-USERS', usersDate: users }
}
export let setCurrentPage = (page) => {
    return { type: 'SET-PAGE', currentPage: page }
}
export let setTotalPageCount = (count) => {
    return { type: 'SET-TOTAL-COUNT', totalCount: count }
}
export let toogleLoading = (togle) => {
    return { type: 'TOGGLE-LOADING', isLoading: togle }
}
export let toogleFollowing = (isFollowing, userID) => {
    return { type: 'TOGGLE-FOLLOWING', isFollowing, userID }
}

export const followThunkCreator = (data) => async (dispatch) => {
        dispatch(toogleFollowing(true, data.id))
        let res = await usersAPI.followUser(data.id)     
                dispatch(toogleFollowing(false, data.id))
                dispatch(follow(data.id, res.followed))
    
}

export const getUsersThunkCreator = (currentPage, pageSize) => async (dispatch) => {
        dispatch(toogleLoading(true))
        dispatch(setCurrentPage(currentPage))
        let res = await usersAPI.getUsers(currentPage, pageSize)
            dispatch(setUsers(res.items))
            dispatch(setTotalPageCount(res.totalCount))
            dispatch(toogleLoading(false))
}

export default usersReducer