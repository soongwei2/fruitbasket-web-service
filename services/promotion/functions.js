const _ = require('lodash');
const fruitBasketMaster = require('@soongwei/mysql-db/databases/fruitBasketMaster');
const sequelize = fruitBasketMaster.sequelize;
const Sequelize = sequelize.Sequelize;

class Functions {
    static checkCouponCode(payload) {
        return fruitBasketMaster.promotion.findOne({
            where: {
                expiryDate: {
                    [Sequelize.Op.gt]: Sequelize.literal('CURRENT_TIMESTAMP'),
                },
                quantity: {
                    [Sequelize.Op.gt]: 0,
                },
                couponCode: {
                    [Sequelize.Op.like]: '%' + payload.couponCode + '%'
                }
            }
        })
    }
}

module.exports = Functions;