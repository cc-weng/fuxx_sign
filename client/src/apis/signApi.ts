import { ux } from "@/utils/tools"

export type SignApi = {
    sign(data: {
        name: string
        code: string
        choose: number
    }): Promise<string>
}

export const signApi: SignApi = {
    sign(data) {
        return ux.post('/sign', data)
    },
}