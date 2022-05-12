import useSWR, { useSWRConfig } from 'swr';
import {api} from '../services/api';

export function useFetch(url) {
    //const { mutate } = useSWRConfig()
        const { data, error, mutate} = useSWR(url, async url => {
            const response = await api.get(url);

            return response.data
            
        }, 
        
        { refreshInterval: 10000 }
        
        
        )
        // })
        return {data, mutate}
}

export function useFetchNormal(url) {
    //const { mutate } = useSWRConfig()
        const { data, error, mutate} = useSWR(url, async url => {
            const response = await api.get(url);

            return response.data
            
        },
        
        
        )
        // })
        return {data, mutate}
}
