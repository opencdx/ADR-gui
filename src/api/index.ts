import { Configuration as ADRConfig, QueryControllerApi } from "./adr"

const adr = new ADRConfig({
    basePath: (process.env.REACT_APP_API_HOST ?? 'http://localhost') + (process.env.REACT_APP_API_PORT ?? ':8085' )
});

export const adrApi = new QueryControllerApi(adr);