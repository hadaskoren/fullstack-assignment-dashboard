import React from 'react';

const MaliciousDAppsTable = ({ top10Malicious }) => {
  return (
    <div className="flex flex-col justify-center w-full my-12">
      <h2 className="flex justify-center mb-5">Top 10 requests to malicious sites</h2>
      <table className="table-auto w-[600px] m-auto">
        <thead className="bg-gray-800 text-white">
        <tr>
          <th className="px-4 py-2">URL</th>
          <th className="px-4 py-2">Request Count</th>
        </tr>
        </thead>
        <tbody>
        {top10Malicious.slice(0, 10).map(([url, count], index) => (
          <tr key={index} className="bg-gray-100">
            <td className="border px-4 py-2">{url}</td>
            <td className="border px-4 py-2">{count}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaliciousDAppsTable;
