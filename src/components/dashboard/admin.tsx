import React from 'react';
import Pagination from '@/components/ui/pagination';
import Search from '@/components/common/search';
import Link from '@/components/ui/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Layout from '@/components/layouts/admin';
import { adminOnly, ownerAndStaffOnly } from '@/utils/auth-utils';
import { useUsersTokenQuery, deleteQuery, useMeQuery } from '@/data/user';
import { useState, useEffect } from 'react';
import ActionButtons from '../common/action-buttons';
import { HttpClient } from '@/data/client/http-client';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useMutation, useQueryClient } from 'react-query';
import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { MappedPaginatorInfo } from '@/types';
import DashboardAdmin from '@/components/dashboard/adminn';
import Client from '@/components/dashboard/client'
export default function Dashboard() {
  const data = useMeQuery()
  console.log(data?.data?.role_id, 'role_id<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>')
  console.log(data)

  return (
    <div>
      <div>
        {data?.data?.data?.role_id === '645a429366dbda4c6eba064f' && <Client />}
      </div>
      <div>
        {data?.data?.data?.role_id === '645a429366dbda4c6eba064e' && <DashboardAdmin />}
      </div>
    </div>
  );
}

