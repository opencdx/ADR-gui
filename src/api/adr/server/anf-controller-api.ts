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


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, type RequestArgs, BaseAPI, RequiredError, operationServerMap } from '../base';
/**
 * AnfControllerApi - axios parameter creator
 * @export
 */
export const AnfControllerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        postANFStatement: async (body: string, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            assertParamExists('postANFStatement', 'body', body)
            const localVarPath = `/anf`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AnfControllerApi - functional programming interface
 * @export
 */
export const AnfControllerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = AnfControllerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async postANFStatement(body: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<number>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.postANFStatement(body, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AnfControllerApi.postANFStatement']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * AnfControllerApi - factory interface
 * @export
 */
export const AnfControllerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AnfControllerApiFp(configuration)
    return {
        /**
         * 
         * @param {AnfControllerApiPostANFStatementRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        postANFStatement(requestParameters: AnfControllerApiPostANFStatementRequest, options?: RawAxiosRequestConfig): AxiosPromise<number> {
            return localVarFp.postANFStatement(requestParameters.body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for postANFStatement operation in AnfControllerApi.
 * @export
 * @interface AnfControllerApiPostANFStatementRequest
 */
export interface AnfControllerApiPostANFStatementRequest {
    /**
     * 
     * @type {string}
     * @memberof AnfControllerApiPostANFStatement
     */
    readonly body: string
}

/**
 * AnfControllerApi - object-oriented interface
 * @export
 * @class AnfControllerApi
 * @extends {BaseAPI}
 */
export class AnfControllerApi extends BaseAPI {
    /**
     * 
     * @param {AnfControllerApiPostANFStatementRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AnfControllerApi
     */
    public postANFStatement(requestParameters: AnfControllerApiPostANFStatementRequest, options?: RawAxiosRequestConfig) {
        return AnfControllerApiFp(this.configuration).postANFStatement(requestParameters.body, options).then((request) => request(this.axios, this.basePath));
    }
}
