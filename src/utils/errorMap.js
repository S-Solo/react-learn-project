const errorMap = (code) => {
    const map = {
        'auth/invalid-email': 'Սխալ էլեկտրոնային փոստ',
        'dsdsds': 'dsdsds'
    }
    return map[code];
}

export default errorMap;