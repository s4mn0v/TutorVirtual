// ~/types/my-types.d.ts
declare global {
  interface Task {
    id: number;
    title: string;
    created_at: string;
    completed: boolean;
  }

  interface Student {
    id: string;
    name: string;
    last_name: string;
    document_id: string;
    career: string;
  }

  interface Teacher {
    id: string;
    last_name: string;
    document_id: string;
    department: string;
    created_at: string;
  }

  interface Admin {
    id: string;
    last_name: string;
    document_id: string;
    created_at: string;
  }

  interface Database {
    public: {
      Tables: {
        students: {
          Row: Student;
          Insert: {
            id: string;
            last_name: string;
            document_id: string;
            career: string;
            created_at: string;
          };
          Update: Partial<{
            id: string;
            last_name: string;
            document_id: string;
            career: string;
            created_at: string;
          }>;
        };
        teachers: {
          Row: Teacher;
          Insert: {
            id: string;
            last_name: string;
            document_id: string;
            department: string;
            created_at: string;
          };
          Update: Partial<{
            id: string;
            last_name: string;
            document_id: string;
            department: string;
            created_at: string;
          }>;
        };
        admins: {
          Row: Admin;
          Insert: {
            id: string;
            last_name: string;
            document_id: string;
            created_at: string;
          };
          Update: Partial<{
            id: string;
            last_name: string;
            document_id: string;
            created_at: string;
          }>;
        };
      };
    };
  }
}

export {};
