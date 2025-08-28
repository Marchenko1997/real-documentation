declare type UserType = "creator" | "editor" | "viewer";

  declare type RoomAccesses = Record<string, AccessType>;

  declare type CreateDocumentParams = {
    userId: string;
    email: string;
  };

declare type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  color: string;
  userType?: UserType;
};

declare type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};
