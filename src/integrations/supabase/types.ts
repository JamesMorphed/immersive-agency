export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blog_podcasts: {
        Row: {
          blog_id: number
          created_at: string | null
          mp3_url: string
        }
        Insert: {
          blog_id: number
          created_at?: string | null
          mp3_url: string
        }
        Update: {
          blog_id?: number
          created_at?: string | null
          mp3_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_podcasts_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: true
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author: string | null
          category: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          id: number
          image_gallery: string[] | null
          image_url: string | null
          published_at: string | null
          read_time: string | null
          slug: string | null
          tags: string[] | null
          Title: string | null
          video_url: string | null
        }
        Insert: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: number
          image_gallery?: string[] | null
          image_url?: string | null
          published_at?: string | null
          read_time?: string | null
          slug?: string | null
          tags?: string[] | null
          Title?: string | null
          video_url?: string | null
        }
        Update: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: number
          image_gallery?: string[] | null
          image_url?: string | null
          published_at?: string | null
          read_time?: string | null
          slug?: string | null
          tags?: string[] | null
          Title?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      featured_products: {
        Row: {
          affiliate_link: string | null
          category: string | null
          created_at: string
          currency: string | null
          description: string | null
          discount_percentage: number | null
          featured_order: number | null
          features: Json | null
          gallery_images: Json | null
          id: string
          image_url: string | null
          is_active: boolean | null
          is_featured: boolean | null
          original_price: number | null
          price: number | null
          product_url: string | null
          rating: number | null
          review_count: number | null
          short_description: string | null
          sku: string | null
          slug: string
          specifications: Json | null
          stock_quantity: number | null
          stock_status: string | null
          tags: string[] | null
          title: string
          updated_at: string
          vendor: string | null
        }
        Insert: {
          affiliate_link?: string | null
          category?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          discount_percentage?: number | null
          featured_order?: number | null
          features?: Json | null
          gallery_images?: Json | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          original_price?: number | null
          price?: number | null
          product_url?: string | null
          rating?: number | null
          review_count?: number | null
          short_description?: string | null
          sku?: string | null
          slug: string
          specifications?: Json | null
          stock_quantity?: number | null
          stock_status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          vendor?: string | null
        }
        Update: {
          affiliate_link?: string | null
          category?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          discount_percentage?: number | null
          featured_order?: number | null
          features?: Json | null
          gallery_images?: Json | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          is_featured?: boolean | null
          original_price?: number | null
          price?: number | null
          product_url?: string | null
          rating?: number | null
          review_count?: number | null
          short_description?: string | null
          sku?: string | null
          slug?: string
          specifications?: Json | null
          stock_quantity?: number | null
          stock_status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          vendor?: string | null
        }
        Relationships: []
      }
      icons: {
        Row: {
          content_type: string | null
          created_at: string
          description: string | null
          file_path: string
          file_size: number | null
          folder: string
          id: string
          name: string
          public_url: string
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          content_type?: string | null
          created_at?: string
          description?: string | null
          file_path: string
          file_size?: number | null
          folder: string
          id?: string
          name: string
          public_url: string
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          content_type?: string | null
          created_at?: string
          description?: string | null
          file_path?: string
          file_size?: number | null
          folder?: string
          id?: string
          name?: string
          public_url?: string
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      service_details: {
        Row: {
          background_image: string | null
          created_at: string
          description: string | null
          featured_images: Json | null
          features: Json | null
          gallery_images: Json | null
          hero_image: string | null
          id: string
          overview: string | null
          service_icons: Json | null
          slug: string
          technologies: Json | null
          thumbnail_image: string | null
          title: string
          updated_at: string
        }
        Insert: {
          background_image?: string | null
          created_at?: string
          description?: string | null
          featured_images?: Json | null
          features?: Json | null
          gallery_images?: Json | null
          hero_image?: string | null
          id?: string
          overview?: string | null
          service_icons?: Json | null
          slug: string
          technologies?: Json | null
          thumbnail_image?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          background_image?: string | null
          created_at?: string
          description?: string | null
          featured_images?: Json | null
          features?: Json | null
          gallery_images?: Json | null
          hero_image?: string | null
          id?: string
          overview?: string | null
          service_icons?: Json | null
          slug?: string
          technologies?: Json | null
          thumbnail_image?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      service_projects: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          metrics: string | null
          project_url: string | null
          service_id: string
          tags: string[] | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          metrics?: string | null
          project_url?: string | null
          service_id: string
          tags?: string[] | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          metrics?: string | null
          project_url?: string | null
          service_id?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_projects_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "service_details"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          bio: string
          created_at: string | null
          id: string
          image_url: string | null
          linkedin_url: string | null
          name: string
          teams_url: string | null
          title: string
        }
        Insert: {
          bio: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          linkedin_url?: string | null
          name: string
          teams_url?: string | null
          title: string
        }
        Update: {
          bio?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          linkedin_url?: string | null
          name?: string
          teams_url?: string | null
          title?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          email: string
          first_name: string
          id: number
          last_name: string
          role: string
        }
        Insert: {
          email: string
          first_name: string
          id: number
          last_name: string
          role: string
        }
        Update: {
          email?: string
          first_name?: string
          id?: number
          last_name?: string
          role?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
