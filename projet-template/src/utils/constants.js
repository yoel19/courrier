export const IS_ADMIN = "ADMIN"
export const IS_HOD = "HOD"
export const IS_SECRETARY = "SECRETARY"

const userStorage = localStorage.getItem("user")
export const user = userStorage && JSON.parse(userStorage)