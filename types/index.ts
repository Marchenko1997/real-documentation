declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

  declare type AccessType =
    | ["room:write"]
    | ["room:read", "room:presence:write"];

declare type UserType = "creator" | "editor" | "viewer";

declare type RoomAccesses = Record<string, AccessType>;

  declare type RoomMetadata = {
    creatorId: string;
    email: string;
    title: string;
  };
  

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

  declare type CollaborativeRoomProps = {
    roomId: string;
    roomMetadata: RoomMetadata;
    users: User[];
    currentUserType: UserType;
};
  
  declare type UserTypeSelectorParams = {
    userType: string;
    setUserType: React.Dispatch<React.SetStateAction<UserType>>;
    onClickHandler?: (value: string) => void;
  };

declare type AddDocumentBtnProps = {
  userId: string;
  email: string;
};

declare type DeleteModalProps = { roomId: string };
