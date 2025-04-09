export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export interface CustomerProductCardProps {
  product: Product;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number | string;
  stock: number | string;
  category: string;
  isActive: boolean;
  image: string;
}

export interface ProductFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  formData: ProductFormData;
  formErrors: Partial<Record<keyof ProductFormData, string>>;
  formMode: 'add' | 'edit';
  loading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (e: any) => void;
  handleBooleanSelectChange: (e: any) => void;
}

export interface ProductFilterProps {
  categories: string[];
  onFilterByCategory: (category: string) => void;
  onFilterByPriceRange: (min: number, max: number) => void;
  onClearFilters: () => void;
  minPrice?: number;
  maxPrice?: number;
  selectedCategory?: string;
  currentPriceRange?: number[];
} 