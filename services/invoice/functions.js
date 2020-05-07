const _ = require('lodash');
const fruitBasketMaster = require('@soongwei/mysql-db/databases/fruitBasketMaster');
const Sequelize = fruitBasketMaster.sequelize;
const promotionFunction = require('../promotion/functions');
const errorDef = require('../../utilities/handler')

class Functions {

    static postInvoice(payload) {
        return fruitBasketMaster.invoice.findAll({
            where: payload,
            include: [
                {
                    model: fruitBasketMaster.invoiceItems
                }
            ],
            order: [
                ['updatedAt', 'desc']
            ],
        })
    }

    static putInvoice(payload) {
        return Promise.resolve().then(() => {
            if (payload.couponCode) {
                return promotionFunction.checkCouponCode({
                    couponCode: payload.couponCode
                }).then((couponResult) => {
                    if (!couponResult) throw errorDef.INVALID_COUPON;
                    return;
                })
            } else {
                return;
            }
        }).then(() => {
            return fruitBasketMaster.invoice.create(payload.invoice, {
                include: [fruitBasketMaster.invoiceItems]
            });
        }).then((result) => {
            //handle coupon
            return fruitBasketMaster.promotion.decrement({
                quantity: 1
            }, {
                where: {
                    couponCode: payload.couponCode
                }
            }).then(() => {
                return result;
            });
        })


    }
}

module.exports = Functions;