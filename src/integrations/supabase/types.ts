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
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          metadata: Json | null
          priority: number | null
          title: string
          type: string | null
          user_id: string | null
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          metadata?: Json | null
          priority?: number | null
          title: string
          type?: string | null
          user_id?: string | null
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          metadata?: Json | null
          priority?: number | null
          title?: string
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          notification_preferences: Json | null
          security_clearance: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          notification_preferences?: Json | null
          security_clearance?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          notification_preferences?: Json | null
          security_clearance?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      scans: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          parameters: Json | null
          results: Json | null
          scan_type: Database["public"]["Enums"]["scan_type"]
          started_at: string | null
          status: Database["public"]["Enums"]["scan_status"] | null
          target: string
          threats_found: number | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          parameters?: Json | null
          results?: Json | null
          scan_type: Database["public"]["Enums"]["scan_type"]
          started_at?: string | null
          status?: Database["public"]["Enums"]["scan_status"] | null
          target: string
          threats_found?: number | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          parameters?: Json | null
          results?: Json | null
          scan_type?: Database["public"]["Enums"]["scan_type"]
          started_at?: string | null
          status?: Database["public"]["Enums"]["scan_status"] | null
          target?: string
          threats_found?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      threats: {
        Row: {
          created_at: string | null
          description: string | null
          detected_at: string | null
          id: string
          indicators: Json | null
          mitigation_steps: string[] | null
          resolved_at: string | null
          severity: Database["public"]["Enums"]["threat_severity"]
          source_ip: unknown | null
          status: Database["public"]["Enums"]["threat_status"] | null
          target_ip: unknown | null
          threat_type: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          detected_at?: string | null
          id?: string
          indicators?: Json | null
          mitigation_steps?: string[] | null
          resolved_at?: string | null
          severity: Database["public"]["Enums"]["threat_severity"]
          source_ip?: unknown | null
          status?: Database["public"]["Enums"]["threat_status"] | null
          target_ip?: unknown | null
          threat_type?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          detected_at?: string | null
          id?: string
          indicators?: Json | null
          mitigation_steps?: string[] | null
          resolved_at?: string | null
          severity?: Database["public"]["Enums"]["threat_severity"]
          source_ip?: unknown | null
          status?: Database["public"]["Enums"]["threat_status"] | null
          target_ip?: unknown | null
          threat_type?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      vault_items: {
        Row: {
          description: string | null
          encryption_key_id: string | null
          file_path: string | null
          file_size: number | null
          id: string
          is_encrypted: boolean | null
          last_accessed: string | null
          mime_type: string | null
          name: string
          tags: string[] | null
          uploaded_at: string | null
          user_id: string | null
        }
        Insert: {
          description?: string | null
          encryption_key_id?: string | null
          file_path?: string | null
          file_size?: number | null
          id?: string
          is_encrypted?: boolean | null
          last_accessed?: string | null
          mime_type?: string | null
          name: string
          tags?: string[] | null
          uploaded_at?: string | null
          user_id?: string | null
        }
        Update: {
          description?: string | null
          encryption_key_id?: string | null
          file_path?: string | null
          file_size?: number | null
          id?: string
          is_encrypted?: boolean | null
          last_accessed?: string | null
          mime_type?: string | null
          name?: string
          tags?: string[] | null
          uploaded_at?: string | null
          user_id?: string | null
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
      scan_status: "pending" | "running" | "completed" | "failed"
      scan_type: "network" | "malware" | "vulnerability" | "phishing"
      threat_severity: "low" | "medium" | "high" | "critical"
      threat_status: "active" | "resolved" | "investigating" | "false_positive"
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
    Enums: {
      scan_status: ["pending", "running", "completed", "failed"],
      scan_type: ["network", "malware", "vulnerability", "phishing"],
      threat_severity: ["low", "medium", "high", "critical"],
      threat_status: ["active", "resolved", "investigating", "false_positive"],
    },
  },
} as const
