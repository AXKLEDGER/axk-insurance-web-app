import { useEffect, useState } from 'react';

export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);

        // console.log("User is:", parsedUser);

        if (!parsedUser.name && parsedUser.email) {
          const emailParts = parsedUser.email.split('@');
          parsedUser.name = emailParts ? emailParts[0] : null;
        }

        const nameForAvatar =
          parsedUser.profile?.full_name || parsedUser.username || null;

        if (nameForAvatar && !parsedUser.image) {
          parsedUser.image = `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
            nameForAvatar
          )}&backgroundColor=A1D36C&fontColor=ffffff&radius=50&size=128`;
          parsedUser.thumb = parsedUser.image;
        } else if (parsedUser.image) {
          parsedUser.thumb = parsedUser.image;
        }

        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    } else {
      console.log("No user data found. User is not logged in.");
      setUser(false);
    }
  }, []);

  return user;
}
