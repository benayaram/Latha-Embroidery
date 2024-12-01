import React from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { type Notification } from '../../types';
import database from '../../data/database.json';

export function NotificationsManager() {
  const [notifications, setNotifications] = React.useState<Notification[]>(database.notifications);
  const [editingNotification, setEditingNotification] = React.useState<Notification | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const newNotification: Notification = {
      id: editingNotification?.id || `N${String(notifications.length + 1).padStart(3, '0')}`,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      image: formData.get('image') as string,
    };

    if (editingNotification) {
      setNotifications(notifications.map(n => n.id === editingNotification.id ? newNotification : n));
    } else {
      setNotifications([...notifications, newNotification]);
    }

    setIsModalOpen(false);
    setEditingNotification(null);
    form.reset();
  };

  const deleteNotification = (id: string) => {
    if (confirm('Are you sure you want to delete this notification?')) {
      setNotifications(notifications.filter(n => n.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Manage Notifications</h2>
        <button
          onClick={() => {
            setEditingNotification(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add Notification
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notifications.map((notification) => (
          <div key={notification.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={notification.image}
              alt={notification.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{notification.title}</h3>
              <p className="text-gray-600 mb-4">{notification.description}</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setEditingNotification(notification);
                    setIsModalOpen(true);
                  }}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-xl font-semibold mb-4">
              {editingNotification ? 'Edit Notification' : 'Add New Notification'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={editingNotification?.title}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  required
                  defaultValue={editingNotification?.description}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  name="image"
                  required
                  defaultValue={editingNotification?.image}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingNotification(null);
                  }}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  {editingNotification ? 'Update Notification' : 'Add Notification'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}