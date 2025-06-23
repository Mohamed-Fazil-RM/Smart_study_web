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
      course_materials: {
        Row: {
          course_id: string
          created_at: string | null
          description: string | null
          file_type: string | null
          file_url: string | null
          id: string
          material_type: string | null
          title: string
          user_id: string
        }
        Insert: {
          course_id: string
          created_at?: string | null
          description?: string | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          material_type?: string | null
          title: string
          user_id: string
        }
        Update: {
          course_id?: string
          created_at?: string | null
          description?: string | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          material_type?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_materials_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          code: string | null
          created_at: string | null
          id: string
          instructor: string | null
          name: string
          user_id: string
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          id?: string
          instructor?: string | null
          name: string
          user_id: string
        }
        Update: {
          code?: string | null
          created_at?: string | null
          id?: string
          instructor?: string | null
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      forum_posts: {
        Row: {
          created_at: string | null
          description: string
          id: string
          image_url: string | null
          is_paid: boolean | null
          payment_amount: number | null
          post_type: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          image_url?: string | null
          is_paid?: boolean | null
          payment_amount?: number | null
          post_type?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          image_url?: string | null
          is_paid?: boolean | null
          payment_amount?: number | null
          post_type?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      forum_replies: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_private: boolean | null
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_private?: boolean | null
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_private?: boolean | null
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_replies_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          board: string | null
          college: string | null
          course: string | null
          created_at: string | null
          degree: string | null
          education_type: string | null
          full_name: string
          id: string
          region: string | null
          school: string | null
          standard: string | null
          start_year: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          board?: string | null
          college?: string | null
          course?: string | null
          created_at?: string | null
          degree?: string | null
          education_type?: string | null
          full_name: string
          id: string
          region?: string | null
          school?: string | null
          standard?: string | null
          start_year?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          board?: string | null
          college?: string | null
          course?: string | null
          created_at?: string | null
          degree?: string | null
          education_type?: string | null
          full_name?: string
          id?: string
          region?: string | null
          school?: string | null
          standard?: string | null
          start_year?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          status: string | null
          task_date: string
          task_time: string
          task_type: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          task_date: string
          task_time: string
          task_type?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          status?: string | null
          task_date?: string
          task_time?: string
          task_type?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_statistics: {
        Row: {
          forum_posts_created: number | null
          forum_replies_made: number | null
          id: string
          resources_downloaded: number | null
          resources_uploaded: number | null
          tasks_completed: number | null
          tasks_failed: number | null
          tasks_not_marked: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          forum_posts_created?: number | null
          forum_replies_made?: number | null
          id?: string
          resources_downloaded?: number | null
          resources_uploaded?: number | null
          tasks_completed?: number | null
          tasks_failed?: number | null
          tasks_not_marked?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          forum_posts_created?: number | null
          forum_replies_made?: number | null
          id?: string
          resources_downloaded?: number | null
          resources_uploaded?: number | null
          tasks_completed?: number | null
          tasks_failed?: number | null
          tasks_not_marked?: number | null
          updated_at?: string | null
          user_id?: string
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
