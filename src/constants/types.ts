export interface User {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
}

export interface UserListInfo {
    page: number;
    total_pages: number;
    data: User[];
}

export interface ApiRequestUserListInfo extends UserListInfo {
    per_page: number;
    total: number;
}
