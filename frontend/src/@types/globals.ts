export interface User {
  id: string;
  name: string;
  email: string;
  profile_url: string;
  confirmation_email: boolean;
  createdAt: string;
  productConnection: {
    id: string;
  };
}

export interface AxiosRequest {
  data: string[];
}

export interface PropsPopup {
  userEdit?: User;
  productEdit?: Product;
  edit: boolean;
  refetchData?: any;
  navbar?: boolean;
  refetch?: () => void;
}

export interface Product {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  product_url_image?: string[];
}

export interface PropsItem {
  isActive?: "all" | "my" | "none";
  children: React.ReactNode;
}

export enum Routes {
  PRODUCTS = "/products",
  USER = "/users",
  CATEGORY = "/categories",
}

export interface Category {
  id: string;
  name: string;
  productConnection: {
    product: {
      id: string;
      name: string;
    };
  }[];
}

export interface ProductsGraphql {
  Products?: {
    id: String;
    name: string;
    description: string;
    price: number;
    product_url_image: string[];
    userConnection: {
      name: string;
      userId: string;
    };
  };
  getProductsFromUser?: {
    id: string;
    name: string;
    description: string;
    price: number;
    product_url_image: string[];
    userConnection: {
      name: string;
      userId: string;
    };
  };
}

export interface GraphqlCategory {
  categories: Category[];
}

export interface LoginType {
  login: {
    user: {
      id: string;
      name: string;
      profile_url: string | null;
      createdAt: string;
    };
    token: string;
  };
  errors?: [
    {
      message: string;
    }
  ];
}

export interface CreateUserType {
  createUser?: {
    id: string;
    name: string;
    profile_url: string | null;
    createdAt: string;
  };
  errors?: [
    {
      message: string;
    }
  ];
}

export interface User {
  id: string;
  name: string;
  email: string;
  profile_url: string;
  confirmation_email: boolean;
  createdAt: string;
  productConnection: {
    id: string;
  };
}

export interface GraphQLUser {
  getUsers: User[];
}

export interface AuthContextType {
  handleLogin: (email: string, password: string) => void;
  handleLogout: () => void;
  user: User;
  isAuthenticated: boolean;
  loading: boolean;
}
