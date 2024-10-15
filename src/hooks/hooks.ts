import { adrApi } from '@/api';
import { ADRQuery, SavedQuery } from '@/api/adr';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './query-keys';

export const useGetQueryableData = () => {
    return useQuery({
        queryKey: QUERY_KEYS.QUERYABLE_DATA,
        queryFn: async () => adrApi.getQueryableData(),
    });
};

export const useGetUnits = () => {
    return useQuery({
        queryKey: QUERY_KEYS.UNITS,
        queryFn: async () => adrApi.getUnits(),
    });
};

export const useListQueries = () => {
    return useQuery({
        queryKey: QUERY_KEYS.LIST_QUERIES,
        queryFn: () => adrApi.listQueries(),
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

export const useSearchData = (search: string) => {
    return useQuery({
        queryKey: QUERY_KEYS.SEARCH_QUERY,
        queryFn: async () => adrApi.search({search: search}),
    });
};
