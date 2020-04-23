export const saveID = (Id)=>{
    return {
        type: 'SET_ID',
        Id: Id
    }
}

export const clear = ()=>{
    return {
        type: 'CLEAR'
    }
}

export const check = (checked)=>{
    return {
        type: 'CHECKED',
        checked: checked
    }
}

export const logoff = ()=>{
    return {
        type: 'LOGOFF'
    }
}