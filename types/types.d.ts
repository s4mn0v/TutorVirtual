// ~/types/my-types.d.ts
declare global {
  interface Task {
    id: number;
    title: string;
    created_at: string;
    completed: boolean;
  }

  interface Profile {
    role: "superadmin" | "admin" | "teacher" | "student";
  }

  interface Database {
    public: {
      Tables: {
        profiles: {
          Row: ProfileRole;
          Insert: {
            id: string;
            role: string;
            created_at: string;
          };
          Update: Partial<{
            id: string;
            role: string;
            created_at: string;
          }>;
        };
        // other tables...
      };
    };
  }

  interface ProfileRole {
    role: string;
  }
}

// Indica a TypeScript que este archivo es un módulo
export {};
