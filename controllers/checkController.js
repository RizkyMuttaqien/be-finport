

const response = require('../helpers/response');
class CheckController {
    static async checkText(req, res) {
        try {
            const { first_text, second_text, is_sensitive = 0 } = req.body;
            const first_array = first_text.split("");
            const second_array = second_text.split("");
            let count = 0;

            for (let i = 0; i < first_array.length; i++) {
                for (let j = 0; j < second_array.length; j++) {
                    if (is_sensitive == 1) {
                        if (first_array[i] === second_array[j]) {
                            count++;
                            break;
                        }
                    } else {
                        if (first_array[i].toLowerCase() === second_array[j].toLowerCase()) {
                            count++;
                            break;
                        }
                    }
                }
            }
            const percentage = ((count / first_array.length) * 100).toFixed(2);
            response.success(res, 'Text comparison successful', { count, percentage });
        } catch (err) {
            response.error(res, err.message, 500);
        }
    }
}
module.exports = CheckController;