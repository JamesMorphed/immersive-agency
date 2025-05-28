
export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceTechnology {
  name: string;
  icon: string;
}

export interface ServiceCaseStudy {
  title: string;
  description: string;
  metrics: string;
}

export interface ServicePricingInfo {
  starting_price: string;
  includes: string[];
  duration: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  hero_image: string;
  overview: string;
  features: ServiceFeature[];
  technologies: ServiceTechnology[];
  case_studies: ServiceCaseStudy[];
  gallery_images: string[];
  pricing_info: ServicePricingInfo;
  created_at: string;
  updated_at: string;
}
