export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role: 'administrator' | 'sales' | 'technician' | 'finance' | 'management';
  is_active: boolean;
  last_login?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Customer {
  id: string;
  name: string;
  category: 'SME' | 'Enterprise' | 'Government' | 'Residential' | 'Educational' | 'Healthcare';
  email?: string;
  phone?: string;
  physical_address?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  contact_person_name?: string;
  contact_person_phone?: string;
  contact_person_email?: string;
  tax_id?: string;
  registration_number?: string;
  is_active: boolean;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Lead {
  id: string;
  title: string;
  company_name?: string;
  contact_name: string;
  contact_email?: string;
  contact_phone?: string;
  service_interested?: string;
  estimated_value_ugx?: number;
  pipeline_stage: 'new-lead' | 'qualified' | 'site-survey' | 'quotation-sent' | 'negotiation' | 'won' | 'lost';
  source?: string;
  assigned_to?: string;
  probability_percentage?: number;
  expected_close_date?: Date;
  notes?: string;
  created_at: Date;
  updated_at: Date;
  closed_at?: Date;
}

export interface SupportTicket {
  id: string;
  ticket_number: string;
  customer_id: string;
  title: string;
  description?: string;
  issue_category: 'network-outage' | 'slow-internet' | 'equipment-failure' | 'configuration-request' | 'other';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  assigned_to?: string;
  sla_response_hours?: number;
  sla_resolution_hours?: number;
  responded_at?: Date;
  resolved_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Project {
  id: string;
  project_code: string;
  customer_id: string;
  title: string;
  description?: string;
  project_type: string;
  status: 'planning' | 'in-progress' | 'paused' | 'completed' | 'cancelled';
  start_date: Date;
  planned_end_date?: Date;
  actual_end_date?: Date;
  budget_ugx?: number;
  actual_cost_ugx?: number;
  assigned_engineer_id?: string;
  progress_percentage: number;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  customer_id: string;
  project_id?: string;
  subscription_id?: string;
  invoice_type: 'standard' | 'proforma' | 'credit-note';
  issue_date: Date;
  due_date: Date;
  total_amount_ugx: number;
  tax_amount_ugx?: number;
  status: 'draft' | 'issued' | 'sent' | 'viewed';
  paid_amount_ugx?: number;
  payment_status: 'unpaid' | 'partial' | 'paid' | 'overdue';
  line_items?: LineItem[];
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Payment {
  id: string;
  invoice_id: string;
  payment_date: Date;
  amount_ugx: number;
  payment_method: 'cash' | 'bank-transfer' | 'mobile-money' | 'check' | 'card';
  reference_number?: string;
  notes?: string;
  created_at: Date;
}

export interface InventoryItem {
  id: string;
  item_code: string;
  name: string;
  description?: string;
  category: string;
  quantity_in_stock: number;
  reorder_level?: number;
  unit_cost_ugx?: number;
  unit_selling_price_ugx?: number;
  supplier?: string;
  warranty_months?: number;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Quotation {
  id: string;
  quotation_number: string;
  lead_id?: string;
  customer_id?: string;
  description?: string;
  total_amount_ugx: number;
  valid_until?: Date;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  created_at: Date;
  updated_at: Date;
}

export interface LineItem {
  id?: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface AuditLog {
  id: string;
  user_id?: string;
  action: string;
  entity_type?: string;
  entity_id?: string;
  description?: string;
  old_values?: Record<string, any>;
  new_values?: Record<string, any>;
  ip_address?: string;
  created_at: Date;
}
