import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Deal } from '../types'; // Assuming Deal type is defined in types/index.ts
import { format } from 'date-fns';

function Deals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('deals')
        .select('*') // Select all columns for now
        .order('created_at', { ascending: false }); // Order by creation date

      if (error) {
        console.error('Error fetching deals:', error);
        setError(error.message);
        setDeals([]);
      } else {
        // Map Supabase data to frontend Deal type if necessary (adjust based on actual schema)
        // Assuming Supabase column names match the Deal type fields for simplicity here
        const formattedData: Deal[] = data.map(d => ({
          id: d.id,
          partnerId: d.partner_id || '', // Handle potential nulls
          partnerName: d.partner_name || 'N/A',
          products: d.products || [], // Assuming products is JSONB or similar
          totalValue: d.total_value || 0,
          status: d.status as Deal['status'], // Cast to correct type
          probability: d.probability || 0,
          expectedCloseDate: d.expected_close_date ? format(new Date(d.expected_close_date), 'yyyy-MM-dd') : 'N/A',
          actualCloseDate: d.actual_close_date ? format(new Date(d.actual_close_date), 'yyyy-MM-dd') : null,
          notes: d.notes || '',
          createdAt: d.created_at ? format(new Date(d.created_at), 'yyyy-MM-dd HH:mm') : 'N/A',
          updatedAt: d.updated_at ? format(new Date(d.updated_at), 'yyyy-MM-dd HH:mm') : 'N/A',
        }));
        setDeals(formattedData);
        setError(null);
      }
      setLoading(false);
    };

    fetchDeals();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Deals</h1>
        <p>Loading deals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Deals</h1>
        <p className="text-red-500">Error loading deals: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Deals</h1>

      {deals.length === 0 ? (
        <p>No deals found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Partner
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Value
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Probability
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expected Close
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {deals.map((deal) => (
                <tr key={deal.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {deal.partnerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${deal.totalValue.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {deal.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {deal.probability}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {deal.expectedCloseDate}
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {deal.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Deals;
