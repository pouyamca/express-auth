export interface TypeUser {
    universalId: string
    userName: string
    Password: string
    revokeOtp: string

}

export interface TypeUpdateUser extends Pick<TypeUser, 'userName'> {

}