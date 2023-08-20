export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const initialState = {
    status: "loading" as RequestStatusType
}

type InitialStateType = typeof  initialState

type AppActionsType = setStatusACType

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        default:
            return state
    }
}

type setStatusACType = ReturnType<typeof setStatusAC>

const setStatusAC = (status: RequestStatusType) => ({
    type: "APP/SET-STATUS",
    status
})