declare namespace NodeJS {
    interface ProcessEnv {
        readonly NEXT_PUBLIC_STRAPI_URL: string;
        readonly NEXT_PUBLIC_STRAPI_API_KEY: string;
    }
}