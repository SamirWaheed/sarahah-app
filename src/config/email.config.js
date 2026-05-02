import {emails} from './index.js'

export const emailConfig = {
    service: emails.service,
    auth:{
        user: emails.user,
        pass: emails.pass
    }
}