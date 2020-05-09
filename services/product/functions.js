const _ = require('lodash');
const fruitBasketMaster = require('@soongwei/mysql-db/databases/fruitBasketMaster');
const sequelize = fruitBasketMaster.sequelize;
const Sequelize = sequelize.Sequelize;

class Functions {
    static getProduct(payload) {
        return fruitBasketMaster.product.findAll({
                where: payload,
                include: [{
                    model: fruitBasketMaster.promotionRules,
                    include: [{
                        model: fruitBasketMaster.promotion,
                        where: {
                            expiryDate: {
                                [Sequelize.Op.gt]: Sequelize.literal('CURRENT_TIMESTAMP'),
                            },
                        },
                        include: [{
                            model: fruitBasketMaster.promotionRules,
                          
                        }]
                    }]
                }]
            })
            .map(el => el.get({
                plain: true
            }))
            .then((results) => {
                //get promotion and flatten it
                return results.map((eachResult) => {
                    const allPromos = eachResult.promotionRules.map((eachPromoRules) => {
                        return eachPromoRules.promotion
                    })
                    delete eachResult.promotionRules;
                    eachResult.promotion = _.uniqBy(allPromos, 'id');
                    return eachResult;
                });
            })
    }
}

module.exports = Functions;