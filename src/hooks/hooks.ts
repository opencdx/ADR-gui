import { adrApi } from '@/api';
import { ADRQuery, SavedQuery } from '@/api/adr';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const useGetQueryableData = () => {
    return useQuery({
        queryKey: ['queryableData'],
        queryFn: async () => adrApi.getQueryableData(),
    });
};

export const useGetUnits = () => {
    return useQuery({
        queryKey: ['units'],
        queryFn: async () => adrApi.getUnits(),
    });
};

export const useListQueries = () => {
    return useQuery({
        queryKey: ['listQueries'],
        queryFn: async () => adrApi.listQueries(),
    });
};

export const usePostQuery = () => {
    return useMutation({
        mutationFn: (params: ADRQuery) => adrApi.postQuery({ aDRQuery: params })
    });
};

export const useSaveQuery = () => {
    return useMutation({
        mutationFn: (params: SavedQuery) => adrApi.saveQuery({savedQuery: params })
    })
};

export const useUpdateQuery = () => {
    return useMutation({
        mutationFn: (params: SavedQuery) => adrApi.updateQuery({ savedQuery: params }),
        onError: (error) => { },
    });
};

export const useDeleteQuery = () => {
    return useMutation({
        mutationFn: (id: number) => adrApi.deleteQuery({ id: id}),
        onError: (error) => { },
    });
}