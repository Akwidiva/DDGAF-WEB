import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function EmailStats({ auth, stats }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Email Statistics" />
      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Nombre d'emails envoyés par utilisateur</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left">Utilisateur</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Total</th>
                  <th className="px-6 py-3 text-left">Success</th>
                  <th className="px-6 py-3 text-left">Failure</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((s) => (
                  <tr key={s.id} className="border-t">
                    <td className="px-6 py-4">{s.name}</td>
                    <td className="px-6 py-4">{s.email}</td>
                    <td className="px-6 py-4">{s.total}</td>
                    <td className="px-6 py-4 text-green-600">{s.success}</td>
                    <td className="px-6 py-4 text-red-600">{s.failure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
