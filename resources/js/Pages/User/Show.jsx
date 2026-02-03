// Import des icônes de React Icons
import { USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  FaUser,
  FaCalendarAlt,
  FaEdit,
  FaArrowLeft,
  FaUserClock,
} from "react-icons/fa";

// Styles CSS avec Tailwind CSS
const styles = `
.section-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.section-icon {
  margin-right: 0.5rem;
}

.info-item {
  margin-bottom: 1.5rem;
}

.status-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-weight: bold;
}

.action-link-edit {
  display: flex;
  items: center;
  background-color: #f87171;
  color: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  text-decoration: none;
}
  .action-link-retour {
  display: flex;
  items: center;
 background-color: #FF0000;
  color: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  text-decoration: none;
}

.action-link:hover {
  background-color: #f87171;
}

.icon {
  margin-right: 0.5rem;
}
`;

// Intégration des styles CSS dans le composant Show
export default function Show({ auth, user }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`Compte de ${user.name}`}
          </h2>

          <div className="flex space-x-4">
            <Link href={route("user.index", user.id)} className="action-link-retour">
              <FaArrowLeft className="icon" />
              Retour
            </Link>

            <Link href={route("user.edit", user.id)} className="action-link-edit">
              <FaEdit className="icon " />
              Éditer
            </Link>
          </div>
        </div>
      }
    >
      <Head title={`Profil de ${user.name}`} />
      <style>{styles}</style>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 text-gray-900 dark:text-gray-100">
                <h3 className="section-title">
                  <FaUser className="section-icon" />
                  Informations de base
                </h3>
                <div className="info-item">
                  <label>Identifiant:</label>
                  <p>{user.id}</p>
                </div>
                <div className="info-item">
                  <label>Nom de l'utilisateur:</label>
                  <p>{user.name}</p>
                </div>
                <div className="info-item">
                  <label>Email:</label>
                  <p>{user.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 text-gray-900 dark:text-gray-100">
                <h3 className="section-title">
                  <FaUserClock className="section-icon" />
                  Statut et rôle
                </h3>
                <div className="info-item">
                  <label>Statut de l'utilisateur:</label>
                  <p>
                    <span
                      className={`status-badge ${
                        USER_STATUS_CLASS_MAP[user.status]
                      }`}
                    >
                      {USER_STATUS_TEXT_MAP[user.status]}
                    </span>
                  </p>
                </div>
                <div className="info-item">
                  <label>Rôle:</label>
                  <p>{user.role}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 text-gray-900 dark:text-gray-100">
                <h3 className="section-title">
                  <FaCalendarAlt className="section-icon" />
                  Dates importantes
                </h3>
                <div className="info-item">
                  <label>Date de création:</label>
                  <p>{user.created_at}</p>
                </div>
                <div className="info-item">
                  <label>Date de mise à jour:</label>
                  <p>{user.updated_at}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
