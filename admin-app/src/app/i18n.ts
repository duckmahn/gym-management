import { notFound } from "next/navigation";
import {getRequestConfig} from 'next-intl/server'


const locales = ['en','vi'];

export default getRequestConfig(async ({params}) => {
    const locale = params.locale;
    if(!locales.includes(locale as any)) notFound();
})