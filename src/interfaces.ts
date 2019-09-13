export interface ITrackRecord
{
    id:         number
    bit_author: null | string
    desc:       null
    img:        null
    meta1:      Meta1
    name:       string
    path:       string
    round_id:   number
    status:     number
    user_id:    number
    user:       User
}

export interface Meta1
{
    duration: number
    name?:    string
}

export interface User
{
    username: string
    profile:  Profile
}

export interface Profile
{
    location: null | string
    name:     null | string
}
