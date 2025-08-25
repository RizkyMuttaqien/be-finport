const { Report } = require("../models");
const response = require("../helpers/response");

class ReportController {
    static async create(req, res) {
        try {
            const { title, income, expense, report_date } = req.body;
            const balance = income - expense;
            const report = await Report.create({
                title, income, expense, balance, report_date, user_id: req.user.id
            });
            response.success(res, 'Report created successfully', report);
        } catch (err) {
            response.error(res, err.message, 500);
        }
    }

    static async getAll(req, res) {
        try {
            let reports;
            if (req.user.role === "admin") {
                reports = await Report.findAll();
            } else {
                reports = await Report.findAll({ where: { user_id: req.user.id } });
            }
            let total = {
                title: "Total",
                income: reports.reduce((acc, report) => acc + report.income, 0),
                expense: reports.reduce((acc, report) => acc + report.expense, 0),
                balance: reports.reduce((acc, report) => acc + report.balance, 0),
            };

            response.success(res, 'Reports retrieved successfully', { reports, total });
        } catch (err) {
            response.error(res, err.message, 500);
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const report = await Report.findOne({ where: { id } });

            if (!report) return response.error(res, "Report not found", 404);

            if (req.user.role !== "admin" && report.user_id !== req.user.id) {
                return response.error(res, "Forbidden", 403);
            }

            response.success(res, "Report retrieved successfully", report);
        } catch (err) {
            response.error(res, err.message, 500);
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { title, income, expense, report_date } = req.body;

            const report = await Report.findOne({ where: { id } });
            if (!report) return response.error(res, "Report not found", 404);
            if (req.user.role !== "admin" && report.user_id !== req.user.id) {
                return response.error(res, "Forbidden", 403);
            }

            const balance = income - expense;
            await report.update({ title, income, expense, balance, report_date });

            response.success(res, "Report updated successfully", report);
        } catch (err) {
            response.error(res, err.message, 500);
        }
    }


    static async delete(req, res) {
        try {
            const { id } = req.params;
            const report = await Report.findOne({ where: { id } });
            if (!report) return response.error(res, "Report not found", 404);
            if (req.user.role !== "admin" && report.user_id !== req.user.id) {
                return response.error(res, "Forbidden", 403);
            }

            await report.destroy();
            response.success(res, "Report deleted successfully", null);
        } catch (err) {
            response.error(res, err.message, 500);
        }
    }
}

module.exports = ReportController;
