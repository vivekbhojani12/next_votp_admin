import Navbar from '@/components/layouts/navigation/top-navbar';
import { Fragment } from 'react';
import MobileNavigation from '@/components/layouts/navigation/mobile-navigation';
import { siteSettings } from '@/settings/site.settings';
import { useTranslation } from 'next-i18next';
import SidebarItem from '@/components/layouts/navigation/sidebar-item';
import { useRouter } from 'next/router';
import { useMeQuery } from '@/data/user';
const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const dir = locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr';
  const data = useMeQuery()
  console.log(data?.data?.data?.role_id, 'Data for me query<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  console.log(siteSettings, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<siteSettings')
  const SidebarItemMap = () => (
    <Fragment>
      {data?.data?.data?.role_id === '645a429366dbda4c6eba064e' &&
        siteSettings.sidebarLinks.admin.slice(0, 4).map(({ href, label, icon }) => (
          <SidebarItem href={href} label={t(label)} icon={icon} key={href} />
        ))
      }
      {
        data?.data?.data?.role_id === '645a429366dbda4c6eba064f' && (
          [
            siteSettings.sidebarLinks.admin[0], // First element
            siteSettings.sidebarLinks.admin[siteSettings.sidebarLinks.admin.length - 1], // Last element
          ].map(({ href, label, icon }) => (
            <SidebarItem href={href} label={t(label)} icon={icon} key={href} />
          ))
        )
      }
      {/* {
        data?.data?.data?.role_id === '645a429366dbda4c6eba064f' &&
        // Create a new array with just the first element
        siteSettings.sidebarLinks.admin.slice(0, 1).map(({ href, label, icon }) => (
          <SidebarItem href={href} label={t(label)} icon={icon} key={href} />
        ))

      } */}
    </Fragment >

  );

  return (
    <div
      className="flex min-h-screen flex-col bg-gray-100 transition-colors duration-150"
      dir={dir}
    >
      <Navbar />
      <MobileNavigation>
        <SidebarItemMap />
      </MobileNavigation>

      <div className="flex flex-1 pt-20">
        <aside className="xl:w-76 sidebar-with fixed bottom-0 hidden h-full  overflow-y-auto bg-white px-4 pt-22 shadow ltr:left-0 ltr:right-auto rtl:right-0 rtl:left-auto lg:block">
          <div className="flex flex-col space-y-6 py-3">
            <SidebarItemMap />
          </div>
        </aside>
        <main className="ltr:xl:pl-76 rtl:xl:pr-76 w-full ltr:lg:pl-64 rtl:lg:pr-72 rtl:lg:pl-0">
          <div className="h-full form-pb">{children}</div>
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
