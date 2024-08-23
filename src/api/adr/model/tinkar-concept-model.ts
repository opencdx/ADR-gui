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



/**
 * The unit of measurement for the right operand in the formula.
 * @export
 * @interface TinkarConceptModel
 */
export interface TinkarConceptModel {
    /**
     * The ID of the concept
     * @type {number}
     * @memberof TinkarConceptModel
     */
    'id'?: number;
    /**
     * The UUID of the concept
     * @type {string}
     * @memberof TinkarConceptModel
     */
    'conceptId'?: string;
    /**
     * The name of the concept
     * @type {string}
     * @memberof TinkarConceptModel
     */
    'conceptName'?: string;
    /**
     * The description of the concept
     * @type {string}
     * @memberof TinkarConceptModel
     */
    'conceptDescription'?: string;
    /**
     * Concept focus modes.
     * @type {string}
     * @memberof TinkarConceptModel
     */
    'focus'?: Focus;
}

export const Focus = {
    Self: 'SELF',
    Descendants: 'DESCENDANTS',
    DescendantsOrSelf: 'DESCENDANTS_OR_SELF',
    Ancestors: 'ANCESTORS',
    AncestorsOrSelf: 'ANCESTORS_OR_SELF',
    Children: 'CHILDREN',
    ChildrenOrSelf: 'CHILDREN_OR_SELF',
    Parent: 'PARENT',
    ParentOrSelf: 'PARENT_OR_SELF',
    Member: 'MEMBER',
    Any: 'ANY'
} as const;

export type Focus = typeof Focus[keyof typeof Focus];

