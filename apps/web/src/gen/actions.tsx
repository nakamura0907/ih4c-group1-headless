import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;

export const CreateOriginalCourseDocument = gql`
  mutation CreateOriginalCourse($data: OriginalCourseInput!) {
    createOriginalCourse(data: $data) {
      data {
        id
      }
    }
  }
`;
export type CreateOriginalCourseMutationFn = Apollo.MutationFunction<
  CreateOriginalCourseMutation,
  CreateOriginalCourseMutationVariables
>;

/**
 * __useCreateOriginalCourseMutation__
 *
 * To run a mutation, you first call `useCreateOriginalCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOriginalCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOriginalCourseMutation, { data, loading, error }] = useCreateOriginalCourseMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOriginalCourseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOriginalCourseMutation,
    CreateOriginalCourseMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateOriginalCourseMutation,
    CreateOriginalCourseMutationVariables
  >(CreateOriginalCourseDocument, options);
}
export type CreateOriginalCourseMutationHookResult = ReturnType<
  typeof useCreateOriginalCourseMutation
>;
export type CreateOriginalCourseMutationResult =
  Apollo.MutationResult<CreateOriginalCourseMutation>;
export type CreateOriginalCourseMutationOptions = Apollo.BaseMutationOptions<
  CreateOriginalCourseMutation,
  CreateOriginalCourseMutationVariables
>;
export const CategoriesDocument = gql`
  query Categories {
    categories {
      data {
        id
        attributes {
          title
        }
      }
    }
  }
`;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CategoriesQuery,
    CategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(
    CategoriesDocument,
    options,
  );
}
export function useCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CategoriesQuery,
    CategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(
    CategoriesDocument,
    options,
  );
}
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<
  typeof useCategoriesLazyQuery
>;
export type CategoriesQueryResult = Apollo.QueryResult<
  CategoriesQuery,
  CategoriesQueryVariables
>;
export const ModelCourseDocument = gql`
  query ModelCourse($id: ID!) {
    modelCourse(id: $id) {
      data {
        attributes {
          title
          spots {
            data {
              id
              attributes {
                name
                photo {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useModelCourseQuery__
 *
 * To run a query within a React component, call `useModelCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useModelCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useModelCourseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useModelCourseQuery(
  baseOptions: Apollo.QueryHookOptions<
    ModelCourseQuery,
    ModelCourseQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ModelCourseQuery, ModelCourseQueryVariables>(
    ModelCourseDocument,
    options,
  );
}
export function useModelCourseLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ModelCourseQuery,
    ModelCourseQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ModelCourseQuery, ModelCourseQueryVariables>(
    ModelCourseDocument,
    options,
  );
}
export type ModelCourseQueryHookResult = ReturnType<typeof useModelCourseQuery>;
export type ModelCourseLazyQueryHookResult = ReturnType<
  typeof useModelCourseLazyQuery
>;
export type ModelCourseQueryResult = Apollo.QueryResult<
  ModelCourseQuery,
  ModelCourseQueryVariables
>;
export const ModelCoursesDocument = gql`
  query ModelCourses {
    modelCourses(sort: ["createdAt:desc"]) {
      data {
        id
        attributes {
          title
          spots(pagination: { limit: 1 }) {
            data {
              attributes {
                name
                photo {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useModelCoursesQuery__
 *
 * To run a query within a React component, call `useModelCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useModelCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useModelCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useModelCoursesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ModelCoursesQuery,
    ModelCoursesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ModelCoursesQuery, ModelCoursesQueryVariables>(
    ModelCoursesDocument,
    options,
  );
}
export function useModelCoursesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ModelCoursesQuery,
    ModelCoursesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ModelCoursesQuery, ModelCoursesQueryVariables>(
    ModelCoursesDocument,
    options,
  );
}
export type ModelCoursesQueryHookResult = ReturnType<
  typeof useModelCoursesQuery
>;
export type ModelCoursesLazyQueryHookResult = ReturnType<
  typeof useModelCoursesLazyQuery
>;
export type ModelCoursesQueryResult = Apollo.QueryResult<
  ModelCoursesQuery,
  ModelCoursesQueryVariables
>;
export const OriginalCourseDocument = gql`
  query OriginalCourse($id: ID!) {
    originalCourse(id: $id) {
      data {
        attributes {
          title
          spots {
            data {
              id
              attributes {
                name
                photo {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useOriginalCourseQuery__
 *
 * To run a query within a React component, call `useOriginalCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useOriginalCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOriginalCourseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOriginalCourseQuery(
  baseOptions: Apollo.QueryHookOptions<
    OriginalCourseQuery,
    OriginalCourseQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<OriginalCourseQuery, OriginalCourseQueryVariables>(
    OriginalCourseDocument,
    options,
  );
}
export function useOriginalCourseLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    OriginalCourseQuery,
    OriginalCourseQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<OriginalCourseQuery, OriginalCourseQueryVariables>(
    OriginalCourseDocument,
    options,
  );
}
export type OriginalCourseQueryHookResult = ReturnType<
  typeof useOriginalCourseQuery
>;
export type OriginalCourseLazyQueryHookResult = ReturnType<
  typeof useOriginalCourseLazyQuery
>;
export type OriginalCourseQueryResult = Apollo.QueryResult<
  OriginalCourseQuery,
  OriginalCourseQueryVariables
>;
export const OriginalCoursesDocument = gql`
  query OriginalCourses(
    $filters: OriginalCourseFiltersInput!
    $pagination: PaginationArg!
  ) {
    originalCourses(
      filters: $filters
      sort: ["createdAt:desc"]
      pagination: $pagination
    ) {
      data {
        id
        attributes {
          title
          spots(pagination: { limit: 1 }) {
            data {
              attributes {
                name
                photo {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
      meta {
        pagination {
          pageCount
        }
      }
    }
  }
`;

/**
 * __useOriginalCoursesQuery__
 *
 * To run a query within a React component, call `useOriginalCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useOriginalCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOriginalCoursesQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useOriginalCoursesQuery(
  baseOptions: Apollo.QueryHookOptions<
    OriginalCoursesQuery,
    OriginalCoursesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<OriginalCoursesQuery, OriginalCoursesQueryVariables>(
    OriginalCoursesDocument,
    options,
  );
}
export function useOriginalCoursesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    OriginalCoursesQuery,
    OriginalCoursesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    OriginalCoursesQuery,
    OriginalCoursesQueryVariables
  >(OriginalCoursesDocument, options);
}
export type OriginalCoursesQueryHookResult = ReturnType<
  typeof useOriginalCoursesQuery
>;
export type OriginalCoursesLazyQueryHookResult = ReturnType<
  typeof useOriginalCoursesLazyQuery
>;
export type OriginalCoursesQueryResult = Apollo.QueryResult<
  OriginalCoursesQuery,
  OriginalCoursesQueryVariables
>;
export const SpotDocument = gql`
  query Spot($id: ID!) {
    spot(id: $id) {
      data {
        attributes {
          name
          description
          photo {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useSpotQuery__
 *
 * To run a query within a React component, call `useSpotQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpotQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpotQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSpotQuery(
  baseOptions: Apollo.QueryHookOptions<SpotQuery, SpotQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SpotQuery, SpotQueryVariables>(SpotDocument, options);
}
export function useSpotLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SpotQuery, SpotQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SpotQuery, SpotQueryVariables>(
    SpotDocument,
    options,
  );
}
export type SpotQueryHookResult = ReturnType<typeof useSpotQuery>;
export type SpotLazyQueryHookResult = ReturnType<typeof useSpotLazyQuery>;
export type SpotQueryResult = Apollo.QueryResult<SpotQuery, SpotQueryVariables>;
export const SpotListDocument = gql`
  query SpotList($filters: SpotFiltersInput!, $pagination: PaginationArg!) {
    spots(filters: $filters, pagination: $pagination) {
      data {
        id
        attributes {
          name
        }
      }
      meta {
        pagination {
          pageCount
        }
      }
    }
  }
`;

/**
 * __useSpotListQuery__
 *
 * To run a query within a React component, call `useSpotListQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpotListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpotListQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useSpotListQuery(
  baseOptions: Apollo.QueryHookOptions<SpotListQuery, SpotListQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SpotListQuery, SpotListQueryVariables>(
    SpotListDocument,
    options,
  );
}
export function useSpotListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SpotListQuery,
    SpotListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SpotListQuery, SpotListQueryVariables>(
    SpotListDocument,
    options,
  );
}
export type SpotListQueryHookResult = ReturnType<typeof useSpotListQuery>;
export type SpotListLazyQueryHookResult = ReturnType<
  typeof useSpotListLazyQuery
>;
export type SpotListQueryResult = Apollo.QueryResult<
  SpotListQuery,
  SpotListQueryVariables
>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
  Upload: { input: any; output: any };
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  contains?: InputMaybe<Scalars["Boolean"]["input"]>;
  containsi?: InputMaybe<Scalars["Boolean"]["input"]>;
  endsWith?: InputMaybe<Scalars["Boolean"]["input"]>;
  eq?: InputMaybe<Scalars["Boolean"]["input"]>;
  eqi?: InputMaybe<Scalars["Boolean"]["input"]>;
  gt?: InputMaybe<Scalars["Boolean"]["input"]>;
  gte?: InputMaybe<Scalars["Boolean"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  lt?: InputMaybe<Scalars["Boolean"]["input"]>;
  lte?: InputMaybe<Scalars["Boolean"]["input"]>;
  ne?: InputMaybe<Scalars["Boolean"]["input"]>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars["Boolean"]["input"]>;
  notContainsi?: InputMaybe<Scalars["Boolean"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type Category = {
  __typename?: "Category";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  spots?: Maybe<SpotRelationResponseCollection>;
  title: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type CategorySpotsArgs = {
  filters?: InputMaybe<SpotFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type CategoryEntity = {
  __typename?: "CategoryEntity";
  attributes?: Maybe<Category>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type CategoryEntityResponse = {
  __typename?: "CategoryEntityResponse";
  data?: Maybe<CategoryEntity>;
};

export type CategoryEntityResponseCollection = {
  __typename?: "CategoryEntityResponseCollection";
  data: Array<CategoryEntity>;
  meta: ResponseCollectionMeta;
};

export type CategoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<CategoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CategoryFiltersInput>>>;
  spots?: InputMaybe<SpotFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CategoryInput = {
  spots?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type CategoryRelationResponseCollection = {
  __typename?: "CategoryRelationResponseCollection";
  data: Array<CategoryEntity>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  contains?: InputMaybe<Scalars["DateTime"]["input"]>;
  containsi?: InputMaybe<Scalars["DateTime"]["input"]>;
  endsWith?: InputMaybe<Scalars["DateTime"]["input"]>;
  eq?: InputMaybe<Scalars["DateTime"]["input"]>;
  eqi?: InputMaybe<Scalars["DateTime"]["input"]>;
  gt?: InputMaybe<Scalars["DateTime"]["input"]>;
  gte?: InputMaybe<Scalars["DateTime"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  lt?: InputMaybe<Scalars["DateTime"]["input"]>;
  lte?: InputMaybe<Scalars["DateTime"]["input"]>;
  ne?: InputMaybe<Scalars["DateTime"]["input"]>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars["DateTime"]["input"]>;
  notContainsi?: InputMaybe<Scalars["DateTime"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars["String"]["input"]>;
  caption?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  contains?: InputMaybe<Scalars["Float"]["input"]>;
  containsi?: InputMaybe<Scalars["Float"]["input"]>;
  endsWith?: InputMaybe<Scalars["Float"]["input"]>;
  eq?: InputMaybe<Scalars["Float"]["input"]>;
  eqi?: InputMaybe<Scalars["Float"]["input"]>;
  gt?: InputMaybe<Scalars["Float"]["input"]>;
  gte?: InputMaybe<Scalars["Float"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  lt?: InputMaybe<Scalars["Float"]["input"]>;
  lte?: InputMaybe<Scalars["Float"]["input"]>;
  ne?: InputMaybe<Scalars["Float"]["input"]>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars["Float"]["input"]>;
  notContainsi?: InputMaybe<Scalars["Float"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["Float"]["input"]>;
};

export type GenericMorph =
  | Category
  | I18NLocale
  | ModelCourse
  | OriginalCourse
  | Spot
  | Tag
  | UploadFile
  | UploadFolder
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | UsersPermissionsUser;

export type I18NLocale = {
  __typename?: "I18NLocale";
  code?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type I18NLocaleEntity = {
  __typename?: "I18NLocaleEntity";
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type I18NLocaleEntityResponse = {
  __typename?: "I18NLocaleEntityResponse";
  data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: "I18NLocaleEntityResponseCollection";
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  contains?: InputMaybe<Scalars["ID"]["input"]>;
  containsi?: InputMaybe<Scalars["ID"]["input"]>;
  endsWith?: InputMaybe<Scalars["ID"]["input"]>;
  eq?: InputMaybe<Scalars["ID"]["input"]>;
  eqi?: InputMaybe<Scalars["ID"]["input"]>;
  gt?: InputMaybe<Scalars["ID"]["input"]>;
  gte?: InputMaybe<Scalars["ID"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  lt?: InputMaybe<Scalars["ID"]["input"]>;
  lte?: InputMaybe<Scalars["ID"]["input"]>;
  ne?: InputMaybe<Scalars["ID"]["input"]>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars["ID"]["input"]>;
  notContainsi?: InputMaybe<Scalars["ID"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["ID"]["input"]>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  contains?: InputMaybe<Scalars["Int"]["input"]>;
  containsi?: InputMaybe<Scalars["Int"]["input"]>;
  endsWith?: InputMaybe<Scalars["Int"]["input"]>;
  eq?: InputMaybe<Scalars["Int"]["input"]>;
  eqi?: InputMaybe<Scalars["Int"]["input"]>;
  gt?: InputMaybe<Scalars["Int"]["input"]>;
  gte?: InputMaybe<Scalars["Int"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  lt?: InputMaybe<Scalars["Int"]["input"]>;
  lte?: InputMaybe<Scalars["Int"]["input"]>;
  ne?: InputMaybe<Scalars["Int"]["input"]>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars["Int"]["input"]>;
  notContainsi?: InputMaybe<Scalars["Int"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["Int"]["input"]>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  contains?: InputMaybe<Scalars["JSON"]["input"]>;
  containsi?: InputMaybe<Scalars["JSON"]["input"]>;
  endsWith?: InputMaybe<Scalars["JSON"]["input"]>;
  eq?: InputMaybe<Scalars["JSON"]["input"]>;
  eqi?: InputMaybe<Scalars["JSON"]["input"]>;
  gt?: InputMaybe<Scalars["JSON"]["input"]>;
  gte?: InputMaybe<Scalars["JSON"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  lt?: InputMaybe<Scalars["JSON"]["input"]>;
  lte?: InputMaybe<Scalars["JSON"]["input"]>;
  ne?: InputMaybe<Scalars["JSON"]["input"]>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars["JSON"]["input"]>;
  notContainsi?: InputMaybe<Scalars["JSON"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["JSON"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["JSON"]["input"]>;
};

export type ModelCourse = {
  __typename?: "ModelCourse";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  spots?: Maybe<SpotRelationResponseCollection>;
  tags?: Maybe<TagRelationResponseCollection>;
  title: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ModelCourseSpotsArgs = {
  filters?: InputMaybe<SpotFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ModelCourseTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ModelCourseEntity = {
  __typename?: "ModelCourseEntity";
  attributes?: Maybe<ModelCourse>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type ModelCourseEntityResponse = {
  __typename?: "ModelCourseEntityResponse";
  data?: Maybe<ModelCourseEntity>;
};

export type ModelCourseEntityResponseCollection = {
  __typename?: "ModelCourseEntityResponseCollection";
  data: Array<ModelCourseEntity>;
  meta: ResponseCollectionMeta;
};

export type ModelCourseFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ModelCourseFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ModelCourseFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ModelCourseFiltersInput>>>;
  spots?: InputMaybe<SpotFiltersInput>;
  tags?: InputMaybe<TagFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ModelCourseInput = {
  spots?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type ModelCourseRelationResponseCollection = {
  __typename?: "ModelCourseRelationResponseCollection";
  data: Array<ModelCourseEntity>;
};

export type Mutation = {
  __typename?: "Mutation";
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createCategory?: Maybe<CategoryEntityResponse>;
  createModelCourse?: Maybe<ModelCourseEntityResponse>;
  createOriginalCourse?: Maybe<OriginalCourseEntityResponse>;
  createSpot?: Maybe<SpotEntityResponse>;
  createTag?: Maybe<TagEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteCategory?: Maybe<CategoryEntityResponse>;
  deleteModelCourse?: Maybe<ModelCourseEntityResponse>;
  deleteOriginalCourse?: Maybe<OriginalCourseEntityResponse>;
  deleteSpot?: Maybe<SpotEntityResponse>;
  deleteTag?: Maybe<TagEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateCategory?: Maybe<CategoryEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateModelCourse?: Maybe<ModelCourseEntityResponse>;
  updateOriginalCourse?: Maybe<OriginalCourseEntityResponse>;
  updateSpot?: Maybe<SpotEntityResponse>;
  updateTag?: Maybe<TagEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
};

export type MutationChangePasswordArgs = {
  currentPassword: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  passwordConfirmation: Scalars["String"]["input"];
};

export type MutationCreateCategoryArgs = {
  data: CategoryInput;
};

export type MutationCreateModelCourseArgs = {
  data: ModelCourseInput;
};

export type MutationCreateOriginalCourseArgs = {
  data: OriginalCourseInput;
};

export type MutationCreateSpotArgs = {
  data: SpotInput;
};

export type MutationCreateTagArgs = {
  data: TagInput;
};

export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};

export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};

export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};

export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};

export type MutationDeleteCategoryArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteModelCourseArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteOriginalCourseArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteSpotArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteTagArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteUploadFileArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteUploadFolderArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationEmailConfirmationArgs = {
  confirmation: Scalars["String"]["input"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"]["input"];
};

export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};

export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars["String"]["input"]>;
  files: Array<InputMaybe<Scalars["Upload"]["input"]>>;
  ref?: InputMaybe<Scalars["String"]["input"]>;
  refId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};

export type MutationRemoveFileArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationResetPasswordArgs = {
  code: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  passwordConfirmation: Scalars["String"]["input"];
};

export type MutationUpdateCategoryArgs = {
  data: CategoryInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateFileInfoArgs = {
  id: Scalars["ID"]["input"];
  info?: InputMaybe<FileInfoInput>;
};

export type MutationUpdateModelCourseArgs = {
  data: ModelCourseInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateOriginalCourseArgs = {
  data: OriginalCourseInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateSpotArgs = {
  data: SpotInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateTagArgs = {
  data: TagInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars["ID"]["input"];
};

export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars["ID"]["input"];
};

export type MutationUploadArgs = {
  field?: InputMaybe<Scalars["String"]["input"]>;
  file: Scalars["Upload"]["input"];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars["String"]["input"]>;
  refId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type OriginalCourse = {
  __typename?: "OriginalCourse";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  spots?: Maybe<SpotRelationResponseCollection>;
  tags?: Maybe<TagRelationResponseCollection>;
  title: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type OriginalCourseSpotsArgs = {
  filters?: InputMaybe<SpotFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type OriginalCourseTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type OriginalCourseEntity = {
  __typename?: "OriginalCourseEntity";
  attributes?: Maybe<OriginalCourse>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type OriginalCourseEntityResponse = {
  __typename?: "OriginalCourseEntityResponse";
  data?: Maybe<OriginalCourseEntity>;
};

export type OriginalCourseEntityResponseCollection = {
  __typename?: "OriginalCourseEntityResponseCollection";
  data: Array<OriginalCourseEntity>;
  meta: ResponseCollectionMeta;
};

export type OriginalCourseFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<OriginalCourseFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<OriginalCourseFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<OriginalCourseFiltersInput>>>;
  spots?: InputMaybe<SpotFiltersInput>;
  tags?: InputMaybe<TagFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type OriginalCourseInput = {
  spots?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type OriginalCourseRelationResponseCollection = {
  __typename?: "OriginalCourseRelationResponseCollection";
  data: Array<OriginalCourseEntity>;
};

export type Pagination = {
  __typename?: "Pagination";
  page: Scalars["Int"]["output"];
  pageCount: Scalars["Int"]["output"];
  pageSize: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  pageSize?: InputMaybe<Scalars["Int"]["input"]>;
  start?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Query = {
  __typename?: "Query";
  categories?: Maybe<CategoryEntityResponseCollection>;
  category?: Maybe<CategoryEntityResponse>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  modelCourse?: Maybe<ModelCourseEntityResponse>;
  modelCourses?: Maybe<ModelCourseEntityResponseCollection>;
  originalCourse?: Maybe<OriginalCourseEntityResponse>;
  originalCourses?: Maybe<OriginalCourseEntityResponseCollection>;
  spot?: Maybe<SpotEntityResponse>;
  spots?: Maybe<SpotEntityResponseCollection>;
  tag?: Maybe<TagEntityResponse>;
  tags?: Maybe<TagEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};

export type QueryCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryModelCourseArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryModelCoursesArgs = {
  filters?: InputMaybe<ModelCourseFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryOriginalCourseArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryOriginalCoursesArgs = {
  filters?: InputMaybe<OriginalCourseFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QuerySpotArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QuerySpotsArgs = {
  filters?: InputMaybe<SpotFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryTagArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryUploadFolderArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ResponseCollectionMeta = {
  __typename?: "ResponseCollectionMeta";
  pagination: Pagination;
};

export type Spot = {
  __typename?: "Spot";
  categories?: Maybe<CategoryRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  model_courses?: Maybe<ModelCourseRelationResponseCollection>;
  name: Scalars["String"]["output"];
  original_courses?: Maybe<OriginalCourseRelationResponseCollection>;
  photo?: Maybe<UploadFileEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type SpotCategoriesArgs = {
  filters?: InputMaybe<CategoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type SpotModel_CoursesArgs = {
  filters?: InputMaybe<ModelCourseFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type SpotOriginal_CoursesArgs = {
  filters?: InputMaybe<OriginalCourseFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type SpotEntity = {
  __typename?: "SpotEntity";
  attributes?: Maybe<Spot>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type SpotEntityResponse = {
  __typename?: "SpotEntityResponse";
  data?: Maybe<SpotEntity>;
};

export type SpotEntityResponseCollection = {
  __typename?: "SpotEntityResponseCollection";
  data: Array<SpotEntity>;
  meta: ResponseCollectionMeta;
};

export type SpotFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<SpotFiltersInput>>>;
  categories?: InputMaybe<CategoryFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  model_courses?: InputMaybe<ModelCourseFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<SpotFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<SpotFiltersInput>>>;
  original_courses?: InputMaybe<OriginalCourseFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type SpotInput = {
  categories?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  model_courses?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  original_courses?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  photo?: InputMaybe<Scalars["ID"]["input"]>;
};

export type SpotRelationResponseCollection = {
  __typename?: "SpotRelationResponseCollection";
  data: Array<SpotEntity>;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  contains?: InputMaybe<Scalars["String"]["input"]>;
  containsi?: InputMaybe<Scalars["String"]["input"]>;
  endsWith?: InputMaybe<Scalars["String"]["input"]>;
  eq?: InputMaybe<Scalars["String"]["input"]>;
  eqi?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  ne?: InputMaybe<Scalars["String"]["input"]>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars["String"]["input"]>;
  notContainsi?: InputMaybe<Scalars["String"]["input"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]["input"]>;
  null?: InputMaybe<Scalars["Boolean"]["input"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

export type Tag = {
  __typename?: "Tag";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  model_courses?: Maybe<ModelCourseRelationResponseCollection>;
  original_courses?: Maybe<OriginalCourseRelationResponseCollection>;
  title: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type TagModel_CoursesArgs = {
  filters?: InputMaybe<ModelCourseFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type TagOriginal_CoursesArgs = {
  filters?: InputMaybe<OriginalCourseFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type TagEntity = {
  __typename?: "TagEntity";
  attributes?: Maybe<Tag>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type TagEntityResponse = {
  __typename?: "TagEntityResponse";
  data?: Maybe<TagEntity>;
};

export type TagEntityResponseCollection = {
  __typename?: "TagEntityResponseCollection";
  data: Array<TagEntity>;
  meta: ResponseCollectionMeta;
};

export type TagFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TagFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  model_courses?: InputMaybe<ModelCourseFiltersInput>;
  not?: InputMaybe<TagFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TagFiltersInput>>>;
  original_courses?: InputMaybe<OriginalCourseFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TagInput = {
  model_courses?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  original_courses?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type TagRelationResponseCollection = {
  __typename?: "TagRelationResponseCollection";
  data: Array<TagEntity>;
};

export type UploadFile = {
  __typename?: "UploadFile";
  alternativeText?: Maybe<Scalars["String"]["output"]>;
  caption?: Maybe<Scalars["String"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  ext?: Maybe<Scalars["String"]["output"]>;
  formats?: Maybe<Scalars["JSON"]["output"]>;
  hash: Scalars["String"]["output"];
  height?: Maybe<Scalars["Int"]["output"]>;
  mime: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  previewUrl?: Maybe<Scalars["String"]["output"]>;
  provider: Scalars["String"]["output"];
  provider_metadata?: Maybe<Scalars["JSON"]["output"]>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars["Float"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  url: Scalars["String"]["output"];
  width?: Maybe<Scalars["Int"]["output"]>;
};

export type UploadFileEntity = {
  __typename?: "UploadFileEntity";
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type UploadFileEntityResponse = {
  __typename?: "UploadFileEntityResponse";
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: "UploadFileEntityResponseCollection";
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  folder?: InputMaybe<UploadFolderFiltersInput>;
  folderPath?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars["String"]["input"]>;
  caption?: InputMaybe<Scalars["String"]["input"]>;
  ext?: InputMaybe<Scalars["String"]["input"]>;
  folder?: InputMaybe<Scalars["ID"]["input"]>;
  folderPath?: InputMaybe<Scalars["String"]["input"]>;
  formats?: InputMaybe<Scalars["JSON"]["input"]>;
  hash?: InputMaybe<Scalars["String"]["input"]>;
  height?: InputMaybe<Scalars["Int"]["input"]>;
  mime?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  previewUrl?: InputMaybe<Scalars["String"]["input"]>;
  provider?: InputMaybe<Scalars["String"]["input"]>;
  provider_metadata?: InputMaybe<Scalars["JSON"]["input"]>;
  size?: InputMaybe<Scalars["Float"]["input"]>;
  url?: InputMaybe<Scalars["String"]["input"]>;
  width?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: "UploadFileRelationResponseCollection";
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: "UploadFolder";
  children?: Maybe<UploadFolderRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars["String"]["output"];
  parent?: Maybe<UploadFolderEntityResponse>;
  path: Scalars["String"]["output"];
  pathId: Scalars["Int"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type UploadFolderChildrenArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type UploadFolderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type UploadFolderEntity = {
  __typename?: "UploadFolderEntity";
  attributes?: Maybe<UploadFolder>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type UploadFolderEntityResponse = {
  __typename?: "UploadFolderEntityResponse";
  data?: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
  __typename?: "UploadFolderEntityResponseCollection";
  data: Array<UploadFolderEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  children?: InputMaybe<UploadFolderFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  files?: InputMaybe<UploadFileFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFolderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  parent?: InputMaybe<UploadFolderFiltersInput>;
  path?: InputMaybe<StringFilterInput>;
  pathId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
  children?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  files?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  parent?: InputMaybe<Scalars["ID"]["input"]>;
  path?: InputMaybe<Scalars["String"]["input"]>;
  pathId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UploadFolderRelationResponseCollection = {
  __typename?: "UploadFolderRelationResponseCollection";
  data: Array<UploadFolderEntity>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: "UsersPermissionsCreateRolePayload";
  ok: Scalars["Boolean"]["output"];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: "UsersPermissionsDeleteRolePayload";
  ok: Scalars["Boolean"]["output"];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  provider?: Scalars["String"]["input"];
};

export type UsersPermissionsLoginPayload = {
  __typename?: "UsersPermissionsLoginPayload";
  jwt?: Maybe<Scalars["String"]["output"]>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: "UsersPermissionsMe";
  blocked?: Maybe<Scalars["Boolean"]["output"]>;
  confirmed?: Maybe<Scalars["Boolean"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars["String"]["output"];
};

export type UsersPermissionsMeRole = {
  __typename?: "UsersPermissionsMeRole";
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  type?: Maybe<Scalars["String"]["output"]>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: "UsersPermissionsPasswordPayload";
  ok: Scalars["Boolean"]["output"];
};

export type UsersPermissionsPermission = {
  __typename?: "UsersPermissionsPermission";
  action: Scalars["String"]["output"];
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: "UsersPermissionsPermissionEntity";
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: "UsersPermissionsPermissionRelationResponseCollection";
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type UsersPermissionsRole = {
  __typename?: "UsersPermissionsRole";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};

export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: "UsersPermissionsRoleEntity";
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: "UsersPermissionsRoleEntityResponse";
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: "UsersPermissionsRoleEntityResponseCollection";
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  type?: InputMaybe<Scalars["String"]["input"]>;
  users?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: "UsersPermissionsUpdateRolePayload";
  ok: Scalars["Boolean"]["output"];
};

export type UsersPermissionsUser = {
  __typename?: "UsersPermissionsUser";
  blocked?: Maybe<Scalars["Boolean"]["output"]>;
  confirmed?: Maybe<Scalars["Boolean"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  email: Scalars["String"]["output"];
  provider?: Maybe<Scalars["String"]["output"]>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  username: Scalars["String"]["output"];
};

export type UsersPermissionsUserEntity = {
  __typename?: "UsersPermissionsUserEntity";
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: "UsersPermissionsUserEntityResponse";
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: "UsersPermissionsUserEntityResponseCollection";
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars["Boolean"]["input"]>;
  confirmationToken?: InputMaybe<Scalars["String"]["input"]>;
  confirmed?: InputMaybe<Scalars["Boolean"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  provider?: InputMaybe<Scalars["String"]["input"]>;
  resetPasswordToken?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<Scalars["ID"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: "UsersPermissionsUserRelationResponseCollection";
  data: Array<UsersPermissionsUserEntity>;
};

export type CreateOriginalCourseMutationVariables = Exact<{
  data: OriginalCourseInput;
}>;

export type CreateOriginalCourseMutation = {
  __typename?: "Mutation";
  createOriginalCourse?: {
    __typename?: "OriginalCourseEntityResponse";
    data?: { __typename?: "OriginalCourseEntity"; id?: string | null } | null;
  } | null;
};

export type CategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type CategoriesQuery = {
  __typename?: "Query";
  categories?: {
    __typename?: "CategoryEntityResponseCollection";
    data: Array<{
      __typename?: "CategoryEntity";
      id?: string | null;
      attributes?: { __typename?: "Category"; title: string } | null;
    }>;
  } | null;
};

export type ModelCourseQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type ModelCourseQuery = {
  __typename?: "Query";
  modelCourse?: {
    __typename?: "ModelCourseEntityResponse";
    data?: {
      __typename?: "ModelCourseEntity";
      attributes?: {
        __typename?: "ModelCourse";
        title: string;
        spots?: {
          __typename?: "SpotRelationResponseCollection";
          data: Array<{
            __typename?: "SpotEntity";
            id?: string | null;
            attributes?: {
              __typename?: "Spot";
              name: string;
              photo?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  attributes?: {
                    __typename?: "UploadFile";
                    url: string;
                  } | null;
                } | null;
              } | null;
            } | null;
          }>;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type ModelCoursesQueryVariables = Exact<{ [key: string]: never }>;

export type ModelCoursesQuery = {
  __typename?: "Query";
  modelCourses?: {
    __typename?: "ModelCourseEntityResponseCollection";
    data: Array<{
      __typename?: "ModelCourseEntity";
      id?: string | null;
      attributes?: {
        __typename?: "ModelCourse";
        title: string;
        spots?: {
          __typename?: "SpotRelationResponseCollection";
          data: Array<{
            __typename?: "SpotEntity";
            attributes?: {
              __typename?: "Spot";
              name: string;
              photo?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  attributes?: {
                    __typename?: "UploadFile";
                    url: string;
                  } | null;
                } | null;
              } | null;
            } | null;
          }>;
        } | null;
      } | null;
    }>;
  } | null;
};

export type OriginalCourseQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type OriginalCourseQuery = {
  __typename?: "Query";
  originalCourse?: {
    __typename?: "OriginalCourseEntityResponse";
    data?: {
      __typename?: "OriginalCourseEntity";
      attributes?: {
        __typename?: "OriginalCourse";
        title: string;
        spots?: {
          __typename?: "SpotRelationResponseCollection";
          data: Array<{
            __typename?: "SpotEntity";
            id?: string | null;
            attributes?: {
              __typename?: "Spot";
              name: string;
              photo?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  attributes?: {
                    __typename?: "UploadFile";
                    url: string;
                  } | null;
                } | null;
              } | null;
            } | null;
          }>;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type OriginalCoursesQueryVariables = Exact<{
  filters: OriginalCourseFiltersInput;
  pagination: PaginationArg;
}>;

export type OriginalCoursesQuery = {
  __typename?: "Query";
  originalCourses?: {
    __typename?: "OriginalCourseEntityResponseCollection";
    data: Array<{
      __typename?: "OriginalCourseEntity";
      id?: string | null;
      attributes?: {
        __typename?: "OriginalCourse";
        title: string;
        spots?: {
          __typename?: "SpotRelationResponseCollection";
          data: Array<{
            __typename?: "SpotEntity";
            attributes?: {
              __typename?: "Spot";
              name: string;
              photo?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  attributes?: {
                    __typename?: "UploadFile";
                    url: string;
                  } | null;
                } | null;
              } | null;
            } | null;
          }>;
        } | null;
      } | null;
    }>;
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; pageCount: number };
    };
  } | null;
};

export type SpotQueryVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type SpotQuery = {
  __typename?: "Query";
  spot?: {
    __typename?: "SpotEntityResponse";
    data?: {
      __typename?: "SpotEntity";
      attributes?: {
        __typename?: "Spot";
        name: string;
        description?: string | null;
        photo?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            attributes?: { __typename?: "UploadFile"; url: string } | null;
          } | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type SpotListQueryVariables = Exact<{
  filters: SpotFiltersInput;
  pagination: PaginationArg;
}>;

export type SpotListQuery = {
  __typename?: "Query";
  spots?: {
    __typename?: "SpotEntityResponseCollection";
    data: Array<{
      __typename?: "SpotEntity";
      id?: string | null;
      attributes?: { __typename?: "Spot"; name: string } | null;
    }>;
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; pageCount: number };
    };
  } | null;
};
