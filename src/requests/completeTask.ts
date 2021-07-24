import { Post } from './newRequest'

export function completeTask(
    user_id: string,
    access_token: string,
    task_id: string,
): Promise<any> {
    return Post(
        `users/${user_id}/tasks/${task_id}/complete`,
        access_token,
    ).then(res => res.json())
}
