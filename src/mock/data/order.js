import Mock from 'mockjs';

// 订单设置列表
const orderSetList = [];
for (let i = 0; i < 20; i++) {
  orderSetList.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    unit: '天',
    'day|18-60': 1,
    description: `这是描述信息${i}`,
  }));
}

export { orderSetList };
