export interface IUnsplashPhoto {
    id: string;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    downloads: number;
    views: number;
    likes: number;
    liked_by_user: boolean;
    description: string | null;
    alt_description: string | null;
    slug: string;
    created_at: string;
    updated_at: string;
    promoted_at: string | null;
    public_domain: boolean;
    asset_type: string;
    meta: {
      index: boolean;
    };
    alternative_slugs: Record<string, string>;
    current_user_collections: any[];
    breadcrumbs: any[];
    topic_submissions: Record<string, any>;
    topics: any[];
  
    tags: Array<{
      title: string;
      type: string;
    }>;
  
    exif: {
      aperture: string | null;
      exposure_time: string | null;
      focal_length: string | null;
      iso: number | null;
      make: string | null;
      model: string | null;
      name: string | null;
    };
  
    location: {
      name: string | null;
      city: string | null;
      country: string | null;
      position: {
        latitude: number | null;
        longitude: number | null;
      };
    };
  
    links: {
      self: string;
      html: string;
      download: string;
      download_location: string;
    };
  
    urls: {
      raw: string;
      full: string;
      regular: string;
      small: string;
      thumb: string;
      small_s3: string;
    };
  
    user: {
      id: string;
      username: string;
      first_name: string;
      last_name: string | null;
      name: string;
      location: string | null;
      bio: string | null;
      for_hire: boolean;
      accepted_tos: boolean;
      instagram_username: string | null;
      portfolio_url: string | null;
      total_collections: number;
      total_likes: number;
      total_photos: number;
      total_illustrations: number;
      total_promoted_photos: number;
      total_promoted_illustrations: number;
      twitter_username: string | null;
      updated_at: string;
  
      profile_image: {
        small: string;
        medium: string;
        large: string;
      };
  
      social: {
        instagram_username: string | null;
        twitter_username: string | null;
        paypal_email: string | null;
        portfolio_url: string | null;
      };
  
      links: {
        self: string;
        html: string;
        photos: string;
        likes: string;
        portfolio: string;
        followers: string;
        following: string;
      };
    };
  
    related_collections: {
      total: number;
      type: string;
      results: any[];
    };
  }
  