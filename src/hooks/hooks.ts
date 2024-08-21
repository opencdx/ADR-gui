import { adrApi } from '@/api';
import { ADRQuery } from '@/api/adr';
import { useMutation, useQuery } from '@tanstack/react-query';

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