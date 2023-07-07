const Orders = require("../../api/v1/orders/model");

const getAllOrders = async (req) => {
  const { limit = 10, page = 1, startDate, endDate } = req.query;
  let conditions = {};
  if (req.user.role !== 'owner') {
    conditions = { ...conditions, 'historyEvent.organizer': req.user.organizer }
  }
  if (startDate && endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59);
    conditions = {
      ...conditions,
      date: {
        $gte: start,
        $lt: end
      },
    };
  }
  const result = await Orders.find(conditions)
    .limit(limit)
    .skip(limit * (page - 1));
  const count = await Orders.countDocuments(conditions);
  return { data: result, page: Math.ceil(count / limit), total: count }
}
module.exports = {
  getAllOrders
}
