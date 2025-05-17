import React, { useState, useEffect } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { ArrowUp, ArrowDown, DollarSign, Users, Package, ShoppingBag } from 'lucide-react';
import { Tables } from '../lib/supabase';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalPartners: 0,
    totalVendors: 0,
    totalProducts: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [partnersByType, setPartnersByType] = useState<Record<string, number>>({});
  const [productsByCategory, setProductsByCategory] = useState<Record<string, number>>({});
  const [monthlyRevenue, setMonthlyRevenue] = useState<number[]>([]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      setLoading(true);
      try {
        // Fetch total partners
        const { count: partnerCount, error: partnerError } = await supabase
          .from('partners')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        if (partnerError) throw partnerError;

        // Fetch total vendors
        const { count: vendorCount, error: vendorError } = await supabase
          .from('vendors')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        if (vendorError) throw vendorError;

        // Fetch total products
        const { count: productCount, error: productError } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        if (productError) throw productError;

        // Fetch total revenue from deals
        const { data: deals, error: dealsError } = await supabase
          .from('deals')
          .select('total_value')
          .eq('user_id', user.id);

        if (dealsError) throw dealsError;

        const totalRevenue = deals?.reduce((sum, deal) => sum + (deal.total_value || 0), 0) || 0;

        // Fetch partners by type
        const { data: partnerTypes, error: partnerTypesError } = await supabase
          .from('partners')
          .select('type')
          .eq('user_id', user.id);

        if (partnerTypesError) throw partnerTypesError;

        const typeCount: Record<string, number> = {};
        partnerTypes?.forEach(partner => {
          if (partner.type) { // Ensure type is not null
             typeCount[partner.type] = (typeCount[partner.type] || 0) + 1;
          }
        });

        // Fetch products by category
        const { data: productCategories, error: productCategoriesError } = await supabase
          .from('products')
          .select('category')
          .eq('user_id', user.id);

        if (productCategoriesError) throw productCategoriesError;

        const categoryCount: Record<string, number> = {};
        productCategories?.forEach(product => {
          if (product.category) {
            categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
          }
        });

        // Fetch monthly revenue data (simplified simulation)
        // In a real app, this would involve querying deals with date filters
        const { data: monthlyDeals, error: monthlyDealsError } = await supabase
          .from('deals')
          .select('total_value, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true });

        if (monthlyDealsError) throw monthlyDealsError;

        const revenueByMonth: Record<string, number> = {};
        monthlyDeals?.forEach(deal => {
          if (deal.created_at && deal.total_value !== null) {
            const date = new Date(deal.created_at);
            const monthYear = `${date.getFullYear()}-${date.getMonth()}`; // YYYY-MM
            revenueByMonth[monthYear] = (revenueByMonth[monthYear] || 0) + deal.total_value;
          }
        });

        // Generate last 6 months labels and data
        const now = new Date();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const lastSixMonthsLabels = [];
        const lastSixMonthsData = [];

        for (let i = 5; i >= 0; i--) {
          const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const monthYearKey = `${date.getFullYear()}-${date.getMonth()}`;
          lastSixMonthsLabels.push(months[date.getMonth()]);
          lastSixMonthsData.push(revenueByMonth[monthYearKey] || 0);
        }


        // Fetch recent activity (combining recent updates from different tables)
        const recentItems = [];

        // Recent partners
        const { data: recentPartners, error: recentPartnersError } = await supabase
          .from('partners')
          .select('name, updated_at')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false })
          .limit(3);

        if (recentPartnersError) throw recentPartnersError;

        recentPartners?.forEach(partner => {
          if (partner.updated_at) {
            recentItems.push({
              action: 'Partner updated',
              entity: partner.name,
              time: new Date(partner.updated_at),
            });
          }
        });

        // Recent deals
        const { data: recentDeals, error: recentDealsError } = await supabase
          .from('deals')
          .select('partner_name, updated_at')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false })
          .limit(3);

        if (recentDealsError) throw recentDealsError;

        recentDeals?.forEach(deal => {
           if (deal.updated_at) {
            recentItems.push({
              action: 'Deal updated',
              entity: deal.partner_name || 'Unknown partner',
              time: new Date(deal.updated_at),
            });
           }
        });

        // Recent products
        const { data: recentProducts, error: recentProductsError } = await supabase
          .from('products')
          .select('name, updated_at')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false })
          .limit(3);

        if (recentProductsError) throw recentProductsError;

        recentProducts?.forEach(product => {
           if (product.updated_at) {
            recentItems.push({
              action: 'Product updated',
              entity: product.name,
              time: new Date(product.updated_at),
            });
           }
        });

        // Sort all recent items by time
        recentItems.sort((a, b) => b.time.getTime() - a.time.getTime());

        setStats({
          totalRevenue,
          totalPartners: partnerCount || 0,
          totalVendors: vendorCount || 0,
          totalProducts: productCount || 0,
        });
        setRecentActivity(recentItems.slice(0, 5));
        setPartnersByType(typeCount);
        setProductsByCategory(categoryCount);
        setMonthlyRevenue(lastSixMonthsData); // Use calculated monthly data
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  // Format time difference
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

   // Generate last 6 months labels
   const now = new Date();
   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
   const lastSixMonthsLabels = [];
   for (let i = 5; i >= 0; i--) {
     const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
     lastSixMonthsLabels.push(months[date.getMonth()]);
   }


  // Chart data
  const revenueData = {
    labels: lastSixMonthsLabels, // Use dynamic labels
    datasets: [
      {
        label: 'Revenue',
        data: monthlyRevenue,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const partnerDistributionData = {
    labels: Object.keys(partnersByType),
    datasets: [
      {
        data: Object.values(partnersByType),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const productCategoryData = {
    labels: Object.keys(productsByCategory),
    datasets: [
      {
        label: 'Products by Category',
        data: Object.values(productsByCategory),
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(139, 92, 246, 0.7)',
        ],
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex space-x-2">
          {/* <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Export Report
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Customize View
          </button> */}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${stats.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          {/* <div className="flex items-center mt-4 text-sm">
            <ArrowUp className="w-4 h-4 mr-1 text-green-500" />
            <span className="font-medium text-green-500">12.5%</span>
            <span className="ml-1 text-gray-500">from last month</span>
          </div> */}
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Partners</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalPartners}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          {/* <div className="flex items-center mt-4 text-sm">
            <ArrowUp className="w-4 h-4 mr-1 text-green-500" />
            <span className="font-medium text-green-500">8.2%</span>
            <span className="ml-1 text-gray-500">from last month</span>
          </div> */}
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Vendors</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalVendors}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Package className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          {/* <div className="flex items-center mt-4 text-sm">
            <ArrowUp className="w-4 h-4 mr-1 text-green-500" />
            <span className="font-medium text-green-500">5.3%</span>
            <span className="ml-1 text-gray-500">from last month</span>
          </div> */}
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <ShoppingBag className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          {/* <div className="flex items-center mt-4 text-sm">
            <ArrowUp className="w-4 h-4 mr-1 text-green-500" />
            <span className="font-medium text-green-500">10.8%</span>
            <span className="ml-1 text-gray-500">from last month</span>
          </div> */}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">Revenue Overview (Last 6 Months)</h2>
          <Line
            data={revenueData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: function(value: any) {
                      return '$' + value.toLocaleString();
                    }
                  }
                }
              }
            }}
          />
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">Partner Distribution</h2>
          <div className="flex items-center justify-center h-64">
            {Object.keys(partnersByType).length > 0 ? (
              <Doughnut
                data={partnerDistributionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right' as const,
                    },
                  },
                }}
              />
            ) : (
              <p className="text-gray-500">No partner data available</p>
            )}
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">Products by Category</h2>
          <div className="h-64">
            {Object.keys(productsByCategory).length > 0 ? (
              <Bar
                data={productCategoryData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                   scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 1
                      }
                    }
                  }
                }}
              />
            ) : (
              <p className="text-gray-500">No product category data available</p>
            )}
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center pb-3 border-b border-gray-100">
                  <div className="w-2 h-2 mr-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <div className="flex text-sm text-gray-500">
                      <span>{activity.entity}</span>
                      <span className="mx-2">•</span>
                      <span>{formatTimeAgo(activity.time)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
