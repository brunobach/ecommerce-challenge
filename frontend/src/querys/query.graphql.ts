import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation(
    $userId: String!
    $name: String!
    $description: String!
    $price: Float!
    $user_url_image: [String!]!
    $is_on_sale: Boolean!
  ) {
    createuser(
      userId: $userId
      name: $name
      description: $description
      price: $price
      user_url_image: $user_url_image
      is_on_sale: $is_on_sale
    ) {
      id
      name
    }
  }
`;

export const UPDATE_USER = gql`
  mutation(
    $id: String!
    $name: String
    $email: String
    $password: String
    $profile_url: String
  ) {
    updateUser(
      data: {
        id: $id
        name: $name
        email: $email
        password: $password
        profile_url: $profile_url
      }
    ) {
      id
      name
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation(
    $userId: String!
    $name: String!
    $description: String!
    $price: Float!
    $product_url_image: [String!]!
    $is_on_sale: Boolean!
  ) {
    createProduct(
      userId: $userId
      name: $name
      description: $description
      price: $price
      product_url_image: $product_url_image
      is_on_sale: $is_on_sale
    ) {
      id
      name
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation(
    $product_url_image: [String!]!
    $userId: String!
    $is_on_sale: Boolean!
    $price: Float!
    $description: String!
    $name: String!
    $id: String!
  ) {
    updateProduct(
      id: $id
      userId: $userId
      name: $name
      description: $description
      price: $price
      product_url_image: $product_url_image
      is_on_sale: $is_on_sale
    ) {
      id
      name
    }
  }
`;

export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
      productConnection {
        product {
          id
          name
        }
      }
    }
  }
`;

export const GET_PRODUCTS_CATEGORIES = gql`
  query {
    Products {
      id
      name
    }
  }
`;

export const CREATE_CATEGORY_PRODUCT = gql`
  mutation($productId: String!, $categoryId: String!) {
    createProductCategory(productId: $productId, categoryId: $categoryId) {
      id
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation($id: String!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation($name: String!) {
    createCategory(name: $name) {
      id
    }
  }
`;

export const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      user {
        id
        name
        profile_url
        createdAt
      }
      token
    }
  }
`;

const ProductsFragment = gql`
  fragment ProductsFragment on Product {
    id
    name
    description
    price
    product_url_image
    userConnection {
      name
      id
    }
  }
`;

export const GET_PRODUCTS_BY_USER = gql`
  query getProductsFromUser($userId: String!) {
    getProductsFromUser(userId: $userId) {
      ...ProductsFragment
    }
  }
  ${ProductsFragment}
`;

export const GET_PRODUCTS = gql`
  query {
    Products {
      ...ProductsFragment
    }
  }
  ${ProductsFragment}
`;

export const REGISTER_USER = gql`
  mutation($email: String!, $password: String!, $name: String!) {
    createUser(data: { email: $email, password: $password, name: $name }) {
      id
    }
  }
`;

export const GET_USERS = gql`
  query {
    getUsers {
      id
      name
      email
      confirmation_email
      profile_url
      createdAt
      productConnection {
        id
      }
    }
  }
`;

export const USER_INITIAL_DATA = [
  {
    id: "",
    name: "",
    email: "",
    profile_url: "",
    confirmation_email: false,
    createdAt: "",
    productConnection: {
      id: "",
    },
  },
];
