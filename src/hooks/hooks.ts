import { adrApi } from '@/api';
import { useQuery } from '@tanstack/react-query';

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