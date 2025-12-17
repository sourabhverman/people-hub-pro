-- Create app role enum
CREATE TYPE public.app_role AS ENUM ('employee', 'manager', 'hr_admin', 'super_admin');

-- Create user_roles table for RBAC
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'employee',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Create departments table
CREATE TABLE public.departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create designations table
CREATE TABLE public.designations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL UNIQUE,
    department_id UUID REFERENCES public.departments(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create employees table (profiles)
CREATE TABLE public.employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    employee_id TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    department_id UUID REFERENCES public.departments(id),
    designation_id UUID REFERENCES public.designations(id),
    reporting_manager_id UUID REFERENCES public.employees(id),
    date_of_joining DATE NOT NULL DEFAULT CURRENT_DATE,
    employment_type TEXT NOT NULL DEFAULT 'full-time' CHECK (employment_type IN ('full-time', 'contract', 'part-time', 'intern')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'notice_period', 'exited')),
    avatar_url TEXT,
    address TEXT,
    date_of_birth DATE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create leave_types table
CREATE TABLE public.leave_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    default_days INTEGER NOT NULL DEFAULT 0,
    is_paid BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create leave_balances table
CREATE TABLE public.leave_balances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE NOT NULL,
    leave_type_id UUID REFERENCES public.leave_types(id) ON DELETE CASCADE NOT NULL,
    year INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
    total_days NUMERIC(5,2) NOT NULL DEFAULT 0,
    used_days NUMERIC(5,2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (employee_id, leave_type_id, year)
);

-- Create leaves table
CREATE TABLE public.leaves (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE NOT NULL,
    leave_type_id UUID REFERENCES public.leave_types(id) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
    approved_by UUID REFERENCES public.employees(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create payroll table
CREATE TABLE public.payroll (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE NOT NULL,
    month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
    year INTEGER NOT NULL,
    basic_salary NUMERIC(12,2) NOT NULL DEFAULT 0,
    hra NUMERIC(12,2) NOT NULL DEFAULT 0,
    allowances NUMERIC(12,2) NOT NULL DEFAULT 0,
    deductions NUMERIC(12,2) NOT NULL DEFAULT 0,
    net_pay NUMERIC(12,2) NOT NULL DEFAULT 0,
    is_locked BOOLEAN NOT NULL DEFAULT false,
    paid_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (employee_id, month, year)
);

-- Create policies table
CREATE TABLE public.policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('leave', 'hr', 'it', 'general')),
    content TEXT,
    file_url TEXT,
    version INTEGER NOT NULL DEFAULT 1,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create policy_acknowledgements table
CREATE TABLE public.policy_acknowledgements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_id UUID REFERENCES public.policies(id) ON DELETE CASCADE NOT NULL,
    employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE NOT NULL,
    acknowledged_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (policy_id, employee_id)
);

-- Create exit_requests table
CREATE TABLE public.exit_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE NOT NULL UNIQUE,
    last_working_day DATE NOT NULL,
    reason TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'initiated' CHECK (status IN ('initiated', 'manager_approved', 'hr_approved', 'completed', 'cancelled')),
    manager_approved_by UUID REFERENCES public.employees(id),
    manager_approved_at TIMESTAMP WITH TIME ZONE,
    hr_approved_by UUID REFERENCES public.employees(id),
    hr_approved_at TIMESTAMP WITH TIME ZONE,
    asset_returned BOOLEAN NOT NULL DEFAULT false,
    knowledge_transferred BOOLEAN NOT NULL DEFAULT false,
    final_settlement_done BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create holidays table
CREATE TABLE public.holidays (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    date DATE NOT NULL,
    year INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
    is_optional BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.designations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaves ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payroll ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policy_acknowledgements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exit_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.holidays ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to get employee_id from user_id
CREATE OR REPLACE FUNCTION public.get_employee_id(_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.employees WHERE user_id = _user_id
$$;

-- Function to check if user is manager of employee
CREATE OR REPLACE FUNCTION public.is_manager_of(_manager_user_id UUID, _employee_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.employees e
    WHERE e.id = _employee_id
      AND e.reporting_manager_id = public.get_employee_id(_manager_user_id)
  )
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'hr_admin'));

-- RLS Policies for departments (readable by all authenticated, writable by admins)
CREATE POLICY "Authenticated users can view departments" ON public.departments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage departments" ON public.departments FOR ALL USING (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'hr_admin'));

-- RLS Policies for designations
CREATE POLICY "Authenticated users can view designations" ON public.designations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage designations" ON public.designations FOR ALL USING (public.has_role(auth.uid(), 'super_admin') OR public.has_role(auth.uid(), 'hr_admin'));

-- RLS Policies for employees
CREATE POLICY "Users can view their own profile" ON public.employees FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Managers can view their reportees" ON public.employees FOR SELECT USING (public.is_manager_of(auth.uid(), id));
CREATE POLICY "HR and Admins can view all employees" ON public.employees FOR SELECT USING (public.has_role(auth.uid(), 'hr_admin') OR public.has_role(auth.uid(), 'super_admin'));
CREATE POLICY "Users can update their own limited profile" ON public.employees FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "HR and Admins can manage all employees" ON public.employees FOR ALL USING (public.has_role(auth.uid(), 'hr_admin') OR public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for leave_types
CREATE POLICY "Authenticated users can view leave types" ON public.leave_types FOR SELECT TO authenticated USING (true);
CREATE POLICY "HR and Admins can manage leave types" ON public.leave_types FOR ALL USING (public.has_role(auth.uid(), 'hr_admin') OR public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for leave_balances
CREATE POLICY "Users can view their own leave balance" ON public.leave_balances FOR SELECT USING (employee_id = public.get_employee_id(auth.uid()));
CREATE POLICY "Managers can view reportees leave balance" ON public.leave_balances FOR SELECT USING (public.is_manager_of(auth.uid(), employee_id));
CREATE POLICY "HR and Admins can manage leave balances" ON public.leave_balances FOR ALL USING (public.has_role(auth.uid(), 'hr_admin') OR public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for leaves
CREATE POLICY "Users can view their own leaves" ON public.leaves FOR SELECT USING (employee_id = public.get_employee_id(auth.uid()));
CREATE POLICY "Users can create their own leaves" ON public.leaves FOR INSERT WITH CHECK (employee_id = public.get_employee_id(auth.uid()));
CREATE POLICY "Users can update their own pending leaves" ON public.leaves FOR UPDATE USING (employee_id = public.get_employee_id(auth.uid()) AND status = 'pending');
CREATE POLICY "Managers can view and approve reportees leaves" ON public.leaves FOR ALL USING (public.is_manager_of(auth.uid(), employee_id) OR public.has_role(auth.uid(), 'manager'));
CREATE POLICY "HR and Admins can manage all leaves" ON public.leaves FOR ALL USING (public.has_role(auth.uid(), 'hr_admin') OR public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for payroll
CREATE POLICY "Users can view their own payroll" ON public.payroll FOR SELECT USING (employee_id = public.get_employee_id(auth.uid()));
CREATE POLICY "HR and Admins can manage payroll" ON public.payroll FOR ALL USING (public.has_role(auth.uid(), 'hr_admin') OR public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for policies
CREATE POLICY "Authenticated users can view active policies" ON public.policies FOR SELECT TO authenticated USING (is_active = true);
CREATE POLICY "HR and Admins can manage policies" ON public.policies FOR ALL USING (public.has_role(auth.uid(), 'hr_admin') OR public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for policy_acknowledgements
CREATE POLICY "Users can view their own acknowledgements" ON public.policy_acknowledgements FOR SELECT USING (employee_id = public.get_employee_id(auth.uid()));
CREATE POLICY "Users can create their own acknowledgements" ON public.policy_acknowledgements FOR INSERT WITH CHECK (employee_id = public.get_employee_id(auth.uid()));
CREATE POLICY "HR and Admins can view all acknowledgements" ON public.policy_acknowledgements FOR SELECT USING (public.has_role(auth.uid(), 'hr_admin') OR public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for exit_requests
CREATE POLICY "Users can view their own exit request" ON public.exit_requests FOR SELECT USING (employee_id = public.get_employee_id(auth.uid()));
CREATE POLICY "Users can create their own exit request" ON public.exit_requests FOR INSERT WITH CHECK (employee_id = public.get_employee_id(auth.uid()));
CREATE POLICY "Managers can view reportees exit requests" ON public.exit_requests FOR SELECT USING (public.is_manager_of(auth.uid(), employee_id));
CREATE POLICY "HR and Admins can manage exit requests" ON public.exit_requests FOR ALL USING (public.has_role(auth.uid(), 'hr_admin') OR public.has_role(auth.uid(), 'super_admin'));

-- RLS Policies for holidays
CREATE POLICY "Authenticated users can view holidays" ON public.holidays FOR SELECT TO authenticated USING (true);
CREATE POLICY "HR and Admins can manage holidays" ON public.holidays FOR ALL USING (public.has_role(auth.uid(), 'hr_admin') OR public.has_role(auth.uid(), 'super_admin'));

-- Insert default leave types
INSERT INTO public.leave_types (name, description, default_days, is_paid) VALUES
('Casual Leave', 'For personal matters and short absences', 12, true),
('Sick Leave', 'For medical reasons and health issues', 12, true),
('Earned Leave', 'Accumulated leave based on tenure', 15, true),
('Unpaid Leave', 'Leave without pay', 0, false);

-- Insert default departments
INSERT INTO public.departments (name, description) VALUES
('Engineering', 'Software development and technical operations'),
('Human Resources', 'People management and recruitment'),
('Finance', 'Financial planning and accounting'),
('Marketing', 'Brand management and marketing operations'),
('Sales', 'Business development and sales');

-- Trigger to create employee profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  new_employee_id TEXT;
BEGIN
  -- Generate employee ID
  new_employee_id := 'EMP' || LPAD(NEXTVAL('employee_id_seq')::TEXT, 5, '0');
  
  -- Insert employee record
  INSERT INTO public.employees (user_id, employee_id, first_name, last_name, email)
  VALUES (
    NEW.id,
    new_employee_id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NEW.email
  );
  
  -- Assign default employee role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'employee');
  
  RETURN NEW;
END;
$$;

-- Create sequence for employee IDs
CREATE SEQUENCE IF NOT EXISTS employee_id_seq START 1;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers
CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON public.employees FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_leaves_updated_at BEFORE UPDATE ON public.leaves FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_policies_updated_at BEFORE UPDATE ON public.policies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_exit_requests_updated_at BEFORE UPDATE ON public.exit_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();