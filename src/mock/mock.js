import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { Users } from './data/user'

export default {
    bootstrap() {
        let mock = new MockAdapter(axios)

        mock.onGet('/test').reply(config => {
            return this.wait()
                .then(() => {
                    return Promise.resolve([200, {
                        code: 1,
                        msg: '获取成功',
                        data: {}
                    }])
                })
        })

        mock.onPost('/user/list').reply(config => {
            return this.wait()
                .then(() => {
                    return Promise.resolve([
                        200,
                        {
                            code: 1,
                            msg: '获取成功',
                            data: Users
                        }
                    ])
                })
        })
    },
    wait(time = 500) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true)
            }, time)
        })
    }
}