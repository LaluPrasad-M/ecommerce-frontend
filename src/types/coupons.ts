export interface Coupon {
  id: string;
  code: string;
  discountPercentage: number;
  minimumCartValue: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface CouponFormData {
  code: string;
  discountPercentage: number | string;
  minimumCartValue: number | string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface CouponFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  formData: CouponFormData;
  formErrors: Partial<Record<keyof CouponFormData, string>>;
  formMode: 'add' | 'edit';
  loading?: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange?: (e: any) => void;
  handleBooleanSelectChange: (e: any) => void;
}

export interface CouponCardProps {
  coupon: Coupon;
  onEdit: (coupon: Coupon) => void;
  onDelete: (couponId: string) => void;
}

export interface CouponTableProps {
  coupons: Coupon[];
  loading: boolean;
  error: string | null;
  onEdit: (coupon: Coupon) => void;
  onDelete: (couponId: string) => void;
} 