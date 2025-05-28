
import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceDetailHero from '@/components/ServiceDetailHero';
import ServiceDetailContent from '@/components/ServiceDetailContent';
import { Skeleton } from '@/components/ui/skeleton';

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: service, isLoading, error } = useQuery({
    queryKey: ['service-detail', slug],
    queryFn: async () => {
      if (!slug) throw new Error('No slug provided');
      
      const { data, error } = await supabase
        .from('service_details')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="pt-20 px-4">
          <div className="max-w-7xl mx-auto">
            <Skeleton className="h-96 w-full mb-8" />
            <Skeleton className="h-8 w-1/2 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <ServiceDetailHero service={service} />
      <ServiceDetailContent service={service} />
      <Footer />
    </div>
  );
};

export default ServiceDetail;
