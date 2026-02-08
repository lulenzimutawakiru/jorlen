import db from '../config/database';

export class ReportService {
  // Customer Analytics
  static async getCustomerStats() {
    const totalCustomers = await db.one(
      `SELECT COUNT(*) as total FROM customers WHERE is_active = true`
    );
    
    const customersByCategory = await db.manyOrNone(
      `SELECT category, COUNT(*) as count FROM customers WHERE is_active = true GROUP BY category`
    );

    const newCustomersThisMonth = await db.one(
      `SELECT COUNT(*) as total FROM customers 
       WHERE is_active = true AND DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE)`
    );

    return {
      total_customers: totalCustomers.total,
      customers_by_category: customersByCategory,
      new_customers_this_month: newCustomersThisMonth.total
    };
  }

  // Sales Pipeline Analytics
  static async getSalesPipelineStats() {
    const leadsCount = await db.manyOrNone(
      `SELECT pipeline_stage, COUNT(*) as count, SUM(estimated_value_ugx) as value 
       FROM leads WHERE closed_at IS NULL
       GROUP BY pipeline_stage`
    );

    const wonDeals = await db.one(
      `SELECT COUNT(*) as total, SUM(estimated_value_ugx) as value FROM leads WHERE pipeline_stage = 'won'`
    );

    const conversionRate = await db.one(
      `SELECT 
        COUNT(CASE WHEN pipeline_stage = 'won' THEN 1 END)::float / NULLIF(COUNT(*), 0) * 100 as rate
       FROM leads`
    );

    return {
      pipeline_stages: leadsCount,
      won_deals: wonDeals,
      conversion_rate: conversionRate.rate || 0
    };
  }

  // Support Ticket Analytics
  static async getTicketStats() {
    const ticketsByStatus = await db.manyOrNone(
      `SELECT status, COUNT(*) as count FROM support_tickets GROUP BY status`
    );

    const slaBreaches = await db.one(
      `SELECT COUNT(*) as total FROM support_tickets 
       WHERE status != 'closed' AND CURRENT_TIMESTAMP - created_at > INTERVAL '1 day' * sla_resolution_hours`
    );

    const avgResolutionTime = await db.one(
      `SELECT AVG(EXTRACT(EPOCH FROM (resolved_at - created_at)) / 3600) as hours 
       FROM support_tickets WHERE resolved_at IS NOT NULL`
    );

    const openTickets = await db.one(
      `SELECT COUNT(*) as total FROM support_tickets WHERE status IN ('open', 'in-progress')`
    );

    return {
      tickets_by_status: ticketsByStatus,
      sla_breaches: slaBreaches.total,
      average_resolution_hours: Math.round(avgResolutionTime.hours || 0),
      open_tickets: openTickets.total
    };
  }

  // Financial Analytics
  static async getFinancialStats() {
    const revenue = await db.one(
      `SELECT 
        SUM(total_amount_ugx) as total_issued,
        SUM(paid_amount_ugx) as paid,
        SUM(total_amount_ugx - COALESCE(paid_amount_ugx, 0)) as outstanding
       FROM invoices`
    );

    const revenueByMonth = await db.manyOrNone(
      `SELECT DATE_TRUNC('month', issue_date)::date as month, SUM(total_amount_ugx) as total
       FROM invoices
       WHERE EXTRACT(YEAR FROM issue_date) = EXTRACT(YEAR FROM CURRENT_DATE)
       GROUP BY DATE_TRUNC('month', issue_date)
       ORDER BY month DESC
       LIMIT 12`
    );

    const overdueInvoices = await db.one(
      `SELECT COUNT(*) as count, SUM(total_amount_ugx - COALESCE(paid_amount_ugx, 0)) as amount
       FROM invoices WHERE due_date < CURRENT_DATE AND payment_status != 'paid'`
    );

    return {
      total_issued_ugx: revenue.total_issued || 0,
      total_paid_ugx: revenue.paid || 0,
      outstanding_balance_ugx: revenue.outstanding || 0,
      overdue_invoices: overdueInvoices.count,
      overdue_amount_ugx: overdueInvoices.amount || 0,
      revenue_by_month: revenueByMonth
    };
  }

  // Project Analytics
  static async getProjectStats() {
    const projectsByStatus = await db.manyOrNone(
      `SELECT status, COUNT(*) as count FROM projects GROUP BY status`
    );

    const projectsOnBudget = await db.one(
      `SELECT COUNT(*) as on_budget, COUNT(*) FILTER (WHERE actual_cost_ugx > budget_ugx) as over_budget
       FROM projects WHERE actual_cost_ugx IS NOT NULL`
    );

    const avgCompletion = await db.one(
      `SELECT AVG(progress_percentage) as avg_progress FROM projects WHERE status != 'cancelled'`
    );

    return {
      projects_by_status: projectsByStatus,
      projects_on_budget: projectsOnBudget.on_budget,
      projects_over_budget: projectsOnBudget.over_budget,
      average_completion_percentage: Math.round(avgCompletion.avg_progress || 0)
    };
  }

  // Inventory Analytics
  static async getInventoryStats() {
    const stockValue = await db.one(
      `SELECT SUM(quantity_in_stock * unit_cost_ugx) as total_value FROM inventory_items`
    );

    const lowStockItems = await db.one(
      `SELECT COUNT(*) as count FROM inventory_items 
       WHERE quantity_in_stock <= reorder_level`
    );

    const itemsByCategory = await db.manyOrNone(
      `SELECT category, COUNT(*) as count, SUM(quantity_in_stock) as total_stock
       FROM inventory_items GROUP BY category`
    );

    return {
      total_inventory_value_ugx: stockValue.total_value || 0,
      low_stock_items: lowStockItems.count,
      items_by_category: itemsByCategory
    };
  }

  // User Activity & Performance
  static async getUserPerformance() {
    const topSalesAgents = await db.manyOrNone(
      `SELECT u.id, u.first_name, u.last_name, COUNT(l.id) as leads_created, 
        COUNT(CASE WHEN l.pipeline_stage = 'won' THEN 1 END) as deals_won
       FROM users u
       LEFT JOIN leads l ON u.id = l.assigned_to
       WHERE u.role = 'sales'
       GROUP BY u.id
       ORDER BY deals_won DESC
       LIMIT 10`
    );

    const topTechnicians = await db.manyOrNone(
      `SELECT u.id, u.first_name, u.last_name, COUNT(t.id) as tickets_resolved
       FROM users u
       LEFT JOIN support_tickets t ON u.id = t.assigned_to AND t.status = 'closed'
       WHERE u.role IN ('technician', 'engineer')
       GROUP BY u.id
       ORDER BY tickets_resolved DESC
       LIMIT 10`
    );

    return {
      top_sales_agents: topSalesAgents,
      top_technicians: topTechnicians
    };
  }

  // Dashboard Summary
  static async getDashboardSummary() {
    const [customers, pipeline, tickets, financial, projects, inventory, performance] = await Promise.all([
      this.getCustomerStats(),
      this.getSalesPipelineStats(),
      this.getTicketStats(),
      this.getFinancialStats(),
      this.getProjectStats(),
      this.getInventoryStats(),
      this.getUserPerformance()
    ]);

    return {
      timestamp: new Date().toISOString(),
      customers,
      sales: pipeline,
      support: tickets,
      financial,
      projects,
      inventory,
      performance
    };
  }
}
