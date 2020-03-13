/**
 * Some simple Firebase types
 */

export type WhereClause = {
    lhs: string
    condition: '<' | '<=' | '==' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any'
    rhs: string
}