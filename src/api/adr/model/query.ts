/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import type { Formula } from './formula';
// May contain unused imports in some cases
// @ts-ignore
import type { TinkarConceptModel } from './tinkar-concept-model';

/**
 * A query object used for searching concepts.  Only one of these fields should be used at a time: formula, conceptId, group. Operation fields are used to compare the value of those fields against another value.  JoinOperation is used to bring together the multiple queries in an ADRQuery.
 * @export
 * @interface Query
 */
export interface Query {
    /**
     * 
     * @type {TinkarConceptModel}
     * @memberof Query
     */
    'concept'?: TinkarConceptModel;
    /**
     * Comparison operations for querying.
     * @type {string}
     * @memberof Query
     */
    'operation'?: Operation;
    /**
     * The value to be compared against the conceptId, if the value is to be compared against a number..  Optional
     * @type {number}
     * @memberof Query
     */
    'operationDouble'?: number;
    /**
     * 
     * @type {TinkarConceptModel}
     * @memberof Query
     */
    'operationUnit'?: TinkarConceptModel;
    /**
     * The value to be compared against the conceptId, if the value is to be compared against a string.  Optional
     * @type {string}
     * @memberof Query
     */
    'operationText'?: string;
    /**
     * 
     * @type {Formula}
     * @memberof Query
     */
    'formula'?: Formula;
    /**
     * Logical join operations for querying.
     * @type {string}
     * @memberof Query
     */
    'joinOperation'?: JoinOperation;
    /**
     * A group of queries that should be run together.  Optional
     * @type {Array<Query>}
     * @memberof Query
     */
    'group'?: Array<Query>;
}

export const Operation = {
    GreaterThan: 'GREATER_THAN',
    LessThan: 'LESS_THAN',
    GreaterThanOrEqual: 'GREATER_THAN_OR_EQUAL',
    LessThanOrEqual: 'LESS_THAN_OR_EQUAL',
    Equal: 'EQUAL',
    NotEqual: 'NOT_EQUAL'
} as const;

export type Operation = typeof Operation[keyof typeof Operation];
export const JoinOperation = {
    Or: 'OR',
    And: 'AND'
} as const;

export type JoinOperation = typeof JoinOperation[keyof typeof JoinOperation];


