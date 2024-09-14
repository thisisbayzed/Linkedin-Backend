interface Experience {
  from: Date;
  school: string;
  fieldOfStudy: string;
  to?: Date | null;
}

interface Education {
  from: Date;
  school: string;
  fieldOfStudy: string;
  to?: Date | null;
}

// Define the interface for UserProfile with the correct types
interface UserProfile {
  name?: string;
  username?: string;
  profilePic?: string;
  coverPic?: string;
  location?: string;
  bio?: string;
  about?: string;
  skills?: string[];
  experience?: Experience[];
  education?: Education[];
}

export { UserProfile , Experience, Education};
