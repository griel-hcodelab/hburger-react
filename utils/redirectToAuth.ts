import { Redirect, GetServerSidePropsContext } from "next";

export function redirectToAuth({ resolvedUrl }: GetServerSidePropsContext) {
    return {
        redirect: {
            destination: `/login?next=${encodeURIComponent(resolvedUrl)}`,
        } as Redirect
    }
}