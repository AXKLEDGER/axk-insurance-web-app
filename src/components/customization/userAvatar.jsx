import { useEffect, useState } from 'react';

const userAvatar = (name) => {
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        if (!name) return;

        const cacheKey = `avatar_url_${name}`;
        const cachedUrl = localStorage.getItem(cacheKey);

        if (cachedUrl) {
            setAvatarUrl(cachedUrl);
        } else {
            const newAvatarUrl = `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
                name || 'User'
            )}&backgroundColor=A1D36C&fontColor=ffffff&radius=50&size=128&fontWeight=700`;

            setAvatarUrl(newAvatarUrl);
            localStorage.setItem(cacheKey, newAvatarUrl);
        }
    }, [name]);

    return avatarUrl;
};

export default userAvatar;