import { useQuery } from 'react-query';
import { api } from "../api";

type User = {
    name: string;
    email: string;
    createdAt: string;
    id: string;
}


type GetUserResponse = {
    totalCount : number;
    users : User [];
}

export async function getUsers(page: number): Promise<GetUserResponse> {

    const { data, headers } = await api.get('users', {
        params: {
            page,
        }
    })

    const totalCount = Number(headers['x-total-count'])


    const users = data.users.map((user: { id: string; name: string; email: string; createdAt: string; }) => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: new Date(user.createdAt).toLocaleString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            }),
        };

    });

    return {
        totalCount,
        users,
    };

}

export function useUsers(page: number) {
    return useQuery(['users' , page], () => getUsers(page), {
        staleTime: 1000 * 5,
    })
}