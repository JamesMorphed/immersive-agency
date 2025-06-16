import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil, Trash } from 'lucide-react';
import ServiceAdminForm from './ServiceAdminForm';

interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  created_at: string;
}

const ManageServicesTable = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const editDialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (isEditDialogOpen && editDialogRef.current) {
      editDialogRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Focus the first input in the form
      const input = editDialogRef.current.querySelector('input, textarea, select, button');
      if (input) (input as HTMLElement).focus();
    }
  }, [isEditDialogOpen]);

  const fetchServices = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('service_details')
      .select('id, title, slug, description, created_at')
      .order('created_at', { ascending: false });
    if (!error && data) {
      setServices(data);
    }
    setIsLoading(false);
  };

  const handleDeleteClick = (id: string) => {
    setServiceToDelete(id);
    setIsDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!serviceToDelete) return;
    const { error } = await supabase
      .from('service_details')
      .delete()
      .eq('id', serviceToDelete);
    if (!error) {
      setServices(services.filter(service => service.id !== serviceToDelete));
    }
    setServiceToDelete(null);
    setIsDialogOpen(false);
  };

  const handleEditClick = async (service: Service) => {
    // Fetch the latest full service details from Supabase
    const { data, error } = await supabase
      .from('service_details')
      .select('*')
      .eq('id', service.id)
      .single();
    if (error) {
      alert('Failed to fetch service details.');
      return;
    }
    setEditingService(data);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Solutions</h2>
        <Button onClick={fetchServices} variant="secondary">
          Refresh
        </Button>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-10">
          <p>Loading services...</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableCaption>A list of all your solutions</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map(service => (
                <TableRow key={service.id}>
                  <TableCell>{service.title}</TableCell>
                  <TableCell>{service.slug}</TableCell>
                  <TableCell className="max-w-xs truncate">{service.description}</TableCell>
                  <TableCell>{new Date(service.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="ghost" onClick={() => handleEditClick(service)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDeleteClick(service.id)}>
                      <Trash className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {/* Simple delete confirmation dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-center">
            <p className="mb-4 text-white">Are you sure you want to delete this service?</p>
            <div className="flex justify-center gap-4">
              <Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button>
              <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
      {isEditDialogOpen && editingService && (
        <div ref={editDialogRef} className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-auto">
          <div
            className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto"
            ref={el => {
              if (el && isEditDialogOpen) {
                el.scrollTop = 0;
                const input = el.querySelector('input, textarea, select, button');
                if (input) (input as HTMLElement).focus();
              }
            }}
          >
            <button className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={() => setIsEditDialogOpen(false)}>
              ×
            </button>
            <ServiceAdminForm
              initialData={editingService}
              onSave={async () => {
                setIsEditDialogOpen(false);
                setEditingService(null);
                await fetchServices();
              }}
              onDelete={async () => {
                setIsEditDialogOpen(false);
                setEditingService(null);
                await fetchServices();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServicesTable; 