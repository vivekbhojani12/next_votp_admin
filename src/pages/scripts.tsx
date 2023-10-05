
import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AuthPageLayout from '@/components/layouts/auth-layout';
import Layout from '@/components/layouts/admin';
import { allowedRolestoAdmin, getAuthCredentials } from '@/utils/auth-utils';
import AccessDeniedPage from '@/components/common/access-denied';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ['common', 'form'])),
    },
});
const { permissions } = getAuthCredentials();

if (permissions && permissions.includes('admin')) {
    scripts.Layout = Layout;
}

export default function scripts() {
    // const { permissions } = getAuthCredentials();

    console.log(permissions)
    return (<>
        {permissions && permissions.includes('admin') ? (

            // <AuthPageLayout>
            // <h1>scripts</h1>
            <p>Script Page</p>
            // </AuthPageLayout>
        ) :
            <AccessDeniedPage />

        }
    </>
    );
}