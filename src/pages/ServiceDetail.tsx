
import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceDetailHero from '@/components/ServiceDetailHero';
import ServiceDetailContent from '@/components/ServiceDetailContent';
import { Skeleton } from '@/components/ui/skeleton';
import type { ServiceDetail } from '@/types/service';

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: service, isLoading, error } = useQuery({
    queryKey: ['service-detail', slug],
    queryFn: async () => {
      if (!slug) throw new Error('No slug provided');
      
      console.log('Fetching service with slug:', slug);
      
      const { data, error } = await supabase
        .from('service_details')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Service data received:', data);
      
      if (!data) return null;

      // Transform the database response to match our TypeScript interfaces
      const transformedData: ServiceDetail = {
        ...data,
        features: Array.isArray(data.features) ? (data.features as unknown) as ServiceDetail['features'] : [],
        technologies: Array.isArray(data.technologies) ? (data.technologies as unknown) as ServiceDetail['technologies'] : [],
        case_studies: Array.isArray(data.case_studies) ? (data.case_studies as unknown) as ServiceDetail['case_studies'] : [],
        gallery_images: Array.isArray(data.gallery_images) ? (data.gallery_images as unknown) as string[] : [],
        pricing_info: typeof data.pricing_info === 'object' && data.pricing_info !== null && !Array.isArray(data.pricing_info)
          ? (data.pricing_info as unknown) as ServiceDetail['pricing_info']
          : { starting_price: '', includes: [], duration: '' }
      };

      return transformedData;
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
    console.log('Service not found or error occurred:', { error, service, slug });
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
