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
    const [saveError, setSaveError] = useState<Error | null>(null);
    const [query, setQuery] = useState<SavedQuery | null>(null);
    const mutation = useMutation({
        mutationFn: async (params: SavedQuery) => {
            setSaveError(null);
            const response = await adrApi.saveQuery({savedQuery: params });
            setQuery(response.data);
        },
        onError: (error: Error) => {
            setSaveError(error);
        },
    });
    return { ...mutation, error: saveError, data: query};
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