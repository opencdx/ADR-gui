import { Configuration as ADRConfig, QueryControllerApi } from "./adr"

const adr = new ADRConfig({
    basePath: (process.env.NEXT_PUBLIC_API_HOST ?? 'http://localhost') + (process.env.NEXT_PUBLIC_API_PORT ?? ':8085' )
});

export const adrApi = new QueryControllerApi(adr);